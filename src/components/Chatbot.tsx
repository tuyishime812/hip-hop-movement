'use client';

import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Greetings! 🎤 Welcome to the Hip-Hop Movement Foundation. I'm your virtual assistant, here to guide you through our mission of empowering communities through hip-hop culture. How may I assist you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Tell me about the foundation",
    "How can I support the cause?",
    "What events do you host?",
    "Show me success stories"
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Function to get bot response based on user input
  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('greetings')) {
      return "Hello there! 🎤 Welcome to the Hip-Hop Movement Foundation. I'm delighted to assist you. How can I help you explore our community initiatives and impact?";
    } else if (lowerCaseMessage.includes('mission') || lowerCaseMessage.includes('what do you do') || lowerCaseMessage.includes('foundation')) {
      return "Our mission is profound: We use hip-hop as a transformative tool for humanity! We champion artistic excellence, empower communities, and create meaningful change through music, art, and cultural expression. Our initiatives support elders, uplift vulnerable groups, foster business opportunities, and nurture emerging artists. We're committed to building bridges 'From the Streets to the Future.'";
    } else if (lowerCaseMessage.includes('donate') || lowerCaseMessage.includes('support') || lowerCaseMessage.includes('contribute') || lowerCaseMessage.includes('help')) {
      return "Your support means everything to us! You can contribute through financial donations, volunteering your expertise, or joining our events. Each contribution strengthens our mission to empower communities. Visit our 'Donate' section to make an impact today! 💝";
    } else if (lowerCaseMessage.includes('event') || lowerCaseMessage.includes('program') || lowerCaseMessage.includes('workshop') || lowerCaseMessage.includes('concert')) {
      return "We curate diverse programming including educational workshops, cultural concerts, and community outreach initiatives. These events celebrate hip-hop heritage while fostering innovation. You can stay updated on our 'Events' page. Join our movement and be part of something extraordinary! 🎉";
    } else if (lowerCaseMessage.includes('artist') || lowerCaseMessage.includes('musician') || lowerCaseMessage.includes('hip hop') || lowerCaseMessage.includes('culture')) {
      return "Hip-hop culture is the heartbeat of our foundation! We elevate artists through mentorship, performance opportunities, and career-building resources. We honor all elements of hip-hop — MCing, DJing, graffiti artistry, and breakdancing — nurturing creative expression that drives social change. 🎵";
    } else if (lowerCaseMessage.includes('story') || lowerCaseMessage.includes('impact') || lowerCaseMessage.includes('success') || lowerCaseMessage.includes('testimonial') || lowerCaseMessage.includes('transform')) {
      return "Our impact speaks volumes: Over 1,500 community members engaged, 200+ artists empowered, 50+ impactful events organized. Through our programs, hundreds of young voices have found expression and opportunity. Every beat carries meaning, every lyric uplifts lives. We're transforming communities through the power of hip-hop culture! 🌟";
    } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email') || lowerCaseMessage.includes('phone') || lowerCaseMessage.includes('reach')) {
      return "We'd love to hear from you! Reach out to us at tuyishimemartin007@gmail.com or call +265886986384. For immediate assistance, our contact form is available on the website. Your connection matters to us! 📞";
    } else if (lowerCaseMessage.includes('thank') || lowerCaseMessage.includes('grateful')) {
      return "You're wonderfully welcome! 🙌 Thank you for your interest in the Hip-Hop Movement Foundation. Together, we're crafting a legacy that builds bridges from the streets to the future!";
    } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye') || lowerCaseMessage.includes('farewell') || lowerCaseMessage.includes('thanks')) {
      return "Farewell! 👋 Thank you for engaging with the Hip-Hop Movement Foundation. Remember: Hip-Hop for Humanity, From the Streets to the Future! Peace and prosperity! ✌️";
    } else {
      const responses = [
        "Thank you for your inquiry! The Hip-Hop Movement Foundation is dedicated to empowering communities through the transformative power of music and culture. Would you like to learn about our programs, upcoming events, or ways to get involved?",
        "We're passionate advocates for using hip-hop as a catalyst for positive change! Which aspect of our mission resonates most with you?",
        "Hip-Hop for Humanity, From the Streets to the Future! Is there a particular area where I can provide more insight?",
        "I'm here to provide guidance! Our programs encompass youth empowerment, artist development, community engagement, and cultural preservation. What would you like to explore?",
        "Our foundation honors hip-hop's rich heritage while pioneering its future. How else may I assist you today?",
        "Wonderful question! We believe hip-hop culture has the power to transform lives and unite diverse communities. What else would you like to discover?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = typeof messageText === 'string' ? messageText : inputValue;

    if (textToSend.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: textToSend,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator and delay bot response
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = getBotResponse(textToSend);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-80 h-96 flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] p-4 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <h3 className="font-bold ml-2">Foundation Assistant</h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.length <= 1 && (
              <div className="mb-4 flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-xs">
                  <p className="font-medium mb-2">How can I assist you today?</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-r-lg hover:from-[#2563eb] hover:to-[#db2777] transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Powered by Hip-Hop Movement Foundation
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white p-4 rounded-full shadow-xl hover:from-[#2563eb] hover:to-[#db2777] transition-all transform hover:scale-105 animate-pulse"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default Chatbot;