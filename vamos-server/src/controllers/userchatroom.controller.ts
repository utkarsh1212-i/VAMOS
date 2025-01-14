import { Request, Response } from "express";
import * as userChatRoomService from "../services/userchatroom.service";

const userChatRoomController = {

  getUsersRoomsHandler: async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
      const roomData = await userChatRoomService.getUsersChatRoom(userId);
      res
        .status(200)
        .send({ message: `Users Rooms are`, data: roomData });
    } catch (error) {
      res
        .status(500)
        .send({ message: `Error handling room: ${error.message}` });
    }
  },
};

export { userChatRoomController };
