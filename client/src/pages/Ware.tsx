import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_WARE } from '../services/WareServices';
import { useQuery } from '@apollo/client';


function Ware() {
    const { wareId } = useParams() as { wareId: string };
    const wareIdInt = parseInt(wareId);
    console.log("wareId is: "+wareIdInt);

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
            console.log(error);
        }
        if (data) {
            console.log(data);
        }
    }
    , [data, loading, error]);
    
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

                <button>Contact Seller?</button>
            </ul>
        </div>
     );
}

export default Ware;