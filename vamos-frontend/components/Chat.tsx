import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';
import { NextPage } from 'next';

const Chat: NextPage  = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState('general');
  const [chatRoomId, setRoomId] = useState(1);

  useEffect(() => {
    // Join default room
    socket.emit('join-room', room);

    // Listen for incoming messages
    socket.on('message', ({ sender, message }) => {
      setMessages((prev) => [...prev, `${sender}: ${message}`]);
    });

    return () => {
      socket.off('message');
    };
  }, [room]);

  const sendMessage = () => {
    socket.emit('send-message', { chatRoomId, content: message, userId : 1  });
    setMessages((prev) => [...prev, `You: ${message}`]);
    setMessage('');
  };

  return (
    <div>
      <h2>Room: {room}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
