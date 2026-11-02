import React, { useState } from 'react';
import { X, TrendingDown, ArrowDownRight, ArrowUpRight, Minus, ShoppingCart, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function DailyMandiModal() {
  const { mandiRates, mandiModalOpen, setMandiModalOpen, products } = useProducts();
  const { addToCart, setCartDrawerOpen } = useCart();
  const { addToast } = useToast();
  const [mandiFilter, setMandiFilter] = useState('');

  if (!mandiModalOpen) return null;

  const filteredRates = mandiRates.filter(item =>
    item.name.toLowerCase().includes(mandiFilter.toLowerCase())
  );

  const handleQuickAdd = (rateName) => {
    // Find matching vegetable in products catalog
    const foundProduct = products.find(p => p.name.toLowerCase().includes(rateName.toLowerCase().split(' ')[0]));
    if (foundProduct) {
      addToCart(foundProduct, 1);
      addToast(`Added ${foundProduct.name} at ₹${foundProduct.price} to your cart!`, 'success');
      setCartDrawerOpen(true);
    } else {
      addToast(`Direct mandi rate locked for ${rateName}!`, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-900 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>Daily APMC & Farmdoor Mandi Price Board</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  LIVE RATES
                </span>
              </h3>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Benchmark rates updated daily at 6:00 AM from Nashik, Kolar & Nilgiris agri markets
              </p>
            </div>
          </div>

          <button
            onClick={() => setMandiModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Stats Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vegetable price..."
              value={mandiFilter}
              onChange={(e) => setMandiFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl outline-hidden focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-100/70 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Average Household Savings Today: 32.5%</span>
          </div>
        </div>

        {/* Mandi Rates Table */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
                  <th className="pb-3 px-3">Vegetable</th>
                  <th className="pb-3 px-3">Unit</th>
                  <th className="pb-3 px-3 text-emerald-700">Farmdoor Direct</th>
                  <th className="pb-3 px-3 text-slate-400">Supermarket</th>
                  <th className="pb-3 px-3">Your Savings</th>
                  <th className="pb-3 px-3">Trend</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRates.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-xs">
                      {item.unit}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-base font-black text-brand-700">₹{item.farmdoorPrice}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 line-through text-xs">
                      ₹{item.supermarketPrice}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block bg-emerald-100 text-brand-900 text-xs font-black px-2 py-0.5 rounded-md">
                        Save {item.savingsPercent}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs">
                      <span className="flex items-center gap-1 font-semibold text-slate-600">
                        {item.trend === 'down' ? (
                          <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                        ) : item.trend === 'up' ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <Minus className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span>{item.trendText}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleQuickAdd(item.name)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-brand-600 text-brand-800 hover:text-white rounded-xl text-xs font-bold border border-emerald-200 transition-colors inline-flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Farmdoor prices are directly tied to regional mandi wholesale rates plus minimal eco-logistics, passing up to 85% of retail price back to the growers.
        </div>

      </div>
    </div>
  );
}
