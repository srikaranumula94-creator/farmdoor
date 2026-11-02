import React from 'react';
import { Sprout, TrendingDown, Tractor, ShieldCheck, ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function HeroSection({ onOpenFarmerPortal }) {
  const { setMandiModalOpen } = useProducts();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-brand-50/30 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative organic background blobs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-brand-900 text-xs font-bold border border-emerald-300/60 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>100% Direct From Local Indian Farmers</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-700 font-semibold">Zero Middlemen</span>
            </div>

            {/* Main Headline with exact tagline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Fresh from Farmers, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-700">
                Direct to Your Door.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Skip cold storage and broker commissions. Vegetables harvested at sunrise from certified organic family farms in Nashik, Nilgiris & Bangalore, delivered to your kitchen before lunch.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#vegetables"
                className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-600/30 hover:shadow-xl hover:shadow-brand-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group"
              >
                <span>Shop Today's Harvest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setMandiModalOpen(true)}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200/90 hover:border-brand-300 shadow-sm transition-all flex items-center gap-2 group"
              >
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Check Daily Mandi Rates</span>
              </button>

              <button
                onClick={onOpenFarmerPortal}
                className="px-5 py-3.5 rounded-2xl bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 font-bold text-sm border border-amber-200/80 transition-all flex items-center gap-2"
              >
                <Tractor className="w-4 h-4 text-amber-700" />
                <span>Join as Farmer</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Harvested within 6-12 hrs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>85% revenue to farmers</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free delivery over ₹249</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composite Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main vegetable crate image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/20 border-4 border-white aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1000&q=80"
                  alt="Crisp fresh organic vegetables directly from farm"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating badge inside image */}
                <div className="absolute top-4 left-4 bg-brand-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-xs font-bold border border-white/20 shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Mandi Price Direct: Up to 40% Off</span>
                </div>
              </div>

              {/* Floating Card 1: Farmer Origin Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 animate-slide-up max-w-[240px]">
                <img
                  src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=150&q=80"
                  alt="Farmer Ramesh"
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-brand-500/30"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-slate-900">Ramesh Patil</p>
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-600 fill-brand-100" />
                  </div>
                  <p className="text-[10px] text-slate-500 flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>Dindori, Nashik</span>
                  </p>
                  <p className="text-[10px] font-bold text-emerald-700 mt-0.5">Harvested 5:30 AM today</p>
                </div>
              </div>

              {/* Floating Card 2: Freshness Score Card */}
              <div className="absolute -top-5 -right-5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-2.5 animate-bounce-subtle">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-brand-700 font-extrabold text-xs">
                  🥬
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900">Farm-to-Plate</p>
                  <p className="text-[10px] text-slate-500 font-medium">Zero Chemical Cold Stores</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
