import React from 'react';
import { Sun, ShieldCheck, Truck, RefreshCw, HeartHandshake, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Sun,
      title: 'Sunrise Harvest',
      description: 'Farmers harvest vegetables at 5:00 AM based on real customer orders. No leftover cold stores, only fresh dew-kissed produce.'
    },
    {
      number: '02',
      icon: ShieldCheck,
      title: 'Zero Broker Quality Check',
      description: 'Produce moves to our regional farmer collection center for pesticide residue checks, hygienic grading, and eco-crate packing.'
    },
    {
      number: '03',
      icon: Truck,
      title: 'Direct Doorstep Delivery',
      description: 'Delivered in electric refrigerated vans right to your apartment before breakfast or evening dinner preparation.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-900 text-xs font-bold mb-3">
            <RefreshCw className="w-3.5 h-3.5 text-brand-700" />
            <span>The Farmdoor Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Farmdoor Works
          </h2>
          <p className="text-base text-slate-600 mt-2">
            A radically transparent food supply chain that replaces 4-5 layers of intermediaries with a direct bridge from soil to kitchen.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-brand-50/50 rounded-3xl p-8 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md shadow-brand-600/10 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-emerald-300/80 font-mono">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Ethical Economics</span>
            </div>
            <h3 className="text-2xl font-black text-white">Why it matters to your family & India's farmers</h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              In traditional supermarket supply chains, vegetables spend 3 to 5 days traveling across APMC mandis, brokers, and warehouses—losing over 60% of their nutrients.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-400">Traditional Mandi Broker System</span>
              <span className="text-rose-400 font-bold">Farmer gets only 20-30%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full bg-rose-500 w-[28%] rounded-full"></div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-emerald-300 font-bold">Farmdoor Direct Fair Model</span>
              <span className="text-emerald-400 font-black">Farmer receives 85%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
