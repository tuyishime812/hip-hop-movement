'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import Sidebar from '@/components/admin/Sidebar';
import Dashboard from '@/components/admin/Dashboard';
import StaffManagement from './StaffManagement';
import EventsManagement from './EventsManagement';
import DonationsManagement from './DonationsManagement';
import MerchandiseManagement from '@/components/admin/MerchandiseManagement';
import ArtistsManagement from '@/components/admin/ArtistsManagement';
import NewsManagement from '@/components/admin/NewsManagement';
import { NotificationProvider, NotificationContainer } from '@/components/admin/Notifications';

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalStaff: 0,
    totalEvents: 0,
    totalDonations: 0,
    totalMerchandise: 0,
    totalArtists: 0,
    totalNews: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      // Redirect to login if not authenticated
      router.push('/admin/login');
      return;
    }

    const loadStats = async () => {
      try {
        // Get staff count
        const staff = await apiService.getStaff();
        const staffCount = staff.length;

        // Get other stats
        const events = await apiService.getEvents();
        const donations = await apiService.getDonations();
        const merchandise = await apiService.getMerchandise();
        const artists = await apiService.getArtists();
        const news = await apiService.getNews();

        setStats({
          totalStaff: staffCount,
          totalEvents: events.length,
          totalDonations: donations.length,
          totalMerchandise: merchandise.length,
          totalArtists: artists.length,
          totalNews: news.length
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
      </div>
    );
  }

  // Handle navigation from sidebar
  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
  };

  // Handle hash changes for tab selection
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const validTabs = ['dashboard', 'staff', 'events', 'donations', 'merchandise', 'artists', 'news'];

      if (hash && validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('dashboard');
      }
    };

    // Initialize active tab based on current hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <NotificationProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Sidebar onNavigate={() => {}} />

        {/* Main Content */}
        <main className="flex-1 pt-16 md:pt-0 pb-16 md:ml-0 overflow-auto w-full">
          <div className="container mx-auto px-4">
            {/* Stats Cards - Only show on dashboard */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-400">Total Staff</h3>
                      <p className="text-xl sm:text-2xl font-bold text-[#3b82f6]">{stats.totalStaff}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-400">Total Events</h3>
                      <p className="text-xl sm:text-2xl font-bold text-[#8b5cf6]">{stats.totalEvents}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-green-100 dark:bg-green-900/50 mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-400">Total Donations</h3>
                      <p className="text-xl sm:text-2xl font-bold text-[#10b981]">{stats.totalDonations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 rounded-lg bg-amber-100 dark:bg-amber-900/50 mr-3 sm:mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-400">Total Amount</h3>
                      <p className="text-xl sm:text-2xl font-bold text-[#f59e0b]">$0</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-x-auto">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'staff' && <StaffManagement />}
              {activeTab === 'events' && <EventsManagement />}
              {activeTab === 'donations' && <DonationsManagement />}
              {activeTab === 'merchandise' && <MerchandiseManagement />}
              {activeTab === 'artists' && <ArtistsManagement />}
              {activeTab === 'news' && <NewsManagement />}
            </div>
          </div>
        </main>

        {/* Notifications */}
        <NotificationContainer />
      </div>
    </NotificationProvider>
  );
};

export default AdminDashboard;