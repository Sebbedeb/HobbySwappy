import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} >
        <Route path="/user/*" element={<UserPage userId={1} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;