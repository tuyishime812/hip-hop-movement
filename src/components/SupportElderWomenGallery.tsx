'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SupportElderWomenGallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  // Support elder women images
  const supportElderWomenImages = [
    {
      id: 1,
      src: '/images/support_elder_women in their arts.jpg',
      alt: 'Supporting Elder Women in Arts',
      caption: 'Supporting elder women in their artistic endeavors and crafts'
    },
    {
      id: 2,
      src: '/images/with_elder_people.jpg',
      alt: 'With Elder People',
      caption: 'Hip-Hop Movement spending time with elder community members in Blantyre'
    },
    {
      id: 3,
      src: '/images/sharing_God Words.jpg',
      alt: 'Sharing God Words',
      caption: 'Spiritual support and sharing words of encouragement with the community'
    },
    {
      id: 4,
      src: '/images/donation5.jpeg',
      alt: 'Community Support',
      caption: 'Supporting the underprivileged community through hip-hop culture'
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
    const nextIndex = (currentImageIndex + 1) % supportElderWomenImages.length;
    setCurrentImageIndex(nextIndex);
  };

  // Navigate to previous image in lightbox
  const goToPrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + supportElderWomenImages.length) % supportElderWomenImages.length;
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
  }, [lightboxOpen, currentImageIndex, supportElderWomenImages.length]);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Support Elder Women</h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#3b82f6] dark:text-[#93c5fd]">Honoring Our Elders</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto my-6"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our foundation is committed to supporting elder women in our community through various initiatives.
            These images showcase our ongoing efforts to honor and support our elders.
          </p>
        </div>

        {/* Support Button */}
        <div className="text-center mb-12">
          <Link href="#donate" className="inline-block hiphop-btn hiphop-btn-primary px-8 py-4 text-lg">
            Support Our Elders
          </Link>
        </div>

        {/* Single Support Elder Women Image Preview */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 group mx-auto"
            onClick={() => openLightbox(0)} // Show support_elder_women as the main preview
          >
            <div className="relative h-96 overflow-hidden">
              <Image
                src={supportElderWomenImages[0].src}
                alt={supportElderWomenImages[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-image.jpg'; // fallback image
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">{supportElderWomenImages[0].caption}</p>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => openLightbox(0)}
              className="inline-block hiphop-btn hiphop-btn-secondary px-6 py-3"
            >
              View All Elder Women Support Activities
            </button>
          </div>
        </div>

        {/* Support Button at Bottom */}
        <div className="text-center mt-12">
          <Link href="#donate" className="inline-block hiphop-btn hiphop-btn-primary px-8 py-4 text-lg">
            Support Our Elders Today
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
              {supportElderWomenImages.length > 1 && (
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
                  src={supportElderWomenImages[currentImageIndex].src}
                  alt={supportElderWomenImages[currentImageIndex].alt}
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
                <h3 className="text-xl font-bold">{supportElderWomenImages[currentImageIndex].caption}</h3>
                <p className="text-gray-300 mt-2">
                  {currentImageIndex + 1} of {supportElderWomenImages.length}
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

export default SupportElderWomenGallery;