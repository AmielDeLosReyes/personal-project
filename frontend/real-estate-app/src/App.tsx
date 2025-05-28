import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const title = 'Real Estate Project';
  return (
    <Routes>
      <Route path="/" element={<LandingPage title={title} />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
