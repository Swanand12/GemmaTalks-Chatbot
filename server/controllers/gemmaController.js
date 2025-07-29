import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let abortControllers = {};

export const createChatController = async (req, res) => {
  try {
    const chat = await prisma.chat.create({
      data: {
        title: "New Chat",
      },
    });

    res.status(201).send({
      success: true,
      message: "Successfully created chat",
      chat,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating chat",
    });
  }
};

export const sendMessageController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    await prisma.message.create({
      data: {
        chatId: parseInt(chatId),
        role: "user",
        content,
      },
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const controller = new AbortController();
    abortControllers[chatId] = controller;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "gemma3:1b",
        prompt: content,
        stream: true,
      },
      {
        responseType: "stream",
        signal: controller.signal,
      }
    );

    let finalContent = "";
    response.data.on("data", (chunk) => {
      const lines = chunk.toString().split("/n").filter(Boolean);
      for (let line of lines) {
        const data = JSON.parse(line);
        if (data.done) {
          res.write("data: [DONE]/n/n");
          res.end();
        } else {
          res.write(data.response);
          finalContent += data.response;
        }
      }
    });

    response.data.on("end", async () => {
      await prisma.message.create({
        data: {
          chatId: parseInt(chatId),
          role: "assistant",
          content: finalContent,
        },
      });
      delete abortControllers[chatId];
    });
  } catch (error) {
    res.write(`data: [ERROR]\n\n`);
    res.end();
  }
};

export const stopStreamingController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    console.log(content);

    if (abortControllers[chatId]) {
      await prisma.message.create({
        data: {
          chatId: parseInt(chatId),
          role: "assistant",
          content,
        },
      });

      abortControllers[chatId].abort();
      delete abortControllers[chatId];
    }
    res.status(200).send({
      success: true,
      message: "Aborted streaming response",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while stopping response",
    });
  }
};

export const getChatSessionsController = async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).send({
      success: true,
      message: " Successfully fetched chats",
      chats,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while stopping response",
    });
  }
};

export const getMessageHistoryController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await prisma.message.findMany({
      where: { chatId: parseInt(chatId) },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).send({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching messages",
    });
  }
};

export const editChatTitleController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { title } = req.body;
    console.log(chatId, title);
    const updatedChat = await prisma.chat.update({
      where: { id: parseInt(chatId) },
      data: { title: title },
    });
    console.log(updatedChat);
    res.status(200).send({
      success: true,
      message: "Successfully edited chat title",
      updatedChat,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating title",
    });
  }
};

export const deleteChatController = async (req, res) => {
  try {
    const { chatId } = req.params;
    console.log("chatId", chatId);
    await prisma.chat.delete({
      where: { id: parseInt(chatId) },
    });

    res.status(200).send({
      success: true,
      message: "Successfully deleted chat",
    });
  } catch (error) {
    console.error("Delete Chat Error:", error); // <-
    res.status(500).send({
      success: false,
      message: "Error while deleting chat",
      error,
    });
  }
};
