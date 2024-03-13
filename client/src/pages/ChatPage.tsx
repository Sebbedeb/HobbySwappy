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

  const handleClickedConversation = (conversation: Conversation) => {
    console.log('Clicked conversation:', conversation);
    setActiveConversation(conversation);
  };

  return (
    <div>
        <h2>Chat Page</h2>
        <div>
            {conversations.map((conversation) => {
                return (
                    <div key={conversation.conversationId}> {/* Add unique key prop here */}
                        {!activeConversation && (
                            <ul>
                                <li>
                                    ChatPartner:
                                    <button onClick={() => handleClickedConversation(conversation)}>
                                        {conversation.personOneId === userId ? conversation.personTwoId : conversation.personOneId}
                                    </button>
                                </li>
                            </ul>
                        )}
                        {activeConversation && (
                            <div>
                                <Chat messageIds={activeConversation.messages} />
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
