import { io } from 'socket.io-client';

const socket = io('http://localhost:8085', {
  withCredentials: true,
  transports: ['websocket'],
  autoConnect: true,
});

// socket.on('connect_error', (err: any) => {
//   console.log('Connected to the server', err);
// });

export default socket;