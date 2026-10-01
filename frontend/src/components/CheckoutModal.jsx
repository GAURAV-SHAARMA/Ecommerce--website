import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Truck, Sparkles, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../services/api';

export default function CheckoutModal({ isOpen, onClose, cartItems, cartSummary, onOrderCompleted }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const [formData, setFormData] = useState({
    name: 'Gaurav Mehta',
    email: 'gaurav.mehta@example.com',
    address: '42 Cyberpunk Avenue, Tech City',
    city: 'San Francisco',
    zip: '94105',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: `${formData.address}, ${formData.city} ${formData.zip}`,
      city: formData.city,
      zipCode: formData.zip,
      paymentMethod: formData.paymentMethod,
      totalAmount: cartSummary.grandTotal,
      items: cartItems.map(item => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      }))
    };

    try {
      const response = await productService.createOrder(payload);
      setOrderResult(response);
      setStep(3); // Success step
      onOrderCompleted();
    } catch (err) {
      console.error("Order error", err);
    } finally {
      setLoading(false);
    }
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
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-800 z-10 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* SUCCESS STEP */}
          {step === 3 && orderResult ? (
            <div className="py-6 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl"
              >
                <CheckCircle className="w-10 h-10" />
              </motion.div>

              <div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  Order Successfully Placed
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-2">Thank You For Your Order!</h2>
                <p className="text-slate-400 text-sm mt-1">
                  We've received your order and sent a confirmation to <span className="text-white font-medium">{orderResult.customerEmail}</span>
                </p>
              </div>

              {/* Order Number Box */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto space-y-1">
                <span className="text-xs text-slate-500 uppercase font-semibold">Tracking Order Number</span>
                <div className="text-xl font-black text-indigo-400 tracking-wider">
                  {orderResult.orderNumber}
                </div>
                <div className="text-xs text-slate-400 pt-1">
                  Estimated Delivery: <span className="text-emerald-400 font-semibold">2 - 4 Business Days</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div>
              
              {/* Header Step Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Checkout</h2>
                  <p className="text-xs text-slate-400">Spring Boot API Secured Payment</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>1</span>
                  <div className="w-6 h-0.5 bg-slate-800" />
                  <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>2</span>
                </div>
              </div>

              {/* STEP 1: Shipping Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Shipping Address</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Zip Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Payment Method */}
              {step === 2 && (
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Payment Details</h3>

                  {/* Payment Options */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-indigo-500 bg-indigo-500/10 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mb-1 text-indigo-400" />
                      <div>Credit Card</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'border-indigo-500 bg-indigo-500/10 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 mb-1 text-violet-400" />
                      <div>Instant UPI</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-indigo-500 bg-indigo-500/10 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <Truck className="w-5 h-5 mb-1 text-emerald-400" />
                      <div>Cash on Delivery</div>
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            name="cardExp"
                            value={formData.cardExp}
                            onChange={handleInputChange}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">CVC / CVV</label>
                          <input
                            type="password"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary Box */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex justify-between items-center text-sm">
                    <span className="text-slate-400">Total Payable</span>
                    <span className="font-black text-xl text-indigo-400">
                      ${cartSummary.grandTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Address</span>
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center gap-2 transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{loading ? 'Processing Order...' : `Pay $${cartSummary.grandTotal.toFixed(2)}`}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
