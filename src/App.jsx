import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Make sure this path is correct

// Import your existing components
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignInPage from "./components/SignInPage.jsx";
import OrderPage from "./components/OrderPage";
import BrewTips from "./components/BrewTips.jsx";

// Import the new OrderProcessingPage component
import OrderProcessingPage from "./components/OrderProcessingPage"; // Ensure this path is correct

const App = () => {
  const [authReady, setAuthReady] = useState(false);

  // Effect to listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      // Once Firebase has determined the user's authentication state,
      // set authReady to true. This prevents rendering the main app
      // until Firebase auth is initialized.
      setAuthReady(true);
    });

    // Clean up the subscription when the component unmounts to prevent memory leaks
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Display a loading message until Firebase authentication state is ready
  if (!authReady) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontSize: "1.2rem",
        color: "#5a3c29"
      }}>
        Loading BrewBuddy...
      </div>
    );
  }

  return (
    <Router>
      {/* The Navbar component is rendered globally across all routes */}
      <Navbar />
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Route for the Sign-In Page */}
        <Route path="/signin" element={<SignInPage />} />
        {/* Route for the Order Page */}
        <Route path="/order" element={<OrderPage />} />
        {/* Route for the Brew Tips Page */}
        <Route path="/tips" element={<BrewTips />} />
        {/* NEW: Route for the Order Processing Page (Coffee Visualizer & QR Code) */}
        {/* This route will receive order details via location.state */}
        <Route path="/order-processing" element={<OrderProcessingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
