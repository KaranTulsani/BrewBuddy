import React from "react";
import "./LandingPage.css";
import coffeeMachine from "../assets/coffee-machineBG.jpg";

const LandingPage = () => {
  return (
    <>
      <div className="landing-page">
        <section className="hero">
          <div className="hero-container">
            <h1 className="hero-title">BrewBuddy</h1>
            <p className="hero-subtitle">The premium coffee experience</p>
          </div>
          <div className="coffee-machine">
            <img
              src={coffeeMachine}
              alt="BrewBuddy Coffee Machine"
              className="machine-image"
            />
          </div>
        </section>
      </div>

      {/* ✅ About Section with ID */}
      <section className="about-section" id="aboutSection">
        <h2>About BrewBuddy ☕</h2>
        <div className="about-tagline">
          We pour coffee and code with equal love.
        </div>

        <div className="story">
          <h3>💡 Our Story</h3>
          <p>
            Born out of late-night hackathons, caffeine cravings, and a passion
            for innovation. BrewBuddy began as a fun side project. We were tired
            of the same old vending machine coffee and thought — what if your
            coffee experience could be smarter, personalized, and way more fun?
          </p>
          <p>
            So we brewed up an idea: a digital coffee ordering system powered by
            tech, creativity, and a hint of AI.
          </p>
          <p>
            What started as a college classroom idea has now turned into
            something more — a fusion of great taste, interactive design, and
            next-gen features like coffee visualizers, QR pickup, and even an AI
            taste predictor.
          </p>
          <p>
            At BrewBuddy, we’re on a mission to make your daily cup more than
            just a drink — we want it to be an experience. One that starts with
            a smile, ends with a sip, and makes you want to come back for
            another.
          </p>
        </div>

        <h3 className="unique-heading">What Makes Us Unique?</h3>
        <div className="unique-features">
          <div className="feature-card">
            <h4>
              <span role="img" aria-label="AI">
                🧠
              </span>{" "}
              AI-Picked Brews
            </h4>
            <p>Smart suggestions based on your mood.</p>
          </div>
          <div className="feature-card">
            <h4>
              <span role="img" aria-label="visualizer">
                👀
              </span>{" "}
              Coffee Visualizer
            </h4>
            <p>Watch your coffee being “made”.</p>
          </div>
          <div className="feature-card">
            <h4>
              <span role="img" aria-label="facts">
                💡
              </span>{" "}
              Fun Brew Facts
            </h4>
            <p>Learn fun things while it brews.</p>
          </div>
        </div>
      </section>

      {/* Contact Section (Footer) */}
      <section className="contact-section" id="contactSection">
        <h2>Contact Us ☕</h2>
        <p>📧 Email: <strong>brewbuddy@coffee.com</strong></p>
        <p>📱 Instagram: <strong>@brewbuddy.ai</strong></p>
        <p className="collab-line">
          Want to collaborate? Let’s brew something amazing together. 🤝
        </p>
        <button className="send-btn">Send Message</button>
      </section>
    </>
  );
};

export default LandingPage;
