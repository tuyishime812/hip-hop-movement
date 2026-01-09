'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set default date range to last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    setDateRange({
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    });
  }, []);

  const generateReport = async () => {
    setLoading(true);
    
    try {
      // Simulate report generation
      setTimeout(() => {
        if (reportType === 'donations') {
          setReportData({
            totalDonations: 125,
            totalAmount: 2450.75,
            averageDonation: 19.61,
            topDonors: [
              { name: 'John Doe', amount: 500 },
              { name: 'Jane Smith', amount: 350 },
              { name: 'Bob Johnson', amount: 200 }
            ]
          });
        } else if (reportType === 'events') {
          setReportData({
            totalEvents: 8,
            totalAttendees: 1245,
            attendanceRate: 85.3,
            mostPopular: 'Hip-Hop for Humanity Festival'
          });
        } else {
          setReportData({
            totalStaff: 12,
            totalEvents: 8,
            totalDonations: 125,
            totalMerchandise: 45,
            totalArtists: 15,
            totalNews: 22
          });
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating report:', error);
      setLoading(false);
    }
  };

  const exportReport = () => {
    // Create a mock CSV export
    let csvContent = '';

    if (reportType === 'donations') {
      csvContent = 'Donor Name,Amount,Date\n';
      csvContent += 'John Doe,500,2023-01-15\n';
      csvContent += 'Jane Smith,350,2023-01-16\n';
      csvContent += 'Bob Johnson,200,2023-01-17\n';
    } else if (reportType === 'events') {
      csvContent = 'Event Name,Date,Attendees\n';
      csvContent += 'Hip-Hop for Humanity Festival,2023-03-15,500\n';
      csvContent += 'Youth Workshop,2023-02-20,75\n';
    } else {
      csvContent = 'Metric,Value\n';
      csvContent += 'Total Staff,12\n';
      csvContent += 'Total Events,8\n';
      csvContent += 'Total Donations,125\n';
    }

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${reportType}-report-${dateRange.start}-to-${dateRange.end}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      generateReport();
    }
  }, [reportType]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6">Reports & Analytics</h2>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
            >
              <option value="overview">Overview</option>
              <option value="donations">Donations Report</option>
              <option value="events">Events Report</option>
              <option value="merchandise">Merchandise Report</option>
              <option value="artists">Artists Report</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={generateReport}
            disabled={loading}
            className="bg-gradient-to-r from-[#3b82f6] to-[#ec4899] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden disabled:opacity-50"
          >
            <span className="relative z-10">{loading ? 'Generating...' : 'Generate Report'}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#3b82f6] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </button>

          <button
            onClick={exportReport}
            className="bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Export Report</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#10b981] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]"></div>
        </div>
      ) : reportData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Summary Cards */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">Summary</h3>
            
            <div className="space-y-4">
              {reportType === 'overview' && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Staff</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalStaff}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Events</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Donations</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalDonations}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Merchandise</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalMerchandise}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Artists</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalArtists}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-slate-300">Total News</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalNews}</span>
                  </div>
                </>
              )}

              {reportType === 'donations' && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Donations</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalDonations}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Amount</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">${reportData.totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-slate-300">Average Donation</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">${reportData.averageDonation}</span>
                  </div>
                </>
              )}

              {reportType === 'events' && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Events</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-gray-600 dark:text-slate-300">Total Attendees</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.totalAttendees}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-slate-300">Attendance Rate</span>
                    <span className="font-medium text-gray-800 dark:text-slate-100">{reportData.attendanceRate}%</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Additional Data */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">
              {reportType === 'donations' ? 'Top Donors' : 
               reportType === 'events' ? 'Event Details' : 
               'Additional Info'}
            </h3>

            {reportType === 'donations' && reportData.topDonors && (
              <div className="space-y-3">
                {reportData.topDonors.map((donor: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <span className="font-medium text-gray-800 dark:text-slate-100">{donor.name}</span>
                    <span className="text-[#10b981] font-bold">${donor.amount}</span>
                  </div>
                ))}
              </div>
            )}

            {reportType === 'events' && (
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-gray-600 dark:text-slate-300 text-sm">Most Popular Event</div>
                  <div className="font-medium text-gray-800 dark:text-slate-100">{reportData.mostPopular}</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="text-gray-600 dark:text-slate-300 text-sm">Avg. Attendees per Event</div>
                  <div className="font-medium text-gray-800 dark:text-slate-100">{Math.round(reportData.totalAttendees / reportData.totalEvents)}</div>
                </div>
              </div>
            )}

            {reportType === 'overview' && (
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <p className="text-gray-500 dark:text-slate-400">Visualization would appear here</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-slate-100">No Report Generated</h3>
          <p className="mt-2 text-gray-500 dark:text-slate-400">Select a report type and date range to generate a report</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;