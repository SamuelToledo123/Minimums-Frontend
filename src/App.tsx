<<<<<<< HEAD
import { Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
=======
import { Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
>>>>>>> origin/Login-sida-Navbar

function App() {
  return (
    <div>
     <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<div>Welcome to Minimums!</div>} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
