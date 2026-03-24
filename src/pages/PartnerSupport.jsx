import { useState } from "react";
import "../styles/PartnerSupport.css";

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
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) {
      setError("Please write a message before sending support.");
      return;
    }

    // SEND SUPPORT LOGIC WILL GO HERE LATER
    // 1. ??????send the message to the backend
    // 2. save the selected support tone
    // 3. associate the message with the connected user
    // 4. show a success message after sending??????

    console.log("Support message submitted:", {
      tone: selectedTone,
      message,
    });

    setError("");
  };

  return (
    <main className="partner-support-page">
      {/* PAGE HEADER */}
      {/* this introduces the page and explains the purpose of sending support */}
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
      {/* this section gives the support partner simple examples they can use or adapt */}
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
      {/* this section reinforces the emotional tone and purpose of the support role */}
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