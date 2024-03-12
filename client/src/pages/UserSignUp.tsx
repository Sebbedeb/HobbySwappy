import React from 'react';
import { gql, useMutation } from '@apollo/client';
import UserSignUpForm from '../components/UserSignUpForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function UserSignUp() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const CREATE_USER = gql`
    mutation createUser($userName: String!, $userPassword: String!, $userAddress: String!, $userZip: Int!) {
        createUser(userName: $userName, userPassword: $userPassword, userAddress: $userAddress, userZip: $userZip) {
            userId
        }
    }
`;


    const [createUserMutation] = useMutation(CREATE_USER);
    

    const handleCreateUser = async (newUser: { userName: string, userPassword: string, userAddress: string, userZip: number }) => {
        console.log('Creating new user:', newUser);
        try {
            await createUserMutation({
                variables: {
                    userName: newUser.userName,
                    userPassword: newUser.userPassword,
                    userAddress: newUser.userAddress,
                    userZip: newUser.userZip as number
                }
            });
            console.log('User created successfully', newUser);
            // Redirect to login page after successful user creation
            navigate('/login');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <h1>Sign up</h1>
            <UserSignUpForm handleSubmit={handleCreateUser} />
        </div>
    );
}

export default UserSignUp;
