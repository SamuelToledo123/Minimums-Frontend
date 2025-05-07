import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/LandingPage" className="navbar-logo">
          <span>Minimums</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className={`navbar-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Link
            to="/LandingPage"
            className={location.pathname === "/LandingPage" ? "active" : ""}
          >
            Home
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className={location.pathname === "/register" ? "active" : ""}
              >
                Register
              </Link>
              <Link
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/my-profile"
                className={location.pathname === "/my-profile" ? "active" : ""}
              >
                My Profile
              </Link>

              <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className={location.pathname === "/logout" ? "active" : ""}
              >
                Logout
                </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
