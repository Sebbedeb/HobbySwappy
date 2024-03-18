import React, { useReducer } from 'react';

interface LoginFormProps {
    onSubmit: (userName: string, userPassword: string) => void;
}

interface FormState {
    userName: string;
    userPassword: string;
}

const initialState: FormState = {
    userName: '',
    userPassword: '',
};

type Action = { type: 'SET_USERNAME', payload: string } | { type: 'SET_PASSWORD', payload: string };

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, userName: action.payload };
        case 'SET_PASSWORD':
            return { ...state, userPassword: action.payload };
        default:
            return state;
    }
}

function LoginForm({ onSubmit }: LoginFormProps): JSX.Element {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        onSubmit(state.userName, state.userPassword);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: 'SET_USERNAME', payload: event.target.value });
        console.log(state)
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: 'SET_PASSWORD', payload: event.target.value });
        console.log(state)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={state.userName}
                    onChange={handleUsernameChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={state.userPassword}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
