'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface Artist {
  id: number;
  name: string;
  bio: string;
  genre: string;
  image_url: string;
  social_links: string; // JSON string
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const ArtistsManagement = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load artists on component mount
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const result = await apiService.getArtists();
        setArtists(result);
      } catch (err) {
        setError('An error occurred while fetching artists');
        console.error('Error fetching artists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleAddArtist = () => {
    setCurrentArtist({
      id: Date.now(),
      name: '',
      bio: '',
      genre: 'Hip-Hop',
      image_url: '',
      social_links: JSON.stringify({}),
      is_featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditArtist = (artist: Artist) => {
    setCurrentArtist(artist);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteArtist = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this artist?')) {
      try {
        // In the mock API, we'll just filter out the artist
        setArtists(artists.filter(artist => artist.id !== id));
      } catch (error) {
        console.error('Error deleting artist:', error);
        alert('An error occurred while deleting the artist');
      }
    }
  };

  const handleSaveArtist = async () => {
    if (!currentArtist) return;

    try {
      let result;
      if (isEditing) {
        // Update existing artist
        result = currentArtist;
        setArtists(artists.map(artist =>
          artist.id === currentArtist.id ? result : artist
        ));
      } else {
        // Add new artist
        result = currentArtist;
        setArtists([...artists, result]);
      }

      setIsModalOpen(false);
      setCurrentArtist(null);
    } catch (error) {
      console.error('Error saving artist:', error);
      alert('An error occurred while saving the artist');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentArtist) return;

    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setCurrentArtist({
      ...currentArtist,
      [name]: val
    });
  };

  // Parse social links for display
  const parseSocialLinks = (socialLinksStr: string) => {
    try {
      return JSON.parse(socialLinksStr);
    } catch {
      return {};
    }
  };

  // Filter artists based on search term
  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Artists Management</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 w-full md:w-64"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={handleAddArtist}
            className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Add Artist</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </button>
        </div>
      </div>

      {/* Artists Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Genre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {filteredArtists.map((artist) => (
              <tr key={artist.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={artist.image_url}
                      alt={artist.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/vercel.svg'; // fallback image
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-slate-200">{artist.name}</div>
                  <div className="text-sm text-gray-500 dark:text-slate-400 truncate max-w-xs">{artist.bio}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-slate-400">{artist.genre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    artist.is_featured
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {artist.is_featured ? 'Featured' : 'Not Featured'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditArtist(artist)}
                    className="text-[#3b82f6] hover:text-[#2563eb] mr-4 dark:text-[#93c5fd] dark:hover:text-[#60a5fa]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteArtist(artist.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Artist Modal */}
      {isModalOpen && currentArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                {isEditing ? 'Edit Artist' : 'Add New Artist'}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={currentArtist.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Genre</label>
                    <select
                      name="genre"
                      value={currentArtist.genre}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                      required
                    >
                      <option value="Hip-Hop">Hip-Hop</option>
                      <option value="Rap">Rap</option>
                      <option value="R&B">R&B</option>
                      <option value="Jazz">Jazz</option>
                      <option value="Soul">Soul</option>
                      <option value="Reggae">Reggae</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={currentArtist.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={currentArtist.image_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Social Links (JSON)</label>
                  <textarea
                    name="social_links"
                    value={currentArtist.social_links}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                    placeholder='{"instagram": "@artist", "twitter": "@artist", "facebook": "artist"}'
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={currentArtist.is_featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#3b82f6] focus:ring-[#3b82f6] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700 dark:text-slate-300">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveArtist}
                  className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">{isEditing ? 'Update' : 'Add'} Artist</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistsManagement;