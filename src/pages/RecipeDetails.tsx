import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

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

function RecipeDetails() {
  const { id } = useParams<{ id: string }>(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState<RecipeWithIngredients | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showMealPlanCard, setShowMealPlanCard] = useState(false);
  const [mealPlans, setMealPlans] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    if (id) {
      api
        .get<RecipeWithIngredients>(`/recipes/${id}`) // Fetch the recipe details from the backend
        .then((res) => {
          setRecipe(res.data);
          setLoading(false);
          console.log("Recipe data:", res.data); // Log the entire recipe data
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
          setShowMealPlanCard(false); // Close the card after adding
        })
        .catch((err) =>
          console.error("Failed to add recipe to meal plan:", err)
        );
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginTop: "200px",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "32px", color: "#333", marginBottom: "10px" }}>
          {recipe.name}
        </h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          <strong>Description:</strong> {recipe.description}
        </p>
        <button
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "10px 15px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleShowMealPlanCard}
        >
          Add to Mealplan
        </button>
      </div>

      {/* Content Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Age Range Section */}
        <div
          style={{
            flex: "1",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            minHeight: "150px",
          }}
        >
          <h2 style={{ fontSize: "22px", color: "#333", marginBottom: "10px" }}>
            Age Range
          </h2>
          <p style={{ fontSize: "18px", color: "#555" }}>
            <strong>From Age:</strong> {recipe.fromAge}
          </p>
          <p style={{ fontSize: "18px", color: "#555" }}>
            <strong>To Age:</strong> {recipe.toAge}
          </p>
        </div>

        {/* Ingredients Section */}
        <div
          style={{
            flex: "1",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            minHeight: "150px",
          }}
        >
          <h2 style={{ fontSize: "22px", color: "#333", marginBottom: "10px" }}>
            Ingredients
          </h2>
          <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
            {recipe.ingredientsDtoList.map((ingredient) => (
              <li
                key={ingredient.id}
                style={{
                  fontSize: "18px",
                  color: "#555",
                  marginBottom: "5px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "5px",
                }}
              >
                {ingredient.name} - {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions Section */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "22px", color: "#333", marginBottom: "10px" }}>
          Instructions
        </h2>
        <p style={{ fontSize: "18px", color: "#555" }}>{recipe.instructions}</p>
      </div>

      {showMealPlanCard && (
        <div
          style={{
            position: "fixed",
            top: "27%",
            left: "81%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            zIndex: 1000,
          }}
        >
          <h2 style={{ fontSize: "22px", color: "#333", marginBottom: "10px" }}>
            Select a Meal Plan
          </h2>
          <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
            {mealPlans.map((mealPlan) => (
              <li
                key={mealPlan.id}
                style={{
                  fontSize: "18px",
                  color: "#555",
                  marginBottom: "10px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "5px",
                  cursor: "pointer",
                }}
              >
                <div>
                  <strong>Name:</strong> {mealPlan.name}
                </div>
                <div>
                  <strong>Meal Type:</strong> {mealPlan.mealType}
                </div>
                <div>
                  <strong>Date:</strong> {mealPlan.date}
                </div>

                <button
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    fontSize: "14px",
                    color: "#fff",
                    backgroundColor: "#007bff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddToMealPlan(mealPlan.id)}
                >
                  Add to Mealplan
                </button>
              </li>
            ))}
          </ul>
          <button
            style={{
              marginTop: "10px",
              padding: "10px 15px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#dc3545",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setShowMealPlanCard(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
