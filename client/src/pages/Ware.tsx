import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate directly
import { GET_WARE } from '../services/WareServices';
import { useQuery, useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../services/MessageServices';

function Ware() {
    const navigate = useNavigate(); // Use useNavigate directly in Ware component
    const [sendMessageMutation] = useMutation(SEND_MESSAGE);

    const { wareId } = useParams() as { wareId: string };
    const wareIdInt = parseInt(wareId);
    console.log("wareId is: " + wareIdInt);

    const { data, loading, error } = useQuery(GET_WARE, {
        variables: {
            wareId: wareIdInt
        }
    });

    useEffect(() => {
        if (loading) {
            console.log("Loading");
        }
        if (error) {
            console.log("error: " + error);
        }
        if (data) {
            console.log("data ", data);
        }
    }, [data, loading, error]);

    const contactSeller = (receiverId: number) => {
        const messageText = "Hello fellow Swappy, I am interested in your " + data.ware.wareTitle;
        const senderId = parseInt(localStorage.getItem('userId') as string);



        try {
            sendMessageMutation({
                variables: {
                    messageText: messageText,
                    messageSenderId: senderId,
                    messageReceiverId: receiverId
                }
            });
        } catch (error) {
            console.error('Failed to send message:', error);
        }

        navigate('/chats');
    }

    return (
        <div>
            <h1> this is a ware</h1>
            <ul>
                <li>Ware Id: {wareIdInt}</li>
                <li>Ware Title: {data && data.ware.wareTitle}</li>
                <li>Ware Description: {data && data.ware.wareDescription}</li>
                <li>Ware Price: {data && data.ware.warePrice}</li>
                <li>Ware Category: {data && data.ware.wareCategory}</li>
                <li>Ware Image: {data && data.ware.imgName}</li>
                <li>Ware User Id: {data && data.ware.userId}</li>

                <button onClick={() => contactSeller(data.ware.userId)}>Contact Seller</button>
            </ul>
        </div>
    );
}

export default Ware;
