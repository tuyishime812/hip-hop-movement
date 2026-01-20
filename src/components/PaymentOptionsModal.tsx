import React from 'react';
import Link from 'next/link';

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOptionSelect: (option: 'bank-transfer' | 'contact-us') => void;
}

const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({ 
  isOpen, 
  onClose, 
  onOptionSelect 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Options</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => onOptionSelect('bank-transfer')}
            className="w-full hiphop-btn hiphop-btn-primary flex items-center justify-center p-4 text-left"
          >
            <div className="flex items-center">
              <div className="bg-[#ec4899] p-2 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">National Bank Transfer</h3>
                <p className="text-sm">Account Number: 1013918917</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onOptionSelect('contact-us')}
            className="w-full hiphop-btn hiphop-btn-secondary flex items-center justify-center p-4 text-left"
          >
            <div className="flex items-center">
              <div className="bg-[#0ea5e9] p-2 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Contact Us Directly</h3>
                <p className="text-sm">Get in touch for alternative payment methods</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Choose your preferred payment method to proceed with your donation or purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionsModal;