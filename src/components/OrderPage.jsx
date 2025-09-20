import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import Firebase modules for Firestore and Auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc, collection } from 'firebase/firestore';
import EnhancedAIBrewAssistant from '../components/EnhancedAIBrewAssistant'; // Import the new AI assistant

// IMPORTANT: Rely on the 'auth' and 'db' instances exported from your firebase.js file.
// Ensure your firebase.js file initializes Firebase ONLY ONCE and exports these.
import { auth, db } from '../firebase.js'; // Ensure 'db' is also exported from firebase.js

import coffeeMachine from "../assets/coffee-machine.png"; // Your coffee machine image
import './OrderPage.css'; // Your existing CSS for the order page

const OrderPage = () => {
  const navigate = useNavigate();
  // State for user info (use the 'auth' instance directly for user checks)
  const [user, setUser] = useState(null); // Stores the Firebase user object
  const [userId, setUserId] = useState(null); // Stores the user's UID for Firestore operations

  // States for order details
  const [coffeeType, setCoffeeType] = useState("Select type");
  const [strength, setStrength] = useState("Medium");
  const [sugar, setSugar] = useState(0);
  const [milk, setMilk] = useState("ON");
  const [cupSize, setCupSize] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState(0); // State for displaying loyalty points
  const [orderMessage, setOrderMessage] = useState(''); // For displaying order status messages
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // To manage loading state during auth check

  // Define prices for coffee components
  const prices = {
    coffeeTypes: { 
      "Espresso": 2.5, 
      "Latte": 3.75, 
      "Decaf": 2.25, 
      "Americano": 2.75, 
      "Cappuccino": 3.25, 
      "Mocha": 4.00,
      "Select type": 0 
    },
    cupSizes: { Small: 0, Medium: 0.5, Large: 1 },
    milk: { ON: 0.25, OFF: 0 }
  };

  // Coffee facts for the visualizer page (will be passed to OrderProcessingPage)
  const coffeeFacts = [
    "Did you know? The world consumes about 2.25 billion cups of coffee per day!",
    "Coffee is the second most traded commodity on Earth after oil.",
    "The first webcam watched a coffee pot at Cambridge University.",
    "Espresso has less caffeine than drip coffee per serving.",
    "Beethoven loved coffee and insisted it be made with 60 beans per cup.",
    "The word 'coffee' comes from the Arabic word 'qahwa'.",
    "Instant coffee was invented in 1901.",
    "Finland consumes the most coffee per capita in the world.",
  ];

  const getRandomFact = () =>
    coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];

  // --- Auth State Listener and Loyalty Points Fetch ---
  useEffect(() => {
    // Listen for authentication state changes using the imported 'auth' instance
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserId(firebaseUser.uid);

        // Access appId from global variable
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

        // Construct the user document path based on security rules
        // Private data: /artifacts/{appId}/users/{userId}/user_profile/{userId}
        const userDocRef = doc(db, `artifacts/${appId}/users/${firebaseUser.uid}/user_profile`, firebaseUser.uid);

        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setLoyaltyPoints(userData.loyaltyPoints || 0); // Default to 0 if not found
          } else {
            // If user profile doesn't exist, create it and initialize loyalty points to 0.
            await setDoc(userDocRef, { loyaltyPoints: 0, createdAt: new Date().toISOString() }, { merge: true });
            setLoyaltyPoints(0);
          }
        } catch (error) {
          console.error("Error fetching user loyalty points:", error);
          setOrderMessage("Error loading loyalty points. Please try refreshing.");
        }
      } else {
        // User is signed out or not authenticated
        setUser(null);
        setUserId(null);
        setLoyaltyPoints(0);
        navigate('/signin'); // Redirect to sign-in page
      }
      setIsLoadingAuth(false); // Authentication check is complete
    });

    return () => unsubscribeAuth(); // Cleanup auth listener on component unmount
  }, [navigate]); // Dependency array: run once on mount, and if navigate changes

  // --- Helper to generate unique Order ID ---
  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `BB-${timestamp}-${random}`.toUpperCase();
  };

  // --- Calculate Total Price ---
  const calculateTotal = () => {
    if (coffeeType === "Select type") return "0.00";
    const coffeeTypeName = coffeeType.split(" (")[0];
    const basePrice = prices.coffeeTypes[coffeeTypeName] || 0;
    const sizePrice = prices.cupSizes[cupSize] || 0;
    const milkPrice = prices.milk[milk] || 0;
    return (basePrice + sizePrice + milkPrice).toFixed(2);
  };

  // --- Handle AI Recommendation Application ---
  const handleAIRecommendation = (recommendation) => {
    // Map AI recommendation to form values
    const typeMapping = {
      "Espresso": "Espresso ($2.50)",
      "Latte": "Latte ($3.75)", 
      "Decaf": "Decaf ($2.25)",
      "Americano": "Americano ($2.75)",
      "Cappuccino": "Cappuccino ($3.25)",
      "Mocha": "Mocha ($4.00)"
    };

    setCoffeeType(typeMapping[recommendation.type] || "Select type");
    setStrength(recommendation.strength);
    setSugar(recommendation.sugar);
    setMilk(recommendation.milk);
    setCupSize(recommendation.size);
    setNotes(`AI Recommended: ${recommendation.drink}`);
    
    // Show success message
    setOrderMessage(`✨ Applied AI recommendation: ${recommendation.drink}! You can still customize it further.`);
    setTimeout(() => setOrderMessage(''), 3000);
  };

  // --- Handle Order Placement ---
  const handleOrder = async () => {
    // Ensure user is authenticated and Firestore 'db' instance is available
    if (!userId || !db) { // Use the imported 'db' directly
      setOrderMessage("Please sign in to place an order or wait for authentication to complete.");
      return;
    }

    if (coffeeType === "Select type") {
      setOrderMessage("Please select a coffee type before ordering.");
      return;
    }

    setOrderMessage('Placing your order...');
    const currentCalculatedPrice = calculateTotal();

    const orderId = generateOrderId();
    const pointsEarned = 10;

    const orderDetails = {
      orderId: orderId,
      coffeeType: coffeeType.split(" (")[0],
      strength: strength,
      sugar: sugar,
      milk: milk,
      cupSize: cupSize,
      notes: notes,
      totalPrice: parseFloat(currentCalculatedPrice),
      timestamp: new Date().toISOString(),
      userId: userId,
      status: 'pending',
      loyaltyPointsEarned: pointsEarned,
      fact: getRandomFact(),
    };

    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

      // Save the order to Firestore in a public collection using the imported 'db'
      const ordersCollectionRef = collection(db, `artifacts/${appId}/public/data/orders`);
      await setDoc(doc(ordersCollectionRef, orderId), orderDetails);

      // Update loyalty points in the user's private profile document using the imported 'db'
      const userProfileDocRef = doc(db, `artifacts/${appId}/users/${userId}/user_profile`, userId);
      await updateDoc(userProfileDocRef, {
        loyaltyPoints: loyaltyPoints + pointsEarned
      });

      setLoyaltyPoints(prevPoints => prevPoints + pointsEarned);
      setOrderMessage('Order placed successfully! Redirecting to visualizer...');

      navigate('/order-processing', { state: { order: orderDetails } });

    } catch (error) {
      console.error("Error placing order or updating loyalty points:", error);
      setOrderMessage(`Failed to place order: ${error.message}. Please try again.`);
    }
  };

  // --- Handle User Logout ---
  const handleLogout = async () => {
    // Use the imported 'auth' directly for signOut
    try {
      await signOut(auth);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setOrderMessage("Error signing out. Please try again.");
    }
  };

  // Display loading state while authentication is being checked
  if (isLoadingAuth) {
    return (
      <div className="loading-container">
        <p>Loading user authentication and data...</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <header>
        <img src={coffeeMachine} alt="Coffee Machine" />
        <h2>ORDER YOUR BREW</h2>
      </header>
      <div style={{
        display: "flex",
        gap: "2rem",
        width: "80%",
        maxWidth: "800px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <div className="customize-section">
          <h3>Customize your perfect cup</h3>
          <label>Coffee Type:</label>
          <select value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)}>
            <option>Select type</option>
            <option>Espresso ($2.50)</option>
            <option>Latte ($3.75)</option>
            <option>Decaf ($2.25)</option>
            <option>Americano ($2.75)</option>
            <option>Cappuccino ($3.25)</option>
            <option>Mocha ($4.00)</option>
          </select>

          <label>Strength:</label>
          <div>
            {["Mild", "Medium", "Strong"].map((level) => (
              <React.Fragment key={level}>
                <input type="radio" id={level} name="strength" value={level}
                  checked={strength === level}
                  onChange={(e) => setStrength(e.target.value)}
                />
                <label htmlFor={level}>{level}</label>
              </React.Fragment>
            ))}
          </div>

          <label>Sugar:</label>
          <input type="range" min="0" max="5" value={sugar} onChange={(e) => setSugar(e.target.value)} />
          {sugar} spoon(s)

          <label>Milk:</label>
          <div>
            {["ON", "OFF"].map((val) => (
              <React.Fragment key={val}>
                <input type="radio" id={val} name="milk" value={val}
                  checked={milk === val}
                  onChange={(e) => setMilk(e.target.value)}
                />
                <label htmlFor={val}>{val}{val === "ON" ? " (+$0.25)" : ""}</label>
              </React.Fragment>
            ))}
          </div>

          <label>Cup Size:</label>
          <div>
            {["Small", "Medium", "Large"].map((size) => (
              <React.Fragment key={size}>
                <input type="radio" id={size} name="cupSize" value={size}
                  checked={cupSize === size}
                  onChange={(e) => setCupSize(e.target.value)}
                />
                <label htmlFor={size}>{size}{size === "Medium" ? " (+$0.50)" : size === "Large" ? " (+$1.00)" : ""}</label>
              </React.Fragment>
            ))}
          </div>

          <label>Notes:</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="E.g., extra hot, less foam..." />

          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
            border: "1px solid #ddd"
          }}>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Order Summary</h4>
            {coffeeType !== "Select type" ? (
              <div>
                <p>{coffeeType.split(" (")[0]}: ${prices.coffeeTypes[coffeeType.split(" (")[0]]?.toFixed(2)}</p>
                <p>Size ({cupSize}): +${prices.cupSizes[cupSize]?.toFixed(2)}</p>
                <p>Milk ({milk}): +${prices.milk[milk]?.toFixed(2)}</p>
                <p style={{ fontWeight: "bold", color: "#8B4513" }}>Total: ${calculateTotal()}</p>
              </div>
            ) : (
              <p style={{ fontStyle: "italic", color: "#666" }}>Please select a coffee type to see pricing</p>
            )}
          </div>

          <button onClick={handleOrder} disabled={coffeeType === "Select type"}
            style={{
              opacity: (coffeeType === "Select type") ? 0.5 : 1,
              cursor: (coffeeType === "Select type") ? "not-allowed" : "pointer"
            }}>
            {orderMessage.includes('Placing order') ? "Processing..." : `Order Now → $${calculateTotal()}`}
          </button>
        </div>
      </div>

      {/* Order Message Display */}
      {orderMessage && (
        <div className="order-message-box" style={{
          margin: "1rem 0",
          padding: "1rem",
          borderRadius: "8px",
          backgroundColor: orderMessage.includes('✨') ? "#e8f5e8" : "#f0f0f0",
          border: orderMessage.includes('✨') ? "1px solid #4caf50" : "1px solid #ccc"
        }}>
          {orderMessage}
        </div>
      )}

      {/* Loyalty Points Display */}
      {userId && ( // Only show if user is authenticated
        <div className="loyalty">
          <h3>Loyalty Points</h3>
          <p>You have <strong>{loyaltyPoints}</strong> points! Earn 10 per order.</p>
          {/* Display full userId as per guidelines */}
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            User ID: {userId}
          </p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            Email: {user?.email || "Not available"}
          </p>
          <button onClick={handleLogout} style={{ marginTop: "1rem" }} className="logout-btn">
            Logout
          </button>
        </div>
      )}

      {/* Enhanced AI Assistant - replaces the old suggestion box */}
      <EnhancedAIBrewAssistant onOrderSelect={handleAIRecommendation} />
    </div>
  );
};

export default OrderPage;