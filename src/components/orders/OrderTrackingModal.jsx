import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Truck, 
  Package, 
  Sprout, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Play
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';

export default function OrderTrackingModal() {
  const { 
    activeTrackingOrder, 
    setActiveTrackingOrder, 
    trackingModalOpen, 
    setTrackingModalOpen,
    updateOrderStatus 
  } = useOrders();

  const { addToast } = useToast();
  const [showInvoice, setShowInvoice] = useState(false);

  if (!trackingModalOpen || !activeTrackingOrder) return null;

  const order = activeTrackingOrder;

  const handleSimulateNextStage = () => {
    const statuses = ['Placed', 'Harvesting', 'Quality Checked', 'Out for Delivery', 'Delivered'];
    const currentIdx = statuses.indexOf(order.status);
    if (currentIdx < statuses.length - 1) {
      const nextStatus = statuses[currentIdx + 1];
      updateOrderStatus(order.id, nextStatus);
      addToast(`Order updated to: "${nextStatus}"!`, 'info');
    } else {
      addToast('Order has already reached final delivery!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-900 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-brand-700/70 text-emerald-200 px-2.5 py-0.5 rounded-full border border-brand-500/30">
                  Live Farm Dispatch
                </span>
                <span className="text-xs text-emerald-300 font-mono font-bold">#{order.id}</span>
              </div>
              <h3 className="text-xl font-black text-white mt-0.5">
                Current Status: <span className="text-emerald-300">{order.status}</span>
              </h3>
            </div>
          </div>

          <button
            onClick={() => setTrackingModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* Quick Simulation Banner (Great for testing prototype!) */}
          <div className="p-3.5 bg-brand-50 rounded-2xl border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-brand-900">
              <Play className="w-4 h-4 text-brand-600 fill-brand-600 shrink-0" />
              <span>
                <strong>Prototype Demo Tool:</strong> Simulate order stages from farm harvest to doorstep delivery in real time!
              </span>
            </div>
            <button
              onClick={handleSimulateNextStage}
              className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors shrink-0"
            >
              Advance Delivery Stage →
            </button>
          </div>

          {/* Stepper Timeline */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
              Harvest & Delivery Progress Timeline
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {order.statusTimeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-[30px] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs ${
                      step.done
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h5 className={`text-sm font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.step}
                      </h5>
                      <span className="text-xs font-mono text-slate-400 font-semibold">{step.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Partner Card */}
          {order.deliveryPartner && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-brand-700 font-bold text-lg">
                  🛵
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Delivery Partner: {order.deliveryPartner.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </p>
                  <p className="text-[11px] text-slate-500">{order.deliveryPartner.vehicle}</p>
                  <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                    Contact: {order.deliveryPartner.phone}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${order.deliveryPartner.phone}`}
                className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-brand-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>Call Driver</span>
              </a>
            </div>
          )}

          {/* Ordered Harvest Items */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
              Produce in This Crate ({order.items.length} items)
            </h4>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{item.name}</span>
                      <span className="text-[11px] text-slate-500">{item.unit} • {item.farmName}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-slate-800">Qty: {item.quantity}</span>
                    <span className="block font-black text-brand-700">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Delivery Address Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Delivery Location</span>
              <p className="font-bold text-slate-800 mt-1">{order.customerName}</p>
              <p className="text-slate-600 mt-0.5">{order.deliveryAddress}</p>
              <p className="text-emerald-700 font-semibold mt-1">Slot: {order.deliverySlot}</p>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Payment Summary</span>
              <p className="font-bold text-slate-800 mt-1">Method: {order.paymentMethod}</p>
              <p className="text-slate-600 mt-0.5">Status: <span className="font-bold text-emerald-700">{order.paymentStatus}</span></p>
              <p className="text-brand-900 font-black text-sm mt-1">Total Paid: ₹{order.total}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
