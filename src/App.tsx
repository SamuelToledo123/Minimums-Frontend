import { Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/index";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage/index";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyProfilePage from "./pages/MyProfilePage/index";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import AllRecipes from "./pages/AllRecipes/AllRecipes";
import CreateRecipe from "./pages/CreateRecipe/index";
import Footer from './components/Footer/Footer';
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="AllRecipes" element={<AllRecipes />} />
        <Route path="/recipes/create" element={<CreateRecipe />} />
      </Routes>
         <Footer />
    </div>
  );
}

export default App;
