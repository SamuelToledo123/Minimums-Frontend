import { Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import MyProfilePage from "./pages/MyProfilePage";
import RecipeDetails from "./pages/RecipeDetails";
import AllRecipes from "./pages/AllRecipes";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<div>Welcome to Minimums!</div>} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="AllRecipes" element={<AllRecipes />} />
      </Routes>
    </div>
  );
}

export default App;
