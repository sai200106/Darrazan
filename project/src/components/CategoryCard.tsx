import React from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="relative group cursor-pointer">
      <div className="aspect-square rounded-lg overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}