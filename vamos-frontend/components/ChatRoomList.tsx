import { join } from 'path';
import styles from '../styles/ChatRoomList.module.css';
import { getTeamById } from '../teamthemes/footballdata';
import socket from '../utils/socket';
import router from 'next/router';

interface ChatRoomListProps {
    teamId: string; // Use team ID to fetch team-specific data
}

export default function ChatRoomList({ teamId }: ChatRoomListProps) {
    const team = getTeamById(teamId);

    if (!team) {
        return <div className={styles.error}>Team not found!</div>;
    }

    const joinRoomTrigger = (roomId: number) => {
        const userId = 1; // Replace with the actual user ID (e.g., from authentication)
        socket.emit('join-room', { userId, roomId });
        router.push(`/chat/${teamId}/${roomId}`)
    }

    // Replace with real data
    const chatRooms = [
        { name: 'General Chat', description: 'Discuss anything about the team.', members: 120 },
        { name: 'Latest Matches', description: 'Talk about the latest matches and results.', members: 85 },
        { name: 'Team Discussions', description: 'Discuss team strategies and updates.', members: 60 },
    ];

    return (
        <>
            <div
                className={styles.container}
                style={{
                    backgroundColor: team.primaryColor,
                    color: team.textColor,
                }}
            >
                <button
                    className={styles.backButton}
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
                <div className={styles.header}>
                    <img src={team.logo} height={80} width={80}  alt={`${team.name} logo`} className={styles.teamLogo} />
                    <h1 style={{
                        textAlign: 'center',
                        fontFamily: `Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`
                    }}>{team.name}</h1>
                </div>
                <div className={styles.chatRoomList}>
                    {chatRooms.map((room, index) => (
                        <div
                            key={index}
                            className={styles.chatRoomBox}
                            style={{
                                borderColor: team.accentColor,
                                boxShadow: `0 2px 4px ${team.accentColor}`,
                            }}
                        >
                            <div className={styles.chatRoomContent}>
                                <div>
                                    <h2 className={styles.chatRoomName}>{room.name}</h2>
                                    <p className={styles.chatRoomDescription}>{room.description}</p>
                                </div>
                                <div className={styles.chatRoomActions}>
                                    <p className={styles.chatRoomMembers}>Members: {room.members}</p>
                                    <button
                                        className={styles.joinButton}
                                        onClick={() => joinRoomTrigger(index + 1)} // Assuming chatRoomId is index + 1
                                    >
                                        Join Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}


// TO MAP THE  CHATROOM ID FROM DB TO THE parameter of joinRoomTrigger function 