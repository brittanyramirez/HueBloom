import { Link } from "react-router-dom";
import "../styles/NotFound.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function NotFound() {
  return (
    <main className="notfound-page">
      {/* NOT FOUND CARD */}
      {/* this section gives users a clear and calm message when a page does not exist */}
      <section className="notfound-card">
        <p className="notfound-label">404 Page Not Found</p>

        <h1>This page seems to be out of bloom.</h1>

        <p className="notfound-description">
          The page you are looking for may have been moved, removed, or may not
          exist yet. Let's help you get back to a space that feels familiar.
        </p>

        {/* ACTION BUTTONS */}
        {/* these links help users quickly navigate back into the app */}
        <div className="notfound-actions">
          <Link to="/" className="notfound-primary-btn">
            Back to Home
          </Link>

          <Link to="/dashboard" className="notfound-secondary-btn">
            Go to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}