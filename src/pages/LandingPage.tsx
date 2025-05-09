import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { ReceptDto } from "../types/recept";
import "./LandingPage.css"; // Import your CSS file for styling

function LandingPage() {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate("/register");
  }
  function handleButtonClickSeeAllRecipes() {
    navigate("/AllRecipes");
  }

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
      {/* Hero Section */}
      <div style={backgroundStyle}>
        <h1>Minimums</h1>
        <button
          onClick={handleButtonClick}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Try Now
        </button>
      </div>

      {/* Text and Image Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          gap: "20px",
        }}
      >
        <div style={{ maxWidth: "600px", textAlign: "center" }}>
          <h2>We Strive to Make Your Life Easier</h2>
          <p>
            At Minimums, we help you create shopping lists, find recipes that
            suit your family, and make meal planning stress-free. Explore our
            tools to simplify your daily life and enjoy more time with your
            loved ones.
          </p>
        </div>
        <img
          src="/src/assets/pexels-alexander-dummer-37646-1912868.jpg"
          alt="Delicious food"
          style={{
            width: "300px",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        <div style={{ maxWidth: "600px", textAlign: "center" }}>
          <h2>Enjoy More Time with Your Family</h2>
          <p>
            Our platform is designed to help you save time and focus on what
            truly matters. Whether it's planning meals, organizing shopping
            lists, or discovering new recipes, we make it easy for you to spend
            quality time with your loved ones.
          </p>
        </div>
      </div>

      {/* Recipes Section */}
      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>
          Check Out Our Delicious Recipes Suiting For The Whole Family
        </h2>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button onClick={handleButtonClickSeeAllRecipes} className="button">
            See More
          </button>
        </div>
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

export default LandingPage;
