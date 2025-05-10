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
    socket.on('send-message', async ({ chatRoomId, content, userId }: any) => {
      console.log('Received message at server:', { chatRoomId, content, userId });
      const messageData = {
        content,
        userId,
        chatRoomId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };

      // Save the message to the database
      const message = await sendMessage(messageData);
      console.log(message, "message: ");
      io.to(messageData.chatRoomId.toString()).emit('message', {
        sender: message.userId,
        message: message.content
      });
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