import { Request, Response } from "express";
import { createChatRoom } from "../services/chatroom.service";
import * as chatroomsservice from "../services/chatroom.service";
import * as messageService from "../services/message.service";

const createRoomHandler = async (req: Request, res: Response) => {
  try {
    const room = await createChatRoom(req.body);
    res.status(201).json({message : 'Room created successfully'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllChatRoomByTeamHandler = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  try {
    const chatRooms = await chatroomsservice.getAllChatRoomsByTeam(teamId);
    // i want to return the members in the chat room & its name only
    const chatRoomDetail = chatRooms.map((chatRoom : any) => {
      return {
        room_id: chatRoom.roomId,
        room_name: chatRoom.name,
        active_members: chatRoom.activeMembers,
      };
    });
    res.status(200).json(chatRoomDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMessagesHandler = async (req: Request, res: Response) => {
  try {
    const messages = await messageService.getMessagesForChatRoom(req.params.chatRoomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

export { createRoomHandler, getMessagesHandler, getAllChatRoomByTeamHandler };
