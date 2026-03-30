import { useState } from "react";
import "../styles/MoodGenerator.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function MoodGenerator() {
  // this state stores what the user types
  const [inputText, setInputText] = useState("");

  // this state stores the quick mood chip the user selected
  const [selectedMood, setSelectedMood] = useState("");

  // this state controls whether results should show
  const [showResult, setShowResult] = useState(false);

  // controls whether the user wants to share the entry
  const [shareWithPartner, setShareWithPartner] = useState(false);

  // controls if the entry was saved (for UI feedback)
  const [saved, setSaved] = useState(false);

  // this stores custom error messages
  const [error, setError] = useState("");

  // this stores loading state while Gemini is generating the result
  const [isGenerating, setIsGenerating] = useState(false);

  // this is placeholder reflection text for now
  // later this will come from Gemini
  const [reflectionText, setReflectionText] = useState("");

  // this is placeholder palette data for now
  // later this will come from Gemini
  const [palette, setPalette] = useState([]);

  // this function handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputText.trim() && !selectedMood) {
      setError("Please describe how you're feeling or choose a mood.");
      return;
    }

    setError("");
    setSaved(false);
    setIsGenerating(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(`${API_URL}/api/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moodText: inputText.trim() || selectedMood,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to generate reflection.");
        setIsGenerating(false);
        return;
      }

      setSelectedMood(data.selectedMood || selectedMood);
      setReflectionText(data.reflectionText || "");
      setPalette(Array.isArray(data.palette) ? data.palette : []);
      setShowResult(true);
      setIsGenerating(false);
    } catch (error) {
      console.error("Generate reflection error:", error);
      setError("Something went wrong while generating your reflection.");
      setIsGenerating(false);
    }
  };

  // this allows users to quickly select a mood instead of typing
  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setInputText(mood);
    setError("");
  };

  // this saves the mood entry to the backend
  const handleSaveEntry = async () => {
    const savedUser = JSON.parse(localStorage.getItem("huebloomUser"));

    if (!savedUser) {
      setError("You must be logged in to save an entry.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/moods/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: savedUser.id,
          moodText: inputText,
          selectedMood: selectedMood || null,
          reflectionText,
          palette,
          shareWithPartner,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to save entry.");
        return;
      }

      setSaved(true);
      setError("");
    } catch (error) {
      console.error("Save mood entry error:", error);
      setError("Something went wrong while saving your entry.");
    }
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
            onChange={(e) => {
              setInputText(e.target.value);
              setError("");
            }}
          />

          {/* these are quick options users can click */}
          <div className="mood-chips">
            {["Happy", "Anxious", "Overwhelmed", "Calm", "Tired"].map(
              (mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => handleMoodClick(mood)}
                  className={`chip ${selectedMood === mood ? "active-chip" : ""}`}
                >
                  {mood}
                </button>
              )
            )}
          </div>

          {/* GENERAL ERROR */}
          {error && <p className="error-text">{error}</p>}

          {/* SUBMIT BUTTON */}
          <button type="submit" className="mood-submit-btn" disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Reflection"}
          </button>
        </form>
      </section>

      {/* RESULT SECTION */}
      {showResult && (
        <section className="mood-result-section">
          <div className="result-card">
            <h2>Your Reflection</h2>

            {/* COLOR PALETTE */}
            <div className="palette">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="color-box"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>

            {/* REFLECTION TEXT */}
            <p className="reflection-text">{reflectionText}</p>

            {/* SAVE SECTION */}
            <div className="save-section">
              {/* SHARE OPTION */}
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
              <button
                type="button"
                className="save-entry-btn"
                onClick={handleSaveEntry}
              >
                Save Entry
              </button>

              {/* SUCCESS MESSAGE */}
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