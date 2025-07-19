import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'; // Import the QR code library
import './OrderProcessingPage.css'; // Import the CSS for this component

const OrderProcessingPage = () => {
  const location = useLocation(); // Hook to access the state passed from navigate
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Get order details from location.state. 'order' will contain the full order object.
  // The '|| {}' ensures 'order' is an empty object if no state is passed, preventing errors.
  const { order } = location.state || {};

  // State to manage the current stage of order processing:
  // 'visualizing': The coffee brewing animation is active.
  // 'ready': The brewing is complete, and the QR code/order ID is displayed.
  const [processingStage, setProcessingStage] = useState('visualizing');

  // State to control the progress of the coffee visualizer animation (0-100%)
  const [progress, setProgress] = useState(0);

  // Effect hook to handle the brewing simulation and stage transition
  useEffect(() => {
    // If no order data is present (e.g., user directly navigated here), redirect back to order page
    if (!order) {
      console.warn("No order data found. Redirecting to order page.");
      navigate('/order');
      return; // Stop execution if no order
    }

    // --- Coffee Brewing Simulation ---
    const brewingDuration = 4000; // Total duration for the brewing animation in milliseconds (4 seconds)
    const intervalTime = 50; // How often to update the progress (every 50ms)

    // Set up an interval to increment the progress
    const brewingInterval = setInterval(() => {
      setProgress(prev => {
        // Calculate the new progress percentage
        const newProgress = prev + (intervalTime / brewingDuration) * 100;

        // If progress reaches or exceeds 100%, clear the interval and transition to 'ready' stage
        if (newProgress >= 100) {
          clearInterval(brewingInterval); // Stop the interval
          setProcessingStage('ready'); // Change stage to display QR code
          return 100; // Cap progress at 100%
        }
        return newProgress; // Return the new progress
      });
    }, intervalTime);

    // Cleanup function: Clear the interval if the component unmounts before brewing is complete
    return () => clearInterval(brewingInterval);
  }, [order, navigate]); // Dependencies: Re-run if 'order' or 'navigate' changes

  // Display a loading message if order data isn't immediately available
  if (!order) {
    return (
      <div className="order-processing-container loading">
        <p>Preparing your order details...</p>
        {/* You could add a simple spinner here */}
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="order-processing-container">
      {/* Section for the Coffee Visualizer (active during 'visualizing' stage) */}
      {processingStage === 'visualizing' && (
        <div className="visualizer-section">
          <h2>Your Brew is Being Prepared!</h2>
          {/* Display a dynamic message or the notes from the order */}
          <p className="order-notes">"{order.notes || "A perfect cup"}"</p>

          <div className="coffee-visualizer-wrapper">
            <div className="coffee-visualizer">
              <div className="cup">
                {/* The liquid element whose height changes based on 'progress' */}
                <div className="liquid" style={{ height: `${progress}%` }}></div>
              </div>
              {/* Display the percentage progress */}
              <div className="progress-text">{Math.round(progress)}%</div>
            </div>
          </div>
          {/* Display a random coffee fact passed from the order */}
          <p className="brew-tip">
             {order.fact || "Brewing up some fun facts..."}
          </p>
        </div>
      )}

      {/* Section for Order Ready / QR Code (active during 'ready' stage) */}
      {processingStage === 'ready' && (
        <div className="order-ready-section">
          <h2>Your BrewBuddy Order</h2>
          <div className="order-ready-card">
            <div className="cup-icon">☕</div> {/* Simple coffee cup emoji icon */}
            <h3>Order Ready!</h3>
            <p className="show-at-counter">Show this at the counter:</p>
            {/* Display the Order ID and QR Code if order.orderId exists */}
            {order.orderId && (
              <>
                <div className="order-id">{order.orderId}</div>
                <div className="qr-code-wrapper">
                  {/* QRCode component: value is the orderId, size is 180px, level 'H' for high error correction */}
                  <QRCode value={order.orderId} size={180} level="H" />
                </div>
              </>
            )}
            <p className="enjoy-message">Enjoy your brew!</p>
          </div>
          {/* Button to allow users to place another order, navigating back to /order */}
          <button onClick={() => navigate('/order')} className="new-order-btn">
            Order Another Brew
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderProcessingPage;
