'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load staff members on component mount
  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        setLoading(true);
        const result = await apiService.getStaff();
        setStaffMembers(result);
      } catch (err) {
        setError('An error occurred while fetching staff members');
        console.error('Error fetching staff members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  const handleAddStaff = () => {
    setCurrentStaff({
      id: Date.now(), // Temporary ID
      name: '',
      role: '',
      image: '',
      bio: ''
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditStaff = (staff: StaffMember) => {
    setCurrentStaff(staff);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const result = await apiService.deleteStaff(id);

        if (result) {
          setStaffMembers(staffMembers.filter(member => member.id !== id));
        } else {
          alert('Failed to delete staff member');
        }
      } catch (error) {
        console.error('Error deleting staff member:', error);
        alert('An error occurred while deleting the staff member');
      }
    }
  };

  const handleSaveStaff = async () => {
    if (!currentStaff) return;

    try {
      let result: any;
      if (isEditing) {
        // Update existing staff member
        result = await apiService.updateStaff(currentStaff);

        if (result) {
          setStaffMembers(staffMembers.map(member =>
            member.id === currentStaff.id ? result : member
          ));
        } else {
          alert('Failed to update staff member');
          return;
        }
      } else {
        // Add new staff member
        result = await apiService.createStaff(currentStaff);

        if (result) {
          setStaffMembers([...staffMembers, result]);
        } else {
          alert('Failed to add staff member');
          return;
        }
      }

      setIsModalOpen(false);
      setCurrentStaff(null);
    } catch (error) {
      console.error('Error saving staff member:', error);
      alert('An error occurred while saving the staff member');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentStaff) return;
    
    const { name, value } = e.target;
    setCurrentStaff({
      ...currentStaff,
      [name]: value
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Staff Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              window.location.href = '/admin/login';
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Logout</span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </button>
          <button
            onClick={handleAddStaff}
            className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Add Staff Member</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </button>
        </div>
      </div>

      {/* Staff Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Bio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {staffMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img 
                      className="h-10 w-10 rounded-full object-cover" 
                      src={member.image} 
                      alt={member.name} 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/vercel.svg'; // fallback image
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-slate-200">{member.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-slate-400">{member.role}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 dark:text-slate-400 max-w-xs truncate">{member.bio}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditStaff(member)}
                    className="text-[#3b82f6] hover:text-[#2563eb] mr-4 dark:text-[#93c5fd] dark:hover:text-[#60a5fa]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(member.id)}
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

      {/* Staff Member Modal */}
      {isModalOpen && currentStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentStaff.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={currentStaff.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={currentStaff.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={currentStaff.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
                  />
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
                  onClick={handleSaveStaff}
                  className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">{isEditing ? 'Update' : 'Add'} Staff</span>
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

export default StaffManagement;