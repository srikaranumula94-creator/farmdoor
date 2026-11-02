import React from 'react';
import { Tractor, MapPin, Award, Star, Sprout, ShieldCheck, ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function FarmerSpotlight() {
  const { farmers, setSelectedFarmerId } = useProducts();

  const handleFilterByFarmer = (farmerId) => {
    setSelectedFarmerId(farmerId);
    const vegSection = document.getElementById('vegetables');
    if (vegSection) {
      vegSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="farmers" className="py-16 bg-[#f7f9f7] border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold mb-3">
            <Tractor className="w-3.5 h-3.5 text-brand-700" />
            <span>Direct Traceability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Meet the Farmers Behind Your Food
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Every carrot, tomato, and bundle of spinach has a story and an ethical farmer. Click on any farmer to explore their freshly picked harvest.
          </p>
        </div>

        {/* Farmer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmers.map(farmer => (
            <div
              key={farmer.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Cover & Avatar Header */}
              <div className="relative h-32 bg-slate-100 overflow-hidden">
                <img
                  src={farmer.coverImage}
                  alt={farmer.farmName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Distance Badge */}
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{farmer.distanceKm} km away</span>
                </span>

                {/* Farmer Avatar */}
                <div className="absolute -bottom-6 left-5">
                  <div className="relative">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-16 h-16 rounded-2xl object-cover border-3 border-white shadow-md ring-2 ring-brand-500/20"
                    />
                    {farmer.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-brand-600 text-white rounded-full p-0.5" title="Verified Organic Farmer">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Farmer Body Info */}
              <div className="pt-8 px-5 pb-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                      {farmer.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{farmer.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-brand-700 mt-0.5">
                    {farmer.farmName}
                  </p>
                  
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{farmer.location}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {farmer.bio}
                  </p>

                  {/* Highlights pills */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-slate-500">
                      <span>Experience:</span>
                      <span className="font-bold text-slate-800">{farmer.experienceYears} Years</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Specialty:</span>
                      <span className="font-bold text-brand-900 truncate max-w-[130px]">{farmer.specialty}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Harvested to Date:</span>
                      <span className="font-bold text-slate-800">{(farmer.totalHarvestKg / 1000).toFixed(1)}k kg</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => handleFilterByFarmer(farmer.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>View {farmer.name.split(' ')[0]}'s Produce</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
