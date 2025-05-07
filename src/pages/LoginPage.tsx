import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Login.css';
import { ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await api.post<{ token: string }>('/auth/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setMessage({ text: 'Inloggning lyckades!', type: 'success' });
      setTimeout(() => navigate('/LandingPage'), 1500);
    } catch (error: any) {
      setMessage({ text: 'Fel e-post eller lösenord.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Välkommen tillbaka</h2>
          <p className="login-subtitle">Logga in för att fortsätta</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">E-post</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">Lösenord</label>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Loggar in...' : (
              <>
                Logga in
                <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </>
            )}
          </button>
        </form>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="login-footer">
          Har du inget konto? <a href="/register">Registrera dig</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
