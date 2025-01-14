import { UserChatRoom } from "../models/userchatroom.model";

const joinChatRoom = async (userId: number, chatRoomId: number) => {
  return await UserChatRoom.create({
    userId,
    chatRoomId,
    joinedAt: new Date(),
    isActive: true,
  });
};
const leaveChatRoom = async (userId: number, chatRoomId: number) => {
  return await UserChatRoom.update(
    { leftAt: new Date(), isActive: false },
    { where: { userId, chatRoomId, isActive: true } }
  );
};
const getUsersChatRoom = async (userId: number) => {
  return await UserChatRoom.findAll({
    where: { userId, isActive: true },
    include: ["user"],
  });
};

export { leaveChatRoom, getUsersChatRoom, joinChatRoom };
