import React from 'react';
import MainLayout from './layouts/MainLayout';
import FrontPage from './pages/FrontPage';

const App: React.FC = () => {
  return (
    <MainLayout>
      <FrontPage />
    </MainLayout>
  );
};

export default App;