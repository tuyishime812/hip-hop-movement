'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NotificationSystem from '@/components/NotificationSystem';
import Chatbot from '@/components/Chatbot';
import { useTheme } from '@/components/ThemeProvider';
import { apiService } from '@/services/api';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm py-4 px-6 shadow-md dark:bg-slate-900/90">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#ec4899]">
          HIP-HOP MOVEMENT
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none dark:text-slate-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="#about" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]">About</Link>
          <Link href="#hiphop-roots" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]">Hip-Hop Culture</Link>
          <Link href="#mission" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]">Mission</Link>
          <Link href="#members" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]">Members</Link>
          <Link href="/news" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]">News</Link>
          <Link href="#store" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]">Impact</Link>
          <Link href="#contact" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]">Contact</Link>
        </div>

        {/* Notification, Theme Toggle, and Donate Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-700 hover:text-[#3b82f6] focus:outline-none dark:text-slate-200 dark:hover:text-[#93c5fd]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <NotificationSystem />
          <div className={`hidden md:block ${isOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}>
            <Link
              href="#donate"
              className="hiphop-btn hiphop-btn-primary"
            >
              Support Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 py-4 border-t dark:border-slate-700">
          <div className="flex flex-col space-y-4">
            <Link href="#about" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#hiphop-roots" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]" onClick={() => setIsOpen(false)}>Hip-Hop Culture</Link>
            <Link href="#mission" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]" onClick={() => setIsOpen(false)}>Mission</Link>
            <Link href="#members" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]" onClick={() => setIsOpen(false)}>Members</Link>
            <Link href="/news" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]" onClick={() => setIsOpen(false)}>News</Link>
            <Link href="#store" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]" onClick={() => setIsOpen(false)}>Impact</Link>
            <Link href="#contact" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd]" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link
              href="#donate"
              className="hiphop-btn hiphop-btn-primary w-full text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Support Us
            </Link>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-center">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-[#3b82f6] focus:outline-none dark:text-slate-200 dark:hover:text-[#93c5fd]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className="ml-4">
              <NotificationSystem />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 pt-16 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-center bg-cover opacity-5 dark:opacity-10"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0 fade-in">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                <span className="text-gradient">Hip-Hop</span> <br />
                <span className="text-gray-800 dark:text-slate-100">For Humanity</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-slate-300 text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
                From the streets to the future. Building bridges through music, culture, and community to empower lives and transform communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="#donate" className="hiphop-btn hiphop-btn-primary pulse">
                  Support Our Cause
                </Link>
                <Link href="#hiphop-roots" className="hiphop-btn hiphop-btn-secondary">
                  Learn About Hip-Hop
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center fade-in-delay-1">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#3b82f6] to-[#ec4899] rounded-full flex items-center justify-center shadow-2xl">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed rounded-xl w-56 h-56 md:w-72 md:h-72 rounded-full flex items-center justify-center dark:from-slate-700 dark:to-slate-800" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-amber-500 w-32 h-32 rounded-full flex items-center justify-center shadow-xl animate-float">
                <span className="text-5xl">🎵</span>
              </div>
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-pink-500 to-rose-500 w-24 h-24 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-4xl">🎤</span>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                <span className="text-3xl">🎧</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Foundation</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-slate-300 mb-8">
            The Foundation Hip-Hop Movement is built on the belief that music, culture, and community can transform lives.
            Hip-hop is more than entertainment—it is a force for humanity, a bridge from the streets to the future,
            and a rhythm that empowers every generation. We're dedicated to using the power of hip-hop culture to create
            positive change in communities worldwide.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-gray-100 dark:bg-slate-700/50 dark:border-slate-600 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Story</h3>
            <p className="text-gray-700 dark:text-slate-300">
              Founded with the vision of using hip-hop culture as a tool for social change, we've grown from a small group
              of passionate individuals to a movement impacting thousands of lives. Our journey began in the streets where
              hip-hop was born, giving voice to the unheard and creating opportunities for the marginalized. Today,
              we continue to honor hip-hop's roots while building its future, connecting communities, and empowering
              individuals to create positive change in their environments.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "1500+", label: "Community Members" },
            { value: "50+", label: "Events Organized" },
            { value: "200+", label: "Artists Supported" },
            { value: "35+", label: "Programs Running" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-6 cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#3b82f6] dark:text-[#93c5fd]">{stat.value}</div>
              <div className="mt-2 text-gray-600 dark:text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MissionVisionSection = () => {
  return (
    <section id="mission" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Mission & Vision</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 transition-all duration-300 cubic-bezier(0.25, 0.8, 0.25, 1) hover:-translate-y-1 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#3b82f6] dark:text-[#93c5fd]">
              🎯 Our Mission
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-xl mr-3">👵</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Support for Elders:</strong> Provide care, respect, and assistance to elderly members of society, ensuring they feel valued and included.</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl mr-3">🤝</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Help for Vulnerable Groups:</strong> Stand beside those who are marginalized, offering protection, resources, and hope.</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl mr-3">💙</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Care for the Poor and Orphans:</strong> Extend compassion and practical support to those in poverty and to orphans, giving them opportunities to thrive.</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl mr-3">💼</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Business Opportunities:</strong> Create pathways for entrepreneurship and sustainable income, empowering communities to grow economically.</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl mr-3">🎨</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Encouragement for Artists:</strong> Support upcoming hip-hop artists and creatives, giving them platforms, mentorship, and recognition to build their careers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-xl mr-3">🌍</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Community Empowerment:</strong> Use hip-hop as a tool to unite people, inspire social change, and amplify voices that are often unheard.</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg dark:from-slate-600 dark:to-slate-700">
              <h4 className="font-bold text-[#3b82f6] dark:text-[#93c5fd] mb-2">Our Strategic Approach:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-slate-300 text-sm">
                <li>Developing sustainable community programs that address immediate needs while building long-term solutions</li>
                <li>Creating partnerships with local organizations, schools, and businesses to maximize our impact</li>
                <li>Providing education and training that combines hip-hop culture with practical life skills</li>
                <li>Establishing mentorship networks that connect experienced and emerging artists</li>
                <li>Advocating for policy changes that support the hip-hop community and social justice</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 transition-all duration-300 cubic-bezier(0.25, 0.8, 0.25, 1) hover:-translate-y-1 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#3b82f6] dark:text-[#93c5fd]">
              🌟 Vision Statement
            </h3>
            <p className="text-xl italic mb-6 text-gray-800 dark:text-slate-100">"Hip-Hop for Humanity, From the Streets to the Future"</p>

            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-slate-100">📜 Our Manifesto</h4>
            <p className="text-gray-700 dark:text-slate-300">
              We envision a world where hip-hop culture serves as a universal language for positive change.
              Our foundation believes in the transformative power of music, art, and community engagement
              to bridge divides, amplify underrepresented voices, and create opportunities for all.
              We are committed to honoring hip-hop's roots while building pathways to a more inclusive and equitable future.
            </p>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg dark:bg-slate-600/30">
              <h5 className="font-bold text-[#3b82f6] dark:text-[#93c5fd] mb-3">Our Core Values:</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Respect for hip-hop culture and its community</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Commitment to social justice</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Empowerment through creativity</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Building bridges across communities</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Sustainable community development</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Artistic excellence and innovation</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg dark:bg-slate-600/30">
              <h5 className="font-bold text-[#3b82f6] dark:text-[#93c5fd] mb-2">Impact & Goals:</h5>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-slate-300 text-sm">
                <li>Expand our programs to reach 10,000+ community members annually</li>
                <li>Support 500+ emerging artists with resources and opportunities</li>
                <li>Establish 10+ community centers worldwide by 2030</li>
                <li>Launch scholarship programs for underprivileged youth</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MembersSection = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await apiService.getArtists();
        setArtists(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artists:", error);
        // Fallback to mock data in case of API error
        const mockArtists = [
          {
            id: 1,
            name: "MC Legend",
            genre: "Rap/Hip-Hop",
            bio: "Pioneer in conscious rap, using lyrics to inspire social change.",
            image_url: "/placeholder-member.jpg"
          },
          {
            id: 2,
            name: "DJ Harmony",
            genre: "Producer/DJ",
            bio: "Creating beats that bring communities together.",
            image_url: "/placeholder-member.jpg"
          },
          {
            id: 3,
            name: "Graffiti Artist Maya",
            genre: "Visual Art",
            bio: "Turns urban spaces into galleries of expression.",
            image_url: "/placeholder-member.jpg"
          },
          {
            id: 4,
            name: "Breakdancer Phoenix",
            genre: "Dance",
            bio: "Moves that tell stories of resilience and strength.",
            image_url: "/placeholder-member.jpg"
          },
          {
            id: 5,
            name: "Poet Sage",
            genre: "Spoken Word",
            bio: "Words that heal and connect hearts across cultures.",
            image_url: "/placeholder-member.jpg"
          }
        ];
        setArtists(mockArtists);
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <section id="members" className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Foundation Artists</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] mx-auto"></div>
            <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
              Loading artists...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="members" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Foundation Artists</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] mx-auto"></div>
          <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
            Meet the talented artists in our movement
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden text-center">
              <img
                src={artist.image_url}
                alt={artist.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/vercel.svg'; // fallback image
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{artist.name}</h3>
                <p className="text-[#ec4899] mb-3">{artist.genre}</p>
                <p className="text-gray-600 text-sm">{artist.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StoriesSection = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const stories = [
    {
      id: 1,
      title: "From the Streets to the Stage",
      content: "How our foundation helped a young artist from the Bronx transform their passion into a career, now performing at major venues and giving back to their community.",
      author: "Maria Rodriguez",
      role: "Former Program Participant"
    },
    {
      id: 2,
      title: "Building Bridges Through Hip-Hop",
      content: "A story of how our community workshops brought together diverse youth, fostering understanding and cooperation across cultural divides.",
      author: "James Washington",
      role: "Community Leader"
    },
    {
      id: 3,
      title: "Empowering the Next Generation",
      content: "After losing his way after high school, our mentorship program helped him find purpose through music production, now running his own studio and teaching others.",
      author: "David Kim",
      role: "Music Producer"
    },
    {
      id: 4,
      title: "Creating Opportunities Where None Existed",
      content: "Through our entrepreneurship program, we've enabled 50+ artists to start their own businesses, creating sustainable income and jobs in their communities.",
      author: "Aisha Al-Hassan",
      role: "Program Director"
    }
  ];

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
  };

  const goToStory = (index: number) => {
    setCurrentStoryIndex(index);
  };

  return (
    <section id="stories" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Success Stories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real stories of transformation through hip-hop culture and community support
          </p>
        </div>

        {/* Carousel for stories */}
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px]">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentStoryIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 h-full">
                  <h3 className="text-xl font-bold mb-4 text-[#3b82f6] dark:text-[#93c5fd]">{story.title}</h3>
                  <p className="text-gray-700 mb-6 dark:text-slate-300">{story.content}</p>
                  <div className="flex items-center mt-6">
                    <div className="ml-4">
                      <p className="text-gray-900 font-medium dark:text-slate-100">{story.author}</p>
                      <p className="text-gray-600 text-sm dark:text-slate-400">{story.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
              <div className="flex space-x-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStory(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStoryIndex ? 'bg-[#3b82f6]' : 'bg-gray-300 dark:bg-slate-600'
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={prevStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-600 transition-colors z-20"
              aria-label="Previous story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-600 transition-colors z-20"
              aria-label="Next story"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Story indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStory(index)}
              className={`w-8 h-1 transition-colors ${
                index === currentStoryIndex ? 'bg-[#3b82f6]' : 'bg-gray-300 dark:bg-slate-600'
              }`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StoreSection = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await apiService.getDonations();
        setDonations(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        // Fallback to mock data in case of API error
        const mockDonations = [
          {
            id: 1,
            donor_name: "Anonymous",
            amount: 250,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 2,
            donor_name: "Music Lover",
            amount: 100,
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 3,
            donor_name: "Community Supporter",
            amount: 500,
            created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 4,
            donor_name: "Hip-Hop Fan",
            amount: 75,
            created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          }
        ];
        setDonations(mockDonations);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
      <section id="store" className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Impact</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              See the impact of your donations and support
            </p>
          </div>
          <div className="text-center">
            <p>Loading recent donations...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="store" className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Impact</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            See the impact of your donations and support
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Recent Donations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {donations.map((donation) => (
              <div key={donation.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm">Donated by: {donation.donor_name}</p>
                  <p className="text-2xl font-bold text-[#ec4899]">${donation.amount}</p>
                  <p className="text-gray-500 text-xs mt-1">{new Date(donation.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 mb-6">
            Want to support us in other ways? Check out our donation options below.
          </p>
          <Link href="#donate" className="inline-block hiphop-btn hiphop-btn-primary">
            Make a Donation
          </Link>
        </div>
      </div>
    </section>
  );
};

const MerchandiseSection = () => {
  const [merchandise, setMerchandise] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await apiService.getMerchandise();
        setMerchandise(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
        // Fallback to mock data in case of API error
        const mockMerchandise = [
          {
            id: 1,
            name: "Hip-Hop Foundation T-Shirt",
            description: "Premium cotton t-shirt with our foundation logo",
            price: 25.00,
            image_url: "/merch-tshirt.jpg",
            category: "Clothing",
            stock_quantity: 50
          },
          {
            id: 2,
            name: "Foundation Hoodie",
            description: "Comfortable hoodie with hip-hop inspired design",
            price: 45.00,
            image_url: "/merch-hoodie.jpg",
            category: "Clothing",
            stock_quantity: 30
          },
          {
            id: 3,
            name: "Hip-Hop Movement Cap",
            description: "Adjustable cap with foundation logo",
            price: 20.00,
            image_url: "/merch-cap.jpg",
            category: "Accessories",
            stock_quantity: 40
          },
          {
            id: 4,
            name: "Foundation Vinyl Record",
            description: "Limited edition vinyl with exclusive tracks",
            price: 35.00,
            image_url: "/merch-vinyl.jpg",
            category: "Music",
            stock_quantity: 20
          }
        ];
        setMerchandise(mockMerchandise);
        setLoading(false);
      }
    };

    fetchMerchandise();
  }, []);

  if (loading) {
    return (
      <section id="merchandise" className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Foundation Store</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Browse our official merchandise to support the foundation
            </p>
          </div>
          <div className="text-center">
            <p>Loading merchandise...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="merchandise" className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Foundation Store</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Browse our official merchandise to support the foundation
          </p>
        </div>

        <div className="mb-8 flex justify-center space-x-4">
          {['All', 'Clothing', 'Accessories', 'Music'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${category === 'All' ? 'bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white' : 'border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {merchandise.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <img
                  src={item.image_url || '/vercel.svg'}
                  alt={item.name}
                  className="w-3/4 h-3/4 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/vercel.svg'; // fallback image
                  }}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <span className="text-lg font-bold text-[#ec4899]">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {item.category}
                  </span>
                  <button className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 mb-6">
            All proceeds from our merchandise support our community programs and artist development initiatives.
          </p>
          <Link href="#donate" className="inline-block hiphop-btn hiphop-btn-primary">
            Support Our Cause
          </Link>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiService.getEvents();
        setEvents(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Fallback to mock data in case of API error
        const mockEvents = [
          {
            id: 1,
            title: "Hip-Hop Community Outreach",
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            location: "Community Center",
            description: "Join us as we spread awareness about our foundation's mission through music and art."
          },
          {
            id: 2,
            title: "Youth Art Workshop",
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            location: "Local School",
            description: "Creative workshop for young artists to express themselves through various art forms."
          },
          {
            id: 3,
            title: "Fundraiser Concert",
            date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
            location: "City Park",
            description: "Evening concert featuring local artists to support our community programs."
          }
        ];
        setEvents(mockEvents);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section id="donate" className="section-padding bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Movement</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-center">
            Support our mission by donating, volunteering, or attending our events.
          </p>
          <p>Loading upcoming events...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="donate" className="section-padding bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Join Our Movement</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-center">
          Support our mission by donating, volunteering, or attending our events.
        </p>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event) => (
              <div key={event.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                <p className="text-gray-200 mb-2">{new Date(event.date).toLocaleString()}</p>
                <p className="text-gray-300 mb-4">{event.location}</p>
                <p className="text-sm text-gray-300">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="hiphop-btn bg-white text-[#ec4899] hover:bg-gray-100">
            Donate Now
          </button>
          <button className="hiphop-btn bg-transparent border-2 border-white hover:bg-white/10">
            Volunteer
          </button>
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real implementation, we would call an API to subscribe the user
    // For now, we'll simulate this with a timeout
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="hiphop-h2 text-white mb-4">Stay Connected</h2>
        <p className="hiphop-p text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Join our community and stay updated with the latest news, events, and opportunities in the hip-hop movement.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-grow px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`hiphop-btn hiphop-btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-4 bg-white/20 rounded-xl">
            <p className="text-lg">Thank you for subscribing to our newsletter!</p>
            <p className="text-sm mt-2">You'll receive updates from the Hip-Hop Movement Foundation.</p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="hover-lift cursor-pointer">
            <div className="text-3xl mb-2">🎧</div>
            <p>Music Updates</p>
          </div>
          <div className="hover-lift cursor-pointer">
            <div className="text-3xl mb-2">📅</div>
            <p>Event Invites</p>
          </div>
          <div className="hover-lift cursor-pointer">
            <div className="text-3xl mb-2">🎤</div>
            <p>Artist Spotlights</p>
          </div>
          <div className="hover-lift cursor-pointer">
            <div className="text-3xl mb-2">💬</div>
            <p>Community News</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] mb-4">
              HIP-HOP MOVEMENT
            </h3>
            <p className="text-gray-400 mb-4">
              Hip-Hop for Humanity, From the Streets to the Future
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#mission" className="text-gray-400 hover:text-white">Our Mission</a></li>
              <li><a href="#members" className="text-gray-400 hover:text-white">Artists</a></li>
              <li><a href="#store" className="text-gray-400 hover:text-white">Impact</a></li>
              <li><a href="#donate" className="text-gray-400 hover:text-white">Donate</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>tuyishimemartin007@gmail.com</li>
              <li>+265886986384</li>
              <li>Hip-Hop Movement Foundation</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg text-gray-800"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] px-6 py-2 rounded-lg w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitSuccess && (
                <p className="text-green-400 text-center mt-2">Message sent successfully!</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hip-Hop Movement Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// New Hip Hop Culture Education Section
const HipHopCultureSection = () => {
  return (
    <section id="hiphop-roots" className="section-padding bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">The Roots of Hip-Hop</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto"></div>
          <p className="mt-6 text-gray-700 max-w-3xl mx-auto dark:text-slate-300">
            Hip-Hop is more than music—it's a cultural movement that emerged from the streets as a voice for the unheard.
            Learn about the four foundational elements that form the backbone of Hip-Hop culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 p-6 text-center bg-white dark:bg-slate-700">
            <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🎤</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#3b82f6] dark:text-[#93c5fd]">Rap & MCing</h3>
            <p className="text-gray-600 dark:text-slate-300">Rhythmic vocal delivery that became the voice of social consciousness and storytelling.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 p-6 text-center bg-white dark:bg-slate-700">
            <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🎧</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#3b82f6] dark:text-[#93c5fd]">DJing</h3>
            <p className="text-gray-600 dark:text-slate-300">The art of mixing and scratching records to create new sounds and breakbeats.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 p-6 text-center bg-white dark:bg-slate-700">
            <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🎨</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#3b82f6] dark:text-[#93c5fd]">Graffiti</h3>
            <p className="text-gray-600 dark:text-slate-300">Visual art form that transformed urban walls into galleries of expression.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 p-6 text-center bg-white dark:bg-slate-700">
            <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">💃</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#3b82f6] dark:text-[#93c5fd]">Breakdancing</h3>
            <p className="text-gray-600 dark:text-slate-300">Energetic dance style that embodies the rhythm and culture of Hip-Hop.</p>
          </div>
        </div>

        {/* Interactive Timeline of Hip-Hop History */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-slate-100">Hip-Hop Through the Decades</h3>
          <div className="relative">
            {/* Vertical timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#3b82f6] to-[#ec4899]"></div>

              {/* Timeline events */}
              <div className="space-y-12">
                {[
                  { year: "1973", event: "DJ Kool Herc's block party in Bronx", desc: "The birth of Hip-Hop culture" },
                  { year: "1979", event: "First recorded Hip-Hop songs", desc: "Rapper's Delight by Sugarhill Gang" },
                  { year: "1980s", event: "Golden Age begins", desc: "Diversification of styles and themes" },
                  { year: "1990s", event: "Mainstream breakthrough", desc: "Hip-Hop becomes global phenomenon" },
                  { year: "2000s", event: "Commercial peak", desc: "Digital revolution in music" },
                  { year: "Today", event: "Global movement", desc: "Hip-Hop as cultural force worldwide" }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 p-4 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white p-4 rounded-lg shadow-md dark:bg-slate-700">
                        <h4 className="font-bold text-lg text-[#3b82f6] dark:text-[#93c5fd]">{item.year}</h4>
                        <h5 className="font-semibold mb-1">{item.event}</h5>
                        <p className="text-sm text-gray-600 dark:text-slate-300">{item.desc}</p>
                      </div>
                    </div>
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stories Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-slate-100">Our Impact Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-slate-700">
              <div className="text-[#3b82f6] text-3xl mb-3">🌟</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-slate-100">Youth Empowerment</h4>
              <p className="text-gray-600 dark:text-slate-300">
                Through our music and art programs, we've helped over 500 young people find their voice and express themselves positively.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-slate-700">
              <div className="text-[#3b82f6] text-3xl mb-3">🤝</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-slate-100">Community Connection</h4>
              <p className="text-gray-600 dark:text-slate-300">
                Our events have brought together diverse communities, fostering understanding and unity through the power of Hip-Hop culture.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-slate-700">
              <div className="text-[#3b82f6] text-3xl mb-3">🚀</div>
              <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-slate-100">Artist Development</h4>
              <p className="text-gray-600 dark:text-slate-300">
                We've provided mentorship and resources to emerging artists, helping them navigate the music industry and build sustainable careers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-gray-100 dark:bg-slate-700/50 dark:border-slate-600">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-slate-100">Our Commitment</h3>
          <p className="text-gray-700 text-center max-w-4xl mx-auto dark:text-slate-300">
            At the Hip-Hop Movement Foundation, we honor the culture's origins while building its future.
            We believe in the power of these elements to transform lives, create opportunities, and unite communities.
            Through education, mentorship, and cultural preservation, we ensure Hip-Hop continues to be a force for positive change.
          </p>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HipHopCultureSection />
      <MissionVisionSection />
      <MembersSection />
      <StoriesSection />
      <StoreSection />
      <MerchandiseSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
      <Chatbot />
    </div>
  );
}