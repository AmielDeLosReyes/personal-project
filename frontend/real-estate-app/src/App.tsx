import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContractorLandingPage from './pages/LandingPage/ConctractorLandingPage/ContractorLandingPage';
import ContractorSignUpForm from './pages/SignUpForms/ContractorSignUpForm/ContractorSignUpForm';
import ReaSignUpForm from './pages/SignUpForms/ReaSignUpForm/ReaSignUpForm';

function App() {
  const title = 'Real Estate Project';
  return (
    <Routes>
      <Route path="/" element={<LandingPage title={title} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contractor-signup" element={<ContractorSignUpForm />} />
      <Route path="/rea-signup" element={<ReaSignUpForm />} />
    </Routes>
  );
}

export default App;
