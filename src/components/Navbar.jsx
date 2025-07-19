import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOrderLinkClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>

          <li>
            <a className="nav-link" href="#" onClick={handleOrderLinkClick}>Order</a>
          </li>

          <li>
            <Link className="nav-link" to="/tips" onClick={() => setIsOpen(false)}>Brew Tips</Link>
          </li>

          {/* ✅ Changed from <Link to="/#about"> to <a href="#aboutSection"> */}
          <li>
            <a className="nav-link" href="#aboutSection" onClick={() => setIsOpen(false)}>About Us</a>
          </li>

          <li>
            <a className="nav-link" href="#contactSection" onClick={() => setIsOpen(false)}>Contact</a>
          </li>
        </ul>

        <button className="hamburger" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
