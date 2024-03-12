import React from 'react';
import { User } from '../types';

interface UserSignUpFormProps {
    handleSubmit: (formData: { userName: string, userPassword: string, userAdress: string, userZip: number }) => void;
}

function UserSignUpForm({ handleSubmit }: UserSignUpFormProps) {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser: User = {
            userId: 123,
            userName: (event.currentTarget.elements.namedItem('userName') as HTMLInputElement)?.value,
            userPassword: (event.currentTarget.elements.namedItem('userPassword') as HTMLInputElement)?.value,
            userAdress: (event.currentTarget.elements.namedItem('userAdress') as HTMLInputElement)?.value,
            userZip: Number((event.currentTarget.elements.namedItem('userZip') as HTMLInputElement)?.value)
        };
        handleSubmit(newUser);
        newUser.userName = '';
        newUser.userPassword = '';
        newUser.userAdress = '';
        newUser.userZip = 0;
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="userName">Username: </label>
                    <input type="text" id="userName" name="userName" />
                </div>
                <div>
                    <label htmlFor="userPassword">Password: </label>
                    <input type="password" id="userPassword" name="userPassword" />
                </div>
                <div>
                    <label htmlFor="userAdress">Address: </label>
                    <input type="text" id="userAdress" name="userAdress" />
                </div>
                <div>
                    <label htmlFor="userZip">Zip: </label>
                    <input type="number" id="userZip" name="userZip" />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default UserSignUpForm;
