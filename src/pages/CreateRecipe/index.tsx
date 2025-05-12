import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import "./style.css";

type IngredientDto = {
  id: number;
  name: string;
  quantity: string;
};

type CreateReceptDto = {
  name: string;
  instructions: string;
  description: string;
  fromAge: number;
  toAge: number;
  ingredients: IngredientDto[];
};

function CreateRecipe() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateReceptDto>({
    name: "",
    instructions: "",
    description: "",
    fromAge: 0,
    toAge: 0,
    ingredients: [],
  });

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "fromAge" || name === "toAge" ? Number(value) : value,
    }));
  };

  const addIngredient = () => {
    if (ingredientName && ingredientAmount) {
      const newIngredient: IngredientDto = {
        id: Date.now(),
        name: ingredientName,
        quantity: ingredientAmount,
      };

      setForm((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient],
      }));

      setIngredientName("");
      setIngredientAmount("");
    }
  };

  const removeIngredient = (id: number) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/recipes", form);
      navigate("/recipes");
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>Create New Recipe</h2>

      <label className="form-label">Recipe Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter recipe name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label className="form-label">Description</label>
      <textarea
        name="description"
        placeholder="Enter recipe description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <label className="form-label">Instructions</label>
      <textarea
        name="instructions"
        placeholder="Enter step-by-step instructions"
        value={form.instructions}
        onChange={handleChange}
        required
      />

      <label className="form-label">Age Range</label>
      <div className="age-range-container">
        <input
          type="number"
          name="fromAge"
          placeholder="From"
          value={form.fromAge}
          onChange={handleChange}
          min="0"
          max={form.toAge > 0 ? form.toAge : undefined}
        />
        <span className="age-range-separator">to</span>
        <input
          type="number"
          name="toAge"
          placeholder="To"
          value={form.toAge}
          onChange={handleChange}
          min={form.fromAge}
        />
      </div>

      <div className="ingredient-section">
        <h3>Ingredients</h3>
        <div className="ingredient-inputs">
          <input
            type="text"
            placeholder="Ingredient name"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={ingredientAmount}
            onChange={(e) => setIngredientAmount(e.target.value)}
          />
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>

        <ul>
          {form.ingredients.map((ing) => (
            <li key={ing.id}>
              <span>
                {ing.name} – {ing.quantity}
              </span>
              <button type="button" onClick={() => removeIngredient(ing.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit">Save Recipe</button>
    </form>
  );
}

export default CreateRecipe;
