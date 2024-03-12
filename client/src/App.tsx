import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserPage from './pages/UserPage';
import UserSignUp from './pages/UserSignUp';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} >
        <Route path="/user/*" element={<UserPage userId={1} />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;