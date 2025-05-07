import { useEffect, useState } from 'react';
import { api } from '../Api/axios';
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get<MyProfile>('/my-profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Kunde inte hämta profil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Laddar profil...</p>;
  if (!profile) return <p>Kunde inte ladda profilen.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Min Profil: {profile.name}</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Barn</h2>
        {profile.children.length > 0 ? (
          <ul className="list-disc pl-5">
            {profile.children.map(child => (
              <li key={child.id}>
                {child.name} ({child.age} år) – Allergier: {child.allergies || 'Inga'}
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga barn registrerade.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Måltidsplaner</h2>
        {profile.mealPlans.length > 0 ? (
          <ul className="list-disc pl-5">
            {profile.mealPlans.map(meal => (
              <li key={meal.id}>
                {meal.date} – {meal.mealType}
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
