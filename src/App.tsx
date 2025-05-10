import { Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import MyProfilePage from "./pages/MyProfilePage";
import './index.css';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
