// ChatPage.tsx
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/CurrentUserContext';
import { GET_CONVERSATIONS } from '../services/ConversationsServices';
import { useQuery } from '@apollo/client';
import { Conversation } from '../Types';
import Chat from '../components/Chat';

const ChatPage: React.FC = () => {
  const userId = useUserContext().userId;
  const getAllConversations = useQuery(GET_CONVERSATIONS, {
    variables: { userId },
  });

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (getAllConversations.data) {
      setConversations(getAllConversations.data.conversations);
    }
  }, [userId, getAllConversations.data]);

  return (
    <div>
      <h2>Chat Page</h2>
      <div>
        {conversations.map((conversation) => {
          return (
            <div>
              {!activeConversation && (
                <ul key={conversation.conversationId}>
                  <li>
                    <button onClick={() => setActiveConversation(conversation)}>
                      ChatPartner: {conversation.personOneId === userId ? conversation.personTwoId : conversation.personOneId}
                    </button>
                  </li>
                </ul>
              )}
              {activeConversation === conversation && (
                <div>
                  <Chat messages={activeConversation.messages} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatPage;
