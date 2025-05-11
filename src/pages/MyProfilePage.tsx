import { useEffect, useState } from "react";
import { api } from "../services/api";
import {
  Pencil,
  UserCircle,
  Calendar,
  AlertCircle,
  Plus,
  X,
  Check,
  Save,
} from "lucide-react";
import "./MyProfilePage.css";

interface Child {
  id: number;
  name: string;
  age: number;
  allergies: string;
}

interface MealPlan {
  id: number;
  date: string;
  mealType: string;
}

interface MyProfile {
  name: string;
  children: Child[];
  mealPlans: MealPlan[];
}

interface Recipe {
  id: number;
  name: string;
  instructions: string;
  description: string;
  fromAge: number;
  toAge: number;
}

interface MealPlan {
  id: number;
  date: string;
  mealType: string;
  recipes: Recipe[]; // Add the recipes property
}

const MyProfilePage = () => {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [showChildForm, setShowChildForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);

  const [newChild, setNewChild] = useState<Partial<Child>>({});
  const [editChildId, setEditChildId] = useState<number | null>(null);

  const [newMeal, setNewMeal] = useState<Partial<MealPlan>>({});
  const [editMealId, setEditMealId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"children" | "meals">("children");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<MyProfile>("/my-profile");
        setProfile({
          name: res.data.name,
          children: res.data.children ?? [],
          mealPlans: res.data.mealPlans ?? [],
        });
      } catch (err) {
        console.error("Kunde inte hämta profil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveChild = async () => {
    if (!newChild.name || newChild.age === undefined) return;

    try {
      if (editChildId) {
        const res = await api.put<Child>(`/child/${editChildId}`, {
          name: newChild.name,
          age: newChild.age,
          allergies: newChild.allergies || "",
        });
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                children: prev.children.map((c) =>
                  c.id === editChildId ? res.data : c
                ),
              }
            : null
        );
      } else {
        const res = await api.post<Child>("/child", {
          name: newChild.name,
          age: newChild.age,
          allergies: newChild.allergies || "",
        });
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                children: [...prev.children, res.data],
              }
            : null
        );
      }

      setNewChild({});
      setEditChildId(null);
      setShowChildForm(false);
    } catch (error) {
      console.error("Kunde inte spara barn:", error);
    }
  };

  const handleEditChild = (child: Child) => {
    setNewChild(child);
    setEditChildId(child.id);
    setShowChildForm(true);
  };

  const handleDeleteChild = async (id: number) => {
    try {
      await api.delete(`/child/${id}`);

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              children: prev.children.filter((child) => child.id !== id),
            }
          : null
      );
    } catch (err) {
      console.error("Kunde inte ta bort barn:", err);
    }
  };

  const handleSaveMealPlan = async () => {
    if (!newMeal.date || !newMeal.mealType) return;

    try {
      if (editMealId) {
        const res = await api.put<MealPlan>(`/meal-plans/${editMealId}`, {
          date: newMeal.date,
          mealType: newMeal.mealType,
        });
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                mealPlans: prev.mealPlans.map((m) =>
                  m.id === editMealId ? res.data : m
                ),
              }
            : null
        );
      } else {
        const res = await api.post<MealPlan>("/meal-plans", {
          date: newMeal.date,
          mealType: newMeal.mealType,
          recipes: [],
        });
        setProfile((prev) =>
          prev
            ? {
                ...prev,
                mealPlans: [...prev.mealPlans, res.data],
              }
            : null
        );
      }

      setNewMeal({});
      setEditMealId(null);
      setShowMealForm(false);
    } catch (error) {
      console.error("Kunde inte spara måltidsplan:", error);
    }
  };

  const handleEditMeal = (meal: MealPlan) => {
    setNewMeal(meal);
    setEditMealId(meal.id);
    setShowMealForm(true);
  };

  const handleDeleteMealPlan = async (id: number) => {
    try {
      await api.delete(`/meal-plans/${id}`);

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              mealPlans: prev.mealPlans.filter((meal) => meal.id !== id),
            }
          : null
      );
    } catch (err) {
      console.error("Kunde inte ta bort måltidsplan:", err);
    }
  };

  if (loading) return <p>Laddar profil...</p>;
  if (!profile) return <p>Kunde inte ladda profilen.</p>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <UserCircle size={40} className="avatar-icon" />
        </div>
        <h1 className="profile-name">{profile.name}</h1>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === "children" ? "active" : ""}`}
          onClick={() => setActiveTab("children")}
        >
          Children
        </button>
        <button
          className={`tab ${activeTab === "meals" ? "active" : ""}`}
          onClick={() => setActiveTab("meals")}
        >
          Meal Plans
        </button>
      </div>

      {activeTab === "children" && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Children</h2>
            <button
              className="action-button"
              onClick={() => {
                setShowChildForm(!showChildForm);
                setEditChildId(null);
                setNewChild({});
              }}
            >
              {showChildForm ? <X size={16} /> : <Plus size={16} />}
              {showChildForm ? "Cancel" : "Add Child"}
            </button>
          </div>

          {showChildForm && (
            <div className="form-card">
              <div className="form">
                <div className="form-field">
                  <label htmlFor="childName">Name</label>
                  <input
                    id="childName"
                    type="text"
                    placeholder="Child's name"
                    value={newChild.name || ""}
                    onChange={(e) =>
                      setNewChild({ ...newChild, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="childAge">Age</label>
                  <input
                    id="childAge"
                    type="number"
                    placeholder="Age"
                    value={newChild.age || ""}
                    onChange={(e) =>
                      setNewChild({ ...newChild, age: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="childAllergies">Allergies (optional)</label>
                  <input
                    id="childAllergies"
                    type="text"
                    placeholder="e.g., Nuts, Dairy"
                    value={newChild.allergies || ""}
                    onChange={(e) =>
                      setNewChild({ ...newChild, allergies: e.target.value })
                    }
                  />
                </div>

                <button className="save-button" onClick={handleSaveChild}>
                  <Save size={16} />
                  {editChildId ? "Update Child" : "Save Child"}
                </button>
              </div>
            </div>
          )}

          {profile.children.length > 0 ? (
            <div className="items-grid">
              {profile.children.map((child) => (
                <div key={child.id} className="item-card">
                  <div className="item-header">
                    <div className="item-title">{child.name}</div>
                    <div className="item-actions">
                      <button
                        className="item-action edit"
                        onClick={() => handleEditChild(child)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="item-action delete"
                        onClick={() => handleDeleteChild(child.id)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="item-details">
                    <div className="item-detail">
                      <span className="detail-label">Age:</span> {child.age}{" "}
                      years
                    </div>
                    <div className="item-detail">
                      <span className="detail-label">Allergies:</span>{" "}
                      {child.allergies || "None"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <UserCircle size={40} />
              </div>
              <p>No children added yet</p>
              <button
                className="add-button"
                onClick={() => setShowChildForm(true)}
              >
                <Plus size={16} />
                Add first child
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "meals" && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Meal Plans</h2>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                className="action-button"
                onClick={() => {
                  setShowMealForm(!showMealForm);
                  setEditMealId(null);
                  setNewMeal({});
                }}
              >
                {showMealForm ? <X size={16} /> : <Plus size={16} />}
                {showMealForm ? "Cancel" : "Add Meal Plan"}
              </button>
              <button
                className="action-button"
                onClick={() =>
                  (window.location.href = "http://localhost:5173/AllRecipes")
                }
              >
                <Plus size={16} />
                Add Recipes
              </button>
            </div>
          </div>

          {showMealForm && (
            <div className="form-card">
              <div className="form">
                <div className="form-field">
                  <label htmlFor="mealDate">Date</label>
                  <input
                    id="mealDate"
                    type="date"
                    value={newMeal.date || ""}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, date: e.target.value })
                    }
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="mealType">Meal Type</label>
                  <select
                    id="mealType"
                    value={newMeal.mealType || ""}
                    onChange={(e) =>
                      setNewMeal({ ...newMeal, mealType: e.target.value })
                    }
                  >
                    <option value="">Select meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>

                <button className="save-button" onClick={handleSaveMealPlan}>
                  <Save size={16} />
                  {editMealId ? "Update Meal Plan" : "Save Meal Plan"}
                </button>
              </div>
            </div>
          )}

          {profile.mealPlans.length > 0 ? (
            <div className="items-grid">
              {profile.mealPlans.map((meal) => (
                <div key={meal.id} className="item-card">
                  <div className="item-header">
                    <div className="item-title">{meal.mealType}</div>
                    <div className="item-actions">
                      <button
                        className="item-action edit"
                        onClick={() => handleEditMeal(meal)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="item-action delete"
                        onClick={() => handleDeleteMealPlan(meal.id)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="item-details">
                    <div className="item-detail">
                      <Calendar size={14} className="detail-icon" />
                      {formatDate(meal.date)}
                    </div>
                    {meal.recipes && meal.recipes.length > 0 && (
                      <div className="item-detail">
                        <strong>Recipe:</strong> {meal.recipes[0].name}
                      </div>
                    )}
                  </div>
                  {meal.recipes && meal.recipes.length > 0 && (
                    <button
                      className="show-recipe-button"
                      onClick={() =>
                        (window.location.href = `/recipes/${meal.recipes[0].id}`)
                      }
                      style={{
                        marginTop: "10px",
                        padding: "5px 10px",
                        fontSize: "14px",
                        color: "#fff",
                        backgroundColor: "#007bff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Show Recipe
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <Calendar size={40} />
              </div>
              <p>No meal plans added yet</p>
              <button
                className="add-button"
                onClick={() => setShowMealForm(true)}
              >
                <Plus size={16} />
                Add first meal plan
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
