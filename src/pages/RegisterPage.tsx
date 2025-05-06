// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { api } from '../Api/axios';
import type { RegistrationRequestDto } from '../types/auth';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationRequestDto>({
    name: '',  
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

        console.log("👉 Skickar data:", formData);

        const response = await api.post('/auth/register', formData);

      console.log("✅ Svar från server:", response.data);
      setMessage('Registration successful!');
      setTimeout(() => navigate('/'), 2000); 
    } catch (error: any) {
        console.error("❌ Registrering misslyckades:", error.response);
      setMessage(error.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default RegisterPage;
