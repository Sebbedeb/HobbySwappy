// UserSideBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

interface UserSideBarProps {
  setSubPage: React.Dispatch<React.SetStateAction<string>>;
}

const UserSideBar: React.FC<UserSideBarProps> = ({ setSubPage }) => {

  const handleSubPageSelect = (subPage: string) => {
    console.log('subPage:', subPage);
    setSubPage(subPage);
  };

  return (
    <div className="sidebar">
      <ul>
        <li><NavLink to="/user/info" onClick={() => handleSubPageSelect("info")}>Info</NavLink></li>
        <li><NavLink to="/mywares" onClick={() => handleSubPageSelect("mywares")}>My Wares</NavLink></li>
      </ul>
    </div>
  );
}

export default UserSideBar;
