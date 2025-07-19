import React from "react";
import "./BrewTips.css";

const BrewTips = () => {
  return (
    <div className="brew-tips">
      <h1>Become a BrewMaster</h1>

      {/* Tip 1 */}
      <div className="tip-section">
        <div className="tip-text">
          <h2>☕ Tip #1</h2>
          <p>
            <strong>Use filtered water</strong> for a cleaner, smoother taste.
          </p>
        </div>
        <img src="/images/tip1.jpg" alt="Filtered Water" className="tip-img" />
      </div>

      {/* Tip 2 */}
      <div className="tip-section reverse">
        <div className="tip-text">
          <h2>🌡️ Tip #2</h2>
          <p>
            <strong>Perfect Water Temperature:</strong> Aim for <strong>90°C to 96°C</strong> — too hot burns the coffee, too cold under-extracts.
          </p>
        </div>
        <img src="/images/tip2.jpg" alt="Perfect Temperature" className="tip-img" />
      </div>

      {/* Tip 3 */}
      <div className="tip-section">
        <div className="tip-text">
          <h2>📏 Tip #3</h2>
          <p>
            <strong>Good Size Matters:</strong> Use the right grind size for your brew method. Coarse for French press, medium for pour-over, and fine for espresso.
          </p>
        </div>
        <img src="/images/tip3.jpg" alt="Grind Size" className="tip-img" />
      </div>

      {/* Tip 4 */}
      <div className="tip-section reverse">
        <div className="tip-text">
          <h2>⏱️ Tip #4</h2>
          <p>
            <strong>Brew Time = Taste:</strong> Over-brewing makes it bitter. Stick to recommended times — usually <strong>2–4 minutes</strong>.
          </p>
        </div>
        <img src="/images/tip4.jpg" alt="Brew Time" className="tip-img" />
      </div>

      {/* Tip 5 */}
      <div className="tip-section">
        <div className="tip-text">
          <h2>📦 Tip #5</h2>
          <p>
            <strong>Store Beans Right:</strong> Keep beans in an airtight container, away from light, air, and moisture — not the fridge!
          </p>
        </div>
        <img src="/images/tip5.jpg" alt="Bean Storage" className="tip-img" />
      </div>
    </div>
  );
};

export default BrewTips;
