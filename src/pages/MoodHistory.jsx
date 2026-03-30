import { useEffect, useState } from "react";
import "../styles/MoodHistory.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function MoodHistory() {
  // this stores the mood entries fetched from the backend
  const [moodEntries, setMoodEntries] = useState([]);

  // this stores loading state while entries are being fetched
  const [loading, setLoading] = useState(true);

  // this stores any fetch error
  const [error, setError] = useState("");

  // this stores the active filter button
  const [activeFilter, setActiveFilter] = useState("All");

  // this fetches the user's saved mood history from the backend
  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("huebloomUser"));

        if (!savedUser) {
          setError("You must be logged in to view mood history.");
          setLoading(false);
          return;
        }

        const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(
  `${API_URL}/api/moods/history/${savedUser.id}`
);

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load mood history.");
          setLoading(false);
          return;
        }

        setMoodEntries(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch mood history error:", error);
        setError("Something went wrong while loading your mood history.");
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, []);

  // this filters entries based on the selected mood filter
  const filteredEntries =
    activeFilter === "All"
      ? moodEntries
      : moodEntries.filter(
          (entry) =>
            entry.selected_mood &&
            entry.selected_mood.toLowerCase() === activeFilter.toLowerCase()
        );

  // these values create simple summary information from the fetched entries
  const totalEntries = moodEntries.length;
  const mostRecentMood =
    moodEntries.length > 0 ? moodEntries[0].selected_mood || "Unknown" : "None";

  // this finds the most common mood from the saved entries
  const moodCounts = {};
  moodEntries.forEach((entry) => {
    const mood = entry.selected_mood || "Unknown";
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  });

  const mostCommonMood =
    Object.keys(moodCounts).length > 0
      ? Object.keys(moodCounts).reduce((a, b) =>
          moodCounts[a] > moodCounts[b] ? a : b
        )
      : "None";

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

  return (
    <main className="history-page">
      {/* PAGE HEADER */}
      <section className="history-header">
        <p className="section-label">Mood History</p>
        <h1>Look back on your reflections over time.</h1>
        <p className="history-description">
          Your mood history helps you notice patterns, reflect on past entries,
          and better understand how your emotional experiences change over time.
        </p>
      </section>

      {/* SUMMARY SECTION */}
      <section className="history-summary-section">
        <div className="summary-grid">
          <article className="summary-card">
            <p className="summary-label">Total Entries</p>
            <h2>{totalEntries}</h2>
            <span>Reflections saved so far</span>
          </article>

          <article className="summary-card">
            <p className="summary-label">Most Recent Mood</p>
            <h2>{mostRecentMood}</h2>
            <span>
              {moodEntries.length > 0
                ? `Last recorded on ${formatDate(moodEntries[0].created_at)}`
                : "No entries yet"}
            </span>
          </article>

          <article className="summary-card">
            <p className="summary-label">Most Common Mood</p>
            <h2>{mostCommonMood}</h2>
            <span>
              {totalEntries > 0 ? "A pattern is beginning to form" : "No data yet"}
            </span>
          </article>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="history-filter-section">
        <div className="filter-row">
          {["All", "Calm", "Happy", "Anxious", "Tired", "Overwhelmed"].map(
            (filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "filter-btn active-filter"
                    : "filter-btn"
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </section>

      {/* ENTRY LIST */}
      <section className="history-entries-section">
        <div className="entries-list">
          {loading && <p className="history-status-text">Loading mood history...</p>}

          {!loading && error && (
            <p className="history-status-text history-error-text">{error}</p>
          )}

          {!loading && !error && filteredEntries.length === 0 && (
            <p className="history-status-text">
              No mood entries match this filter yet.
            </p>
          )}

          {!loading &&
            !error &&
            filteredEntries.map((entry) => (
              <article key={entry.id} className="entry-card">
                <div className="entry-top-row">
                  <div
                    className={`entry-tone-dot ${getToneClass(
                      entry.selected_mood
                    )}`}
                  ></div>

                  <div className="entry-meta">
                    <h3>{entry.selected_mood || "Reflection Entry"}</h3>
                    <p>{formatDate(entry.created_at)}</p>
                  </div>
                </div>

                <p className="entry-reflection">
                  {entry.reflection_text || entry.mood_text}
                </p>
              </article>
            ))}
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="history-support-section">
        <div className="history-support-card">
          <p className="section-label">Reflection Matters</p>
          <h2>Looking back can help you move forward with more awareness.</h2>
          <p>
            Mood history is not about judging how you felt. It is about creating
            space to notice patterns, honor your experiences, and better
            understand your own emotional journey.
          </p>
        </div>
      </section>
    </main>
  );
}