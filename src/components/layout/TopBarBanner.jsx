import React from 'react';
import { Sparkles, Phone, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';

export default function TopBarBanner() {
  const { setMandiModalOpen } = useProducts();
  const { setMyOrdersModalOpen } = useOrders();

  return (
    <div className="bg-brand-900 text-brand-100 text-xs py-2 px-4 border-b border-brand-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        {/* Left marquee / highlight */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-brand-700/60 text-brand-200 px-2.5 py-0.5 rounded-full font-semibold text-[11px] border border-brand-600/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            Morning Harvest
          </span>
          <p className="flex items-center gap-1.5 text-slate-200 font-medium">
            <span>Fresh vegetables harvested at 5:00 AM • Direct from local farms with zero middlemen</span>
          </p>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-4 text-brand-200">
          <button
            onClick={() => setMandiModalOpen(true)}
            className="hover:text-white flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <TrendingDown className="w-3.5 h-3.5 text-earth-300 group-hover:scale-110 transition-transform" />
            <span className="font-medium underline decoration-brand-600 decoration-1 underline-offset-2">Today's Mandi vs Retail</span>
          </button>

          <span className="text-brand-700">•</span>

          <button
            onClick={() => setMyOrdersModalOpen(true)}
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-brand-300" />
            <span>Track Order</span>
          </button>

          <span className="text-brand-700 hidden sm:inline">•</span>

          <a
            href="https://wa.me/919876543210?text=Hi%20Farmdoor,%20I%20have%20a%20question%20about%20today's%20fresh%20harvest"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-300 flex items-center gap-1 transition-colors hidden sm:flex"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Helpline: +91 98765 43210</span>
          </a>
        </div>
      </div>
    </div>
  );
}
