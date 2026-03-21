import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard-page">
      {/* DASHBOARD HERO */}
      {/* this top section welcomes the user and introduces the main dashboard area */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-text">
          <p className="dashboard-label">Your Dashboard</p>

          <h1>Welcome back to HueBloom.</h1>

          <p className="dashboard-description">
            This is your calm space to check in, explore your emotional growth,
            and continue building a more mindful relationship with how you feel.
          </p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      {/* this section gives the user easy access to the main features of the app */}
      <section className="dashboard-actions-section">
        <div className="section-heading">
          <p className="section-label">Quick Actions</p>
          <h2>Choose where you want to begin today.</h2>
        </div>

        <div className="dashboard-cards">
          <article className="dashboard-card">
            <div className="card-top-row">
              <span className="card-tag">Reflect</span>
            </div>

            <h3>Mood Generator</h3>

            <p>
              Begin a new emotional check in and reflect on how you are feeling
              in the moment.
            </p>

            <Link to="/generate" className="dashboard-card-btn">
              Start Check-In
            </Link>
          </article>

          <article className="dashboard-card">
            <div className="card-top-row">
              <span className="card-tag">Visualize</span>
            </div>

            <h3>Emotion Garden</h3>

            <p>
              View your emotional journey through a calming visual experience
              that grows over time.
            </p>

            <Link to="/garden" className="dashboard-card-btn">
              View Garden
            </Link>
          </article>

          <article className="dashboard-card">
            <div className="card-top-row">
              <span className="card-tag">Track</span>
            </div>

            <h3>Mood History</h3>

            <p>
              Look back at your past entries and notice patterns in your
              reflections and growth.
            </p>

            <Link to="/history" className="dashboard-card-btn">
              Review History
            </Link>
          </article>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="dashboard-support-section">
        <div className="support-card">
          <p className="section-label">A gentle reminder</p>
          <h2>Progress does not have to be perfect to be meaningful.</h2>
          <p>
            Some days may feel lighter than others, and that is okay. HueBloom
            is here to support reflection, not pressure. Every check in is a
            step toward greater self awareness.
          </p>
        </div>
      </section>

      {/* RECENT ACTIVITY PREVIEW */}
      <section className="dashboard-preview-section">
        <div className="section-heading">
          <p className="section-label">Recent Activity</p>
          <h2>A preview of your reflections and progress.</h2>
        </div>

        <div className="preview-grid">
          <article className="preview-card">
            <h3>Last Check-In</h3>
            <p className="preview-main-text">No entries yet</p>
            <p className="preview-subtext">
              Once you complete a mood check-in, your latest reflection can
              appear here.
            </p>
          </article>

          <article className="preview-card">
            <h3>Garden Status</h3>
            <p className="preview-main-text">Your garden is waiting to grow</p>
            <p className="preview-subtext">
              As you add entries, your emotion garden can begin to reflect your
              wellness journey.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}