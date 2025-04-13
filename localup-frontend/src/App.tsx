import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/login.tsx';
import { RegisterPage } from '@/pages/register.tsx';
import HomePage from '@/pages/home.tsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
