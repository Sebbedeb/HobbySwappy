import { useEffect } from "react";
import { GET_USERS } from "../services/UserServices";
import { useQuery } from '@apollo/client';
import { useState } from "react";

function SwappiesNearYou() {

    const { loading, error, data } = useQuery(GET_USERS);
    const [userAmount, setUserAmount] = useState<number>(0);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const usersData = data.users;
                if (!usersData) {
                    throw new Error('Users not found');
                }
                setUserAmount(usersData.length);
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };
        fetchUsers();
    }, [data, error, loading]);

    return (
        <div>
            <h3>home of {loading && 'loading...'} {error && 'error'} {data && userAmount} Swappies!
            </h3>
        </div>
    );
}

export default SwappiesNearYou;