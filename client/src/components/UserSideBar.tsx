// UserSideBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const UserSideBar: React.FC = () => {

  return (
    <div className="sidebar">
      <ul>
        <li><NavLink to="/user/info">Info</NavLink></li>
        <li><NavLink to="/user/chat">Chat</NavLink></li>
        <li><NavLink to="/user/mywares">My Wares</NavLink></li>
      </ul>
    </div>
  );
}

export default UserSideBar;
