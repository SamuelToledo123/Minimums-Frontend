import { useEffect, useState } from 'react';
import { api } from '../services/api';
import './MyProfilePage.css';

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

const MyProfilePage = () => {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [showChildForm, setShowChildForm] = useState(false);
  const [showMealForm, setShowMealForm] = useState(false);

  const [newChild, setNewChild] = useState<Partial<Child>>({});
  const [editChildId, setEditChildId] = useState<number | null>(null);

  const [newMeal, setNewMeal] = useState<Partial<MealPlan>>({});
  const [editMealId, setEditMealId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<MyProfile>('/my-profile');
        setProfile({
          name: res.data.name,
          children: res.data.children ?? [],
          mealPlans: res.data.mealPlans ?? [],
        });
      } catch (err) {
        console.error('Kunde inte hämta profil:', err);
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
          allergies: newChild.allergies || '',
        });
        setProfile(prev => prev ? {
          ...prev,
          children: prev.children.map(c => c.id === editChildId ? res.data : c),
        } : null);
      } else {
        const res = await api.post<Child>('/child', {
          name: newChild.name,
          age: newChild.age,
          allergies: newChild.allergies || '',
        });
        setProfile(prev => prev ? {
          ...prev,
          children: [...prev.children, res.data],
        } : null);
      }

      setNewChild({});
      setEditChildId(null);
      setShowChildForm(false);
    } catch (error) {
      console.error('Kunde inte spara barn:', error);
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
      
      setProfile(prev => prev ? {
        ...prev,
        children: prev.children.filter(child => child.id !== id),
      } : null);
    } catch (err) {
      console.error('Kunde inte ta bort barn:', err);
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
        setProfile(prev => prev ? {
          ...prev,
          mealPlans: prev.mealPlans.map(m => m.id === editMealId ? res.data : m),
        } : null);
      } else {
        const res = await api.post<MealPlan>('/meal-plans', {
          date: newMeal.date,
          mealType: newMeal.mealType,
          recipes: [], 
        });
        setProfile(prev => prev ? {
          ...prev,
          mealPlans: [...prev.mealPlans, res.data],
        } : null);
      }

      setNewMeal({});
      setEditMealId(null);
      setShowMealForm(false);
    } catch (error) {
      console.error('Kunde inte spara måltidsplan:', error);
    }
  };

  const handleEditMeal = (meal: MealPlan) => {
    setNewMeal(meal);
    setEditMealId(meal.id);
    setShowMealForm(true);
  };

  const handleDeleteMealPlan = async (id: number) => {
    try {
      // Ta bort måltidsplanen från backend
      await api.delete(`/meal-plans/${id}`);
      
      // Uppdatera UI: Ta bort måltidsplanen från listan
      setProfile(prev => prev ? {
        ...prev,
        mealPlans: prev.mealPlans.filter(meal => meal.id !== id),
      } : null);
    } catch (err) {
      console.error('Kunde inte ta bort måltidsplan:', err);
    }
  };

  if (loading) return <p>Laddar profil...</p>;
  if (!profile) return <p>Kunde inte ladda profilen.</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Min Profil: {profile.name}</h1>

      {/* BARN SEKTION */}
      <section className="profile-section">
        <div className="section-header">
          <h2>Barn</h2>
          <button onClick={() => {
            setShowChildForm(!showChildForm);
            setEditChildId(null);
            setNewChild({});
          }}>
            {showChildForm ? 'Avbryt' : 'Lägg till barn'}
          </button>
        </div>

        {showChildForm && (
          <div className="form">
            <input
              type="text"
              placeholder="Namn"
              value={newChild.name || ''}
              onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Ålder"
              value={newChild.age || ''}
              onChange={(e) => setNewChild({ ...newChild, age: Number(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Allergier"
              value={newChild.allergies || ''}
              onChange={(e) => setNewChild({ ...newChild, allergies: e.target.value })}
            />
            <button onClick={handleSaveChild}>
              {editChildId ? 'Uppdatera barn' : 'Spara barn'}
            </button>
          </div>
        )}

        {profile.children.length > 0 ? (
          <ul>
            {profile.children.map(child => (
              <li key={child.id}>
                {child.name} ({child.age} år) – Allergier: {child.allergies || 'Inga'}
                <button onClick={() => handleEditChild(child)}>✏️</button>
                <button onClick={() => handleDeleteChild(child.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga barn registrerade.</p>
        )}
      </section>

      {/* MÅLTIDSPLAN SEKTION */}
      <section className="profile-section">
        <div className="section-header">
          <h2>Måltidsplaner</h2>
          <button onClick={() => {
            setShowMealForm(!showMealForm);
            setEditMealId(null);
            setNewMeal({});
          }}>
            {showMealForm ? 'Avbryt' : 'Lägg till måltidsplan'}
          </button>
        </div>

        {showMealForm && (
          <div className="form">
            <input
              type="date"
              value={newMeal.date || ''}
              onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Typ av måltid"
              value={newMeal.mealType || ''}
              onChange={(e) => setNewMeal({ ...newMeal, mealType: e.target.value })}
            />
            <button onClick={handleSaveMealPlan}>
              {editMealId ? 'Uppdatera måltidsplan' : 'Spara måltidsplan'}
            </button>
          </div>
        )}

        {profile.mealPlans.length > 0 ? (
          <ul>
            {profile.mealPlans.map(meal => (
              <li key={meal.id}>
                {meal.date} – {meal.mealType}
                <button onClick={() => handleEditMeal(meal)}>✏️</button>
                <button onClick={() => handleDeleteMealPlan(meal.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga måltidsplaner.</p>
        )}
      </section>
    </div>
  );
};

export default MyProfilePage;
