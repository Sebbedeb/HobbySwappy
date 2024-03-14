import React, { useState } from 'react';
import { SEND_MESSAGE } from '../services/MessageServices';
import { useMutation } from '@apollo/client';

interface SendMessageProps {
    senderId: number;
    receiverId: number;
}

function SendMessage({ senderId, receiverId }: SendMessageProps) {
    
    const [messageText, setMessageText] = useState<string>('');

    const [sendMessageMutation] = useMutation(SEND_MESSAGE);

    const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Sending message');
        
        try {
            console.log('Sending message'+messageText+senderId+receiverId);
            await sendMessageMutation({
                variables: {
                    messageText: messageText,
                    messageSenderId: senderId,
                    messageReceiverId: receiverId
                }
            });
            
            // Reset messageText after sending
            setMessageText('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };
    


    return (
        <div>
            <form onSubmit={handleSendMessage}>
                <input type="text" placeholder="Type your message here" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default SendMessage;
