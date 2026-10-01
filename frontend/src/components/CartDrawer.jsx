import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA15' || promoCode.trim().toUpperCase() === 'SPRINGBOOT') {
      setDiscount(15);
      setPromoSuccess('Promo code applied! $15.00 discount added.');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "AURA15".');
      setPromoSuccess('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md glass-panel border-l border-slate-800 shadow-2xl flex flex-col justify-between"
          >
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Cart</h2>
                  <p className="text-xs text-slate-400">{cartItems.length} unique item(s)</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800/60 text-xs">
              <div className="flex items-center justify-between font-medium text-slate-300 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-indigo-400" />
                  <span>
                    {subtotal >= freeShippingThreshold
                      ? "🎉 You unlocked Free Express Shipping!"
                      : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping`}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Explore our products and discover new tech and fashion essentials.
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex gap-4 items-center"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-950 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-black text-sm text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-slate-800 space-y-4 bg-slate-950/80">
                
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Promo Code (try AURA15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-400 font-semibold">{promoSuccess}</p>}

                {/* Subtotal Calculation */}
                <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-900 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-200">
                      {shippingFee === 0 ? <span className="text-emerald-400">FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount (AURA15)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span className="text-indigo-400">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => {
                    onClose();
                    onProceedCheckout({ subtotal, shippingFee, discount, grandTotal });
                  }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  );
}
