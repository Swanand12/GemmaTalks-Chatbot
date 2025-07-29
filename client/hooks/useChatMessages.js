"use client";
import { useState, useEffect, useRef } from "react";
import { useGemmaContext } from "@/context/GemmaContext";
import axios from "axios";
import { extractChatTitle } from "@/utils/importantFunc";

export const useChatMessages = () => {
  const { setChats, selectedChat } = useGemmaContext();
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [typing, setTyping] = useState(false);
  const typingIndicatorId = useRef(null);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch messages when a chat is selected
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  // Typing indicator with debounce logic
  useEffect(() => {
    if (!query.trim()) {
      setTyping(false);
      if (typingIndicatorId.current) {
        clearTimeout(typingIndicatorId.current);
        typingIndicatorId.current = null;
      }
      return;
    }

    setTyping(true);
    const timeoutId = setTimeout(() => {
      setTyping(false);
    }, 2000);
    typingIndicatorId.current = timeoutId;

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    const chatId = selectedChat.id;
    try {
      const res = await axios.get(`${backend_url}/gemma/api/chat/${chatId}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("fetchMessages", err);
    }
  };

  let assistantMsg = { role: "assistant", content: "", createdAt: "" };

  const sendMessage = async () => {
    if (!selectedChat || !query.trim()) return;

    // Clear typing indicator if active
    if (typingIndicatorId.current) {
      clearTimeout(typingIndicatorId.current);
      setTyping(false);
    }

    const chatId = selectedChat.id;
    assistantMsg.createdAt = new Date().toISOString();

    // Optimistically update message list
    setMessages((prev) => [
      ...prev,
      { role: "user", content: query, createdAt: new Date().toISOString() },
      { role: "assistant", content: "" },
    ]);

    try {
      setQuery("");

      // Auto-generate title for the first user message
      if (messages.length === 0) {
        const response = await axios.post(
          "http://localhost:11434/api/generate",
          {
            model: "gemma3:1b",
            prompt: `Generate a concise, informative chat title (3 words) for the text below. Respond in exactly this format: title: <your title> Text: ${query}`,
            stream: false,
          }
        );

        const formatedTitle = extractChatTitle(response.data.response);
        if (formatedTitle) {
          await axios.put(
            `${backend_url}/gemma/api/chat/${chatId}/title/edit`,
            { title: formatedTitle }
          );

          // Update local state with new title
          setChats((prev) =>
            prev.map((chat) =>
              chat.id === chatId ? { ...chat, title: formatedTitle } : chat
            )
          );
        }
      }

      // Stream assistant response from backend
      const res = await fetch(
        `${backend_url}/gemma/api/chat/${chatId}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: query }),
        }
      );

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      setStreaming(true);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const parts = chunk.split("data: ").filter(Boolean);

        for (let part of parts) {
          if (part.includes("[DONE]")) {
            setStreaming(false);
            break;
          }

          const cleanedPart = part.replace(/^(\n|\r\n)?data:\s*/g, "");
          assistantMsg = {
            ...assistantMsg,
            content: assistantMsg.content + cleanedPart,
          };

          // Update the assistant's message in real-time
          setMessages((prev) => prev.slice(0, -1).concat(assistantMsg));
        }
      }
    } catch (err) {
      console.error("sendMessage error", err);
      setStreaming(false);
    }
  };

  const stopMessage = async () => {
    if (!selectedChat || messages.length === 0) return;
    const chatId = selectedChat.id;

    // Request backend to stop streaming
    try {
      await axios.post(`${backend_url}/gemma/api/chat/${chatId}/stop`, {
        content: messages[messages.length - 1].content,
      });
    } catch (err) {
      console.error("stopMessage error", err);
    } finally {
      setStreaming(false);
    }
  };

  return {
    messages,
    query,
    setQuery,
    sendMessage,
    stopMessage,
    streaming,
    typing,
  };
};
