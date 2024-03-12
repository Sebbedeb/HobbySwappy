import React from 'react';
import '../styles/FrontPage.css';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/CurrentUserContext'; // Import the useUserContext hook

const FrontPage: React.FC = () => {
  const { userId } = useUserContext(); // Access userId from the user context

  return (
    <div className="frontpage-container">
      <h1>Welcome to the Front Page!</h1>
      <p>This is the content of the front page.</p>
      
      {userId ? ( // If userId exists (user is logged in), show a greeting
        <p>Hello, {userId}!</p>
      ) : ( // If userId does not exist (no user logged in), show login and signup links
        <div>
          <p>Please <NavLink to="/login">Login</NavLink> or <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
