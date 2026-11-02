import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Clock, 
  ChevronRight, 
  RefreshCw, 
  Ban, 
  CheckCircle2, 
  AlertCircle,
  Truck
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';

export default function MyOrdersModal() {
  const { 
    orders, 
    myOrdersModalOpen, 
    setMyOrdersModalOpen, 
    trackOrder, 
    cancelOrder 
  } = useOrders();

  const { addToCart, setCartDrawerOpen } = useCart();
  const { products } = useProducts();
  const { addToast } = useToast();

  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'active' | 'delivered'

  if (!myOrdersModalOpen) return null;

  const filteredOrders = orders.filter(order => {
    if (filterTab === 'active') return order.status !== 'Delivered' && order.status !== 'Cancelled';
    if (filterTab === 'delivered') return order.status === 'Delivered';
    return true;
  });

  const handleReorder = (order) => {
    order.items.forEach(item => {
      const liveProd = products.find(p => p.id === item.id) || item;
      addToCart(liveProd, item.quantity);
    });
    setMyOrdersModalOpen(false);
    setCartDrawerOpen(true);
    addToast('Re-added vegetables from this order to your cart!', 'success');
  };

  const handleCancel = (orderId) => {
    cancelOrder(orderId);
    addToast('Order has been cancelled successfully', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">My Orders & Fresh Deliveries</h3>
              <p className="text-xs text-slate-400">Track current harvest runs and past farm shipments</p>
            </div>
          </div>

          <button
            onClick={() => setMyOrdersModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-2 bg-slate-50/60 text-xs font-bold">
          <button
            onClick={() => setFilterTab('all')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors ${
              filterTab === 'all' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilterTab('active')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors ${
              filterTab === 'active' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            Active Deliveries
          </button>
          <button
            onClick={() => setFilterTab('delivered')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors ${
              filterTab === 'delivered' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            Delivered
          </button>
        </div>

        {/* Orders List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-brand-300 shadow-xs transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">#{order.id}</span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-brand-800'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Slot: {order.deliverySlot}
                    </span>
                  </div>

                  <span className="text-base font-black text-brand-800">
                    ₹{order.total}
                  </span>
                </div>

                {/* Items preview snippet */}
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 shrink-0 bg-slate-50 p-1.5 rounded-xl border border-slate-200/80 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                      <span className="font-semibold text-slate-800 text-[11px] max-w-[90px] truncate">{item.name}</span>
                      <span className="text-slate-400 text-[10px]">×{item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    {order.status === 'Placed' && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="text-rose-600 hover:text-rose-800 font-bold px-2 py-1 flex items-center gap-1 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Cancel Order</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleReorder(order)}
                      className="text-brand-700 hover:text-brand-900 font-bold px-2 py-1 flex items-center gap-1 hover:bg-brand-50 rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reorder Basket</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setMyOrdersModalOpen(false);
                      trackOrder(order);
                    }}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Live Delivery</span>
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Package className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-bold text-sm text-slate-600">No orders found</p>
              <p className="text-xs">Your farm harvest deliveries will appear here.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
