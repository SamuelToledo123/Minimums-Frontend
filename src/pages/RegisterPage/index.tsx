import { useState } from 'react';
import { api } from '../../services/api';
import type { RegistrationRequestDto } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import './style.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationRequestDto>({
    name: '',  
    email: '',
    password: '',
  });

  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', formData);
      setMessage({ text: 'Registration successful!', type: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      setMessage({ text: error.response?.data || 'Registration failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Create account</h2>
          <p className="register-subtitle">Join us today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="name">Full name</label>
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-text">Creating account<span className="dot-animation">...</span></span>
            ) : (
              'Create account'
            )}
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <div className="register-footer">
          Already have an account? <a href="/" className="login-link">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;