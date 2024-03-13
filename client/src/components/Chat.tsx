import React from 'react';
import { Message } from '../Types';

interface ChatProps {
    messages: Message[];
}

function Chat(chatProps: ChatProps) {
    return ( 
        <div>
            Here is the chat
        </div>
     );
}

export default Chat;