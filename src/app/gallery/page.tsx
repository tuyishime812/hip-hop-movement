'use client';

import React from 'react';
import Link from 'next/link';
import ImageGallery from '@/components/ImageGallery';
import DonationGallery from '@/components/DonationGallery';
import ArtistSupportGallery from '@/components/ArtistSupportGallery';
import ArtsSupportGallery from '@/components/ArtsSupportGallery';
import HipHopMovementGallery from '@/components/HipHopMovementGallery';
import YoungTalentGallery from '@/components/YoungTalentGallery';
import SupportElderWomenGallery from '@/components/SupportElderWomenGallery';
import { useTheme } from '@/components/ThemeProvider';

const GalleryPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm py-4 px-6 shadow-md dark:bg-slate-900/90">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#ec4899]">
            HIP-HOP MOVEMENT
          </Link>
          <Link href="/" className="hiphop-btn hiphop-btn-secondary">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-24">
        <DonationGallery />
        <ArtistSupportGallery />
        <ArtsSupportGallery />
        <HipHopMovementGallery />
        <YoungTalentGallery />
        <SupportElderWomenGallery />
        <ImageGallery />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Hip-Hop Movement Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GalleryPage;