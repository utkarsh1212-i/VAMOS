import { useRouter } from 'next/router';
import ChatRoomList from '../../components/ChatRoomList';

export default function ChatCategoryPage() {
  const router = useRouter();
  const { team } = router.query;

  if (!team || typeof team !== 'string') {
    return <div>Loading...</div>;
  }

  return <ChatRoomList teamId={team} />;
}
