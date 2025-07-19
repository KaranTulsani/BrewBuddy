import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase.js';
// IMPORTANT: Make sure this path correctly points to your new coffee beans image.
// For example, if it's in 'src/assets/image_88fee0.png'
import coffeeImage from '../assets/coffee.jpg';
import './SignInPage.css';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Effect to listen for authentication state changes and redirect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If a user is logged in, navigate to the order page
      if (user) {
        navigate('/order');
      }
    });
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]); // Depend on navigate to avoid lint warnings

  // Handler for Google Sign-In button click
  const handleGoogleSignIn = async () => {
    // Prevent multiple sign-in attempts if already loading
    if (loading) return;

    setLoading(true); // Set loading state to true
    setError(''); // Clear any previous errors

    try {
      // Attempt to sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // Get the user object from the result

      // Store authentication status and user info in local storage
      // This is for client-side persistence, though Firebase auth state is more robust
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        loginType: 'google'
      }));

      // Save user data to Firestore
      try {
        const userRef = doc(db, 'users', user.uid); // Reference to the user's document
        const userSnap = await getDoc(userRef); // Get the user's document snapshot

        // If the user document does not exist, create it
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            createdAt: new Date().toISOString(),
            loyaltyPoints: 0 // Initialize loyalty points for new users
          });
        } else {
          // If the user document exists but doesn't have loyaltyPoints, add it
          // This handles existing users from before the loyaltyPoints feature
          const userData = userSnap.data();
          if (userData.loyaltyPoints === undefined) {
            await setDoc(userRef, { loyaltyPoints: 0 }, { merge: true }); // Use merge to add without overwriting other fields
          }
        }
      } catch (firestoreError) {
        // Log Firestore specific errors, but don't block sign-in flow
        console.warn('Firestore write error:', firestoreError);
      }

      // Navigate to the order page after successful sign-in
      navigate('/order');
    } catch (error) {
      // Handle different types of sign-in errors
      let errorMessage = 'Google Sign-In failed. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by your browser. Please allow popups for this site.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      setError(errorMessage); // Set the error message to display
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        {/* Use the updated coffeeImage import */}
        <img src={coffeeImage} alt="Coffee Beans" />
      </div>
      <div className="login-form">
        <h1>Welcome to BrewBuddy</h1>
        <p>Sign in with Google to start brewing ☕</p>

        {error && (
          // Apply the 'error-message' class defined in SignInPage.css
          // Removed inline style for better separation of concerns
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          className="signin-button google"
          disabled={loading}
          // Removed inline style attribute. Styles are now handled by SignInPage.css
        >
          {/* Google SVG icon */}
          <svg width="20" height="20" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-2.7.75 4.8 4.8 0 0 1-4.52-3.36H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.46 10.41A4.8 4.8 0 0 1 4.21 8.98 4.8 4.8 0 0 1 4.46 7.55V5.48H1.83a8 8 0 0 0 0 7.04l2.63-2.11z"/>
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 8.98 1 8 8 0 0 0 1.83 5.48L4.46 7.55A4.8 4.8 0 0 1 8.98 4.18z"/>
          </svg>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
