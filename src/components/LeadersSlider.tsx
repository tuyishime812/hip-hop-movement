'use client';

import React, { useState, useEffect } from 'react';

interface Leader {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const LeadersSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Foundation leaders data
  const leaders: Leader[] = [
    {
      id: 1,
      name: "IKK",
      role: "Chairman",
      image: "/images/chairman.jpg",
      bio: "Chairman of the Hip-Hop Foundation, leading the movement with vision and purpose."
    },
    {
      id: 2,
      name: "Martin Angelz",
      role: "Vice Chairman",
      image: "/images/vice_chairman martin.jpg",
      bio: "Vice Chairman driving the mission forward in the hip-hop community."
    },
    {
      id: 3,
      name: "Tuyishime Martin",
      role: "IT Manager",
      image: "/images/IT manager.jpg",
      bio: "Ensuring digital innovation for the movement and technological advancement."
    },
    {
      id: 4,
      name: "Team Management",
      role: "Operations",
      image: "/images/team_management.jpg",
      bio: "Managing team operations and coordination for maximum impact."
    },
    {
      id: 5,
      name: "Alinafe Bvumber",
      role: "Coordinator",
      image: "/images/Alinafe Bvumbwe.jpg",
      bio: "Coordinator managing day-to-day operations and ensuring smooth execution of foundation activities."
    },
    {
      id: 6,
      name: "Leah Perekamoyo",
      role: "Head of Finance",
      image: "/images/Leah Perekamoyo.jpg",
      bio: "Head of Finance overseeing financial operations and ensuring sustainable growth of the foundation."
    },
    {
      id: 7,
      name: "Henderson Paul",
      role: "Spokesperson",
      image: "/images/Henderson Paul.png",
      bio: "Spokesperson representing the foundation and communicating our mission to the public."
    },
    {
      id: 8,
      name: "Romeo Damaso",
      role: "Creative Director",
      image: "/images/Romeo Damaso.jpg",
      bio: "Creative Director leading artistic initiatives and creative projects for the foundation."
    },
    {
      id: 9,
      name: "Manuel Seleman",
      role: "Head of Security",
      image: "/images/Manuel Security.jpg",
      bio: "Head of Security ensuring the safety and security of all foundation events and operations."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, leaders.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + leaders.length) % leaders.length);
    setIsAutoPlaying(false);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
          Foundation Leaders
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Leadership Team</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-slate-400">
          Meet the dedicated individuals who lead our mission to empower communities through hip-hop culture.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-xl dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700">
        {/* Slider container */}
        <div className="relative h-[500px] overflow-hidden">
          {/* Slides */}
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {leaders.map((leader, index) => (
              <div key={leader.id} className="w-full flex-shrink-0 h-full flex items-center">
                <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-8 gap-8">
                  <div className="w-full md:w-2/5 flex justify-center">
                    <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/vercel.svg'; // fallback image
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-white">
                          <h3 className="text-lg font-bold">{leader.name}</h3>
                          <p className="text-sm text-[#ec4899]">{leader.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-3/5 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">{leader.name}</h3>
                    <p className="text-[#ec4899] mb-4 font-medium text-lg">{leader.role}</p>
                    <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto md:mx-0">{leader.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 group"
          aria-label="Previous leader"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-gray-800 dark:text-slate-200 group-hover:text-[#3b82f6]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 group"
          aria-label="Next leader"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-gray-800 dark:text-slate-200 group-hover:text-[#3b82f6]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {leaders.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#3b82f6] w-6' 
                  : 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to leader ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadersSlider;