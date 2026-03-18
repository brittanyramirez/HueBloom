import { Link } from "react-router-dom";
import "../styles/Home.css";

import bouquet from "../assets/boquet.png";
import flowerpot from "../assets/flowerpot.png";
import smileyflowers from "../assets/smileyflowers.png";
import tulips from "../assets/tulips.png";
import floral from "../assets/floral.png";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <main className="home-page">
      {/* HERO SECTION */}
      {/* this is the first thing users see when they land on the page */}
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-label">A gentle space for emotional wellness</p>

          <h1>
            Reflect on your emotions,
            <span> grow with intention, </span>
            and bloom over time.
          </h1>

          <p className="hero-description">
            HueBloom is a calming wellness experience that helps users explore
            emotions through thoughtful reflection, color inspired mood support,
            and a visual journey that feels personal, soft, and encouraging.
          </p>

        
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-card">
            <img src={logo} alt="logo" className="hero-image" />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="section-heading">
          <p className="section-label">What is HueBloom?</p>
          <h2>A supportive digital space designed to feel calm, kind, and uplifting.</h2>
        </div>

        <div className="about-content">
          <p>
            HueBloom is a mental wellness application designed to help users
            pause, reflect, and better understand how they feel. The experience
            is centered around emotional awareness, gentle self expression, and
            growth over time.
          </p>

          <p>
            Instead of feeling clinical or overwhelming, the app is designed to
            feel warm and welcoming. Through soft visuals, thoughtful features,
            and an encouraging interface, HueBloom creates a space where users
            can check in with themselves in a more meaningful way.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      {/* this section highlights the main parts of the application */}
      <section className="features-section">
        <div className="section-heading">
          <p className="section-label">Features</p>
          <h2>Tools that support reflection, awareness, and growth.</h2>
        </div>

        <div className="feature-cards">
          <article className="feature-card">
            <img
              src={flowerpot}
              alt="Flowerpot illustration"
              className="feature-image"
            />
            <h3>Mood Reflection</h3>
            <p>
              Users can check in with their emotions and reflect on how they are
              feeling in a calm, supportive space.
            </p>
          </article>

          <article className="feature-card">
            <img
              src={smileyflowers}
              alt="Smiley flowers illustration"
              className="feature-image"
            />
            <h3>Emotional Growth</h3>
            <p>
              HueBloom encourages users to build awareness over time and see
              their emotional journey as something that can grow and evolve.
            </p>
          </article>

          <article className="feature-card">
            <img
              src={tulips}
              alt="Tulips illustration"
              className="feature-image"
            />
            <h3>Gentle Experience</h3>
            <p>
              Every part of the interface is designed to feel soft, welcoming,
              and easy to use so the experience never feels overwhelming.
            </p>
          </article>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="support-section">
        <div className="support-image-wrapper">
          <img
            src={bouquet}
            alt="A soft bouquet illustration"
            className="support-image"
          />
        </div>

        <div className="support-text">
          <p className="section-label">Why it matters</p>
          <h2>Mental wellness support should feel approachable and encouraging.</h2>
          <p>
            HueBloom was designed with the idea that emotional care can be both
            thoughtful and beautiful. The goal is to create an experience that
            helps users feel safe enough to reflect, supported enough to return,
            and empowered enough to keep growing.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      {/* this is the final section before the footer and encourages action */}
      <section className="cta-section">
        <div className="cta-card">
          <img src={tulips} alt="Tulip illustration" className="cta-image" />

          <p className="section-label">Begin your journey</p>
          <h2>Start building a more mindful relationship with your emotions.</h2>
          <p>
            Create an account to begin using HueBloom and explore a softer,
            more reflective wellness experience.
          </p>

          <div className="cta-buttons">
            <Link to="/signup" className="hero-primary-btn">
              Sign In
            </Link>

            <Link to="/login" className="hero-secondary-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
