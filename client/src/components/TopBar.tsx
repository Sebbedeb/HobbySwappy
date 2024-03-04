import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/TopBar.css';

const TopBar: React.FC = () => {
  return (
    <div id="nav-bar">
      <div id="nav-items-container">
      <div id="nav-items">
      <NavLink to="#">
          <img src="images/HobbySwappy.png" className='logo' alt="logo" />
        </NavLink>
        <NavLink to="/" activeClassName="active" exact>
          Dummy 1
        </NavLink>
        <NavLink to="/" activeClassName="active">
          Dummy 2
        </NavLink>
        <NavLink to="/" activeClassName="active">
          Dummy 3
        </NavLink>
        <div/>
      </div>
    </div>
    </div>
  );
};

export default TopBar;
