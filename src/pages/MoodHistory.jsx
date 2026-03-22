import "../styles/MoodHistory.css";

export default function MoodHistory() {
  // this is placeholder data for now
  const moodEntries = [
    {
      id: 1,
      mood: "Calm",
      date: "March 18, 2026",
      reflection:
        "Today felt slower and more peaceful. I was able to pause and breathe.",
      tone: "calm",
    },
    {
      id: 2,
      mood: "Hopeful",
      date: "March 19, 2026",
      reflection:
        "I felt more optimistic today and a little more open to what is ahead.",
      tone: "hopeful",
    },
    {
      id: 3,
      mood: "Overwhelmed",
      date: "March 20, 2026",
      reflection:
        "There was a lot on my mind today, and I felt emotionally heavy.",
      tone: "overwhelmed",
    },
    {
      id: 4,
      mood: "Tired",
      date: "March 21, 2026",
      reflection:
        "I noticed low energy today and felt like I needed more rest.",
      tone: "tired",
    },
  ];

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
      {/* these cards give the user a quick overview of their history */}
      <section className="history-summary-section">
        <div className="summary-grid">
          <article className="summary-card">
            <p className="summary-label">Total Entries</p>
            <h2>4</h2>
            <span>Reflections saved so far</span>
          </article>

          <article className="summary-card">
            <p className="summary-label">Most Recent Mood</p>
            <h2>Tired</h2>
            <span>Last recorded on March 21</span>
          </article>

          <article className="summary-card">
            <p className="summary-label">Most Common Tone</p>
            <h2>Calm</h2>
            <span>A steady pattern so far</span>
          </article>
        </div>
      </section>

      {/* FILTER SECTION */}
      {/*later can / will maybe ? be connected to real filtering logic?? */}
      <section className="history-filter-section">
        <div className="filter-row">
          <button className="filter-btn active-filter">All</button>
          <button className="filter-btn">Calm</button>
          <button className="filter-btn">Hopeful</button>
          <button className="filter-btn">Tired</button>
          <button className="filter-btn">Overwhelmed</button>
        </div>
      </section>

      {/* ENTRY LIST */}
      {/* this section shows saved mood entries in a clean journall style layout */}
      <section className="history-entries-section">
        <div className="entries-list">
          {moodEntries.map((entry) => (
            <article key={entry.id} className="entry-card">
              <div className="entry-top-row">
                <div className={`entry-tone-dot ${entry.tone}-dot`}></div>

                <div className="entry-meta">
                  <h3>{entry.mood}</h3>
                  <p>{entry.date}</p>
                </div>
              </div>

              <p className="entry-reflection">{entry.reflection}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SUPPORT SECTION */}
      {/* this adds a softer message so the page still feels caring and reflective */}
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