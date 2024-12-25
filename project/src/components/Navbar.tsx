import React, { useState } from 'react';
import { ShoppingCart, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignupModal from './auth/SignupModal';
import CartModal from './cart/CartModal';
import Sidebar from './navigation/Sidebar';
import SearchBar from './SearchBar';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="text-2xl font-bold text-purple-600 ml-2">
                DarRazan
              </Link>
            </div>
            
            <SearchBar />

            <div className="flex items-center space-x-4">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsSignupOpen(true)}
              >
                <User className="h-6 w-6" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SignupModal 
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}