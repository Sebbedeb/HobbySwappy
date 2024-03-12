import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import '../styles/MainLayout.css';
import FrontPage from '../pages/FrontPage';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return ( 
    <div>
      <TopBar />
      <div className="main-layout-container">
        <div id="content">
          {currentPath === "/" ? <FrontPage /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
