import "../styles/PartnerUpdates.css";

export default function PartnerUpdates() {
  // this is placeholder data for now
  // later, this can come from the backend once shared updates are connected
  const sharedUpdates = [
    {
      id: 1,
      mood: "Calm",
      date: "March 18, 2026",
      summary:
        "Today felt a little lighter and more peaceful. There was more room to pause and breathe.",
      tone: "calm",
    },
    {
      id: 2,
      mood: "Hopeful",
      date: "March 19, 2026",
      summary:
        "There was a sense of optimism today and more openness toward what is ahead.",
      tone: "hopeful",
    },
    {
      id: 3,
      mood: "Overwhelmed",
      date: "March 20, 2026",
      summary:
        "A heavier day with a lot of thoughts and emotional pressure building up.",
      tone: "overwhelmed",
    },
    {
      id: 4,
      mood: "Tired",
      date: "March 21, 2026",
      summary:
        "Low energy and emotional fatigue were more present today, with a need for rest.",
      tone: "tired",
    },
  ];

  return (
    <main className="partner-updates-page">
      {/* PAGE HEADER */}
      {/* this introduces the page and explains the purpose of shared updates */}
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
      {/* these cards give the support partner a quick overview of shared updates */}
      <section className="partner-updates-summary-section">
        <div className="partner-summary-grid">
          <article className="partner-summary-card">
            <p className="summary-label">Shared Entries</p>
            <h2>4</h2>
            <span>Updates available to review</span>
          </article>

          <article className="partner-summary-card">
            <p className="summary-label">Most Recent Mood</p>
            <h2>Tired</h2>
            <span>Last shared on March 21</span>
          </article>

          <article className="partner-summary-card">
            <p className="summary-label">General Tone</p>
            <h2>Mixed</h2>
            <span>A balance of lighter and heavier moments</span>
          </article>
        </div>
      </section>

      {/* SHARED ENTRY LIST */}
      {/* this section displays shared mood updates in a simple card format */}
      <section className="partner-updates-list-section">
        <div className="updates-list">
          {sharedUpdates.map((update) => (
            <article key={update.id} className="update-card">
              <div className="update-top-row">
                <div className={`update-tone-dot ${update.tone}-dot`}></div>

                <div className="update-meta">
                  <h3>{update.mood}</h3>
                  <p>{update.date}</p>
                </div>
              </div>

              <p className="update-summary">{update.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {/* BOUNDARY SECTION */}
      {/* this section reminds the support partner that the experience should remain respectful and supportive */}
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