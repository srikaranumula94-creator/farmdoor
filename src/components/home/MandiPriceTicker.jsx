import React from 'react';
import { TrendingDown, ArrowDownRight, ArrowUpRight, Minus, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function MandiPriceTicker() {
  const { mandiRates, setMandiModalOpen } = useProducts();

  return (
    <section className="bg-emerald-900 text-white py-6 border-y border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  Today's Daily Vegetable Mandi Prices
                </h3>
                <span className="bg-emerald-700 text-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Live
                </span>
              </div>
              <p className="text-xs text-emerald-300/90">
                Transparent wholesale pricing: compare Farmdoor direct harvest vs traditional supermarket markups
              </p>
            </div>
          </div>

          <button
            onClick={() => setMandiModalOpen(true)}
            className="text-xs font-bold bg-emerald-800 hover:bg-emerald-700 text-emerald-100 hover:text-white px-3.5 py-1.5 rounded-xl border border-emerald-700 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>View Full Price Board</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal scroll cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          {mandiRates.slice(0, 6).map((item, idx) => (
            <div
              key={idx}
              className="bg-emerald-950/70 hover:bg-emerald-950 p-3 rounded-2xl border border-emerald-800/80 transition-all cursor-pointer group"
              onClick={() => setMandiModalOpen(true)}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {item.unit}
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-lg font-black text-emerald-300">₹{item.farmdoorPrice}</span>
                  <span className="text-[11px] text-slate-400 line-through ml-1.5">₹{item.supermarketPrice}</span>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md">
                  {item.savingsPercent}% OFF
                </span>
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[10px] text-emerald-400/80 border-t border-emerald-800/50 pt-1.5">
                <span className="flex items-center gap-0.5">
                  {item.trend === 'down' ? (
                    <ArrowDownRight className="w-3 h-3 text-emerald-300" />
                  ) : item.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 text-amber-300" />
                  ) : (
                    <Minus className="w-3 h-3 text-emerald-400" />
                  )}
                  <span>{item.trendText}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
