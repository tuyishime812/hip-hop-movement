'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/services/api';

const FoundationLeadersPage = () => {
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

  // Slider functions
  const goToPrevSlide = () => {
    setCurrentSlide(prev => {
      const maxSlides = Math.max(0, Math.ceil(leaders.length / 3) - 1);
      return prev === 0 ? maxSlides : prev - 1;
    });
  };

  const goToNextSlide = () => {
    setCurrentSlide(prev => {
      const maxSlides = Math.max(0, Math.ceil(leaders.length / 3) - 1);
      return prev === maxSlides ? 0 : prev + 1;
    });
  };

  const goToSlide = (index: number) => {
    const maxSlides = Math.max(0, Math.ceil(leaders.length / 3) - 1);
    setCurrentSlide(Math.min(index, maxSlides));
  };

  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    if (leaders.length > 0) {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [leaders.length]);

 
  const merchandise = [
    {
      id: 1,
      name: "T-Shirts",
      price: "25,000 MWK",
      image: "/images/t shirts.png",
      description: "High-quality t-shirts with our foundation logo"
    },
    {
      id: 2,
      name: "Hoodies",
      price: "50,000 MWK",
      image: "/images/hoodies.png",
      description: "Comfortable hoodies with our foundation logo"
    },
    {
      id: 3,
      name: "Caps",
      price: "30,000 MWK",
      image: "/images/caps.png",
      description: "Stylish caps with our foundation logo"
    },
    {
      id: 4,
      name: "Socks",
      price: "15,000 MWK",
      image: "/images/socks.png",
      description: "Trendy socks with our foundation logo"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24 pb-16">
      {/* Header Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
            Foundation Leaders
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-slate-100">Foundation Leaders</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto dark:text-slate-300">
            Meet the dedicated individuals who lead our mission to empower communities through hip-hop culture.
          </p>
        </div>

        {/* Foundation Leaders Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-slate-400">
              These individuals are the backbone of our foundation, driving our mission forward.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
            </div>
          ) : (
            <div className="relative">
              {/* Slider Container */}
              <div className="overflow-hidden rounded-3xl">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}>
                  <div className="flex w-max">
                    {leaders.map((leader, index) => (
                      <div key={leader.id} className="flex-shrink-0 w-1/3 px-4">
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
                {leaders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-[#3b82f6]' : 'bg-gray-300 dark:bg-slate-600'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
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
            </div>
          )}
        </div>

        {/* Merchandise Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Foundation Store</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-slate-400">
              Show your support with our official merchandise. All proceeds support our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {merchandise.map((item) => (
              <div key={item.id} className="bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 cursor-pointer transform transition-transform duration-300 h-full flex flex-col group">
                <div className="relative overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/vercel.svg'; // fallback image
                      }}
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-2">{item.name}</h3>
                  <p className="text-gray-600 dark:text-slate-300 text-sm mb-4 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
                    <span className="text-xs px-3 py-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white rounded-full">
                      In Stock
                    </span>
                    <a
                      href="https://wa.me/265881434700"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Shop Now</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover/btn:scale-x-100"></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Foundation Store in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-slate-400">
              See our merchandise and how it supports our mission
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl aspect-video bg-gray-200 border-2 border-dashed rounded-2xl overflow-hidden">
              <video
                src="/images/AQMe1546ne3iDZCYHm3IibrNWSYsFE54zm7Mz04M4Ny20idWGSfv7EOUPfcX65KL5B9wVeWIh70fayYntQvDIaldpqNP-V6JrfBwk7Y1kDCYIg.mp4"
                controls
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Video failed to load:", e);
                  // Fallback content could be added here if needed
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Support our mission by purchasing our merchandise or making a donation to our cause.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/265881434700"
              target="_blank"
              rel="noopener noreferrer"
              className="hiphop-btn bg-white text-[#ec4899] hover:bg-gray-100 relative overflow-hidden group px-6 py-3"
            >
              <span className="relative z-10">Shop All Merchandise</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
            </a>
            <a
              href="https://wa.me/265881434700"
              target="_blank"
              rel="noopener noreferrer"
              className="hiphop-btn bg-transparent border-2 border-white hover:bg-white/10 relative overflow-hidden group px-6 py-3"
            >
              <span className="relative z-10">Make a Donation</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 opacity-20"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationLeadersPage;