import React, { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import { Route, Routes, useLocation } from 'react-router-dom';
import ChatPage from './ChatPage';
import MyWaresPage from './MyWares';
import UserSideBar from '../components/UserSideBar';
import UserInfo from '../components/UserInfo';
import { Outlet } from 'react-router-dom';

import '../styles/UserPage.css';

const GET_USER = gql`
  query user($userId: Int!) {
    user(userId: $userId) {
      userId
      userName
      userAdress
      userZip
    }
  }
`;

interface UserPageProps {
  userId: number;
}

const UserPage: React.FC<UserPageProps> = ({ userId }) => {
const [subPage, setSubPage] = useState("");
  const location = useLocation();
  const [editedUser, setEditedUser] = useState({
    userId: 0,
    userName: "",
    userPassword: "",
    userAdress: "",
    userZip: 0,
  });

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId }
  });

  useEffect(() => {
    if (data && data.user) {
      setEditedUser(data.user);
    }
  }, [data]);

  const handleEditUser = (fieldName: string, value: string | number) => {
    setEditedUser(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  

  return (
    <div className="user-page-container">
      <UserSideBar />
      <div className="content">
        <Outlet />
      </div>
      <Routes>
          <Route path="/user/info" element={<UserInfo user={editedUser} onEditUser={handleEditUser} />} />
          <Route path="/user/chat" element={<ChatPage userId={userId} />} />
          <Route path="/user/mywares" element={<MyWaresPage />} />
        </Routes>
    </div>
  );
}

export default UserPage;
