import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function CartDrawer() {
  const {
    cartItems,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    freeDeliveryProgress,
    amountToFreeDelivery,
    appliedCoupon,
    couponCode,
    setCouponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    discountAmount,
    farmerDirectSavings,
    grandTotal,
    setCheckoutModalOpen,
  } = useCart();

  const { addToast } = useToast();

  if (!cartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5 text-brand-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">Your Harvest Basket</h3>
              <p className="text-xs text-slate-500 font-medium">{cartItems.length} items in cart</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-rose-600 font-semibold transition-colors px-2 py-1"
                title="Clear Cart"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Meter */}
        <div className="px-5 py-3 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-bold text-brand-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-brand-700" />
              {amountToFreeDelivery > 0
                ? `Add ₹${amountToFreeDelivery} more for FREE morning delivery`
                : '🎉 Congratulations! You have unlocked FREE Delivery!'}
            </span>
            <span>{freeDeliveryProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-emerald-200/60 overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Item List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-brand-300 transition-all"
              >
                {/* Product Thumbnail */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {product.unit} • <span className="text-emerald-700">{product.farmName?.split(' ')[0]} Farm</span>
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-black text-sm text-brand-800">
                      ₹{product.price * quantity}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (₹{product.price} each)
                    </span>
                  </div>
                </div>

                {/* Stepper + Remove */}
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-black text-slate-800 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(product.id);
                      addToast(`Removed ${product.name}`, 'info');
                    }}
                    className="text-[10px] text-slate-400 hover:text-rose-600 flex items-center gap-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <span className="text-5xl">🧺</span>
              <h4 className="font-bold text-base text-slate-800">Your basket is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore today's fresh sunrise harvest and support our local farmers.
              </p>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="mt-3 px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors"
              >
                Shop Fresh Veggies
              </button>
            </div>
          )}
        </div>

        {/* Bottom Checkout & Bill Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-4">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. FARMFRESH10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl uppercase font-mono tracking-wider outline-hidden focus:border-brand-500"
                  />
                  <button
                    onClick={() => applyCoupon()}
                    className="px-4 py-2 bg-slate-900 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-xl text-xs text-brand-900 font-semibold">
                  <span className="flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {appliedCoupon.code} applied!
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:text-rose-800 underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {couponError}
                </p>
              )}
            </div>

            {/* Bill breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
              <div className="flex justify-between">
                <span>Produce Subtotal:</span>
                <span className="font-bold text-slate-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Middleman Commission Saved:</span>
                <span className="font-bold">-₹{farmerDirectSavings}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-700">
                  <span>Promo Code Discount:</span>
                  <span className="font-bold">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-bold text-slate-800">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-black">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-brand-900 text-base">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
