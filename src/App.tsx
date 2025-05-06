import { Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div>
      <nav>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<div>Welcome to Minimums!</div>} />
      </Routes>
    </div>
  );
}

export default App;