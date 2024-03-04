import React, { ReactNode } from 'react';
import TopBar from '../components/TopBar';
import '../styles/MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return ( 
    <div>
      <TopBar />
    <div className="main-layout-container">
      <div className="content-container">{children}</div>
    </div>
    </div>
  );
}

export default MainLayout;
