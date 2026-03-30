import { useState } from "react";
import "../styles/PartnerSupport.css";
const API_URL = import.meta.env.VITE_API_URL;
export default function PartnerSupport() {
  // this state stores the message the support partner types
  const [message, setMessage] = useState("");

  // this state stores which support tone is selected
  const [selectedTone, setSelectedTone] = useState("gentle");

  // this state stores custom validation errors
  const [error, setError] = useState("");

  // this function fills the message box with a suggestion
  const handleSuggestionClick = (text) => {
    setMessage(text);
    setError("");
  };

  // this function handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) {
      setError("Please write a message before sending support.");
      return;
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem("huebloomUser"));

      if (!savedUser) {
        setError("You must be logged in.");
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
        return;
      }

      const response = await fetch(`${API_URL}/api/moods/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partnerId: savedUser.id,
          userId: connectedUserData.id,
          tone: selectedTone,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to send support message.");
        return;
      }

      setMessage("");
      setSelectedTone("gentle");
      setError("");
    } catch (error) {
      console.error("Send support error:", error);
      setError("Something went wrong while sending support.");
    }
  };

  return (
    <main className="partner-support-page">
      {/* PAGE HEADER */}
      <section className="partner-support-header">
        <p className="section-label">Send Support</p>
        <h1>Offer encouragement in a thoughtful and caring way.</h1>
        <p className="partner-support-description">
          Support partners can use this space to send a gentle message of care,
          reassurance, or encouragement. The goal is to help the user feel seen,
          supported, and connected.
        </p>
      </section>

      {/* SUPPORT FORM SECTION */}
      <section className="partner-support-form-section">
        <div className="partner-support-card">
          <p className="form-label">Encouragement Message</p>
          <h2>Write a message of support</h2>
          <p className="form-description">
            Keep your message kind, patient, and pressure-free.
          </p>

          {/* SUPPORT TONE SELECTOR */}
          <div className="tone-toggle">
            <button
              type="button"
              className={
                selectedTone === "gentle" ? "tone-btn active-tone" : "tone-btn"
              }
              onClick={() => setSelectedTone("gentle")}
            >
              Gentle
            </button>

            <button
              type="button"
              className={
                selectedTone === "uplifting"
                  ? "tone-btn active-tone"
                  : "tone-btn"
              }
              onClick={() => setSelectedTone("uplifting")}
            >
              Uplifting
            </button>

            <button
              type="button"
              className={
                selectedTone === "checkin" ? "tone-btn active-tone" : "tone-btn"
              }
              onClick={() => setSelectedTone("checkin")}
            >
              Check-In
            </button>
          </div>

          {/* SUPPORT MESSAGE FORM */}
          <form className="partner-support-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="supportMessage">Message</label>
              <textarea
                id="supportMessage"
                name="supportMessage"
                placeholder="Write a thoughtful message of encouragement..."
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setError("");
                }}
              ></textarea>

              {/* CUSTOM ERROR TEXT */}
              {error && <p className="error-text">{error}</p>}
            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className="partner-support-submit-btn">
              Send Support
            </button>
          </form>
        </div>
      </section>

      {/* MESSAGE IDEAS SECTION */}
      <section className="message-ideas-section">
        <div className="section-heading">
          <p className="section-label">Message Ideas</p>
          <h2>Helpful ways to encourage with care.</h2>
        </div>

        <div className="message-ideas-grid">
          <article className="message-idea-card">
            <h3>Gentle</h3>
            <p>
              “I just wanted to remind you that you do not have to carry
              everything at once. I'm here for you.”
            </p>
            <button
              type="button"
              className="idea-btn"
              onClick={() =>
                handleSuggestionClick(
                  "I just wanted to remind you that you do not have to carry everything at once. I'm here for you."
                )
              }
            >
              Use This Message
            </button>
          </article>

          <article className="message-idea-card">
            <h3>Uplifting</h3>
            <p>
              “Even if today feels heavy, I hope you remember that your effort
              and feelings still matter.”
            </p>
            <button
              type="button"
              className="idea-btn"
              onClick={() =>
                handleSuggestionClick(
                  "Even if today feels heavy, I hope you remember that your effort and feelings still matter."
                )
              }
            >
              Use This Message
            </button>
          </article>

          <article className="message-idea-card">
            <h3>Check-In</h3>
            <p>
              “Thinking of you today. No pressure to respond: I just wanted to
              send a little encouragement your way.”
            </p>
            <button
              type="button"
              className="idea-btn"
              onClick={() =>
                handleSuggestionClick(
                  "Thinking of you today. No pressure to respond — I just wanted to send a little encouragement your way."
                )
              }
            >
              Use This Message
            </button>
          </article>
        </div>
      </section>

      {/* SUPPORT REMINDER SECTION */}
      <section className="partner-support-reminder-section">
        <div className="partner-support-reminder-card">
          <p className="section-label">Encourage With Care</p>
          <h2>Sometimes small messages can make a meaningful difference.</h2>
          <p>
            Support does not need to be perfect to matter. A thoughtful message,
            a reminder that someone is not alone, or a gentle check-in can help
            create comfort and connection over time.
          </p>
        </div>
      </section>
    </main>
  );
}