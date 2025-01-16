import { ChatRoom, ChatRoomAttributes } from "../models/chatroom.model";

// const createChatRoom = async (data: Partial<ChatRoomAttributes>) => {
const createChatRoom = async (data: any) => {
  return await ChatRoom.create(data);
};

const getAllChatRoomsByTeam = async (teamId : number) => {
  return await ChatRoom.findAll({ where: { isActive: true, teamId } });
};

const getChatRoomById = async (roomId: number) => {
  return await ChatRoom.findByPk(roomId);
};

export { createChatRoom, getAllChatRoomsByTeam, getChatRoomById };
