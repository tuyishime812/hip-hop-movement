'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ArtistSupportGallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  // Artist support images
  const artistSupportImages = [
    {
      id: 1,
      src: '/images/artist_support.jpeg',
      alt: 'Artist Support',
      caption: 'Supporting upcoming hip-hop artists in their creative journey'
    },
    {
      id: 2,
      src: '/images/studio_setup.jpg',
      alt: 'Studio Setup',
      caption: 'Professional recording studio setup for emerging artists'
    },
    {
      id: 3,
      src: '/images/studio_time.jpg',
      alt: 'Studio Time',
      caption: 'Artists in the recording studio creating the next hit'
    },
    {
      id: 4,
      src: '/images/hiphop_lifestyle time.jpg',
      alt: 'Hip-Hop Lifestyle',
      caption: 'Celebrating hip-hop culture and lifestyle in the community'
    }
  ];

  // Open lightbox with specific image
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Disable scrolling on body when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    // Re-enable scrolling on body when lightbox is closed
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image in lightbox
  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % artistSupportImages.length;
    setCurrentImageIndex(nextIndex);
  };

  // Navigate to previous image in lightbox
  const goToPrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + artistSupportImages.length) % artistSupportImages.length;
    setCurrentImageIndex(prevIndex);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex, artistSupportImages.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Artist Support</h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#3b82f6] dark:text-[#93c5fd]">Empowering Hip-Hop Artists</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our foundation is dedicated to supporting emerging hip-hop artists through resources, mentorship, and opportunities.
            These images showcase our commitment to nurturing talent in the hip-hop community.
          </p>
        </div>

        {/* Support Button */}
        <div className="text-center mb-12">
          <Link href="#donate" className="inline-block hiphop-btn hiphop-btn-primary px-8 py-4 text-lg">
            Support Our Artists
          </Link>
        </div>

        {/* Single Artist Support Image Preview */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 group mx-auto"
            onClick={() => openLightbox(0)} // Show artist_support as the main preview
          >
            <div className="relative h-96 overflow-hidden">
              <Image
                src={artistSupportImages[0].src}
                alt={artistSupportImages[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg'; // fallback image
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">{artistSupportImages[0].caption}</p>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => openLightbox(0)}
              className="inline-block hiphop-btn hiphop-btn-secondary px-6 py-3"
            >
              View All Artist Support Activities
            </button>
          </div>
        </div>

        {/* Support Button at Bottom */}
        <div className="text-center mt-12">
          <Link href="#donate" className="inline-block hiphop-btn hiphop-btn-primary px-8 py-4 text-lg">
            Support Emerging Artists Today
          </Link>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div
              className="relative w-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation arrows */}
              {artistSupportImages.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevImage();
                    }}
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextImage();
                    }}
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative w-full h-[70vh]">
                <Image
                  src={artistSupportImages[currentImageIndex].src}
                  alt={artistSupportImages[currentImageIndex].alt}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.jpg'; // fallback image
                  }}
                />
              </div>

              {/* Image details */}
              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-bold">{artistSupportImages[currentImageIndex].caption}</h3>
                <p className="text-gray-300 mt-2">
                  {currentImageIndex + 1} of {artistSupportImages.length}
                </p>
                <div className="mt-6">
                  <Link href="#donate" className="inline-block hiphop-btn hiphop-btn-primary px-6 py-3">
                    Support This Cause
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistSupportGallery;