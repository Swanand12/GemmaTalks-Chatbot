import React from "react";
import { formatDate } from "@/utils/importantFunc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const MessageBubble = ({ message }) => {
  return (
    <div className="mx-3 my-8">
      {/* Display formatted timestamp aligned based on sender */}
      <span
        className={`${
          message.role == "assistant" ? "text-left pl-1" : "text-right pr-2"
        } block py-1 text-gray-600 text-[12px] font-semibold`}
      >
        {message?.createdAt && formatDate(message?.createdAt)}
      </span>

      {/* Message bubble with conditional styling for assistant and user */}
      <div
        className={`${
          message.role == "assistant"
            ? "bg-white rounded-r-3xl rounded-bl-3xl"
            : "bg-[#ef233c]  text-[#edf2f4] rounded-l-3xl ml-auto rounded-tr-3xl"
        }  text-[14px] max-w-[60%] w-[fit-content] px-6 py-3 shadow-md shadow-gray-400 `}
      >
        {/* Render markdown content with syntax highlighting */}
        <pre className="prose prose-sm max-w-none whitespace-pre-wrap break-words outfit">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {message?.content}
          </ReactMarkdown>
        </pre>
      </div>
    </div>
  );
};

export default MessageBubble;
