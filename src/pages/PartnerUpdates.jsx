import { useEffect, useState } from "react";
import "../styles/PartnerUpdates.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function PartnerUpdates() {
  // this stores the shared updates fetched from the backend
  const [sharedUpdates, setSharedUpdates] = useState([]);

  // this stores loading state while updates are being fetched
  const [loading, setLoading] = useState(true);

  // this stores any fetch error
  const [error, setError] = useState("");

  // this fetches the shared mood entries for the connected user
  useEffect(() => {
    const fetchSharedUpdates = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("huebloomUser"));

        if (!savedUser) {
          setError("You must be logged in.");
          setLoading(false);
          return;
        }

        // first find which main user is connected to this support partner
       const API_URL = import.meta.env.VITE_API_URL;

const connectedUserResponse = await fetch(
  `${API_URL}/api/moods/connected-user/${encodeURIComponent(savedUser.email)}`
);

        const connectedUserData = await connectedUserResponse.json();

        if (!connectedUserResponse.ok) {
          setError(
            connectedUserData.message || "Failed to find connected user."
          );
          setLoading(false);
          return;
        }

        // then fetch the shared mood entries for that connected user
        const response = await fetch(
  `${API_URL}/api/moods/shared/${connectedUserData.id}`
);

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load shared updates.");
          setLoading(false);
          return;
        }

        setSharedUpdates(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch shared updates error:", error);
        setError("Something went wrong while loading shared updates.");
        setLoading(false);
      }
    };

    fetchSharedUpdates();
  }, []);

  // this formats the database date into something more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // this maps moods to tone classes for the colored dot
  const getToneClass = (mood) => {
    if (!mood) return "unknown-dot";

    const loweredMood = mood.toLowerCase();

    if (loweredMood === "calm") return "calm-dot";
    if (loweredMood === "hopeful" || loweredMood === "happy")
      return "hopeful-dot";
    if (loweredMood === "tired") return "tired-dot";
    if (loweredMood === "overwhelmed") return "overwhelmed-dot";
    if (loweredMood === "anxious") return "anxious-dot";
    if (loweredMood === "sad") return "sad-dot";

    return "unknown-dot";
  };

  // this creates simple summary information from the shared entries
  const totalSharedEntries = sharedUpdates.length;
  const mostRecentMood =
    sharedUpdates.length > 0
      ? sharedUpdates[0].selected_mood || "Unknown"
      : "None";

  const moodCounts = {};
  sharedUpdates.forEach((entry) => {
    const mood = entry.selected_mood || "Unknown";
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  });

  const mostCommonMood =
    Object.keys(moodCounts).length > 0
      ? Object.keys(moodCounts).reduce((a, b) =>
          moodCounts[a] > moodCounts[b] ? a : b
        )
      : "None";

  return (
    <main className="partner-updates-page">
      {/* PAGE HEADER */}
      <section className="partner-updates-header">
        <p className="section-label">Shared Updates</p>
        <h1>Stay aware in a gentle and respectful way.</h1>
        <p className="partner-updates-description">
          This page allows support partners to view shared mood updates and
          reflections. The goal is not to monitor every detail, but to create
          more thoughtful awareness and a stronger sense of connection.
        </p>
      </section>

      {/* SUMMARY SECTION */}
      <section className="partner-updates-summary-section">
        <div className="partner-summary-grid">
          <article className="partner-summary-card">
            <p className="summary-label">Shared Entries</p>
            <h2>{totalSharedEntries}</h2>
            <span>Updates available to review</span>
          </article>

          <article className="partner-summary-card">
            <p className="summary-label">Most Recent Mood</p>
            <h2>{mostRecentMood}</h2>
            <span>
              {sharedUpdates.length > 0
                ? `Last shared on ${formatDate(sharedUpdates[0].created_at)}`
                : "No shared updates yet"}
            </span>
          </article>

          <article className="partner-summary-card">
            <p className="summary-label">Most Common Mood</p>
            <h2>{mostCommonMood}</h2>
            <span>
              {totalSharedEntries > 0
                ? "A pattern is beginning to appear"
                : "No shared data yet"}
            </span>
          </article>
        </div>
      </section>

      {/* SHARED ENTRY LIST */}
      <section className="partner-updates-list-section">
        <div className="updates-list">
          {loading && (
            <p className="partner-updates-status-text">Loading shared updates...</p>
          )}

          {!loading && error && (
            <p className="partner-updates-status-text partner-updates-error-text">
              {error}
            </p>
          )}

          {!loading && !error && sharedUpdates.length === 0 && (
            <p className="partner-updates-status-text">
              No shared updates are available yet.
            </p>
          )}

          {!loading &&
            !error &&
            sharedUpdates.map((update) => (
              <article key={update.id} className="update-card">
                <div className="update-top-row">
                  <div
                    className={`update-tone-dot ${getToneClass(
                      update.selected_mood
                    )}`}
                  ></div>

                  <div className="update-meta">
                    <h3>{update.selected_mood || "Shared Reflection"}</h3>
                    <p>{formatDate(update.created_at)}</p>
                  </div>
                </div>

                <p className="update-summary">
                  {update.reflection_text || update.mood_text}
                </p>
              </article>
            ))}
        </div>
      </section>

      {/* BOUNDARY SECTION */}
      <section className="partner-boundary-section">
        <div className="partner-boundary-card">
          <p className="section-label">Support With Care</p>
          <h2>Awareness should feel compassionate, not overwhelming.</h2>
          <p>
            Shared updates are meant to help support partners respond with care,
            patience, and understanding. The goal is to create connection and
            encouragement while still respecting emotional space and boundaries.
          </p>
        </div>
      </section>
    </main>
  );
}