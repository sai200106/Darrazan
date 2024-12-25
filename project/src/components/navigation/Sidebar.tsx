import React from 'react';
import { X, ChevronRight, Home, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { useWishlist } from '../../hooks/useWishlist';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { items: wishlistItems } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-purple-600">DarRazan</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/"
                className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-lg"
                onClick={onClose}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/shop"
                className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-lg"
                onClick={onClose}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Shop</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/wishlist"
                className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-lg"
                onClick={onClose}
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="ml-auto bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-sm">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="pt-2 border-t">
              <h3 className="px-2 text-sm font-semibold text-gray-500 uppercase">Categories</h3>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.name.toLowerCase()}`}
                  className="flex items-center justify-between p-2 mt-1 hover:bg-purple-50 rounded-lg"
                  onClick={onClose}
                >
                  <span>{category.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}