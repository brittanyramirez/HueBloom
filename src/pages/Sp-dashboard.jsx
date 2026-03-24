import { Link } from "react-router-dom";
import "../styles/Sp-dashboard.css";

export default function SupportPartnerDashboard() {
  return (
    <main className="partner-dashboard-page">
      {/* DASHBOARD HERO */}
      {/* this section welcomes the support partner and introduces their role in the app */}
      <section className="partner-dashboard-hero">
        <div className="partner-dashboard-hero-text">
          <p className="dashboard-label">Support Partner Dashboard</p>

          <h1>Welcome to your support space.</h1>

          <p className="partner-dashboard-description">
            This dashboard is designed to help support partners stay connected,
            offer encouragement, and gently support the wellness journey in a
            way that feels thoughtful and respectful.
          </p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      {/* this section gives the support partner easy access to their main actions */}
      <section className="partner-actions-section">
        <div className="section-heading">
          <p className="section-label">Quick Actions</p>
          <h2>Choose how you want to support today.</h2>
        </div>

        <div className="partner-dashboard-cards">
          <article className="partner-dashboard-card">
            <div className="card-top-row">
              <span className="card-tag">View</span>
            </div>

            <h3>Shared Updates</h3>

            <p>
              Review shared mood updates and reflections that help you stay aware
              of how your connected user may be feeling.
            </p>

            <Link to="/partner-updates" className="partner-card-btn">
              View Updates
            </Link>
          </article>

          <article className="partner-dashboard-card">
            <div className="card-top-row">
              <span className="card-tag">Encourage</span>
            </div>

            <h3>Send Support</h3>

            <p>
              Offer a gentle message of encouragement that helps the user feel
              supported, seen, and cared for.
            </p>

            <Link to="/partner-support" className="partner-card-btn">
              Send Encouragement
            </Link>
          </article>

          <article className="partner-dashboard-card">
            <div className="card-top-row">
              <span className="card-tag">Connect</span>
            </div>

            <h3>Growth Check-In</h3>

            <p>
              See a simple overview of shared wellness progress and stay
              connected to the journey over time.
            </p>

            <Link to="/partner-growth" className="partner-card-btn">
              View Progress
            </Link>
          </article>
        </div>
      </section>

      {/* ROLE REMINDER SECTION */}
      {/* this section reinforces that support partners are meant to encourage, not overwhelm */}
      <section className="partner-reminder-section">
        <div className="partner-reminder-card">
          <p className="section-label">A Gentle Reminder</p>
          <h2>Support is most meaningful when it feels safe, patient, and kind.</h2>
          <p>
            The support partner role is meant to create connection, not pressure.
            Small gestures, consistent encouragement, and thoughtful messages can
            have a meaningful impact over time.
          </p>
        </div>
      </section>

      {/* SHARED PREVIEW SECTION */}
      {/* this section previews what partner-facing updates might look like once data is connected later */}
      <section className="partner-preview-section">
        <div className="section-heading">
          <p className="section-label">Shared Preview</p>
          <h2>A look at what support updates can include.</h2>
        </div>

        <div className="partner-preview-grid">
          <article className="partner-preview-card">
            <h3>Most Recent Shared Mood</h3>
            <p className="preview-main-text">No shared updates yet</p>
            <p className="preview-subtext">
              When shared updates become available, recent mood check-ins and
              reflections can appear here.
            </p>
          </article>

          <article className="partner-preview-card">
            <h3>Encouragement Status</h3>
            <p className="preview-main-text">No messages sent yet</p>
            <p className="preview-subtext">
              Support messages and small check-ins can later be tracked here as
              part of the partner experience.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}