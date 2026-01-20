'use client';

import { useState } from 'react';
import Link from 'next/link';
import PaymentOptionsModal from '@/components/PaymentOptionsModal';

const StorePage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [currentAction, setCurrentAction] = useState<'checkout' | 'shop'>('checkout');

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Hip-Hop Movement Classic Tee",
      price: 25,
      image: "/src/images/t shirts.png",
      description: "Premium cotton t-shirt with our iconic logo",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Red"]
    },
    {
      id: 2,
      name: "Limited Edition Hoodie",
      price: 50,
      image: "/src/images/hoodies.png",
      description: "Exclusive hoodie with unique design",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Navy", "Gray"]
    },
    {
      id: 3,
      name: "Hip-Hop Culture Cap",
      price: 18,
      image: "/src/images/caps.png",
      description: "Adjustable cap with embroidered logo",
      sizes: ["One Size"],
      colors: ["Black", "Red", "Blue"]
    },
    {
      id: 4,
      name: "Youth Empowerment Tank Top",
      price: 22,
      image: "/src/images/t shirts.png",
      description: "Support youth programs with this design",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Gray", "Green"]
    },
    {
      id: 5,
      name: "Artist Collaboration Tee",
      price: 28,
      image: "/src/images/t shirts.png",
      description: "Featuring artwork from local artists",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Purple", "Yellow", "Orange"]
    },
    {
      id: 6,
      name: "Foundation Commemorative Jersey",
      price: 45,
      image: "/src/images/t shirts.png",
      description: "Special edition jersey to celebrate our mission",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blue", "Green", "Black"]
    }
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setSelectedProduct(product.id);
    setTimeout(() => setSelectedProduct(null), 2000);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    setCurrentAction('checkout');
    setShowPaymentOptions(true);
  };

  const handleShopNow = () => {
    setCurrentAction('shop');
    setShowPaymentOptions(true);
  };

  const handlePaymentOptionSelect = (option: 'bank-transfer' | 'contact-us') => {
    setShowPaymentOptions(false);

    if (option === 'bank-transfer') {
      // Copy the bank account number to clipboard and show success message
      navigator.clipboard.writeText('1013918917');
      alert('National Bank Account Number (1013918917) copied to clipboard! Please make your payment using this account.');
    } else if (option === 'contact-us') {
      window.open('https://wa.me/265881434700', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Official Merchandise</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Show your support by purchasing our merchandise. All proceeds go directly toward our mission.
          </p>
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 max-w-md mx-auto sticky top-4 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Your Cart</h3>
              <p className="text-gray-600">{cart.length} items</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-[#ec4899]">${cartTotal.toFixed(2)}</p>
              <button className="text-sm text-blue-600 hover:underline">View Cart</button>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-4 hiphop-btn hiphop-btn-primary"
          >
            Checkout
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`hiphop-card overflow-hidden relative ${selectedProduct === product.id ? 'ring-4 ring-[#ec4899]' : ''}`}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-contain"
                />
                <div className="absolute top-4 right-4 bg-[#ec4899] text-white px-3 py-1 rounded-full text-sm font-bold">
                  ${product.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Available Sizes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Available Colors:</h4>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <div 
                        key={index} 
                        className="w-6 h-6 rounded-full border border-gray-300"
                        title={color}
                      >
                        <div className="w-full h-full rounded-full" style={{
                          backgroundColor: 
                            color === 'Black' ? '#000' : 
                            color === 'White' ? '#fff' : 
                            color === 'Red' ? '#ef4444' : 
                            color === 'Blue' ? '#3b82f6' : 
                            color === 'Navy' ? '#1e40af' : 
                            color === 'Gray' ? '#6b7280' : 
                            color === 'Green' ? '#22c55e' : 
                            color === 'Purple' ? '#a855f7' : 
                            color === 'Yellow' ? '#eab308' : 
                            '#f97316' // Orange
                        }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleShopNow}
                  className="w-full hiphop-btn hiphop-btn-primary"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#ec4899] to-[#0ea5e9] text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We regularly update our merchandise collection. Check back often for new items or contact us for custom orders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="hiphop-btn bg-white text-[#ec4899] hover:bg-gray-100">
              Contact Us
            </Link>
            <a href="https://wa.me/265881434700" target="_blank" rel="noopener noreferrer" className="hiphop-btn bg-transparent border-2 border-white hover:bg-white/10">
              Make a Donation
            </a>
          </div>
        </div>

        <PaymentOptionsModal
          isOpen={showPaymentOptions}
          onClose={() => setShowPaymentOptions(false)}
          onOptionSelect={handlePaymentOptionSelect}
        />
      </div>
    </div>
  );
};

export default StorePage;