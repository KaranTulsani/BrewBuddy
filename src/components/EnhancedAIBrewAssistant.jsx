import React, { useState, useRef, useEffect } from 'react';

// Since you might not have lucide-react installed, I'll create simple icon components
const MessageCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
  </svg>
);

const Send = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

const Coffee = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="m3 8 4-4v16"/>
    <path d="M7 12h10"/>
    <path d="M7 16h6"/>
  </svg>
);

const Bot = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="m9 16 0 0"/>
    <path d="m15 16 0 0"/>
  </svg>
);

const User = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Sparkles = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/>
    <path d="M19 17v4"/>
    <path d="M3 5h4"/>
    <path d="M17 19h4"/>
  </svg>
);

const X = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const EnhancedAIBrewAssistant = ({ onOrderSelect }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi there! ☕ I'm your personal coffee concierge. Tell me about your mood, preferences, or what kind of day you're having, and I'll craft the perfect brew recommendation just for you!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Coffee recommendation logic based on keywords and context
  const generateRecommendation = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Mood-based recommendations
    if (input.includes('tired') || input.includes('sleepy') || input.includes('exhausted')) {
      return {
        drink: "Energizing Double Shot Americano",
        type: "Americano",
        strength: "Strong",
        sugar: 1,
        milk: "OFF",
        size: "Large",
        reasoning: "You sound like you need a serious caffeine boost! A strong double-shot Americano will wake you right up with its bold, clean coffee flavor."
      };
    }
    
    if (input.includes('stressed') || input.includes('anxious') || input.includes('overwhelmed')) {
      return {
        drink: "Comfort Cloud Latte",
        type: "Latte",
        strength: "Medium",
        sugar: 2,
        milk: "ON",
        size: "Medium",
        reasoning: "When life gets overwhelming, you need something warm and comforting. This creamy latte with a touch of sweetness will help you relax and reset."
      };
    }
    
    if (input.includes('happy') || input.includes('excited') || input.includes('celebration')) {
      return {
        drink: "Celebration Mocha Delight",
        type: "Mocha",
        strength: "Medium",
        sugar: 3,
        milk: "ON",
        size: "Large",
        reasoning: "Your good vibes deserve a special treat! This indulgent mocha combines rich coffee with chocolate - perfect for celebrating life's sweet moments."
      };
    }
    
    if (input.includes('focus') || input.includes('work') || input.includes('study') || input.includes('concentrate')) {
      return {
        drink: "Scholar's Sharp Espresso",
        type: "Espresso",
        strength: "Strong",
        sugar: 0,
        milk: "OFF",
        size: "Small",
        reasoning: "Time to get in the zone! A pure, strong espresso will sharpen your focus without any distractions. Clean, intense, and perfect for deep work."
      };
    }
    
    if (input.includes('cozy') || input.includes('rainy') || input.includes('cold') || input.includes('warm')) {
      return {
        drink: "Cozy Cabin Cappuccino",
        type: "Cappuccino",
        strength: "Medium",
        sugar: 1,
        milk: "ON",
        size: "Medium",
        reasoning: "Perfect for those cozy moments! A warm cappuccino with its fluffy foam and balanced flavor will wrap you in comfort like your favorite blanket."
      };
    }
    
    if (input.includes('sweet') || input.includes('dessert') || input.includes('treat')) {
      return {
        drink: "Sweet Dreams Vanilla Latte",
        type: "Latte",
        strength: "Mild",
        sugar: 3,
        milk: "ON",
        size: "Medium",
        reasoning: "Satisfying that sweet tooth! This mild, creamy latte with extra sweetness is like a warm hug in a cup - pure indulgence."
      };
    }
    
    // Time-based recommendations
    const hour = new Date().getHours();
    if (hour < 10) {
      return {
        drink: "Morning Sunrise Americano",
        type: "Americano",
        strength: "Strong",
        sugar: 1,
        milk: "OFF",
        size: "Medium",
        reasoning: "Good morning! Start your day right with a robust Americano that'll kickstart your morning with bold, energizing flavor."
      };
    } else if (hour > 16) {
      return {
        drink: "Evening Calm Decaf Latte",
        type: "Decaf",
        strength: "Mild",
        sugar: 2,
        milk: "ON",
        size: "Small",
        reasoning: "Perfect for the evening! A gentle decaf latte that gives you the coffee experience without keeping you up all night."
      };
    }
    
    // Default recommendation
    return {
      drink: "Barista's Choice Classic Latte",
      type: "Latte",
      strength: "Medium",
      sugar: 2,
      milk: "ON",
      size: "Medium",
      reasoning: "Based on what you've told me, I think you'd love our signature latte - perfectly balanced, smooth, and satisfying. It's a crowd-pleaser that never disappoints!"
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const recommendation = generateRecommendation(inputMessage);
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: `Perfect! I've got just the thing for you: **${recommendation.drink}** ✨\n\n${recommendation.reasoning}\n\nHere are the details:\n• Coffee: ${recommendation.type}\n• Strength: ${recommendation.strength}\n• Sugar: ${recommendation.sugar} spoon(s)\n• Milk: ${recommendation.milk}\n• Size: ${recommendation.size}\n\nWould you like me to add this to your order?`,
        timestamp: new Date(),
        recommendation: recommendation
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const applyRecommendation = (recommendation) => {
    if (onOrderSelect) {
      onOrderSelect(recommendation);
    }
    // Show success message
    const successMessage = {
      id: Date.now(),
      type: 'bot',
      content: "Great choice! I've applied my recommendation to your order form. You can still customize it further if you'd like. Enjoy your perfect brew! ☕",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, successMessage]);
  };

  if (!isExpanded) {
    return (
      <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 50 }}>
        <button
          onClick={() => setIsExpanded(true)}
          style={{
            backgroundColor: '#d97706',
            color: 'white',
            borderRadius: '9999px',
            padding: '16px',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#b45309';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#d97706';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <Coffee size={24} />
          <span style={{ display: window.innerWidth > 640 ? 'inline' : 'none' }}>
            AI Coffee Assistant
          </span>
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      width: '384px',
      height: '384px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid #e5e7eb',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to right, #d97706, #b45309)',
        color: 'white',
        padding: '16px',
        borderRadius: '8px 8px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            padding: '4px'
          }}>
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontWeight: '600', fontSize: '16px' }}>BrewBuddy AI</h3>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Your coffee concierge</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '9999px',
            padding: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              maxWidth: '75%',
              flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
            }}>
              <div style={{
                borderRadius: '9999px',
                padding: '8px',
                backgroundColor: message.type === 'user' ? '#d97706' : 'white',
                color: message.type === 'user' ? 'white' : '#d97706',
                border: message.type === 'bot' ? '1px solid #e5e7eb' : 'none'
              }}>
                {message.type === 'user' ? <User size={16} /> : <Coffee size={16} />}
              </div>
              <div style={{
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: message.type === 'user' ? '#d97706' : 'white',
                color: message.type === 'user' ? 'white' : 'black',
                border: message.type === 'bot' ? '1px solid #e5e7eb' : 'none'
              }}>
                <div style={{ fontSize: '14px', whiteSpace: 'pre-line' }}>
                  {message.content.split('**').map((part, index) => 
                    index % 2 === 0 ? part : <strong key={index}>{part}</strong>
                  )}
                </div>
                {message.recommendation && (
                  <button
                    onClick={() => applyRecommendation(message.recommendation)}
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#d97706',
                      color: 'white',
                      border: 'none',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b45309'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#d97706'}
                  >
                    <Sparkles size={12} />
                    Apply to Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '9999px',
                padding: '8px'
              }}>
                <Coffee size={16} style={{ color: '#d97706' }} />
              </div>
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#d97706',
                    borderRadius: '50%',
                    animation: 'bounce 1s infinite'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#d97706',
                    borderRadius: '50%',
                    animation: 'bounce 1s infinite 0.1s'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#d97706',
                    borderRadius: '50%',
                    animation: 'bounce 1s infinite 0.2s'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: 'white',
        borderRadius: '0 0 8px 8px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me about your mood or preferences..."
            style={{
              flex: 1,
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#d97706';
              e.target.style.boxShadow = '0 0 0 2px rgba(217, 119, 6, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            style={{
              backgroundColor: inputMessage.trim() && !isTyping ? '#d97706' : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              cursor: inputMessage.trim() && !isTyping ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (inputMessage.trim() && !isTyping) {
                e.target.style.backgroundColor = '#b45309';
              }
            }}
            onMouseOut={(e) => {
              if (inputMessage.trim() && !isTyping) {
                e.target.style.backgroundColor = '#d97706';
              }
            }}
          >
            <Send size={16} />
          </button>
        </div>
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          margin: '8px 0 0 0'
        }}>
          Try: "I'm feeling tired" or "I want something cozy"
        </p>
      </div>
      
      {/* Add CSS animation for bouncing dots */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default EnhancedAIBrewAssistant;