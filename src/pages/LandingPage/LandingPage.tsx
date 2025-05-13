import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ChevronRight, List, Utensils } from 'lucide-react';
import './style.css';
import { api } from '../../services/api';

interface Recipe {
  id: number;
  name: string;
  description: string;
  fromAge: number;
  toAge: number;
  prepTime: string;
  cookTime: string;
  difficulty: string;
}

function LandingPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    api
      .get<Recipe[]>('/recipes')
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleGetStarted = () => navigate('/register');
  const handleViewAllRecipes = () => navigate('/AllRecipes');

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Simplify Your Family Meals</h1>
          <p className="hero-subtitle">
            Plan meals, create shopping lists, and discover recipes 
            perfect for your family's needs
          </p>
          <button className="btn btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="value-proposition">
        <div className="container">
          <div className="value-grid">
            <div className="value-content">
              <h2 className="section-title">We Make Family Meal Planning Simple</h2>
              <p className="value-description">
                At Minimums, we help you create shopping lists, find recipes that
                suit your family, and make meal planning stress-free. Enjoy more time
                with your loved ones and less time worrying about what to cook.
              </p>
              <div className="value-features">
                <div className="value-feature">
                  <div className="feature-icon">
                    <List size={24} />
                  </div>
                  <div className="feature-text">
                    <h3>Easy Shopping Lists</h3>
                    <p>Generate shopping lists automatically from your meal plans</p>
                  </div>
                </div>
                <div className="value-feature">
                  <div className="feature-icon">
                    <Utensils size={24} />
                  </div>
                  <div className="feature-text">
                    <h3>Age-Appropriate Recipes</h3>
                    <p>Find meals that everyone in your family can enjoy</p>
                  </div>
                </div>
                <div className="value-feature">
                  <div className="feature-icon">
                    <Clock size={24} />
                  </div>
                  <div className="feature-text">
                    <h3>Time-Saving Plans</h3>
                    <p>Plan your meals for the week in minutes, not hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="value-image">
              <img
                src="https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg"
                alt="Family enjoying meal together"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="recipes-section">
        <div className="container">
          <h2 className="section-title">Featured Recipes</h2>
          <p className="section-subtitle">
            Discover delicious meals that your whole family will love
          </p>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
                <div className="recipe-card-content">
                  <h3 className="recipe-title">{recipe.name}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span className="recipe-meta-item">
                      <Clock size={16} /> {recipe.prepTime}
                    </span>
                    <span className="recipe-meta-item">
                      <Users size={16} /> {recipe.fromAge}+ years
                    </span>
                  </div>
                </div>
                <div className="recipe-card-footer">
                  <span className="view-recipe">View Recipe</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
          <div className="recipes-action">
            <button className="btn btn-primary" onClick={handleViewAllRecipes}>
              View All Recipes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
