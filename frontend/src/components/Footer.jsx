import React from 'react';
import { Sparkles, Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">AURA.STORE</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Modern full-stack e-commerce experience powered by Spring Boot REST API & React UI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Explore</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">Featured Tech</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gaming Peripherals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Streetwear Apparel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Workspace Essentials</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Support</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spring Boot API Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">H2 Console Portal</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Stay Updated</h4>
            <p className="text-slate-500">Get early access to tech drops and discounts.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 AURA STORE. All rights reserved. Powered by Spring Boot 3.4 & React.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-indigo-400 transition-colors"><Heart className="w-4 h-4" /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><Sparkles className="w-4 h-4" /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors"><Mail className="w-4 h-4" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
