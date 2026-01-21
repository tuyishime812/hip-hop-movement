'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

const FoundationLeadersSlider = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
              name: "Martin Anjelz",
              role: "Vice Chairman",
              image: "/images/vice_chairman martin.jpg",
              bio: "Vice Chairman driving the mission forward in the hip-hop community."
            },
            {
              id: 3,
              name: "Leah Perekamoyo",
              role: "Head of Finance",
              image: "/images/Leah Perekamoyo.jpg",
              bio: "Head of Finance overseeing financial operations and ensuring sustainable growth of the foundation."
            },
            {
              id: 4,
              name: "Tuyishime Martin",
              role: "IT Manager",
              image: "/images/IT manager.jpg",
              bio: "Ensuring digital innovation for the movement and technological advancement."
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
              name: "Henderson Paul",
              role: "Spokesperson",
              image: "/images/Henderson Paul.png",
              bio: "Spokesperson representing the foundation and communicating our mission to the public."
            },
            {
              id: 7,
              name: "Romeo Damaso",
              role: "Creative Director",
              image: "/images/Romeo Damaso.jpg",
              bio: "Creative Director leading artistic initiatives and creative projects for the foundation."
            },
            {
              id: 8,
              name: "Manuel Seleman",
              role: "Head of Security",
              image: "/images/manuel security.jpg",
              bio: "Head of Security ensuring the safety and security of all foundation events and operations."
            },
            {
              id: 9,
              name: "Team Management",
              role: "Operations",
              image: "/images/team_management.jpg",
              bio: "Managing team operations and coordination for maximum impact."
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
            name: "Martin Anjelz",
            role: "Vice Chairman",
            image: "/images/vice_chairman martin.jpg",
            bio: "Vice Chairman driving the mission forward in the hip-hop community."
          },
          {
            id: 3,
            name: "Leah Perekamoyo",
            role: "Head of Finance",
            image: "/images/Leah Perekamoyo.jpg",
            bio: "Head of Finance overseeing financial operations and ensuring sustainable growth of the foundation."
          },
          {
            id: 4,
            name: "Tuyishime Martin",
            role: "IT Manager",
            image: "/images/IT manager.jpg",
            bio: "Ensuring digital innovation for the movement and technological advancement."
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
            name: "Henderson Paul",
            role: "Spokesperson",
            image: "/images/Henderson Paul.png",
            bio: "Spokesperson representing the foundation and communicating our mission to the public."
          },
          {
            id: 7,
            name: "Romeo Damaso",
            role: "Creative Director",
            image: "/images/Romeo Damaso.jpg",
            bio: "Creative Director leading artistic initiatives and creative projects for the foundation."
          },
          {
            id: 8,
            name: "Manuel Seleman",
            role: "Head of Security",
            image: "/images/manuel security.jpg",
            bio: "Head of Security ensuring the safety and security of all foundation events and operations."
          },
          {
            id: 9,
            name: "Team Management",
            role: "Operations",
            image: "/images/team_management.jpg",
            bio: "Managing team operations and coordination for maximum impact."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

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
    <div className="py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 mb-3 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
            Foundation Leaders
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-slate-100">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-xl mx-auto dark:text-slate-400 text-sm md:text-base">
            These individuals are the backbone of our foundation, driving our mission forward.
          </p>
        </div>

        <div className="overflow-x-auto pb-6 -mx-4 px-4">
          <div className="flex space-x-6 lg:space-x-8 w-max min-w-full">
            {leaders.map((leader, index) => (
              <div key={`${leader.id}-${index}`} className="flex-shrink-0 w-72">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-200 dark:border-slate-700">
                  <div className="relative overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <h3 className="text-lg font-bold">{leader.name}</h3>
                        <p className="text-sm text-[#ec4899]">{leader.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">{leader.name}</h3>
                    <p className="text-[#ec4899] mb-2 font-medium">{leader.role}</p>
                    <p className="text-gray-600 dark:text-slate-300 text-sm">{leader.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationLeadersSlider;