import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView, 
  isWishlisted, 
  onToggleWishlist 
}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl glass-card overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      {/* Top Image & Overlay */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {product.badge ? (
            <span className="px-2.5 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md">
              {product.badge}
            </span>
          ) : <span />}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-pink-500 transition-colors shadow-lg"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'text-pink-500 fill-pink-500' : ''}`} />
          </button>
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 rounded-full glass-panel text-white text-xs font-semibold flex items-center gap-2 shadow-xl hover:bg-slate-800 transition-colors"
          >
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Quick Details</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium text-indigo-400/90 truncate max-w-[130px]">
              {product.category?.name || 'General'}
            </span>
            <div className="flex items-center gap-1 font-semibold text-slate-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{product.rating || 4.8}</span>
              <span className="text-slate-500 text-[10px]">({product.reviewCount || 42})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-indigo-300 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mt-1 font-normal leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">In Stock ({product.stock || 20})</span>
          </div>

          {/* Add to Cart CTA */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
              isAdded 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
            }`}
            title="Add to Cart"
          >
            {isAdded ? (
              <Check className="w-4 h-4 animate-bounce" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
}
