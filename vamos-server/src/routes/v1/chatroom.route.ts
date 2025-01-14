import express from "express";
import { createRoomHandler, getAllChatRoomByTeamHandler, getMessagesHandler } from "../../controllers/chatroom.controller

const router = express.Router();

router.post("/create-room", createRoomHandler);  // to create a chat room
router.get("/get-rooms-by-team/:teamId", getAllChatRoomByTeamHandler); // to get all chat rooms for a team
router.get("/messages/:chatRoomId", getMessagesHandler); // to get all messages in a chat room

export default router;
