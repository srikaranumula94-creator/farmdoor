import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Clock, ShoppingCart, Percent } from 'lucide-react';
import { PROMO_CODES } from '../../data/initialData';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';

export default function SpecialOffers() {
  const { applyCoupon, addToCart, setCartDrawerOpen } = useCart();
  const { products, setActiveProductDetail } = useProducts();
  const { addToast } = useToast();
  const [copiedCode, setCopiedCode] = useState('');

  const offerProducts = products.filter(p => p.isOffer).slice(0, 3);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    addToast(`Promo code ${code} copied & applied to your cart!`, 'success');
    setTimeout(() => setCopiedCode(''), 3000);
  };

  return (
    <section id="offers" className="py-12 bg-gradient-to-b from-white via-earth-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Special Farmer Direct Offers & Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Harvest Discounts & Curated Baskets
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Extra savings for conscious eaters supporting local agricultural communities
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100/70 px-3.5 py-2 rounded-xl border border-amber-200">
            <Clock className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Today's harvest offers valid till 9:00 PM</span>
          </div>
        </div>

        {/* Coupons Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {PROMO_CODES.map((promo, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-4 border-2 border-dashed border-amber-300 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex items-center justify-between group overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-slate-900 tracking-wider">
                      {promo.code}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                      {promo.discountPercent ? `${promo.discountPercent}% OFF` : `₹${promo.discountAmount} OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {promo.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopyCode(promo.code)}
                className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  copiedCode === promo.code
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                }`}
                title="Copy and Apply Code"
              >
                {copiedCode === promo.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Apply</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Curated Deal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setActiveProductDetail(product)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-md">
                  {product.discountPercent}% OFF
                </span>
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                  {product.farmName}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setActiveProductDetail(product)}
                    className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-brand-700">₹{product.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{product.unit}</span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      addToast(`Added ${product.name} to cart!`, 'success');
                      setCartDrawerOpen(true);
                    }}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
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
