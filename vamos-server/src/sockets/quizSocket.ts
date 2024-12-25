import { Server, Socket } from 'socket.io';

export const initializeQuizSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle quiz-related events
    socket.on('joinQuiz', (roomId: string) => {
      socket.join(roomId);
      console.log(`User joined quiz room: ${roomId}`);
    });

    socket.on('submitAnswer', (data: { roomId: string; answer: string }) => {
      io.to(data.roomId).emit('newAnswer', { user: socket.id, answer: data.answer });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
