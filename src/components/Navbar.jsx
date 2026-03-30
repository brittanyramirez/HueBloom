import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png"; // your brain logo

export default function Navbar({ isLoggedIn, userRole, setUser }) {
  // state to control if mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // links BEFORE login
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  // links AFTER login
  const privateLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Mood Generator", path: "/generate" },
    { name: "Emotion Garden", path: "/garden" },
    { name: "Mood History", path: "/history" },
  ];

  // links for SUPPORT PARTNER after login
  const partnerLinks = [
    { name: "Dashboard", path: "/partner-dashboard" },
    { name: "Shared Updates", path: "/partner-updates" },
    { name: "Send Support", path: "/partner-support" },
  ];

  // decide which links to show depending on login state
  const navLinks = !isLoggedIn
    ? publicLinks
    : userRole === "partner"
    ? partnerLinks
    : privateLinks;
//logout
const handleLogout = () => {
  localStorage.removeItem("huebloomUser");

  // update React state immediately
  setUser(null);

  setMenuOpen(false);
};

  return (
    <header className="navbar">
      {/* LEFT SIDE: Logo + App Name */}
      <Link to="/" className="logo-container">
        {/* Logo image */}
        <img src={logo} alt="HueBloom logo" className="logo" />

        {/* Brand text */}
        <div className="brand-text">
          <h2>HueBloom</h2>
          <p>Reflect. Grow. Bloom.</p>
        </div>
      </Link>

      {/* DESKTOP NAV LINKS */}
      <div className="nav-links">
        {/* map through links array */}
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            // React Router automatically gives "active"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            {link.name}
          </NavLink>
        ))}

        {/* RIGHT SIDE BUTTONS */}
        {!isLoggedIn ? (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Sign In
            </Link>

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </div>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
        {/* close button */}
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* mobile nav links */}
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "mobile-link active-link" : "mobile-link"
            }
          >
            {link.name}
          </NavLink>
        ))}

        {!isLoggedIn ? (
          <div className="mobile-auth-buttons">
            <Link
              to="/login"
              className="login-btn"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}