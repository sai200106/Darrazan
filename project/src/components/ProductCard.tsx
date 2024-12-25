import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0]);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({ ...product, selectedSize });
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button 
              onClick={toggleWishlist}
              className="bg-white p-2 rounded-full shadow-lg"
            >
              <Heart 
                className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
              />
            </button>
            <button 
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full shadow-lg"
            >
              <ShoppingCart className="h-5 w-5 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-purple-600 font-bold">${product.price}</span>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="text-sm border rounded-md px-2 py-1"
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}