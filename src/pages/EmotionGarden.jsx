import "../styles/EmotionGarden.css";

export default function EmotionGarden() {
  // this is placeholder data for now
  const gardenEntries = [
    { id: 1, mood: "Calm", date: "March 18", tone: "calm" },
    { id: 2, mood: "Hopeful", date: "March 19", tone: "hopeful" },
    { id: 3, mood: "Overwhelmed", date: "March 20", tone: "overwhelmed" },
    { id: 4, mood: "Tired", date: "March 21", tone: "tired" },
    { id: 5, mood: "Balanced", date: "March 22", tone: "balanced" },
    { id: 6, mood: "Anxious", date: "March 23", tone: "anxious" },
    { id: 7, mood: "Sad", date: "March 24", tone: "sad" },
  ];

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
          {gardenEntries.map((entry) => {
            const hasRain =
              entry.tone === "sad" ||
              entry.tone === "anxious" ||
              entry.tone === "overwhelmed";

            return (
              <article key={entry.id} className={`garden-bloom ${entry.tone}`}>
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
                {/* this wraps the flower itself so i can animate different mood states */}
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
                  <h3>{entry.mood}</h3>
                  <p>{entry.date}</p>
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
            difficult moments. The goal of the garden is not perfection — it is
            awareness, growth, and giving each experience a place to be seen.
          </p>
        </div>
      </section>
    </main>
  );
}