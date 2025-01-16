import { Message, MessageAttributes } from "../models/message.model";

// const sendMessage = async (data: Partial<MessageAttributes>) => {
const sendMessage = async (data:any) => {
  return await Message.create(data);
};
const getMessagesForChatRoom = async (chatRoomId: number) => {
  return await Message.findAll({
    where: { chatRoomId, isActive: true },
    order: [["createdAt", "ASC"]],
    include: ["sender"], // Assuming you have set up the 'sender' alias
  });
};
const deleteMessage = async (messageId: number) => {
  return await Message.update({ isActive: false }, { where: { messageId } });
};

export { sendMessage, getMessagesForChatRoom, deleteMessage };
