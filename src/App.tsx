import React, { useState, useRef, useEffect } from 'react';
    import {
      Star, Moon, Sun, MessageCircle, Calendar, Clock, MapPin, Shield, Users, Sparkles, X, Send,
    } from 'lucide-react';

    const GEMINI_API_KEY = 'AIzaSyA0mEcgy9lOlku-hk09vQMZieBbLe1yiik'; // IMPORTANT: API key is exposed in browser code!

    const hindiGreetings = [
      "नमस्ते 🙏",
      "राधे राधे 🙏",
      "जय श्री कृष्णा 🙏",
      "राम राम 🙏",
    ];

    const generateRandomGreeting = () => {
      const shuffledGreetings = [...hindiGreetings].sort(() => 0.5 - Math.random());
      return shuffledGreetings.slice(0, Math.floor(Math.random() * 2) + 1).join(', '); // Select 1 or 2 greetings
    };


    const generateResponse = async (query: string) => {
      let geminiPrompt = `Respond as Pandit Ji, a Vedic astrologer, in English. Be empathetic, insightful, and a bit humorous. Provide actionable advice and remedies based on Vedic astrology. Be optimistic and hopeful. Keep responses concise and accurate, aiming for a perfect length - neither too long nor too short. Use 1-2 emojis maximum per response to add a friendly touch, like ✨🙏😊. User's query: "${query}"`;
      const isHindiOrHinglish = /[^\x00-\x7F]+/.test(query); // Basic check for non-ASCII characters

      if (isHindiOrHinglish) {
        geminiPrompt = `Respond as Pandit Ji, a Vedic astrologer, in Hindi or Hinglish, whichever is more natural for you. Be empathetic, insightful, and a bit humorous. Provide actionable advice and remedies based on Vedic astrology. Be optimistic and hopeful. Keep responses concise and accurate, aiming for a perfect length - neither too long nor too short. Use 1-2 emojis maximum per response to add a friendly touch, like ✨🙏😊. User's query: "${query}"`;
      }

      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: geminiPrompt }],
            }],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let botResponseText = data.candidates[0].content.parts[0].text;
        return botResponseText;

      } catch (error) {
        console.error("Gemini API error:", error);
        return isHindiOrHinglish ? "क्षमा करें, मेरी कॉस्मिक कनेक्शन अभी थोड़ी कमजोर है। सितारे आज शर्मीले हैं! कृपया थोड़ी देर में पुनः प्रयास करें। 😔" : "Sorry, my cosmic connection is a bit weak right now. The stars are shy today! Please try again in a moment. 😔"; // Humorous error message with sad emoji
      }
    };

    // Get prediction based on birth details and life circumstances (remains same)
    const getPrediction = (date: string, time: string, meridiem: string, gender: string, jobStatus: string) => {
      // ... (getPrediction function remains the same as it might be used for modal prediction)
      const hour = parseInt(time.split(':')[0]);
      const isMorning = meridiem === 'AM';
      const birthHour = isMorning ? hour : hour + 12;
      const isNightBorn = birthHour >= 18 || birthHour < 6;

      const planets = ['saturn', 'jupiter', 'mars'];
      const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
      const planetaryEffect = []; // Removed planetaryEffects
      const remedies = []; // Removed remedies

      return {
        emotional: `Emotional guidance based on your birth details will be here.`,
        career: `Career insights based on your birth details will be here.`,
        relationships: `Relationship advice based on your birth details will be here.`,
        guidance: `General cosmic guidance based on your birth details will be here.`
      };
    };

    function App() {
      const [showModal, setShowModal] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [formData, setFormData] = useState({
        birthDate: '',
        birthTime: '',
        meridiem: 'AM',
        gender: '',
        jobStatus: ''
      });
      const [showPrediction, setShowPrediction] = useState(false);
      const [prediction, setPrediction] = useState<{
        emotional: string;
        career: string;
        relationships: string;
        guidance: string;
      } | null>(null);
      const [showChat, setShowChat] = useState(false);
      const [chatInput, setChatInput] = useState('');
      const [chatMessages, setChatMessages] = useState([
        { type: 'bot', text: `${generateRandomGreeting()}! Welcome to JotishAI. How may I guide you today? ✨` } // Initial bot message in English with Randomized Hindi greetings and emoji
      ]);
      const messagesEndRef = useRef(null);
      const [isChatLoading, setIsChatLoading] = useState(false);

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      useEffect(() => {
        scrollToBottom();
      }, [chatMessages]);

      const handleSubmit = async (e: React.FormEvent) => { // ... (handleSubmit and handleInputChange remain same)
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call with loading state
        await new Promise(resolve => setTimeout(resolve, 3000));

        const newPrediction = getPrediction(
          formData.birthDate,
          formData.birthTime,
          formData.meridiem,
          formData.gender,
          formData.jobStatus
        );
        setPrediction(newPrediction);
        setIsLoading(false);
        setShowPrediction(true);
      };

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };


      const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        setIsChatLoading(true);
        const userMessage = { type: 'user', text: chatInput };
        setChatMessages(prevMessages => [...prevMessages, userMessage]);
        setChatInput('');

        setIsChatLoading(true); // Set loading state before API call
        try {
          const botResponseText = await generateResponse(chatInput);
          const botMessage = { type: 'bot', text: botResponseText };
          setChatMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (apiError) {
          // Error message is already handled in generateResponse, or handle further here if needed
          const errorBotMessage = { type: 'bot', text: "Sorry, I am having trouble connecting to the stars right now. Please try again later." };
          setChatMessages(prevMessages => [...prevMessages, errorBotMessage]);
        } finally {
          setIsChatLoading(false); // Clear loading state after API call (success or error)
        }
      };

      return ( // ... (rest of the App component remains the same - UI elements)
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-900 text-white">
          {/* Hero Section */}
          <header className="container mx-auto px-4 py-16 text-center">
            <div className="flex justify-center mb-6">
              <Star className="w-16 h-16 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
              JotishAI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Your Personal Astrology Guide for Life's Journey
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-900 px-8 py-3 rounded-full font-semibold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl"
            >
              Start Your Journey
            </button>
          </header>

          {/* Modal */}
          {showModal && ( // ... (rest of the modal, features, steps, trust indicators, footer, chat widget, cards remain same)
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-indigo-900 rounded-lg p-6 max-w-md w-full relative">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowPrediction(false);
                    setPrediction(null);
                    setIsLoading(false);
                  }}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 rounded-full border-4 border-yellow-300/20 animate-spin"></div>
                      <div className="absolute inset-0 rounded-full border-t-4 border-yellow-300"></div>
                      <Star className="absolute inset-0 m-auto w-12 h-12 text-yellow-300 animate-pulse" />
                    </div>
                    <p className="text-lg text-purple-100">Reading the celestial patterns...</p>
                    <p className="text-sm text-purple-200 mt-2">Connecting with the cosmic energies</p>
                  </div>
                ) : !showPrediction ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">Begin Your Astrological Journey</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Birth Date</label>
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-indigo-800 rounded-md text-white"
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">Birth Time</label>
                          <input
                            type="time"
                            name="birthTime"
                            value={formData.birthTime}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-indigo-800 rounded-md text-white"
                            required
                          />
                        </div>
                        <div className="w-24">
                          <label className="block text-sm font-medium mb-1">AM/PM</label>
                          <select
                            name="meridiem"
                            value={formData.meridiem}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-indigo-800 rounded-md text-white"
                            required
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-indigo-800 rounded-md text-white"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Job Status</label>
                        <select
                          name="jobStatus"
                          value={formData.jobStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-indigo-800 rounded-md text-white"
                          required
                        >
                          <option value="">Select status</option>
                          <option value="student">Student</option>
                          <option value="employed">Employed</option>
                          <option value="unemployed">Unemployed</option>
                          <option value="business">Business Owner</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-900 py-2 rounded-md font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all"
                      >
                        Reveal My Cosmic Path
                      </button>
                    </form>
                  </>
                ) : prediction && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-300">Your Soul's Journey</h2>
                    <div className="space-y-4 text-left">
                      <div className="bg-indigo-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-yellow-200 mb-2">Your Inner World</h3>
                        <p className="text-purple-100 whitespace-pre-line">{prediction.emotional}</p>
                      </div>
                      <div className="bg-indigo-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-yellow-200 mb-2">Life Path & Purpose</h3>
                        <p className="text-purple-100 whitespace-pre-line">{prediction.career}</p>
                      </div>
                      <div className="bg-indigo-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-yellow-200 mb-2">Heart & Connections</h3>
                        <p className="text-purple-100 whitespace-pre-line">{prediction.relationships}</p>
                      </div>
                      <div className="bg-indigo-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-yellow-200 mb-2">Cosmic Guidance</h3>
                        <p className="text-purple-100 whitespace-pre-line">{prediction.guidance}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowModal(false);
                          setShowPrediction(false);
                          setPrediction(null);
                        }}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-900 py-2 rounded-md font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all mt-4"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features Grid */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Moon className="w-8 h-8 text-yellow-300" />}
                title="Personalized Kundali"
                description="Get detailed birth chart analysis and personalized predictions based on Vedic astrology"
              />
              <FeatureCard
                icon={<MessageCircle className="w-8 h-8 text-yellow-300" />}
                title="Expert Consultations"
                description="Connect with certified astrologers for 1:1 guidance through chat, call, or video"
              />
              <FeatureCard
                icon={<Sun className="w-8 h-8 text-yellow-300" />}
                title="Daily Insights"
                description="Receive daily horoscope updates and astrological guidance for better decision making"
              />
              <FeatureCard
                icon={<Calendar className="w-8 h-8 text-yellow-300" />}
                title="Muhurat Timing"
                description="Find auspicious timings for important events and new beginnings"
              />
              <FeatureCard
                icon={<Sparkles className="w-8 h-8 text-yellow-300" />}
                title="AI-Powered Solutions"
                description="Get instant remedies and solutions powered by advanced AI technology"
              />
              <FeatureCard
                icon={<Users className="w-8 h-8 text-yellow-300" />}
                title="Community Support"
                description="Join a community of spiritual seekers and share your journey"
              />
            </div>
          </section>

          {/* How It Works */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-300">
              Begin Your Astrological Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                icon={<Clock className="w-10 h-10" />}
                step="1"
                title="Enter Your Details"
                description="Provide your birth date, time, and location for accurate calculations"
              />
              <StepCard
                icon={<Star className="w-10 h-10" />}
                step="2"
                title="Get Your Kundali"
                description="Receive detailed birth chart analysis and predictions"
              />
              <StepCard
                icon={<MessageCircle className="w-10 h-10" />}
                step="3"
                title="Connect with Experts"
                description="Consult with experienced astrologers for deeper insights"
              />
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="container mx-auto px-4 py-16 text-center">
            <div className="flex flex-wrap justify-center gap-8">
              <TrustIndicator
                icon={<Shield className="w-6 h-6" />}
                text="Verified Astrologers"
              />
              <TrustIndicator
                icon={<Users className="w-6 h-6" />}
                text="10,000+ Happy Users"
              />
              <TrustIndicator
                icon={<MapPin className="w-6 h-6" />}
                text="Pan India Presence"
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-indigo-950 py-8 mt-16">
            <div className="container mx-auto px-4 text-center text-purple-200">
              <p>&copy; 2024 JotishAI. Your trusted companion in astrology.</p>
            </div>
          </footer>

          {/* Chat Widget */}
          <div className="fixed bottom-4 right-4 z-50">
            {showChat ? (
              <div className="bg-indigo-900 rounded-lg shadow-lg w-80 md:w-96">
                <div className="flex justify-between items-center p-4 border-b border-indigo-800">
                  <h3 className="text-yellow-300 font-semibold">JyotishAI Guide</h3>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="h-96 overflow-y-auto p-4 custom-scrollbar">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg whitespace-pre-line ${
                          msg.type === 'user'
                            ? 'bg-yellow-400/20 text-yellow-100'
                            : 'bg-indigo-800 text-purple-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="text-center mb-4">
                      <div className="relative w-12 h-12 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-300/20 animate-spin"></div>
                        <div className="absolute inset-0 rounded-full border-t-4 border-yellow-300"></div>
                        <Star className="absolute inset-0 m-auto w-6 h-6 text-yellow-300 animate-pulse" />
                      </div>
                      <p className="text-sm text-purple-200 mt-2">Consulting the stars...</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-indigo-800">
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about your future..."
                      className="flex-1 bg-indigo-800 text-white rounded px-3 py-2"
                    />
                    <button
                      type="submit"
                      className="bg-yellow-400 text-indigo-900 p-2 rounded hover:bg-yellow-300"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowChat(true)}
                className="bg-yellow-400 text-indigo-900 p-4 rounded-full shadow-lg hover:bg-yellow-300"
              >
                <MessageCircle size={24} />
              </button>
            )}
          </div>
        </div>
      );
    }

    function FeatureCard({ icon, title, description }) { // ... (FeatureCard, StepCard, TrustIndicator remain same)
      return (
        <div className="bg-indigo-900/50 p-6 rounded-xl backdrop-blur-sm hover:bg-indigo-800/50 transition-all">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-yellow-200">{title}</h3>
          <p className="text-purple-100">{description}</p>
        </div>
      );
    }

    function StepCard({ icon, step, title, description }) {
      return (
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-300/20 flex items-center justify-center text-yellow-300">
            {icon}
          </div>
          <div className="text-2xl font-bold text-yellow-300 mb-2">Step {step}</div>
          <h3 className="text-xl font-semibold mb-2 text-purple-100">{title}</h3>
          <p className="text-purple-200">{description}</p>
        </div>
      );
    }

    function TrustIndicator({ icon, text }) {
      return (
        <div className="flex items-center gap-2 bg-indigo-900/30 px-4 py-2 rounded-full">
          <span className="text-yellow-300">{icon}</span>
          <span className="text-purple-100">{text}</span>
        </div>
      );
    }


    export default App;
