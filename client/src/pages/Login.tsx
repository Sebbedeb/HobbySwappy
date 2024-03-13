import React from 'react';
import LoginForm from '../components/LoginForm';
import { gql, useMutation } from '@apollo/client';
import LogOut from '../components/LogOut';
import { useUserContext } from '../context/CurrentUserContext'; // Import the UserContext

function Login() {
    const { setUserId } = useUserContext(); // Use the setUserId function from UserContext

    const LOGIN = gql`
        mutation login($userName: String!, $userPassword: String!) {
            login(userName: $userName, userPassword: $userPassword) {
                token
                userId
            }
        }
    `;

    const [loginMutation] = useMutation(LOGIN);

    const handleLogin = (userName: string, userPassword: string) => {
        console.log('Logging in with:', userName, userPassword);

        loginMutation({
            variables: {
                userName: userName,
                userPassword: userPassword
            }
        })
        .then((data) => {
            console.log('Logged in:', data);
            localStorage.setItem('token', data.data.login.token);
            localStorage.setItem('userId', data.data.login.userId);

            // Update userId in the context after successful login
            setUserId(parseInt(data.data.login.userId)); // Parse userId to integer
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
    };

    return (
        <div>
            <h1>Login</h1>
            {localStorage.getItem('token') ? <LogOut /> : <LoginForm onSubmit={handleLogin} />}
        </div>
    );
}

export default Login;
