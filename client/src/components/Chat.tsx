import React from 'react';
import { Message } from '../Types';
import { GET_MESSAGES } from '../services/MessageServices';
import { useQuery } from '@apollo/client';
import SendMessage from './SendMessage';

interface ChatProps {
    conversationId: number;
}

function Chat(chatProps: ChatProps) {

    const [messages, setMessages] = React.useState<Message[]>([]);
    const [senderId, setSenderId] = React.useState<number | null>(null);
    const [receiverId, setReceiverId] = React.useState<number | null>(null);

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
            setSenderId(data.messages[0].senderId);
            setReceiverId(data.messages[0].receiverId);

            console.log('Messages loaded: ' + data.messages.length);
            console.log('Sender: ' + data.messages[0].senderId);
            console.log('Receiver: ' + data.messages[0].receiverId);
        }


    }, [chatProps.conversationId, data, error, loading]);

    return (
        <div>
            <h1>Bing Bong Chattid</h1>
            <ul>
                {messages.map((message) => {
                    return (
                        <div key={message.messageId}>
                            <li>
                                Sent by user: {message.senderId}
                                <br />
                                {message.messageText}
                            </li>
                        </div>
                    );
                })}
            </ul>

            {senderId !== null && receiverId !== null && (
                <SendMessage senderId={senderId} receiverId={receiverId} />
            )}

        </div>
    );
}

export default Chat;
