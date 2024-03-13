import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";
import UserSideBar from '../components/UserSideBar';
import UserInfo from '../components/UserInfo';
import { useUserContext } from '../context/CurrentUserContext';



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

const EDIT_USER = gql`
  mutation editUser($userId: Int!, $userName: String, $userAdress: String, $userZip: Int) {
    editUser(userId: $userId, userName: $userName, userAdress: $userAdress, userZip: $userZip) {
      userId
      userName
      userAdress
      userZip
    }
  }
`;

const UserPage: React.FC = () => {
  const { userId } = useUserContext();
  const [subPage, setSubPage] = useState("");
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

  const [editUserMutation] = useMutation(EDIT_USER);

  const handleEditUser = async (editedFields: { [key: string]: string | number }) => {
    console.log('Submitting edited user:', editedFields);
    await setEditedUser(prevState => ({
        ...prevState,
        ...editedFields
    }));

    try {
      console.log('Submitting edited user in mutation:', editedFields);
        await editUserMutation({
            variables: {
                userId: editedUser.userId,
                ...editedFields
            }
        });
    } catch (error) {
        console.error('Error editing user:', error);
    }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;

  return (
    <div className="user-page-container">
      <UserSideBar setSubPage={setSubPage} />
      <div className="content">
        {subPage === "info" && <UserInfo user={editedUser} onEditUser={handleEditUser} />}
      </div>
    </div>
  );
}

export default UserPage;