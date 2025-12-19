'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { apiService } from '@/services/api';

// Define TypeScript interface for RSS items
interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  creator?: string;
  content?: string;
  contentSnippet?: string;
  categories?: string[];
  isoDate?: string;
  source?: string;
  source_name?: string;  // Added to match API response
  pub_date?: string;     // Added to match API response
}

const NewsPage = () => {
  const [articles, setArticles] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await apiService.getNews();
        setArticles(data.articles || []);
      } catch (err: any) {
        console.error('Error fetching news articles:', err);
        setError(`Failed to load news articles: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Sort articles by date
  const sortedArticles = [...articles].sort((a, b) =>
    new Date(b.pubDate || '').getTime() -
    new Date(a.pubDate || '').getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Custom header with navigation */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#0ea5e9]">
              HIP-HOP MOVEMENT
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-[#ec4899] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#0ea5e9]">
            Latest Hip-Hop News
          </span>
        </h1>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Stay updated with the latest in hip-hop culture, music, and industry developments
        </p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ec4899] mb-4"></div>
            <p className="text-xl text-gray-700">Loading the latest hip-hop news...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto text-center">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div>
            {/* Display articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArticles.length > 0 ? (
                sortedArticles.map((article, index) => (
                  <article
                    key={`${article.source}-${index}`}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col flex-grow"
                  >
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-block bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white text-xs px-3 py-1 rounded-full">
                          {article.source_name || article.source}
                        </span>
                        {article.pub_date && (
                          <span className="text-xs text-gray-500">
                            {new Date(article.pub_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {article.title}
                      </h2>

                      {article.creator && (
                        <p className="text-sm text-gray-600 mb-3">By {article.creator}</p>
                      )}

                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {article.content}
                      </p>

                      {/* Categories/Tags */}
                      {article.categories && article.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.categories.slice(0, 3).map((category, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ec4899] font-medium hover:text-[#0ea5e9] transition-colors inline-flex items-center"
                      >
                        Read full story
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-700">No articles found at the moment.</p>
                  <p className="text-gray-600 mt-2">Check back later for the latest hip-hop news.</p>
                </div>
              )}
            </div>

            {/* Info box about sources */}
            <div className="mt-12 bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white rounded-xl p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-2">About Our News Sources</h3>
              <p className="mb-3">
                This section aggregates news from various hip-hop media sources to keep you informed about the latest trends, releases, and industry developments.
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Hip-Hop Wired - Covering hip-hop culture, music, and industry news</li>
                <li>The Source - One of the longest-running hip-hop publications</li>
              </ul>
              <p className="text-sm">
                News is updated automatically as new articles are published by these sources.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsPage;