import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Heart, 
  Leaf, 
  Info, 
  CheckCircle2, 
  MessageSquareQuote,
  Send
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function ProductDetailModal() {
  const { activeProductDetail, setActiveProductDetail, reviews, addReview } = useProducts();
  const { addToCart, getItemQuantity, updateQuantity, setCartDrawerOpen } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reviews' | 'farmer'
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localQty, setLocalQty] = useState(1);

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, localQty);
    addToast(`Added ${localQty} × ${product.name} to cart!`, 'success');
    setCartDrawerOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReview({
      productId: product.id,
      rating: reviewRating,
      comment: reviewComment,
      userName: user?.name || 'Farmdoor Customer'
    });

    setReviewComment('');
    addToast('Thank you for rating this harvest!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header / Close button */}
        <button
          onClick={() => setActiveProductDetail(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Top section: Image + Main details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{product.harvestTime}</span>
              </div>
              {product.isOrganic && (
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                  100% Organic
                </div>
              )}
            </div>

            {/* Title, Prices, Farmer Origin */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                  {product.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1 leading-tight">
                  {product.name}
                </h2>
                {product.localName && (
                  <p className="text-xs text-slate-400 font-medium">{product.localName}</p>
                )}
              </div>

              {/* Price card */}
              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-brand-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-xs text-brand-700 font-bold">per {product.unit}</span>
                </div>

                {product.discountPercent > 0 && (
                  <div className="bg-brand-600 text-white px-3 py-1.5 rounded-xl text-center">
                    <span className="block text-xs font-black">{product.discountPercent}% OFF</span>
                    <span className="block text-[10px] text-brand-100">Direct Farmer Deal</span>
                  </div>
                )}
              </div>

              {/* Farmer Origin card */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                  🚜
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{product.farmName}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{product.farmLocation}</span>
                  </p>
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart button */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
                  <button
                    onClick={() => setLocalQty(Math.max(1, localQty - 1))}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-black text-sm text-slate-900">
                    {localQty}
                  </span>
                  <button
                    onClick={() => setLocalQty(localQty + 1)}
                    className="w-9 h-9 rounded-xl bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart (₹{product.price * localQty})</span>
                </button>
              </div>

            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Overview & Nutrition
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Customer Reviews</span>
              <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                {productReviews.length}
              </span>
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
              <p className="text-slate-700 leading-relaxed">
                {product.description}
              </p>

              {/* Nutrition Facts */}
              {product.nutrition && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Estimated Nutritional Highlights</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {Object.entries(product.nutrition).map(([key, val]) => (
                      <div key={key} className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 capitalize block">{key}:</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage advice */}
              {product.storageTip && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Farmdoor Kitchen Storage Advice:</span>
                    <span className="text-amber-800">{product.storageTip}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Reviews & Submit Feedback */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fade-in">
              {/* Write Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Rate this Vegetable & Share Your Feedback
                </h4>

                {/* Star rating selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-600 ml-1">({reviewRating}/5 Stars)</span>
                </div>

                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Write about the taste, aroma, tenderness, and packaging..."
                    className="flex-1 text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {productReviews.length > 0 ? (
                  productReviews.map(r => (
                    <div key={r.id} className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{r.userName}</span>
                        <div className="flex items-center text-amber-400">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{r.comment}"
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span>{r.date}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified Purchase
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4">
                    Be the first to review today's fresh harvest!
                  </p>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
