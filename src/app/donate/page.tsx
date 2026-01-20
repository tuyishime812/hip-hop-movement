'use client';

import { useState } from 'react';
import Link from 'next/link';
import PaymentOptionsModal from '@/components/PaymentOptionsModal';

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const presetAmounts = [10, 25, 50, 100, 250];

  const handleDonation = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentOptionSelect = (option: 'bank-transfer' | 'contact-us') => {
    setShowPaymentOptions(false);

    if (option === 'bank-transfer') {
      // Copy the bank account number to clipboard and show success message
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('1013918917');
        alert('National Bank Account Number (1013918917) copied to clipboard! Please make your donation using this account.');
      } else {
        // Fallback for copying to clipboard
        const el = document.createElement('textarea');
        el.value = '1013918917';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('National Bank Account Number (1013918917) copied to clipboard! Please make your donation using this account.');
      }
    } else if (option === 'contact-us') {
      if (typeof window !== 'undefined') {
        window.open('https://wa.me/265881434700', '_blank');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Support Our Cause</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your donation helps us continue our mission of empowering communities through hip-hop culture.
          </p>
        </div>

        {donationComplete ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Donation!</h2>
            <p className="text-gray-700 mb-6">
              Your generous contribution of ${donationAmount} will help us continue our mission and make a positive impact in the community.
            </p>
            <Link href="/" className="hiphop-btn hiphop-btn-primary">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Make a Donation</h2>
              
              {/* Donation Type */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Donation Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`px-6 py-3 rounded-lg border ${
                      donationType === 'one-time'
                        ? 'border-[#ec4899] bg-[#fdf2f8] text-[#ec4899]'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`px-6 py-3 rounded-lg border ${
                      donationType === 'monthly'
                        ? 'border-[#ec4899] bg-[#f0f9ff] text-[#0ea5e9]'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              
              {/* Donation Amount */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Select Amount</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setDonationAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`px-4 py-3 rounded-lg border ${
                        donationAmount === amount && !customAmount
                          ? 'border-[#ec4899] bg-[#fdf2f8] text-[#ec4899]'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                  <div className="col-span-3">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          if (e.target.value) {
                            setDonationAmount(Number(e.target.value));
                          }
                        }}
                        placeholder="Other amount"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">Payment Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Card Information</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-transparent"
                        placeholder="Card number"
                      />
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-transparent"
                        placeholder="CVC"
                      />
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec4899] focus:border-transparent"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleDonation}
                disabled={isProcessing}
                className={`w-full hiphop-btn hiphop-btn-primary ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : `Donate $${donationAmount}`}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Choose your preferred payment method to support our mission.
              </p>

              <PaymentOptionsModal
                isOpen={showPaymentOptions}
                onClose={() => setShowPaymentOptions(false)}
                onOptionSelect={handlePaymentOptionSelect}
              />
            </div>
            
            {/* Impact Information */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Impact</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#f0f9ff] p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0ea5e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Supporting Artists</h3>
                      <p className="text-gray-600">Help emerging artists get the resources and mentorship they need to succeed in the music industry.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#fef3c7] p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Educational Programs</h3>
                      <p className="text-gray-600">Fund workshops, classes, and educational initiatives that teach music production and cultural awareness.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#dcfce7] p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Community Support</h3>
                      <p className="text-gray-600">Provide care and assistance to elders, orphans, and vulnerable groups in our communities.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Why Donate?</h3>
                <p className="mb-4">
                  Hip-hop is more than music—it's a movement for humanity. Your support helps us bridge the gap between the streets and the future, empowering every generation through music, culture, and community.
                </p>
                <p>
                  From the streets to the future, we rise together: helping elders, uplifting the vulnerable, empowering the poor, and giving orphans hope.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationPage;