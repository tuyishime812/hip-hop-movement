'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Define image categories
  const categories = ['all', 'artists', 'events', 'studio', 'leadership'];

  // Initialize images with the actual images from the public folder (excluding donation images and dedicated gallery images)
  useEffect(() => {
    const imageList: GalleryImage[] = [
      {
        id: 1,
        src: '/images/BTTZ.jpg',
        alt: 'BTTZ Event',
        category: 'events',
        caption: 'Hip-hop event featuring local artists showcasing their talent'
      },
      {
        id: 2,
        src: '/images/chairman.jpg',
        alt: 'IKK - Foundation Chairman',
        category: 'leadership',
        caption: 'IKK - Chairman of the Hip-Hop Foundation leading the movement'
      },
      {
        id: 3,
        src: '/images/hiphop_lifestyle time.jpg',
        alt: 'Hip-Hop Lifestyle',
        category: 'events',
        caption: 'Celebrating hip-hop culture and lifestyle in the community'
      },
      {
        id: 4,
        src: '/images/hiphop_time.jpg',
        alt: 'Hip-Hop Time',
        category: 'events',
        caption: 'Hip-hop celebration event bringing people together'
      },
      {
        id: 5,
        src: '/images/hiphop.jpg',
        alt: 'Hip-Hop Culture',
        category: 'events',
        caption: 'Hip-hop culture celebration honoring the roots and future'
      },
      {
        id: 6,
        src: '/images/IT manager.jpg',
        alt: 'Tuyishime Martin - IT Manager',
        category: 'leadership',
        caption: 'Tuyishime Martin - Foundation IT Manager ensuring digital innovation for the movement'
      },
      {
        id: 7,
        src: '/images/team_management.jpg',
        alt: 'Team Management',
        category: 'leadership',
        caption: 'Team management and organization within the Hip-Hop Foundation'
      },
      {
        id: 6,
        src: '/images/studio_setup.jpg',
        alt: 'Studio Setup',
        category: 'studio',
        caption: 'Professional recording studio setup for emerging artists'
      },
      {
        id: 7,
        src: '/images/studio_time.jpg',
        alt: 'Studio Time',
        category: 'studio',
        caption: 'Artists in the recording studio creating the next hit'
      },
      {
        id: 8,
        src: '/images/IT manager.jpg',
        alt: 'Tuyishime Martin - IT Manager',
        category: 'leadership',
        caption: 'Tuyishime Martin - Foundation IT Manager ensuring digital innovation for the movement'
      },
      {
        id: 9,
        src: '/images/team_management.jpg',
        alt: 'Team Management',
        category: 'leadership',
        caption: 'Team management and organization within the Hip-Hop Foundation'
      },
      {
        id: 10,
        src: '/images/vice_chairman martin.jpg',
        alt: 'Martin Angelz - Vice Chairman',
        category: 'leadership',
        caption: 'Martin Angelz - Vice Chairman of the Foundation driving the mission forward'
      }
    ];

    setImages(imageList);
    setFilteredImages(imageList);
    setLoading(false);
  }, []);

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory, images]);

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
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
  };

  // Navigate to previous image in lightbox
  const goToPrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
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
  }, [lightboxOpen, currentImageIndex, filteredImages.length]);

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-slate-100">Hip-Hop Gallery</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#ec4899] mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore our collection of hip-hop culture, events, and community impact
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 group card-elevate"
                  onClick={() => openLightbox(filteredImages.findIndex(img => img.id === image.id))}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.jpg'; // fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium truncate">{image.caption}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 dark:text-slate-300 text-sm truncate">{image.caption}</p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-[#3b82f6]/10 text-[#3b82f6] rounded-full capitalize">
                      {image.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Empty State */}
            {filteredImages.length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 dark:text-slate-300">No images found in this category</h3>
                <p className="mt-2 text-gray-500 dark:text-slate-400">Try selecting a different category</p>
              </div>
            )}
          </>
        )}

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
              {filteredImages.length > 1 && (
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
                  src={filteredImages[currentImageIndex].src}
                  alt={filteredImages[currentImageIndex].alt}
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
                <h3 className="text-xl font-bold">{filteredImages[currentImageIndex].caption}</h3>
                <p className="text-gray-300 mt-2">
                  {currentImageIndex + 1} of {filteredImages.length} - 
                  <span className="ml-2 px-2 py-1 bg-[#3b82f6]/30 rounded-full capitalize">
                    {filteredImages[currentImageIndex].category}
                  </span>
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
    </div>
  );
};

export default ImageGallery;