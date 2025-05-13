import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, Users } from 'lucide-react';
import { api } from "../../services/api";
import "./RecipeDetails.css"; 

interface Ingredient {
  id: number;
  name: string;
  quantity: string;
}
interface RecipeWithIngredients {
  id: number;
  name: string;
  description: string;
  instructions: string;
  fromAge: number;
  toAge: number;
  ingredientsDtoList: Ingredient[];
}

interface MealPlan {
  id: number;
  name: string;
  mealType: string;
  date: string;
}



function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeWithIngredients | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMealPlanCard, setShowMealPlanCard] = useState(false);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const navigate = useNavigate();    


  useEffect(() => {
    if (id) {
      api
        .get<RecipeWithIngredients>(`/recipes/${id}`) 
        .then((res) => {
          setRecipe(res.data);
          setLoading(false);
          console.log("Recipe data:", res.data); 
          console.log("Ingredients:", res.data.ingredientsDtoList);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load recipe details.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleShowMealPlanCard = () => {
    api
      .get<{ id: number; name: string; mealType: string; date: string }[]>(
        "/meal-plans"
      )
      .then((res) => {
        setMealPlans(res.data);
        setShowMealPlanCard(true);
      })
      .catch((err) => console.error("Failed to fetch meal plans:", err));
  };

  const handleAddToMealPlan = (mealPlanId: number) => {
    if (recipe) {
      api
        .post(`/meal-plans/${mealPlanId}/recipes/${recipe.id}`)
        .then(() => {
          alert("Recipe added to meal plan!");
          setShowMealPlanCard(false); 
             navigate("/my-profile");
        })
        .catch((err) =>
          console.error("Failed to add recipe to meal plan:", err)
        );
    }
  };

 return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        <p className="recipe-description">{recipe.description}</p>
        <button className="btn-add-mealplan" onClick={handleShowMealPlanCard}>
          Add to Mealplan
        </button>
      </div>

      <div className="recipe-content">
        <div className="recipe-info-grid">
          <div className="recipe-info-card">
            <h2>Age Range</h2>
            <div className="info-content">
              <div className="info-item">
                <Users size={20} />
                <span>From Age: {recipe.fromAge}</span>
              </div>
              <div className="info-item">
                <Users size={20} />
                <span>To Age: {recipe.toAge}</span>
              </div>
            </div>
          </div>

          <div className="recipe-info-card">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredientsDtoList.map((ingredient) => (
                <li key={ingredient.id}>
                  <span className="ingredient-name">{ingredient.name}</span>
                  <span className="ingredient-quantity">{ingredient.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </div>
      </div>

      {showMealPlanCard && (
        <div className="meal-plan-modal">
          <div className="modal-content">
            <h2>Select a Meal Plan</h2>
            <ul className="meal-plan-list">
              {mealPlans.map((mealPlan) => (
                <li key={mealPlan.id} className="meal-plan-item">
                  <div className="meal-plan-info">
                    <h3>{mealPlan.name}</h3>
                    <p>
                      <strong>Type:</strong> {mealPlan.mealType}
                    </p>
                    <p>
                      <strong>Date:</strong> {mealPlan.date}
                    </p>
                  </div>
                  <button
                    className="btn-add"
                    onClick={() => handleAddToMealPlan(mealPlan.id)}
                  >
                    Add to Plan
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="btn-close"
              onClick={() => setShowMealPlanCard(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;