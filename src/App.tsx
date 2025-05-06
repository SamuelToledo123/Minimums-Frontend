import { Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
     <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<div>Welcome to Minimums!</div>} />
      </Routes>
    </div>
  );
}

export default App;