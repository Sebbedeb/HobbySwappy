import React from 'react';
import LoginForm from '../components/LoginForm';
import { gql, useMutation } from '@apollo/client';
import { useUserContext } from '../context/CurrentUserContext';
import LogOut from '../components/LogOut';
 
function Login() {
    const {setUserId} = useUserContext();
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
                console.log('id:', data.data.login.userId);
                setUserId(data.data.login.userId);
                
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
