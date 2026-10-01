import React from 'react';
import { ShoppingBag, Search, Heart, User, Sparkles, Server, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenAuth, 
  searchQuery, 
  setSearchQuery,
  isLiveBackend 
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                <Sparkles className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
                AURA<span className="text-indigo-500">.</span>STORE
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                <span>Spring Boot</span>
                <span className="text-slate-600">•</span>
                <span>React UI</span>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium tech, apparel, gaming..."
                className="w-full bg-slate-900/80 border border-slate-800 rounded-full pl-11 pr-10 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-500 hover:text-slate-300 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Backend Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live Backend Status Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLiveBackend ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLiveBackend ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className={isLiveBackend ? 'text-emerald-400' : 'text-amber-400'}>
                {isLiveBackend ? 'Spring Boot Active' : 'Offline / Mock Mode'}
              </span>
            </div>

            {/* Wishlist Button */}
            <button className="relative p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-full shadow-lg shadow-indigo-600/25 font-medium text-sm transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-indigo-700 font-bold text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Auth / Profile Button */}
            <button 
              onClick={onOpenAuth}
              className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-4 md:hidden">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-900 border border-slate-800 rounded-full pl-11 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
