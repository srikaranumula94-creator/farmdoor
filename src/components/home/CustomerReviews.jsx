import React from 'react';
import { Star, CheckCircle, MessageSquareQuote, ThumbsUp } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export default function CustomerReviews() {
  const { reviews } = useProducts();

  return (
    <section id="reviews" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Customer Satisfaction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Loved by 12,000+ Conscious Families
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Read authentic feedback from families eating cleaner, sweeter farm-to-table vegetables every day.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-200">
            <div className="text-center">
              <p className="text-2xl font-black text-brand-900 leading-none">4.92</p>
              <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-8 w-px bg-emerald-200"></div>
            <div className="text-xs text-brand-900 font-semibold">
              <p className="font-extrabold text-slate-900">Over 3,400+ Reviews</p>
              <p className="text-brand-700">98.4% Repeat Order Rate</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map(rev => (
            <div
              key={rev.id}
              className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/80 hover:border-brand-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{rev.userName}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Farmdoor Buyer</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
