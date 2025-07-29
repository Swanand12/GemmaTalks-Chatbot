import express from "express";
import {
  createChatController,
  deleteChatController,
  editChatTitleController,
  getChatSessionsController,
  getMessageHistoryController,
  sendMessageController,
  stopStreamingController,
} from "../controllers/gemmaController.js";

const router = express.Router();

// METHOD: POST
router.post("/api/chat", createChatController); // Create new chat

// METHOD: POST
router.post("/api/chat/:chatId/message", sendMessageController); // Send message & stream reply

// METHOD: POST
router.post("/api/chat/:chatId/stop", stopStreamingController); // Stop streaming response

// METHOD: GET
router.get("/api/chats", getChatSessionsController); // Get list of past chat sessions

// METHOD: GET
router.get("/api/chat/:chatId", getMessageHistoryController); // Get full message history

// METHOD: PUT
router.put("/api/chat/:chatId/title/edit", editChatTitleController); // Edit chat title

// METHOD: DELETE
router.delete("/api/chat/:chatId/delete", deleteChatController); // Delete chat

export default router;
