import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import type { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
        <p className="text-purple-600 font-semibold">${item.price}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => removeItem(item.id, item.selectedSize)}
            className="p-1 hover:bg-gray-100 rounded ml-2"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}