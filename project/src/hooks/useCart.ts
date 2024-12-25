import { create } from 'zustand';
import type { CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  removeItem: (id: string, size: string) => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.selectedSize === item.selectedSize
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          total: state.total + item.price,
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    });
  },
  updateQuantity: (id, size, quantity) => {
    set((state) => {
      if (quantity < 1) return state;

      const item = state.items.find(
        (i) => i.id === id && i.selectedSize === size
      );
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;
      
      return {
        items: state.items.map((i) =>
          i.id === id && i.selectedSize === size
            ? { ...i, quantity }
            : i
        ),
        total: state.total + (item.price * quantityDiff),
      };
    });
  },
  removeItem: (id, size) => {
    set((state) => {
      const item = state.items.find(
        (i) => i.id === id && i.selectedSize === size
      );
      if (!item) return state;

      return {
        items: state.items.filter(
          (i) => !(i.id === id && i.selectedSize === size)
        ),
        total: state.total - (item.price * item.quantity),
      };
    });
  },
}));