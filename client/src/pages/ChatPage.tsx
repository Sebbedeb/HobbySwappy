import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/CurrentUserContext';
import { GET_CONVERSATIONS } from '../services/ConversationsServices';
import { useQuery } from '@apollo/client';
import { Conversation } from '../Types';
import Chat from '../components/Chat';

const ChatPage: React.FC = () => {
  const userId = useUserContext().userId;

  const { loading, error, data } = useQuery(GET_CONVERSATIONS, {
    variables: { userId: userId },
  });

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (loading) {
      console.log('Loading conversations');
    }
    if (error) {
      console.log('Error loading conversations:', error.message);
    }
    if (data) {
      console.log('Conversations:', data.conversations);
      setConversations(data.conversations);
    }
  }, [userId, data, error, loading]);

  const handleClickedConversation = (conversation: Conversation) => {
    console.log('Clicked conversation:', conversation);
    setActiveConversation(conversation);
  };

  return (
    <div>
      <h2>Chat Page</h2>
      <div>
        {conversations.map((conversation) => (
          <div key={conversation.conversationId}>
            <ul>
              <li>
                ChatPartner:
                <button onClick={() => handleClickedConversation(conversation)}>
                  {conversation.personOneId === userId ? conversation.personTwoId : conversation.personOneId}
                </button>
              </li>
            </ul>
          </div>
        ))}
        {activeConversation && (
          <div>
            <Chat conversationId={activeConversation.conversationId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
