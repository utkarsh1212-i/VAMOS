import { error } from 'console';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8085', {
  withCredentials: true,
  transports: ['websocket'],
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('Connected to the server');
});
socket.on("error", (err) => {
  console.error(err);
})

export default socket;