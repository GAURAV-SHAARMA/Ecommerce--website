import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, ShoppingBag, Check, Plus, Minus, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailModal({ product, onClose, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-800 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image Column */}
            <div className="relative aspect-square bg-slate-900 overflow-hidden flex items-center justify-center p-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
              {product.badge && (
                <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-xs tracking-wider uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                
                <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold">
                  <span>{product.category?.name || 'Premium Item'}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-white font-bold">{product.rating || 4.9}</span>
                    <span className="text-slate-500">({product.reviewCount || 100} reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                    In Stock ({product.stock || 25})
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-indigo-400" />
                    <span>Free Express Shipping available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Includes 2-Year Full Manufacturer Warranty</span>
                  </div>
                </div>

              </div>

              {/* Quantity Selector & CTAs */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-white min-w-[20px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      added
                        ? 'bg-emerald-500 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                    }`}
                  >
                    {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                    <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onBuyNow();
                    }}
                    className="py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl transition-all"
                  >
                    Buy Now
                  </button>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
