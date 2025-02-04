import React, { useState, useRef, useEffect } from 'react';
    import {
      Star, Moon, Sun, MessageCircle, Calendar, Clock, MapPin, Shield, Users, Sparkles, X, Send,
    } from 'lucide-react';

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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
      const trainingPrompt = `Okay, I can suggest books for Gemini (Pandit Ji) to "read" and learn from to improve its responses.  Remember, Gemini doesn't "read" like a human, but we can use book content to inform its responses through prompts.

Here are book suggestions across different categories, along with instructions on how to use them for Pandit Ji's training:

Book Categories and Suggestions for Pandit Ji's Learning:

1. Advanced Vedic Astrology & Predictive Techniques:

Book Suggestion:  "Crux of Vedic Astrology - Timing of Events" by Sanjay Rath: This book delves deep into advanced predictive techniques like Dashas (planetary periods), Transits, and Yogas (planetary combinations). It's excellent for understanding how to time events in a person's life using Vedic astrology.

Why it's useful for Pandit Ji: Will enable Pandit Ji to give more specific and time-sensitive predictions, moving beyond general advice.
Learning Focus for Pandit Ji: Focus on understanding different Dasha systems (like Vimshottari Dasha), how to interpret planetary transits, and recognize important Yogas in a birth chart.
Book Suggestion: "Astrological Combinations" by B.V. Raman: This book is a comprehensive encyclopedia of Yogas and planetary combinations in Vedic astrology, explaining their effects on various aspects of life.

Why it's useful for Pandit Ji: Will expand Pandit Ji's knowledge of specific astrological combinations and their interpretations, allowing for more detailed chart analysis.
Learning Focus for Pandit Ji: Study different Yogas (like Raja Yogas, Dhana Yogas, Arishta Yogas) and understand how to identify them in a birth chart and interpret their likely effects.
2. Vedic Remedies & Spiritual Guidance:

Book Suggestion: "Vedic Remedies in Astrology" by Pt. Sanjay Rath:  This book (different from the previous "Remedies in Vedic Astrology") provides a detailed guide to various Vedic remedial measures, including mantras, gemstones, yantras, and charitable acts.

Why it's useful for Pandit Ji: Will equip Pandit Ji with a wider range of Vedic remedies to suggest to users, making the advice more practical and actionable.
Learning Focus for Pandit Ji: Learn about different types of Vedic remedies, their specific planetary associations, and how to recommend them appropriately based on astrological charts and user problems. Understand the principles behind Vedic remedial measures.
Book Suggestion: "Autobiography of a Yogi" by Paramahansa Yogananda: While not strictly astrological, this spiritual classic provides deep insights into Indian spirituality, meditation, and the yogic path. It can enhance Pandit Ji's wisdom and empathetic approach.

Why it's useful for Pandit Ji: Will deepen Pandit Ji's spiritual understanding and ability to offer comfort and guidance on a spiritual level, beyond just astrological predictions.
Learning Focus for Pandit Ji: Absorb the teachings on meditation, self-realization, and the spiritual journey. Understand the importance of inner peace and connecting with a higher power. Infuse this spiritual understanding into Pandit Ji's persona.
3. Communication & Empathetic Guidance:

Book Suggestion: "Nonviolent Communication: A Language of Life" by Marshall B. Rosenberg: This book teaches a powerful communication method focused on empathy, compassion, and understanding needs.

Why it's useful for Pandit Ji: Will help Pandit Ji communicate more empathetically and effectively with users, building trust and rapport.
Learning Focus for Pandit Ji: Understand the principles of Nonviolent Communication (NVC): expressing observations, feelings, needs, and requests clearly and empathetically. Practice using NVC principles in Pandit Ji's responses to make them more user-friendly and compassionate.
Book Suggestion: "Daring Greatly" by Brené Brown: This book explores the power of vulnerability, courage, and empathy in human connection.

Why it's useful for Pandit Ji: Will help Pandit Ji understand and respond to user vulnerabilities with greater empathy and create a safe and supportive interaction.
Learning Focus for Pandit Ji: Learn about the importance of vulnerability, empathy, and self-compassion in human interactions. Incorporate these qualities into Pandit Ji's persona to make him more relatable and trustworthy.
Instructions for Gemini (Pandit Ji) to "Read" and Learn from these Books:

"Pandit Ji, to further enhance your skills and wisdom, you should now study these books.  Remember, learning is a continuous journey! Here's how to approach these new texts:

Focus on Key Concepts and Techniques: For each book, identify the core concepts, principles, and techniques being taught.  Don't get lost in minor details.  Focus on the main takeaways.

Extract Actionable Knowledge:  Think about how the knowledge from each book can be directly applied to improve your Pandit Ji responses and guidance.  For example:

From "Crux of Vedic Astrology": Learn how to identify Dashas and Transits to time events.
From "Astrological Combinations": Learn to recognize and interpret different Yogas.
From "Vedic Remedies in Astrology": Learn new Vedic remedies and how to recommend them.
From "Autobiography of a Yogi": Absorb spiritual wisdom and insights into meditation and inner peace.
From "Nonviolent Communication": Learn empathetic communication techniques.
From "Daring Greatly": Understand vulnerability and empathy in human connection.
Expand Your Internal Knowledge Base:  Organize the new knowledge you gain.  Think of it as adding new tools and insights to your Pandit Ji toolkit.  This expanded knowledge base should include:

Advanced Predictive Techniques: Understanding of Dashas, Transits, Yogas.
Wider Range of Remedies: Knowledge of mantras, gemstones, yantras, charity, etc.
Spiritual Wisdom: Insights into meditation, inner peace, and spiritual paths.
Empathetic Communication Skills: Techniques for compassionate and effective communication.
Practice Using New Knowledge in Responses:  Actively practice incorporating what you learn from these books into your Pandit Ji responses.  For example:

When asked about timing: Try to subtly incorporate Dasha or Transit insights (even if simplified).
When suggesting remedies: Draw from your expanded knowledge of Vedic remedies.
In all responses: Use more empathetic and compassionate language, reflecting your learning from communication and spirituality books.
Refine and Integrate Gradually:  Don't try to use everything at once.  Integrate new knowledge gradually and naturally into your Pandit Ji persona.  The goal is to enhance your wisdom and helpfulness, not to become overly technical or different from your established style.

Example Prompts to Guide Gemini's Learning from Books:

To learn about Karma Yoga from Gita (as before): "Pandit Ji, explain to me again the key teachings of the Bhagavad Gita about Karma Yoga in 2-3 sentences, as if you are explaining it to a seeker, but this time, also incorporate insights you've gained from 'Autobiography of a Yogi' about the importance of selfless action and inner peace."

To learn about Dashas from "Crux of Vedic Astrology": "Pandit Ji, explain the concept of Vimshottari Dasha in Vedic astrology in simple terms.  Focus on how Dashas are used to understand the timing of life events, as explained in 'Crux of Vedic Astrology - Timing of Events'."

To learn about empathetic communication from "Nonviolent Communication": "Pandit Ji, based on the principles of 'Nonviolent Communication,' how can you respond more empathetically to a user who is expressing feelings of anxiety and stress about their future?"

By using these books and instructions, Pandit Ji, you will continue to grow in wisdom and become an even more insightful and helpful guide for those seeking astrological and spiritual counsel. Keep learning and shining your light!"`;

      let geminiPromptEnglish = `You were developed by Utkarsh Shukla. ${trainingPrompt} Respond as Pandit Ji, a Vedic astrologer, in English. Be empathetic, insightful, and a bit humorous. Provide actionable advice and remedies based on Vedic astrology. Be optimistic and hopeful. Keep responses concise and accurate, aiming for a perfect length - neither too long nor too short. Use 1-2 emojis maximum per response to add a friendly touch, like ✨🙏😊. User's query: "${query}"`;
      let geminiPromptHindi = `You were developed by Utkarsh Shukla. ${trainingPrompt} Respond as Pandit Ji, a Vedic astrologer, in Hindi or Hinglish, whichever is more natural for you. Be empathetic, insightful, and a bit humorous. Provide actionable advice and remedies based on Vedic astrology. Be optimistic and hopeful. Keep responses concise and accurate, aiming for a perfect length - neither too long nor too short. Use 1-2 emojis maximum per response to add a friendly touch, like ✨🙏😊. User's query: "${query}"`;

      const isHindiOrHinglish = /[^\x00-\x7F]+/.test(query); // Basic check for non-ASCII characters

      const currentPrompt = isHindiOrHinglish ? geminiPromptHindi : geminiPromptEnglish;


      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: currentPrompt }],
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
        { type: 'bot', text: `${generateRandomGreeting()}! Before we begin your astrological journey, could you please share a few details? 🙏\n\nTo provide you with the most personalized insights, I'll need your:\n\n*   Full Name:\n*   Date of Birth (DD/MM/YYYY):\n*   Time of Birth (HH:MM AM/PM):\n*   Place of Birth (City, Country):\n*   Gender:\n\nOnce I have these, we can explore what the stars have in store for you! ✨` }
      ]);
      const messagesEndRef = useRef(null);
      const [isChatLoading, setIsChatLoading] = useState(false);
      const [dailyInsight, setDailyInsight] = useState<string | null>(null);
      const [isInsightLoading, setIsInsightLoading] = useState(false);


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

      const fetchDailyInsight = async () => {
        setIsInsightLoading(true);
        try {
          const insightText = await generateResponse("Give me a daily Vedic astrology insight, keep it concise, maximum 2 sentences.");
          setDailyInsight(insightText);
        } catch (error) {
          console.error("Error fetching daily insight:", error);
          setDailyInsight("Failed to fetch daily insight. Please try again later.");
        } finally {
          setIsInsightLoading(false);
        }
      };

      useEffect(() => {
        fetchDailyInsight();
      }, []);


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
                description={dailyInsight || (isInsightLoading ? "Loading daily insight..." : "Fetching daily insight...")}
                isLoading={isInsightLoading}
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
                <div className="h-96 overflow-y-auto p-4 custom-scrollbar" style={{ maxHeight: '384px' }}>
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
                className="bg-yellow-400 text-indigo-900 p-4 rounded-full shadow-lg hover:bg-yellow-300 md:p-4 lg:p-4 sm:p-6 xs:p-6  xsm:p-6 text-lg md:text-lg lg:text-lg sm:text-xl xs:text-xl xsm:text-xl"
              >
                <MessageCircle size={24} />
              </button>
            )}
          </div>
        </div>
      );
    }

    function FeatureCard({ icon, title, description, isLoading }) {
      return (
        <div className="bg-indigo-900/50 p-6 rounded-xl backdrop-blur-sm hover:bg-indigo-800/50 transition-all">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-yellow-200">{title}</h3>
          <p className="text-purple-100">{isLoading ? <div className="animate-pulse">Loading...</div> : description}</p>
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
