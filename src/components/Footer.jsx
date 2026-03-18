import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">

      {/* TOP SECTION */}
      {/* Contains logo and brand message */}
      <div className="footer-top">

        <div className="footer-brand">
          <img src={logo} alt="HueBloom logo" className="footer-logo" />

          <div className="footer-brand-text">
            <h3>HueBloom</h3>
            <p>Reflect. Grow. Bloom.</p>
          </div>
        </div>

      </div>


      {/* MIDDLE SECTION */}
      {/* Navigation links to main parts of the app */}
      <div className="footer-links">

        <div className="footer-column">
          <h4>Explore</h4>

          <Link to="/">Home</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/generate">Contact</Link>

        </div>

      </div>
      {/* Copyright information */}
      <div className="footer-bottom">
        <p>© 2026 HueBloom. All rights reserved.</p>
      </div>

    </footer>
  );
}