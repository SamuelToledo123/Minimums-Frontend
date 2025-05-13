import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { ReceptDto } from "../../types/recept";
import { Clock, Users } from 'lucide-react';
import "./AllRecipes.css"; 

function AllRecipes() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<ReceptDto[]>([]);

  useEffect(() => {
    api
      .get<ReceptDto[]>("/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);


   return (
    <div className="all-recipes">
      <div className="hero-banner">
        <h1>All Recipes</h1>
        <p>Discover delicious meals for the whole family</p>
      </div>

      <div className="recipes-container">
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.name}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-details">
                  <div className="recipe-meta">
                    <Clock size={16} />
                    <span>{recipe.prepTime} prep</span>
                  </div>
                  <div className="recipe-meta">
                    <Users size={16} />
                    <span>Ages {recipe.fromAge}+</span>
                  </div>
                  <div className="recipe-difficulty">
                    {recipe.difficulty}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;