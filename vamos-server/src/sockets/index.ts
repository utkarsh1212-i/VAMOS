import { Server } from 'socket.io';

export const initializeSocket = (io: Server) => {
  io.on('connection', (socket : any) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('message', (data: any) => {
      console.log('Received message:', data);
      socket.broadcast.emit('message', data); // Broadcast the message
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};