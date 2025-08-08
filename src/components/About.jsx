import React from 'react'
import { Link } from 'react-router-dom'
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About BrewBuddy ☕</h1>
      <div className="about-subtitle">We pour coffee and code with equal love.</div>

      {/* Our Story Section */}
      <section className="story-section">
        <h2>💡 Our Story</h2>
        <p>
          Born out of late-night hackathons, caffeine cravings, and a passion for innovation,
          <br />
          BrewBuddy began as a fun side project. We were tired of the same old vending machine coffee and thought —
          <br />
          what if your coffee experience could be smarter, personalized, and way more fun?
        </p>
        <p>
          So we brewed up an idea: a digital coffee ordering system powered by tech, creativity, and a hint of AI.
          <br />
          What started as a college classroom idea has now turned into something more —
          <br />
          a fusion of great taste, interactive design, and next-gen features like coffee visualizers, QR pickup, and even an AI taste predictor.
        </p>
        <p>
          At BrewBuddy, we’re on a mission to make your daily cup more than just a drink — we want it to be an experience.
          <br />
          One that starts with a smile, ends with a sip, and makes you want to come back for another.
        </p>
      </section>

      {/* Unique Features Section */}
      <section className="features-section">
        <h2>What Makes Us Unique?</h2>
        <div className="features">
          <div className="feature-card">
            <h3><span role="img" aria-label="AI">🧠</span> AI-Picked Brews</h3>
            <p>Smart suggestions based on your mood.</p>
          </div>

          <div className="feature-card">
            <h3><span role="img" aria-label="Visual">👀</span> Coffee Visualizer</h3>
            <p>Watch your coffee being “made” live.</p>
          </div>

          <div className="feature-card">
            <h3><span role="img" aria-label="Facts">💡</span> Fun Brew Facts</h3>
            <p>Learn fun facts while your coffee brews.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;