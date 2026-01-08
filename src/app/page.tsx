'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NotificationSystem from '@/components/NotificationSystem';
import Chatbot from '@/components/Chatbot';
import DonationGallery from '@/components/DonationGallery';
import ArtistSupportGallery from '@/components/ArtistSupportGallery';
import ArtsSupportGallery from '@/components/ArtsSupportGallery';
import HipHopMovementGallery from '@/components/HipHopMovementGallery';
import YoungTalentGallery from '@/components/YoungTalentGallery';
import SupportElderWomenGallery from '@/components/SupportElderWomenGallery';
import LeadersSlider from '@/components/LeadersSlider';
import { useTheme } from '@/components/ThemeProvider';
import { apiService } from '@/services/api';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl py-4 px-6 shadow-sm dark:bg-slate-900/80 border-b border-gray-200/30 dark:border-slate-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#ec4899] tracking-tight">
          HIP-HOP MOVEMENT
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none dark:text-slate-100 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
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
          <Link href="#about" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-all duration-300 relative group dark:text-slate-200 dark:hover:text-[#93c5fd]">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#mission" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-all duration-300 relative group dark:text-slate-200 dark:hover:text-[#93c5fd]">
            Mission
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/foundation-leaders" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-all duration-300 relative group dark:text-slate-200 dark:hover:text-[#93c5fd]">
            Foundation Leaders
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/gallery" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-all duration-300 relative group dark:text-slate-200 dark:hover:text-[#93c5fd]">
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <a href="https://wa.me/265881434700" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-all duration-300 relative group dark:text-slate-200 dark:hover:text-[#93c5fd]">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <Link href="#contact" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-all duration-300 relative group dark:text-slate-200 dark:hover:text-[#93c5fd]">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Notification, Theme Toggle, and Donate Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-700 hover:text-[#3b82f6] focus:outline-none dark:text-slate-200 dark:hover:text-[#93c5fd] rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
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
              className="hiphop-btn hiphop-btn-primary relative group overflow-hidden"
            >
              <span className="relative z-10">Support Us</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 py-4 border-t dark:border-slate-700">
          <div className="flex flex-col space-y-4">
            <Link href="#about" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd] py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#mission" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd] py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>Mission</Link>
            <Link href="/foundation-leaders" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd] py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>Foundation Leaders</Link>
            <Link href="/gallery" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd] py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>Gallery</Link>
            
            <a href="https://wa.me/265881434700" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd] py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>Shop</a>
            <Link href="#contact" className="font-medium text-gray-700 hover:text-[#3b82f6] transition-colors dark:text-slate-200 dark:hover:text-[#93c5fd] py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link
              href="#donate"
              className="hiphop-btn hiphop-btn-primary w-full text-center mt-2 relative group overflow-hidden"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">Support Us</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-[#3b82f6] focus:outline-none dark:text-slate-200 dark:hover:text-[#93c5fd] rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 pt-16 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-center bg-cover opacity-5 dark:opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-[#ec4899]/10 dark:from-[#3b82f6]/5 dark:to-[#ec4899]/5"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 mb-12 lg:mb-0 fade-in">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium flex items-center">
                  <img
                    src="/images/hiphop logo.png"
                    alt="Hip-Hop Logo"
                    className="w-6 h-6 mr-2 object-contain"
                  />
                  Hip-Hop For Humanity
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                <span className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] bg-clip-text text-transparent">Hip-Hop</span> <br />
                <span className="text-gray-800 dark:text-slate-100">For Humanity</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-slate-300 text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
                From the streets to the future. Building bridges through music, culture, and community to empower lives and transform communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="#donate" className="hiphop-btn hiphop-btn-primary relative overflow-hidden group">
                  <span className="relative z-10">Support Our Cause</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                </Link>
                <Link href="/gallery" className="hiphop-btn hiphop-btn-secondary relative overflow-hidden group">
                  <span className="relative z-10">View Gallery</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center fade-in-delay-1 parallax-scroll">
            <div className="relative w-full max-w-md">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#ec4899] rounded-2xl shadow-2xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899] to-[#3b82f6] rounded-2xl shadow-2xl transform -rotate-6"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full h-full flex items-center justify-center overflow-hidden">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center dark:from-slate-700 dark:to-slate-800" />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-amber-500 w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl animate-float z-20">
                <span className="text-4xl">🎵</span>
              </div>
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-pink-500 to-rose-500 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl animate-float z-20" style={{ animationDelay: '1s' }}>
                <span className="text-3xl">🎤</span>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl animate-float z-20" style={{ animationDelay: '0.5s' }}>
                <span className="text-2xl">🎧</span>
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
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
            About Our Foundation
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Foundation</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-slate-300 mb-8 text-xl">
            The Foundation Hip-Hop Movement is built on the belief that music, culture, and community can transform lives.
            Hip-hop is more than entertainment—it is a force for humanity, a bridge from the streets to the future,
            and a rhythm that empowers every generation. We're dedicated to using the power of hip-hop culture to create
            positive change in communities worldwide.
          </p>

          <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl border border-gray-200 dark:from-slate-700/50 dark:to-slate-800/50 dark:border-slate-600 shadow-lg dark:shadow-slate-900/30 backdrop-blur-sm">
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

      </div>
    </section>
  );
};

const MissionVisionSection = () => {
  return (
    <section id="mission" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
            Our Mission & Vision
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-slate-100">Our Mission & Vision</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl shadow-lg border border-gray-200 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#ec4899] flex items-center justify-center mr-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Our Mission</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start group/item">
                <span className="text-2xl mr-3 mt-1 group-hover/item:text-[#3b82f6] transition-colors">👵</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Support for Elders:</strong> Provide care, respect, and assistance to elderly members of society, ensuring they feel valued and included.</span>
              </li>
              <li className="flex items-start group/item">
                <span className="text-2xl mr-3 mt-1 group-hover/item:text-[#3b82f6] transition-colors">🤝</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Help for Vulnerable Groups:</strong> Stand beside those who are marginalized, offering protection, resources, and hope.</span>
              </li>
              <li className="flex items-start group/item">
                <span className="text-2xl mr-3 mt-1 group-hover/item:text-[#3b82f6] transition-colors">💙</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Care for the Poor and Orphans:</strong> Extend compassion and practical support to those in poverty and to orphans, giving them opportunities to thrive.</span>
              </li>
              <li className="flex items-start group/item">
                <span className="text-2xl mr-3 mt-1 group-hover/item:text-[#3b82f6] transition-colors">💼</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Business Opportunities:</strong> Create pathways for entrepreneurship and sustainable income, empowering communities to grow economically.</span>
              </li>
              <li className="flex items-start group/item">
                <span className="text-2xl mr-3 mt-1 group-hover/item:text-[#3b82f6] transition-colors">🎨</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Encouragement for Artists:</strong> Support upcoming hip-hop artists and creatives, giving them platforms, mentorship, and recognition to build their careers.</span>
              </li>
              <li className="flex items-start group/item">
                <span className="text-2xl mr-3 mt-1 group-hover/item:text-[#3b82f6] transition-colors">🌍</span>
                <span className="text-gray-600 dark:text-slate-300"><strong className="text-[#3b82f6] dark:text-[#93c5fd]">Community Empowerment:</strong> Use hip-hop as a tool to unite people, inspire social change, and amplify voices that are often unheard.</span>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl dark:from-slate-700 dark:to-slate-800 border border-gray-200 dark:border-slate-600">
              <h4 className="font-bold text-lg text-[#3b82f6] dark:text-[#93c5fd] mb-3 flex items-center">
                <span className="mr-2">🚀</span> Our Strategic Approach:
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-slate-300 text-sm">
                <li className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] mr-2">•</span>
                  Developing sustainable community programs that address immediate needs while building long-term solutions
                </li>
                <li className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] mr-2">•</span>
                  Creating partnerships with local organizations, schools, and businesses to maximize our impact
                </li>
                <li className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] mr-2">•</span>
                  Providing education and training that combines hip-hop culture with practical life skills
                </li>
                <li className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] mr-2">•</span>
                  Establishing mentorship networks that connect experienced and emerging artists
                </li>
                <li className="flex items-start">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] mr-2">•</span>
                  Advocating for policy changes that support the hip-hop community and social justice
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl shadow-lg border border-gray-200 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ec4899] to-[#3b82f6] flex items-center justify-center mr-4">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Vision Statement</h3>
            </div>
            <p className="text-xl italic mb-6 text-gray-800 dark:text-slate-100 font-medium">"Hip-Hop for Humanity, From the Streets to the Future"</p>

            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-slate-100 flex items-center">
              <span className="mr-2">📜</span> Our Manifesto
            </h4>
            <p className="text-gray-700 dark:text-slate-300 mb-6">
              We envision a world where hip-hop culture serves as a universal language for positive change.
              Our foundation believes in the transformative power of music, art, and community engagement
              to bridge divides, amplify underrepresented voices, and create opportunities for all.
              We are committed to honoring hip-hop's roots while building pathways to a more inclusive and equitable future.
            </p>

            <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl dark:from-slate-700 dark:to-slate-800 border border-gray-200 dark:border-slate-600">
              <h5 className="font-bold text-lg text-[#3b82f6] dark:text-[#93c5fd] mb-4 flex items-center">
                <span className="mr-2">💎</span> Our Core Values:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Respect for hip-hop culture and its community</span>
                </div>
                <div className="flex items-start p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Commitment to social justice</span>
                </div>
                <div className="flex items-start p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Empowerment through creativity</span>
                </div>
                <div className="flex items-start p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Building bridges across communities</span>
                </div>
                <div className="flex items-start p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Sustainable community development</span>
                </div>
                <div className="flex items-start p-3 bg-white dark:bg-slate-700 rounded-lg">
                  <span className="text-[#3b82f6] dark:text-[#93c5fd] font-bold mr-2">•</span>
                  <span className="text-gray-600 dark:text-slate-300 text-sm">Artistic excellence and innovation</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl dark:from-slate-700 dark:to-slate-800 border border-gray-200 dark:border-slate-600">
              <h5 className="font-bold text-lg text-[#ec4899] dark:text-[#ec4899] mb-4 flex items-center">
                <span className="mr-2">📊</span> Impact & Goals:
              </h5>
              <ul className="space-y-2 text-gray-600 dark:text-slate-300 text-sm">
                <li className="flex items-start">
                  <span className="text-[#ec4899] dark:text-[#ec4899] mr-2">•</span>
                  Expand our programs to reach 10,000+ community members annually
                </li>
                <li className="flex items-start">
                  <span className="text-[#ec4899] dark:text-[#ec4899] mr-2">•</span>
                  Support 500+ emerging artists with resources and opportunities
                </li>
                <li className="flex items-start">
                  <span className="text-[#ec4899] dark:text-[#ec4899] mr-2">•</span>
                  Establish 10+ community centers worldwide by 2030
                </li>
                <li className="flex items-start">
                  <span className="text-[#ec4899] dark:text-[#ec4899] mr-2">•</span>
                  Launch scholarship programs for underprivileged youth
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadersSection = () => {
  return (
    <section id="leaders" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <LeadersSlider />
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section id="donate" className="section-padding bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 bg-white/30 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
            Join Our Movement
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-white">Join Our Movement</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-center text-white/90">
            Support our mission by donating or shopping our merchandise.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="https://wa.me/265881434700" target="_blank" rel="noopener noreferrer" className="hiphop-btn bg-white text-[#ec4899] hover:bg-gray-100 relative overflow-hidden group px-8 py-4 text-lg font-medium">
            <span className="relative z-10">Donate Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </a>
          <a href="https://wa.me/265881434700" target="_blank" rel="noopener noreferrer" className="hiphop-btn bg-transparent border-2 border-white hover:bg-white/10 relative overflow-hidden group px-8 py-4 text-lg font-medium">
            <span className="relative z-10">Shop Merchandise</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 opacity-20"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

const FoundationLeadersSection = () => {
  const leaders = [
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
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
            Foundation Leaders
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-slate-100">Foundation Leaders</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
          <p className="mt-6 text-gray-700 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            Meet the dedicated individuals who lead our mission to empower communities through hip-hop culture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-gradient-to-b from-white to-slate-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 overflow-hidden text-center group">
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
          ))}
        </div>
      </div>
    </section>
  );
};

const FoundationStoreSection = () => {
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
    <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] rounded-full text-white text-sm font-medium">
            Foundation Store
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-slate-100">Foundation Store</h2>
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

        {/* Video Section */}
        <div className="mt-20">
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
        <div className="mt-16 bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white rounded-2xl p-8 text-center">
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
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 mb-4 bg-white/30 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30">
            Stay Connected
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-white">Stay Connected</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
            Join our community and stay updated with the latest news, events, and opportunities in the hip-hop movement.
          </p>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-grow px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`hiphop-btn bg-white text-[#ec4899] hover:bg-gray-100 relative overflow-hidden group px-6 py-4 font-medium ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10">{isLoading ? 'Subscribing...' : 'Subscribe'}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-6 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-5xl mb-4 text-center">✅</div>
            <p className="text-lg text-center">Thank you for subscribing to our newsletter!</p>
            <p className="text-sm mt-2 text-center">You'll receive updates from the Hip-Hop Movement Foundation.</p>
          </div>
        )}

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
            <p className="text-gray-400 mb-6">
              Hip-Hop for Humanity, From the Streets to the Future
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#ec4899] bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ec4899] bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ec4899] bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-[#ec4899] transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span> About Us</a></li>
              <li><a href="#mission" className="text-gray-400 hover:text-[#ec4899] transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span> Our Mission</a></li>
              <li><a href="/foundation-leaders" className="text-gray-400 hover:text-[#ec4899] transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span> Foundation Leaders</a></li>
              <li><a href="https://wa.me/265881434700" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ec4899] transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span> Shop</a></li>
              <li><a href="#donate" className="text-gray-400 hover:text-[#ec4899] transition-colors duration-300 flex items-center group">
                <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span> Donate</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2 mt-1">✉️</span>
                hiphopmovement4@gmail.com
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">📱</span>
                +265881434700
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">📱</span>
                +265888047051
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1">🏛️</span>
                Malawi, Blantyre
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-gray-800 bg-gray-800 border border-gray-700 focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] transition-all duration-300"
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
                  className="w-full px-4 py-3 rounded-lg text-gray-800 bg-gray-800 border border-gray-700 focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] transition-all duration-300"
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
                  className="w-full px-4 py-3 rounded-lg text-gray-800 bg-gray-800 border border-gray-700 focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg text-gray-800 bg-gray-800 border border-gray-700 focus:border-[#ec4899] focus:ring-1 focus:ring-[#ec4899] transition-all duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] px-6 py-3 rounded-lg w-full hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                disabled={isSubmitting}
              >
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-[#ec4899] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
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


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <LeadersSection />
      <FoundationStoreSection />
      <DonationGallery />
      <ArtistSupportGallery />
      <ArtsSupportGallery />
      <HipHopMovementGallery />
      <YoungTalentGallery />
      <SupportElderWomenGallery />
      <div className="section-divider-wave"></div>
      <CTASection />
      <NewsletterSection />
      <Footer />
      <Chatbot />
    </div>
  );
}
