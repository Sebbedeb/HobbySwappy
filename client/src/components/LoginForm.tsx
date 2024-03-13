import React, { useState } from 'react';

interface LoginFormProps {
    onSubmit: (userName: string, userPassword: string) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(userName, userPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
