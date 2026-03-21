import { useState } from "react";
import "../styles/MoodGenerator.css";

export default function MoodGenerator() {
  // this state stores what the user types
  const [inputText, setInputText] = useState("");

  // this state controls whether results should show
  const [showResult, setShowResult] = useState(false);

  // this function handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputText.trim()) return;

    // this is where AI/backend logic will go later
    // for now, we just put result
    setShowResult(true);
  };

  // this allows users to quickly select a mood instead of typing
  const handleMoodClick = (mood) => {
    setInputText(mood);
  };

  return (
    <main className="mood-page">
      {/* PAGE HEADER */}
      {/* this introduces the page and guides the user */}
      <section className="mood-header">
        <p className="section-label">Mood Generator</p>
        <h1>How are you feeling today?</h1>
        <p className="mood-description">
          Take a moment to reflect. You can type how you feel or choose a mood
          below to begin your check-in.
        </p>
      </section>

      {/* INPUT SECTION */}
      {/* this is where the user enters their emotions */}
      <section className="mood-input-section">
        <form className="mood-card" onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe how you're feeling..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}/>

          {/* these are quick options users can click */}
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

            {/* SAVE BUTTON */}
            <button className="save-btn">
              Save Entry
            </button>
          </div>
        </section>
      )}
    </main>
  );
}