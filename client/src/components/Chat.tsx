import React from 'react';
import { Message } from '../Types';
import { GET_MESSAGES } from '../services/MessageServices';
import { useQuery } from '@apollo/client';

interface ChatProps {
    conversationId: number;
}

function Chat(chatProps: ChatProps) {

    const [messages, setMessages] = React.useState<Message[]>([]);

    const { data, loading, error } = useQuery(GET_MESSAGES, {
        variables: { conversationId: chatProps.conversationId },
    });

    React.useEffect(() => {
        if (loading) {
            console.log('Loading messages');
        }
        if (error) {
            console.log('Error loading messages');
        }
        if (data) {
            console.log(data.messages);
            setMessages(data.messages);
        }
    }, [chatProps.conversationId, data, error, loading]);

    return (
        <div>
            <h1>Bing Bong Chattid</h1>
            <ul>
                {messages.map((message) => {
                    return (
                        <li key={message.messageId}>
                            Sent by user: {message.senderId}
                            <br />
                            {message.messageText}
                        </li>
                    );
                }
                )}
            </ul>
        </div>
    );
}

export default Chat;