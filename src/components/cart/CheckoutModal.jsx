import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  CreditCard, 
  QrCode, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  Phone, 
  User, 
  Loader2 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';

export default function CheckoutModal() {
  const { 
    cartItems, 
    subtotal, 
    deliveryFee, 
    discountAmount, 
    grandTotal, 
    checkoutModalOpen, 
    setCheckoutModalOpen, 
    clearCart,
    deliverySlot,
    setDeliverySlot
  } = useCart();

  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1: Delivery Details, 2: Payment Method, 3: Processing
  const [paymentMethod, setPaymentMethod] = useState('UPI (GPay / PhonePe)');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [recipientName, setRecipientName] = useState(user?.name || 'Priya Sharma');
  const [recipientPhone, setRecipientPhone] = useState(user?.phone || '+91 98765 01234');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || 'Flat 402, Green Meadows, 14th Main, Indiranagar');
  const [pincode, setPincode] = useState(user?.pincode || '560038');
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave in clean vegetable tote bag at door');

  // Simulated Card Info
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('412');

  if (!checkoutModalOpen) return null;

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!recipientName || !recipientPhone || !deliveryAddress) {
      addToast('Please complete all delivery details', 'error');
      return;
    }
    setStep(2);
  };

  const handleFinalOrderSubmit = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        user,
        cartItems,
        subtotal,
        deliveryFee,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod,
        deliveryAddress: `${deliveryAddress}, Bengaluru - ${pincode}`,
        deliverySlot,
        customerPhone: recipientPhone,
      });

      setIsProcessing(false);
      clearCart();
      setCheckoutModalOpen(false);
      addToast(`Order #${order.id} confirmed! Harvest underway.`, 'success');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Farmdoor Direct Checkout
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-300">Step {step} of 2</span>
            </div>
            <h3 className="text-xl font-black text-white mt-0.5">
              {step === 1 ? 'Delivery Address & Harvest Slot' : 'Select Payment Method'}
            </h3>
          </div>

          <button
            onClick={() => setCheckoutModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Delivery Details */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              
              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number for Delivery Updates
                  </label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Address details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Complete Delivery Address (Apartment, House, Street)
                </label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PIN Code (Bengaluru Hub Verified)
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Note / Gate Code
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Harvest Delivery Slot Picker */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span>Choose Your Preferred Harvest Delivery Slot</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliverySlot('Morning Sunrise (6:00 AM - 9:00 AM)')}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      deliverySlot.includes('Morning')
                        ? 'border-brand-600 bg-emerald-50/70 text-brand-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Morning Sunrise Slot</span>
                      <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded-full font-bold">
                        Most Fresh
                      </span>
                    </div>
                    <p className="text-sm font-black mt-1">6:00 AM - 9:00 AM</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Harvested at 5:00 AM today</p>
                  </div>

                  <div
                    onClick={() => setDeliverySlot('Fresh Evening Drop (4:00 PM - 7:00 PM)')}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      deliverySlot.includes('Evening')
                        ? 'border-brand-600 bg-emerald-50/70 text-brand-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Fresh Evening Drop</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                        Dinner prep
                      </span>
                    </div>
                    <p className="text-sm font-black mt-1">4:00 PM - 7:00 PM</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Afternoon harvest dispatch</p>
                  </div>
                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment (₹{grandTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Options */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Payment Methods Accordion / Radios */}
              <div className="space-y-3">
                {/* Method 1: UPI */}
                <div
                  onClick={() => setPaymentMethod('UPI (GPay / PhonePe)')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod.includes('UPI')
                      ? 'border-brand-600 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-900">
                          Instant UPI & QR Code (Google Pay, PhonePe, Paytm)
                        </p>
                        <p className="text-[11px] text-slate-500">Zero transaction charges • Fast & contactless</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod.includes('UPI')}
                      onChange={() => {}}
                      className="text-brand-600"
                    />
                  </div>

                  {paymentMethod.includes('UPI') && (
                    <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-4 text-xs">
                      <div className="p-2 bg-white rounded-xl border border-slate-200">
                        <div className="w-20 h-20 bg-slate-900 text-white rounded-lg flex flex-col items-center justify-center p-2 text-center text-[10px]">
                          <QrCode className="w-10 h-10 mb-1" />
                          <span>Scan & Pay</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800">Scan QR via any UPI App</p>
                        <p className="text-slate-500 text-[11px]">Farmdoor Direct UPI ID: <span className="font-mono font-bold text-brand-800">farmdoor.harvest@okaxis</span></p>
                        <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                          Instant Farmer Settlement
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Method 2: Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod('Credit / Debit Card')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod.includes('Credit')
                      ? 'border-brand-600 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-900">
                          Credit / Debit Card (Visa, RuPay, MasterCard)
                        </p>
                        <p className="text-[11px] text-slate-500">256-bit Encrypted Bank Gateway</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod.includes('Credit')}
                      onChange={() => {}}
                      className="text-brand-600"
                    />
                  </div>

                  {paymentMethod.includes('Credit') && (
                    <div className="mt-4 pt-3 border-t border-emerald-100 space-y-2 text-xs">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono"
                        />
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          maxLength={3}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Method 3: Cash on Delivery (COD) */}
                <div
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    paymentMethod.includes('Cash')
                      ? 'border-brand-600 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-900">
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-[11px] text-slate-500">Pay cash or UPI at your door after checking vegetable quality</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod.includes('Cash')}
                      onChange={() => {}}
                      className="text-brand-600"
                    />
                  </div>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span>Delivering To:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[200px]">{deliveryAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Slot:</span>
                  <span className="font-bold text-emerald-800">{deliverySlot}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-200">
                  <span>Payable Total:</span>
                  <span className="text-brand-700 text-base">₹{grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Back to Address
                </button>

                <button
                  onClick={handleFinalOrderSubmit}
                  disabled={isProcessing}
                  className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Fresh Harvest...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Place Order (₹{grandTotal})</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
