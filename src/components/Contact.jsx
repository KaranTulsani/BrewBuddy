import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  return (
    <footer className="contact-footer" id="contact">
      <div className="contact-container">
        <h2>Contact Us ☕</h2>
        <p>📞 <strong>Email:</strong> brewbuddy@coffee.com</p>
        <p>📱 <strong>Instagram:</strong> @brewbuddy.ai</p>
        <p className="collab-text">
          Want to collaborate? Let’s brew something amazing together. 🤝
        </p>
        <button className="contact-button">Send Message</button>
      </div>
    </footer>
  );
};

export default Contact;
