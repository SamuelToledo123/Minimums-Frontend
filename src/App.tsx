<<<<<<< HEAD
import { Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
=======
import { Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
>>>>>>> origin/Login-sida-Navbar

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<div>Welcome to Minimums!</div>} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
