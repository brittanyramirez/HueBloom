import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function Dashboard() {
  const [supportMessages, setSupportMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState("");

  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("huebloomUser"));

        if (!savedUser) {
          setMessagesError("You must be logged in to view support messages.");
          setMessagesLoading(false);
          return;
        }

        const response = await
          fetch(`${API_URL}/api/moods/support-messages/${savedUser.id}`);

        const data = await response.json();

        if (!response.ok) {
          setMessagesError(data.message || "Failed to load support messages.");
          setMessagesLoading(false);
          return;
        }

        setSupportMessages(data);
        setMessagesLoading(false);
      } catch (error) {
        console.error("Fetch support messages error:", error);
        setMessagesError("Something went wrong while loading support messages.");
        setMessagesLoading(false);
      }
    };

    fetchSupportMessages();
  }, []);

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

      {/* SUPPORT MESSAGES SECTION */}
      {/* this section shows encouragement messages the user has received from their support partner */}
      <section className="dashboard-messages-section">
        <div className="section-heading">
          <p className="section-label">Support Messages</p>
          <h2>Encouragement shared with you.</h2>
        </div>

        <div className="dashboard-messages-grid">
          {messagesLoading && (
            <p className="dashboard-status-text">Loading support messages...</p>
          )}

          {!messagesLoading && messagesError && (
            <p className="dashboard-status-text dashboard-error-text">
              {messagesError}
            </p>
          )}

          {!messagesLoading && !messagesError && supportMessages.length === 0 && (
            <p className="dashboard-status-text">
              No support messages yet.
            </p>
          )}

          {!messagesLoading &&
            !messagesError &&
            supportMessages.map((message) => (
              <article key={message.id} className="message-card">
                <p className="message-label">From your support partner</p>
                <p className="message-text">{message.message}</p>
              </article>
            ))}
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
    </main>
  );
}