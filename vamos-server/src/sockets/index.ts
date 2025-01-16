import { Server } from 'socket.io';
import { joinChatRoom } from '../services/userchatroom.service';
import { sendMessage } from '../services/message.service';

export const initializeSocket = (io: Server) => {
  io.on('connection', (socket: any) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('message', (data: any) => {
      console.log('Received message:', data);
      socket.broadcast.emit('message', data); // Broadcast the message
    });

    socket.on('join-room', async ({ userId, chatRoomId }: { userId: number, chatRoomId: number }) => {
      socket.join(chatRoomId);
      await joinChatRoom(userId, chatRoomId);
      io.to(chatRoomId.toString()).emit('user-joined', { userId });
    });

    // Send Message
    socket.on('send-message', async (messageData: any) => {
      const message = await sendMessage(messageData);
      io.to(messageData.chatRoomId.toString()).emit('new-message', message);
    });

    // Leave Room
    socket.on('leave-room', async ({ userId, chatRoomId }: { userId: number, chatRoomId: number }) => {
      socket.leave(chatRoomId);
      io.to(chatRoomId.toString()).emit('user-left', { userId });
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};