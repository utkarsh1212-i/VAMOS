import { ChatRoom } from "../models/chatroom.model";

const createChatRoom = async (data: Partial<ChatRoomAttributes>) => {
  return await ChatRoom.create(data);
};

const getAllChatRoomsByTeam = async (teamId : number) => {
  return await ChatRoom.findAll({ where: { isActive: true, teamId } });
};

const getChatRoomById = async (roomId: number) => {
  return await ChatRoom.findByPk(roomId);
};

export { createChatRoom, getAllChatRoomsByTeam, getChatRoomById };
