import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/Chat.module.css';
import { getTeamById } from '../teamthemes/footballdata';
const Chat: NextPage = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { teamId } = router.query;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const team = getTeamById(teamId as string);

  useEffect(() => {
    if (!roomId) return;

    // Join the chat room
    socket.emit('join-room', { userId: 1, chatRoomId: Number(roomId) });

    // Listen for incoming messages
    socket.on('message', ({ sender, message }) => {
      setMessages((prev) => [...prev, `${sender}: ${message}`]);
    });

    return () => {
      socket.off('message');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit('send-message', { chatRoomId: Number(roomId), content: message, userId: 1 });
    setMessages((prev) => [...prev, `You: ${message}`]);
    setMessage('');
  };

  return (
    <div className={styles.chatContainer}>
      <header className={styles.chatHeader}>
        <button onClick={() => router.back()} className={styles.backButton}>
          Back
        </button>
        {team && (
          <div className={styles.teamHeader}>
            <img src={team.logo} alt={`${team.name} logo`} className={styles.teamLogo} />
            <h1 className={styles.teamName}>{team.name}</h1>
          </div>
        )}
        <h2>Room: {roomId}</h2>
      </header>
      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            {msg}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.messageInput}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;