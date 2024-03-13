import React, { useState } from 'react';
import { User } from '../Types';

interface UserInfoProps {
    user: User;
    onEditUser: (editedUser: User) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onEditUser }) => {
    const [editedUser, setEditedUser] = useState(user); // Initialize editedUser state with the initial user data
    const [isEditing, setIsEditing] = useState(false); // Flag to track whether the form is in edit mode

    const handleInputChange = (fieldName: string, value: string | number) => {
        setEditedUser(prevUser => ({
            ...prevUser,
            [fieldName]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true); // Set edit mode to true when the user clicks the Edit button
    };

    const handleCancel = () => {
        setIsEditing(false); // Set edit mode to false when the user clicks the Cancel button
        setEditedUser(user); // Reset the editedUser state to the initial user data
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onEditUser(editedUser); // Pass the edited user object to the parent component
        setIsEditing(false); // Set edit mode to false after submitting changes
    };

    return (
        <div>
            <h1>User info </h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userName">Username: </label>
                        <input type="text" id="userName" value={editedUser.userName} onChange={(e) => handleInputChange('userName', e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="userAdress">Address: </label>
                        <input type="text" id="userAddress" value={editedUser.userAddress} onChange={(e) => handleInputChange('userAddress', e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="userZip">Zip: </label>
                        <input type="number" id="userZip" value={editedUser.userZip} onChange={(e) => handleInputChange('userZip', parseInt(e.target.value))} />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p>Username: {user.userName} <button onClick={handleEditClick}>Edit</button></p>
                    <p>Address: {user.userAddress} <button onClick={handleEditClick}>Edit</button></p>
                    <p>Zip: {user.userZip} <button onClick={handleEditClick}>Edit</button></p>
                </div>
            )}
        </div>
    );
}

export default UserInfo;
