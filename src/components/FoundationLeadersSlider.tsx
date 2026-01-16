'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

const FoundationLeadersSlider = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const staff = await apiService.getStaff();
        // Set leaders regardless of whether we got data from the API or not
        if (staff && staff.length > 0) {
          setLeaders(staff);
        } else {
          // Use fallback data if no staff data received
          setLeaders([
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
              image: "/images/team_management.jpg",
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
              name: "Alinafe Bvumbwe",
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
              image: "/images/manuel security.jpg",
              bio: "Head of Security ensuring the safety and security of all foundation events and operations."
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching leaders:', error);
        // Fallback to default data if API fails
        setLeaders([
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
            image: "/images/team_management.jpg",
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
            name: "Alinafe Bvumbwe",
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
            image: "/images/manuel security.jpg",
            bio: "Head of Security ensuring the safety and security of all foundation events and operations."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  // Calculate max slides based on number of leaders
  const maxSlides = Math.max(0, Math.ceil(leaders.length / 3) - 1);

  // Slider functions
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? maxSlides : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev === maxSlides ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, maxSlides));
  };

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
              Foundation Leaders
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-slate-400">
              These individuals are the backbone of our foundation, driving our mission forward.
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
            Foundation Leaders
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Leadership Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-slate-400">
            These individuals are the backbone of our foundation, driving our mission forward.
          </p>
        </div>

        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-3xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}>
              <div className="flex w-max">
                {leaders.map((leader, index) => (
                  <div key={`${leader.id}-${index}`} className="flex-shrink-0 w-1/3 px-4">
                    <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 overflow-hidden text-center group">
                      <div className="relative overflow-hidden">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/vercel.svg'; // fallback image
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white">
                            <h3 className="text-lg font-bold">{leader.name}</h3>
                            <p className="text-sm text-[#ec4899]">{leader.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">{leader.name}</h3>
                        <p className="text-[#ec4899] mb-3 font-medium">{leader.role}</p>
                        <p className="text-gray-600 dark:text-slate-300 text-sm">{leader.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {leaders.length > 3 && leaders.map((_, index) => (
              index % 3 === 0 && (
                <button
                  key={index}
                  onClick={() => goToSlide(index / 3)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index / 3 ? 'bg-[#3b82f6]' : 'bg-gray-300 dark:bg-slate-600'}`}
                  aria-label={`Go to slide ${index / 3 + 1}`}
                />
              )
            ))}
          </div>

          {/* Navigation Arrows */}
          {leaders.length > 3 && (
            <>
              <button
                onClick={goToPrevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-all z-10"
                aria-label="Previous leader"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-all z-10"
                aria-label="Next leader"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundationLeadersSlider;