import express from "express";
import { userChatRoomController } from "../../controllers/userchatroom.controller";

const router = express.Router();

// router.post("/join-room", userChatRoomController.join); // to join a chat room
// router.post("/leave-room", userChatRoomController.leave); // to leave a chat room
router.post("/get-users-joined-room", userChatRoomController.getUsersRoomsHandler); // to get all rooms a user has joined 

export default router;
