import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { ReceptDto } from "../types/recept";
import "./LandingPage.css"; // Import your CSS file for styling

function AllRecipes() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<ReceptDto[]>([]);

  useEffect(() => {
    api
      .get<ReceptDto[]>("/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const backgroundStyle = {
    backgroundImage: `url('/src/assets/pexels-fauxels-3184183.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  };

  return (
    <div>
      {/* Recipes Section */}
      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>
          Check Out Our Delicious Recipes Suiting For The Whole Family
        </h2>
        <div style={{ textAlign: "center", margin: "20px 0" }}></div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipeBox"
              onClick={() => {
                navigate(`/recipes/${recipe.id}`);
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                  fontSize: "20px",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                {recipe.name}
              </h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                <strong>Description:</strong> {recipe.description}
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>
                <strong>From Age:</strong> {recipe.fromAge}
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>
                <strong>To Age:</strong> {recipe.toAge}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;
