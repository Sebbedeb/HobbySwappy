import React from 'react';
import '../styles/FrontPage.css';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/CurrentUserContext';
import { useState, useEffect } from 'react';
import { User } from '../Types';
import { GET_USER } from '../services/UserServices';
import { useQuery } from '@apollo/client';
import SwappiesNearYou from '../components/SwappiesNearYou';

const FrontPage: React.FC = () => {

  const { userId } = useUserContext();
  const emptyUser: User = {
    userId: 0,
    userName: '',
    userPassword: '',
    userAddress: '',
    userZip: 0,
  };

  const [user, setUser] = useState<User>(emptyUser);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId }
  });



  useEffect(() => {
    const fetchUser = async () => {
      if (userId !== 0 && userId !== null) {
        try {
          const userData: User = data.user;
          if (!userData) {
            throw new Error('User not found');
          }
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUser(); // Fetch user data only if userId exists
  }, [userId, data]);

  return (
    <div className="frontpage-container">

      <h1>Welcome to Hobby Swappy!</h1>
      {userId ? ( // If userId exists (user is logged in), show a greeting
        <div>
          <h2>Hello, {user.userName}!</h2>

          <SwappiesNearYou />
        </div>
      ) : ( // If userId does not exist (no user logged in), show login and signup links
        <div>
          <p>Please <NavLink to="/login">Login</NavLink> or <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
