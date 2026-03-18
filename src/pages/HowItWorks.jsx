import { Link } from "react-router-dom";
import "../styles/HowItWorks.css";

import flowerpot from "../assets/flowerpot.png";
import smileyflowers from "../assets/smileyflowers.png";
import tulips from "../assets/tulips.png";

export default function HowItWorks() {
  return (
    <main className="how-page">
      {/* PAGE INTRO */}
      <section className="how-hero">
        <p className="how-label">How It Works</p>

        <h1>HueBloom is designed to make emotional reflection feel simple, supportive, and meaningful.</h1>

        <p className="how-hero-text">
          The experience is centered around helping users understand how they
          feel, reflect with intention, and grow over time. HueBloom also
          includes a support partner experience, allowing trusted people to play
          a gentle and encouraging role in the wellness journey.
        </p>
      </section>

      {/* MAIN STEPS SECTION */}
      {/* this breaks the main app experience into clear, easy-to-follow steps */}
      <section className="steps-section">
        <div className="section-heading">
          <p className="section-label">The Experience</p>
          <h2>A calm step-by-step flow for reflection and growth.</h2>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <div className="step-number">01</div>
            <img
              src={flowerpot}
              alt="Flowerpot illustration"
              className="step-image"
            />
            <h3>Check In</h3>
            <p>
              The user begins by sharing how they are feeling. This creates a
              moment of pause and encourages emotional awareness in a space that
              feels gentle and approachable.
            </p>
          </article>

          <article className="step-card">
            <div className="step-number">02</div>
            <img
              src={smileyflowers}
              alt="Smiley flowers illustration"
              className="step-image"
            />
            <h3>Reflect and Receive Support</h3>
            <p>
              After checking in, the user receives a thoughtful response that
              supports reflection and helps them process their emotions in a
              more intentional way.
            </p>
          </article>

          <article className="step-card">
            <div className="step-number">03</div>
            <img
              src={tulips}
              alt="Tulips illustration"
              className="step-image"
            />
            <h3>Track Growth Over Time</h3>
            <p>
              As users continue using HueBloom, they can begin to notice
              patterns, build awareness, and see their emotional journey as
              something that grows over time rather than something they face all
              at once.
            </p>
          </article>
        </div>
      </section>

      {/* ROLE SECTION */}
      {/* this section explains the two different types of users in the application */}
      <section className="roles-section">
        <div className="section-heading">
          <p className="section-label">Two Roles</p>
          <h2>HueBloom supports both personal reflection and trusted support.</h2>
        </div>

        <div className="roles-grid">
          <article className="role-card">
            <h3>Main User</h3>
            <p>
              The main user is the person using HueBloom to reflect on their
              emotions, document their experiences, and build a stronger sense
              of self awareness through the app's wellness tools and gentle
              interface.
            </p>
          </article>

          <article className="role-card">
            <h3>Support Partner</h3>
            <p>
              The support partner is a trusted person connected to the user's
              experience. Their role is not to take over the journey, but to
              provide encouragement, support, and a stronger sense of connection
              when needed.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}