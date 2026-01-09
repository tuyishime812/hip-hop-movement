'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface MerchandiseItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  category: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

const MerchandiseManagement = () => {
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MerchandiseItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load merchandise on component mount
  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        setLoading(true);
        const result = await apiService.getMerchandise();
        setMerchandise(result);
      } catch (err) {
        setError('An error occurred while fetching merchandise');
        console.error('Error fetching merchandise:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchandise();
  }, []);

  const handleAddItem = () => {
    setCurrentItem({
      id: Date.now(),
      name: '',
      description: '',
      price: 0,
      image_url: '',
      stock_quantity: 0,
      category: 'T-Shirts',
      is_available: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: MerchandiseItem) => {
    setCurrentItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this merchandise item?')) {
      try {
        // In the mock API, we'll just filter out the item
        setMerchandise(merchandise.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting merchandise item:', error);
        alert('An error occurred while deleting the merchandise item');
      }
    }
  };

  const handleSaveItem = async () => {
    if (!currentItem) return;

    try {
      let result;
      if (isEditing) {
        // Update existing item
        result = currentItem;
        setMerchandise(merchandise.map(item =>
          item.id === currentItem.id ? result : item
        ));
      } else {
        // Add new item
        result = currentItem;
        setMerchandise([...merchandise, result]);
      }

      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error saving merchandise item:', error);
      alert('An error occurred while saving the merchandise item');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentItem) return;

    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setCurrentItem({
      ...currentItem,
      [name]: name === 'price' || name === 'stock_quantity' ? parseFloat(value) : val
    });
  };

  // Filter merchandise based on search term
  const filteredMerchandise = merchandise.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Merchandise Management</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search merchandise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 w-full md:w-64"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={handleAddItem}
            className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Add Merchandise</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </button>
        </div>
      </div>

      {/* Merchandise Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {filteredMerchandise.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={item.image_url}
                      alt={item.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/vercel.svg'; // fallback image
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-slate-200">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-slate-400">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-slate-200">${item.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-slate-400">{item.stock_quantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.is_available
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {item.is_available ? 'Available' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-[#3b82f6] hover:text-[#2563eb] mr-4 dark:text-[#93c5fd] dark:hover:text-[#60a5fa]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
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

      {/* Merchandise Modal */}
      {isModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                {isEditing ? 'Edit Merchandise Item' : 'Add New Merchandise Item'}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={currentItem.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
                    <select
                      name="category"
                      value={currentItem.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                      required
                    >
                      <option value="T-Shirts">T-Shirts</option>
                      <option value="Hoodies">Hoodies</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Posters">Posters</option>
                      <option value="Vinyl">Vinyl</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={currentItem.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={currentItem.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      name="stock_quantity"
                      value={currentItem.stock_quantity}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image_url"
                    value={currentItem.image_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={currentItem.is_available}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#3b82f6] focus:ring-[#3b82f6] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700 dark:text-slate-300">
                    Available for Sale
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
                  onClick={handleSaveItem}
                  className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">{isEditing ? 'Update' : 'Add'} Item</span>
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

export default MerchandiseManagement;