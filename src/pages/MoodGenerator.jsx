import { useState } from "react";
import "../styles/MoodGenerator.css";

export default function MoodGenerator() {
  // this state stores what the user types
  const [inputText, setInputText] = useState("");

  // this state controls whether results should show
  const [showResult, setShowResult] = useState(false);

  // controls whether the user wants to share the entry
  const [shareWithPartner, setShareWithPartner] = useState(false);

  // controls if the entry was saved (for UI feedback)
  const [saved, setSaved] = useState(false);

  // this function handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputText.trim()) return;

    // this is where AI/backend logic will go later
    // for now, we just put result
    setShowResult(true);
    setSaved(false);
  };

  // this allows users to quickly select a mood instead of typing
  const handleMoodClick = (mood) => {
    setInputText(mood);
  };

  return (
    <main className="mood-page">
      {/* PAGE HEADER */}

      <section className="mood-header">
        <p className="section-label">Mood Generator</p>
        <h1>How are you feeling today?</h1>
        <p className="mood-description">
          Take a moment to reflect. You can type how you feel or choose a mood
          below to begin your check-in.
        </p>
      </section>

      {/* INPUT SECTION */}
      
      <section className="mood-input-section">
        <form className="mood-card" onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe how you're feeling..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="mood-chips">
            {["Happy", "Anxious", "Overwhelmed", "Calm", "Tired"].map(
              (mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => handleMoodClick(mood)}
                  className="chip"
                >
                  {mood}
                </button>
              )
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="mood-submit-btn">
            Generate Reflection
          </button>
        </form>
      </section>

      {/* RESULT SECTION */}
      {/* this appears after the user submits their mood */}
      {showResult && (
        <section className="mood-result-section">
          <div className="result-card">
            <h2>Your Reflection</h2>

            {/* COLOR PALETTE */}
            {/* this simulates the AI-generated color palette */}
            <div className="palette">
              <div className="color-box c1"></div>
              <div className="color-box c2"></div>
              <div className="color-box c3"></div>
              <div className="color-box c4"></div>
            </div>

            {/* REFLECTION TEXT */}
            <p className="reflection-text">
              It seems like you may be feeling a mix of emotions. Take a moment
              to pause and acknowledge what you're experiencing. You don't have
              to solve everything today, just noticing is a meaningful step.
            </p>

            {/* SAVE SECTION */}
            {/* this groups the share option and save button together after the reflection is generated */}
            <div className="save-section">
              {/* SHARE OPTION */}
              {/* this checkbox lets the user decide if this entry should be shared */}
              <div className="share-option">
                <label className="share-label">
                  <input
                    type="checkbox"
                    checked={shareWithPartner}
                    onChange={() => setShareWithPartner(!shareWithPartner)}
                  />
                  Share this entry with my support partner
                </label>
              </div>

              {/* SAVE BUTTON */}
              {/* this button will later save the entry to the database */}
              <button
                type="button"
                className="save-entry-btn"
                onClick={() => {
                  // SAVE ENTRY LOGIC WILL GO HERE LATER

                  console.log("Saving entry:", {
                    inputText,
                    shareWithPartner,
                  });

                  setSaved(true);
                }}
              >
                Save Entry
              </button>

              {/* SUCCESS MESSAGE */}
              {/* this gives user feedback after saving */}
              {saved && (
                <p className="save-success">
                  Your entry has been saved
                  {shareWithPartner && " and shared with your support partner"}.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}