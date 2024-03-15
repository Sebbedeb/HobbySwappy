import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserPage from './pages/UserPage';
import UserSignUp from './pages/UserSignUp';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import WarePage from './pages/WarePage';
import Ware from './pages/Ware';
import MyWares from './pages/MyWares';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} >
        <Route path="/user/*" element={<UserPage />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/wares' element={<WarePage />} />
        <Route path='/ware/:wareId' element={<Ware />} />
        <Route path='/mywares' element={<MyWares />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;