import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  const title = 'Real Estate Project';
  return (
    <Routes>
      <Route path="/" element={<LandingPage title={title} />} />
    </Routes>
  );
}

export default App;
