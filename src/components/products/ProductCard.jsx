import React from 'react';
import { Plus, Minus, Star, ShieldCheck, MapPin, Sparkles, Check, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';

export default function ProductCard({ product }) {
  const { addToCart, updateQuantity, getItemQuantity, setCartDrawerOpen } = useCart();
  const { setActiveProductDetail } = useProducts();
  const { addToast } = useToast();

  const currentQty = getItemQuantity(product.id);

  const handleAddFirstTime = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    addToCart(product, 1);
    addToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, currentQty + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, currentQty - 1);
  };

  return (
    <div
      onClick={() => setActiveProductDetail(product)}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative card-hover-shadow"
    >
      {/* Image container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Harvest Time Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-800 border border-slate-200/60 shadow-xs flex items-center gap-1">
          <Clock className="w-3 h-3 text-emerald-600" />
          <span>{product.harvestTime}</span>
        </div>

        {/* Organic / Offer badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {product.isOrganic && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs flex items-center gap-1">
              <span>Organic</span>
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md">
              Harvest Sold Out for Today
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Farmer & Location */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
            <span className="text-brand-800 font-semibold truncate max-w-[140px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>
              {product.farmName}
            </span>
            <div className="flex items-center gap-0.5 text-amber-600 font-bold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Local Name */}
          {product.localName && (
            <p className="text-[11px] text-slate-400 font-medium">
              {product.localName}
            </p>
          )}

          {/* Description snippet */}
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
          {/* Price Block */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-brand-700">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">{product.unit}</span>
          </div>

          {/* Cart Buttons */}
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            {!product.inStock ? (
              <button
                disabled
                className="px-3 py-1.5 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl cursor-not-allowed"
              >
                Unavailable
              </button>
            ) : currentQty === 0 ? (
              <button
                onClick={handleAddFirstTime}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-brand-600 text-brand-800 hover:text-white rounded-xl text-xs font-bold border border-emerald-200 hover:border-brand-600 transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <div className="flex items-center bg-brand-600 text-white rounded-xl shadow-xs overflow-hidden">
                <button
                  onClick={handleDecrement}
                  className="px-2.5 py-1.5 hover:bg-brand-700 active:bg-brand-800 transition-colors font-bold text-xs"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 py-1 text-xs font-black min-w-[20px] text-center">
                  {currentQty}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-2.5 py-1.5 hover:bg-brand-700 active:bg-brand-800 transition-colors font-bold text-xs"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
