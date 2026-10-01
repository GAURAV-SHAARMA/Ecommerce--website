import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Flame } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <div className="relative overflow-hidden py-12 lg:py-20 bg-slate-950">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>Autumn Cyber Tech Collection 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Elevate Your Lifestyle with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-400">Next-Gen Essentials</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover hyper-crafted audio gear, wearable tech, ergonomic workspace setups, and minimalist apparel powered by a high-performance Spring Boot API backend.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-500 hover:to-violet-500 text-white font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <button 
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold transition-all"
              >
                Explore Categories
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-900/80 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400 shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Free Express Shipping</h4>
                  <p className="text-[11px] text-slate-500">Orders over $50</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2-Year Warranty</h4>
                  <p className="text-[11px] text-slate-500">Guaranteed quality</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-800/40 flex items-center justify-center text-violet-400 shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">30-Day Returns</h4>
                  <p className="text-[11px] text-slate-500">Hassle-free exchange</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Product Showcase Hero Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-indigo-500/20 via-slate-800/40 to-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-xl">
              
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                  alt="Aura Sound Headphones"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                {/* Floating Rating Badge */}
                <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>4.9 / 5.0 (142 reviews)</span>
                </div>

                {/* Floating Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wide">
                    Featured Spotlight
                  </span>
                  <h3 className="text-xl font-bold text-white">Aura Sound Pro ANC Headphones</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-emerald-400">$249.99</span>
                      <span className="text-sm text-slate-500 line-through">$299.99</span>
                    </div>
                    <span className="text-xs text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800">
                      Save $50 Today
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
