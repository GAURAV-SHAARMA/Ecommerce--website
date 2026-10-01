import React from 'react';
import { Cpu, ShoppingBag, Home, Gamepad2, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Cpu: Cpu,
  ShoppingBag: ShoppingBag,
  Home: Home,
  Gamepad2: Gamepad2,
};

export default function CategoryBar({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  sortBy,
  setSortBy 
}) {
  return (
    <div className="py-6 border-b border-slate-900 bg-slate-950/60 sticky top-20 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => onSelectCategory(null)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>All Products</span>
          </button>

          {categories.map((cat) => {
            const IconComp = iconMap[cat.icon] || LayoutGrid;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Sort by:</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="featured">Featured & Trending</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

      </div>
    </div>
  );
}
