import React from 'react';
import { Sprout, Heart, ShieldCheck, Truck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function Footer({ onOpenFarmerPortal, onOpenAdminDashboard }) {
  const { setMandiModalOpen } = useProducts();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Farmer Impact Highlights Banner */}
        <div className="bg-gradient-to-r from-brand-900 to-emerald-900 rounded-3xl p-8 mb-16 border border-emerald-700/40 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
            <Sprout className="w-80 h-80" />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <p className="text-3xl font-black text-emerald-400">85%</p>
              <p className="text-xs font-semibold text-emerald-100 mt-1">Direct Farmer Share</p>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">Zero middlemen commissions</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">&lt; 12 Hrs</p>
              <p className="text-xs font-semibold text-emerald-100 mt-1">Farm to Doorstep</p>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">Harvested at dawn daily</p>
            </div>
            <div>
              <p className="text-3xl font-black text-earth-300">30-40%</p>
              <p className="text-xs font-semibold text-emerald-100 mt-1">Customer Savings</p>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">Below retail supermarket markup</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-xs font-semibold text-emerald-100 mt-1">Naturally Grown</p>
              <p className="text-[11px] text-emerald-300/80 mt-0.5">Lab tested & zero toxic sprays</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Farm<span className="text-brand-400">door</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting local farmers directly with urban households. Providing farm-fresh, organic vegetables at transparent mandi rates without middleman cuts.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hubs: Indiranagar & Whitefield (Bengaluru) • Nashik • Ooty</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Farmer & Consumer Hotline: +91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>care@farmdoor.com | farmers@farmdoor.com</span>
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Produce</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#vegetables" className="hover:text-emerald-400 transition-colors">Daily Essentials</a></li>
              <li><a href="#vegetables" className="hover:text-emerald-400 transition-colors">Leafy Greens & Herbs</a></li>
              <li><a href="#vegetables" className="hover:text-emerald-400 transition-colors">Root & Mountain Tubers</a></li>
              <li><a href="#vegetables" className="hover:text-emerald-400 transition-colors">Weekly Veggie Baskets</a></li>
              <li>
                <button onClick={() => setMandiModalOpen(true)} className="hover:text-emerald-400 transition-colors text-left">
                  Today's Mandi Price Board
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Farmers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">For Farmers</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onOpenFarmerPortal} className="hover:text-emerald-400 transition-colors text-left">
                  Farmer Registration & Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenFarmerPortal} className="hover:text-emerald-400 transition-colors text-left">
                  Upload Daily Harvest
                </button>
              </li>
              <li><a href="#farmers" className="hover:text-emerald-400 transition-colors">Meet Verified Farmers</a></li>
              <li>
                <a
                  href="https://wa.me/919876543210?text=I%20am%20a%20farmer%20and%20want%20to%20sell%20my%20produce%20on%20Farmdoor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Kisan WhatsApp Advisory
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Operations</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onOpenAdminDashboard} className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1">
                  <span>Admin Control Hub</span>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </button>
              </li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Direct Farm Supply Chain</a></li>
              <li><a href="#reviews" className="hover:text-emerald-400 transition-colors">Customer Feedback</a></li>
              <li><a href="#offers" className="hover:text-emerald-400 transition-colors">Promos & Discounts</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Farmdoor Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Harvested with care for nature & farmers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
