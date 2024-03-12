import React, { useState } from 'react';

interface UserSignUpFormProps {
    handleSubmit: (newUser: { userName: string, userPassword: string, userAddress: string, userZip: number }) => void;
}

const UserSignUpForm: React.FC<UserSignUpFormProps> = ({ handleSubmit }) => {
    const [newUser, setNewUser] = useState({
        userName: '',
        userPassword: '',
        userAddress: '',
        userZip: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: name === 'userZip' ? parseInt(value) : value // Convert userZip to number
        }));
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        await handleSubmit(newUser);
        setIsSubmitting(false);
    };

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="userName">Username: </label>
                    <input type="text" id="userName" name="userName" value={newUser.userName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="userPassword">Password: </label>
                    <input type="password" id="userPassword" name="userPassword" value={newUser.userPassword} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="userAddress">Address: </label>
                    <input type="text" id="userAddress" name="userAddress" value={newUser.userAddress} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="userZip">Zip: </label>
                    <input type="number" id="userZip" name="userZip" value={newUser.userZip} onChange={handleChange} />
                </div>
                <button type="submit" disabled={isSubmitting}>Sign Up</button>
            </form>
        </div>
    );
};

export default UserSignUpForm;
