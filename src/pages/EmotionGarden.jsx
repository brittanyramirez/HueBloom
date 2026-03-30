import { useEffect, useState } from "react";
import "../styles/EmotionGarden.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function EmotionGarden() {
  // this stores the garden entries fetched from the backend
  const [gardenEntries, setGardenEntries] = useState([]);

  // this stores loading state while entries are being fetched
  const [loading, setLoading] = useState(true);

  // this stores any fetch error
  const [error, setError] = useState("");

  // this fetches the user's saved mood entries for the garden
  useEffect(() => {
    const fetchGardenEntries = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("huebloomUser"));

        if (!savedUser) {
          setError("You must be logged in to view your emotion garden.");
          setLoading(false);
          return;
        }

        const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(
  `${API_URL}/api/moods/garden/${savedUser.id}`
);

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load garden entries.");
          setLoading(false);
          return;
        }

        setGardenEntries(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch garden entries error:", error);
        setError("Something went wrong while loading your emotion garden.");
        setLoading(false);
      }
    };

    fetchGardenEntries();
  }, []);

  // this maps saved moods into visual garden tone classes
  const getToneClass = (mood) => {
    if (!mood) return "balanced";

    const loweredMood = mood.toLowerCase();

    if (loweredMood === "calm") return "calm";
    if (loweredMood === "hopeful" || loweredMood === "happy") return "hopeful";
    if (loweredMood === "overwhelmed") return "overwhelmed";
    if (loweredMood === "tired") return "tired";
    if (loweredMood === "balanced") return "balanced";
    if (loweredMood === "anxious") return "anxious";
    if (loweredMood === "sad") return "sad";

    return "balanced";
  };

  // this formats the database date into something more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="garden-page">
      {/* PAGE HEADER */}
      {/* this introduces the emotion garden and explains what the feature represents */}
      <section className="garden-header">
        <p className="section-label">Emotion Garden</p>
        <h1>Watch your emotional journey grow over time.</h1>
        <p className="garden-description">
          Each bloom represents a reflection or mood entry. As users continue
          checking in, the garden becomes a visual reminder that emotions change,
          evolve, and deserve space to be noticed.
        </p>
      </section>

      {/* GARDEN LEGEND */}
      {/* this helps users understand what different garden tones represent */}
      <section className="garden-legend-section">
        <div className="garden-legend-card">
          <h2>Garden Mood Guide</h2>

          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-dot calm-dot"></span>
              <p>Calm / Balanced</p>
            </div>

            <div className="legend-item">
              <span className="legend-dot hopeful-dot"></span>
              <p>Hopeful / Positive</p>
            </div>

            <div className="legend-item">
              <span className="legend-dot tired-dot"></span>
              <p>Tired / Low Energy</p>
            </div>

            <div className="legend-item">
              <span className="legend-dot anxious-dot"></span>
              <p>Anxious / Uneasy</p>
            </div>

            <div className="legend-item">
              <span className="legend-dot overwhelmed-dot"></span>
              <p>Overwhelmed / Heavy</p>
            </div>

            <div className="legend-item">
              <span className="legend-dot sad-dot"></span>
              <p>Sad / Rainy</p>
            </div>
          </div>
        </div>
      </section>

      {/* GARDEN GRID */}
      {/* this section displays the visual garden entries */}
      <section className="garden-grid-section">
        <div className="garden-grid">
          {loading && <p className="garden-status-text">Loading your garden...</p>}

          {!loading && error && (
            <p className="garden-status-text garden-error-text">{error}</p>
          )}

          {!loading && !error && gardenEntries.length === 0 && (
            <p className="garden-status-text">
              No blooms yet. Save a mood entry to begin growing your garden.
            </p>
          )}

          {!loading &&
            !error &&
            gardenEntries.map((entry) => {
              const toneClass = getToneClass(entry.selected_mood);
              const hasRain =
                toneClass === "sad" ||
                toneClass === "anxious" ||
                toneClass === "overwhelmed";

              return (
                <article key={entry.id} className={`garden-bloom ${toneClass}`}>
                  {/* RAIN OVERLAY */}
                  {/* this only appears for moods that should feel heavier or more emotional */}
                  {hasRain && (
                    <div className="rain-overlay">
                      <span className="raindrop drop-one"></span>
                      <span className="raindrop drop-two"></span>
                      <span className="raindrop drop-three"></span>
                      <span className="raindrop drop-four"></span>
                      <span className="raindrop drop-five"></span>
                    </div>
                  )}

                  {/* FLOWER AREA */}
                  {/* this wraps the flower itself so we can animate different mood states */}
                  <div className="flower-visual">
                    {/* FLOWER TOP */}
                    {/* this creates the circular flower using petals and a center */}
                    <div className="bloom-top">
                      <div className="petal petal-one"></div>
                      <div className="petal petal-two"></div>
                      <div className="petal petal-three"></div>
                      <div className="petal petal-four"></div>
                      <div className="flower-center"></div>
                    </div>

                    {/* STEM */}
                    {/* this creates the flower stem */}
                    <div className="bloom-stem"></div>
                  </div>

                  {/* ENTRY INFO */}
                  {/* this shows the mood label and date under each bloom */}
                  <div className="bloom-info">
                    <h3>{entry.selected_mood || "Reflection"}</h3>
                    <p>{formatDate(entry.created_at)}</p>
                  </div>
                </article>
              );
            })}
        </div>
      </section>

      {/* RAIN MESSAGE SECTION */}
      {/* this section reminds users that difficult emotions are still part of growth */}
      <section className="rain-message-section">
        <div className="rain-message-card">
          <p className="section-label">A Gentle Reminder</p>
          <h2>Rain is part of growth, too.</h2>
          <p>
            In HueBloom, difficult emotions are not treated as something to
            hide. Feelings like sadness, anxiety, or overwhelm are still valid,
            and they still deserve space to be seen. Just like flowers need
            rain to grow, emotional growth can also happen during harder
            moments.
          </p>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      {/* this gives the page a reflective and supportive closing message */}
      <section className="garden-support-section">
        <div className="garden-support-card">
          <p className="section-label">Growth Over Time</p>
          <h2>Your emotions do not have to look perfect to still be meaningful.</h2>
          <p>
            Some entries may reflect calm days, while others may represent
            difficult moments. The goal of the garden is not perfection it is
            awareness, growth, and giving each experience a place to be seen.
          </p>
        </div>
      </section>
    </main>
  );
}