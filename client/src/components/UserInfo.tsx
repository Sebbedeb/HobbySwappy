import React from 'react';
import { User } from '../Types';

interface UserInfoProps {
    user: User;
    onEditUser: (fieldName: string, value: string | number) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onEditUser }) => {
    console.log('UserInfo rendered');
    const handleEditField = (fieldName: string, value: string | number) => {
        onEditUser(fieldName, value);
    };

    return (
        <div>
            <h1>User info </h1>
            <div>
                <p>userName: {user.userName} <button onClick={() => handleEditField('userName', 'new value')}>Edit</button></p>
                <p>userAdress: {user.userAdress} <button onClick={() => handleEditField('userAdress', 'new value')}>Edit</button></p>
                <p>userZip: {user.userZip} <button onClick={() => handleEditField('userZip', 12345)}>Edit</button></p>
            </div>
        </div>
    );
}

export default UserInfo;
