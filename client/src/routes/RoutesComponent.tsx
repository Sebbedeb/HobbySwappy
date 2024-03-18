import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import UserPage from '../pages/UserPage';
import UserSignUp from '../pages/UserSignUp';
import Login from '../pages/Login';
import ChatPage from '../pages/ChatPage';
import WarePage from '../pages/WarePage';
import Ware from '../pages/Ware';
import MyWares from '../pages/MyWares';
import ErrorPageComponent from '../components/ErrorPageComponent';

function RoutesComponent() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/user/*" element={<UserPage />} />
          <Route path='/chats' element={<ChatPage />} />
          <Route path='/wares' element={<WarePage />} />
          <Route path='/ware/:wareId' element={<Ware />} />
          <Route path='/mywares' element={<MyWares />} />
          <Route path='/errorPage' element={<ErrorPageComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RoutesComponent;