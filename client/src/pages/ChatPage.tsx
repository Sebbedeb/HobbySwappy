// ChatPage.tsx
import React, { useEffect } from 'react';

interface ChatPageProps {
  userId: number;
}

const ChatPage: React.FC<ChatPageProps> = ({ userId }) => {
  useEffect(() => {
    console.log('ChatPage mounted');
  }, [userId]);

  return (
    <div>
      <h2>Chat Page</h2>
      {/* Add chat functionality here */}
    </div>
  );
}

export default ChatPage;
