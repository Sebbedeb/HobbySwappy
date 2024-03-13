import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/TopBar.css';
import { useUserContext } from '../context/CurrentUserContext'; // Import the useUserContext hook

const TopBar: React.FC = () => {
  const { userId } = useUserContext(); // Access userId from the user context

  return (
    <div id="nav-bar">
      <div id="nav-items-container">
        <div id="nav-items">
          <NavLink to="/">
            <img src="images/HobbySwappy.png" className='logo' alt="logo" />
          </NavLink>
          {userId !== null && userId !== 0 ? ( // If userId exists (user is logged in), display User Page and other items
            <>
              <NavLink to="/user">User Page</NavLink>
              <NavLink to="/chats">Chats</NavLink>
              <NavLink to="/">Dummy 3</NavLink>
              <NavLink to="/login">Login/Out</NavLink>
            </>
          ) : ( // If userId does not exist (no user logged in), display SignUp and Login links
            <>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Login/Out</NavLink>
              
            </>
          )}
          <div/>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
