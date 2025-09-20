// src/components/OrderForm.jsx
import './OrderForm.css';
import React, { useState } from "react";


const OrderForm = () => {
  const [coffeeType, setCoffeeType] = useState("");
  const [strength, setStrength] = useState("");
  const [sugar, setSugar] = useState(0);
  const [milk, setMilk] = useState(true);
  const [cupSize, setCupSize] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      coffeeType,
      strength,
      sugar,
      milk,
      cupSize,
      notes,
    };
    console.log("Order submitted:", order);
    alert("Order placed! ☕");
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <div>
        <label>
          Coffee Type:
          <select value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)}>
            <option value="">Select type</option>
            <option value="Espresso">Espresso</option>
            <option value="Latte">Latte</option>
            <option value="Cappuccino">Cappuccino</option>
            <option value="Americano">Americano</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Strength:
          <input type="radio" value="Mild" checked={strength === "Mild"} onChange={(e) => setStrength(e.target.value)} /> Mild
          <input type="radio" value="Medium" checked={strength === "Medium"} onChange={(e) => setStrength(e.target.value)} /> Medium
          <input type="radio" value="Strong" checked={strength === "Strong"} onChange={(e) => setStrength(e.target.value)} /> Strong
        </label>
      </div>

      <div>
        <label>
          Sugar: {sugar} spoon(s)
          <input type="range" min="0" max="3" value={sugar} onChange={(e) => setSugar(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Milk:
          <input type="checkbox" checked={milk} onChange={() => setMilk(!milk)} /> {milk ? "ON" : "OFF"}
        </label>
      </div>

      <div>
        <label>
          Cup Size:
          <input type="radio" value="Small" checked={cupSize === "Small"} onChange={(e) => setCupSize(e.target.value)} /> Small
          <input type="radio" value="Medium" checked={cupSize === "Medium"} onChange={(e) => setCupSize(e.target.value)} /> Medium
          <input type="radio" value="Large" checked={cupSize === "Large"} onChange={(e) => setCupSize(e.target.value)} /> Large
        </label>
      </div>

      <div>
        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="E.g., extra hot, less foam..." />
        </label>
      </div>

      <button type="submit">Order Now →</button>
    </form>
  );
};

export default OrderForm;
// This code defines a simple order form for a coffee shop application.
// It allows users to select coffee type, strength, sugar level, milk preference, cup size, and add notes.