import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Package, 
  Users, 
  Tractor, 
  ShoppingBag, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Truck,
  DollarSign,
  Search,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminDashboardModal({ isOpen, onClose }) {
  const { 
    products, 
    updateProduct, 
    deleteProduct, 
    toggleStock, 
    farmers, 
    verifyFarmer, 
    mandiRates, 
    updateMandiRate 
  } = useProducts();

  const { orders, updateOrderStatus } = useOrders();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'farmers' | 'customers' | 'mandi'
  const [orderSearch, setOrderSearch] = useState('');

  if (!isOpen) return null;

  // Key KPI stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0) + 148200;
  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const mockCustomers = [
    { id: 'c-1', name: 'Priya Sharma', email: 'priya@farmdoor.com', phone: '+91 98765 01234', address: 'Indiranagar, Bengaluru', ordersCount: 8, spent: 2450 },
    { id: 'c-2', name: 'Dr. Vivek Sharma', email: 'vivek.s@gmail.com', phone: '+91 98111 22334', address: 'Whitefield, Bengaluru', ordersCount: 14, spent: 5120 },
    { id: 'c-3', name: 'Kavita Menon', email: 'kavita.m@outlook.com', phone: '+91 94444 55667', address: 'Koramangala, Bengaluru', ordersCount: 5, spent: 1840 },
    { id: 'c-4', name: 'Arun Iyer', email: 'arun.iyer@yahoo.com', phone: '+91 97777 88990', address: 'HSR Layout, Bengaluru', ordersCount: 11, spent: 3900 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                  Operations & Logistics Command
                </span>
                <span className="text-xs text-slate-400">Master Control</span>
              </div>
              <h3 className="text-2xl font-black text-white mt-0.5">
                Farmdoor Administration Hub
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global KPI stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200">
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total GMV Revenue</span>
            <p className="text-2xl font-black text-slate-900 mt-0.5">₹{totalRevenue.toLocaleString()}</p>
            <span className="text-[10px] text-emerald-600 font-bold">+18.4% this week</span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Deliveries</span>
            <p className="text-2xl font-black text-brand-700 mt-0.5">{activeOrdersCount} in transit</p>
            <span className="text-[10px] text-slate-500 font-medium">{orders.length} total orders</span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Verified Farmers</span>
            <p className="text-2xl font-black text-amber-700 mt-0.5">{farmers.length} Growers</p>
            <span className="text-[10px] text-amber-600 font-bold">100% Zero Middlemen</span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Customer Base</span>
            <p className="text-2xl font-black text-purple-700 mt-0.5">1,240 Homes</p>
            <span className="text-[10px] text-purple-600 font-bold">Indiranagar & Whitefield Hubs</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-2 bg-slate-50/70 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            <Truck className="w-4 h-4 text-brand-600" />
            <span>Manage Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'products' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span>Vegetables Catalog ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('farmers')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'farmers' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            <Tractor className="w-4 h-4 text-amber-600" />
            <span>Farmer Network ({farmers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'customers' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Customers ({mockCustomers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('mandi')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'mandi' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Daily Mandi Rates</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Manage Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Live Customer Orders & Dispatch Pipeline
                </h4>
                <div className="text-xs text-slate-500">
                  Tip: Change order status to instantly update the customer's live tracking view.
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      <th className="pb-3 px-3">Order ID</th>
                      <th className="pb-3 px-3">Customer</th>
                      <th className="pb-3 px-3">Produce Items</th>
                      <th className="pb-3 px-3">Amount</th>
                      <th className="pb-3 px-3">Current Status</th>
                      <th className="pb-3 px-3 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">
                          #{order.id}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block">{order.customerName}</span>
                          <span className="text-[11px] text-slate-500">{order.customerPhone}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-700">
                            {order.items.map(i => `${i.quantity}x ${i.name.split(' ')[0]}`).join(', ')}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-black text-brand-800">
                          ₹{order.total}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-brand-800'
                                : order.status === 'Cancelled'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => {
                              updateOrderStatus(order.id, e.target.value);
                              addToast(`Order #${order.id} updated to ${e.target.value}!`, 'success');
                            }}
                            className="text-xs p-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-800 outline-hidden cursor-pointer"
                          >
                            <option value="Placed">Placed</option>
                            <option value="Harvesting">Harvesting at Farm</option>
                            <option value="Quality Checked">Quality Checked</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Manage Vegetables Catalog */}
          {activeTab === 'products' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Global Marketplace Vegetables ({products.length} listed)
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      <th className="pb-3 px-3">Vegetable</th>
                      <th className="pb-3 px-3">Category</th>
                      <th className="pb-3 px-3">Farmer / Farm</th>
                      <th className="pb-3 px-3">Price</th>
                      <th className="pb-3 px-3">Stock State</th>
                      <th className="pb-3 px-3 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 flex items-center gap-2.5">
                          <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover" />
                          <span className="font-bold text-slate-900">{p.name}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-500">{p.category}</td>
                        <td className="py-3 px-3 text-brand-800 font-semibold">{p.farmName}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">₹{p.price} / {p.unit}</td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => toggleStock(p.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {p.inStock ? 'In-Stock' : 'Sold Out'}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => {
                              const newPrice = prompt(`Set price for ${p.name}:`, p.price);
                              if (newPrice) updateProduct(p.id, { price: Number(newPrice) });
                            }}
                            className="p-1 hover:text-brand-600 rounded"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1 hover:text-rose-600 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Farmer Directory */}
          {activeTab === 'farmers' && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Registered Local Farmers & Verification Status
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {farmers.map(f => (
                  <div key={f.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20" />
                      <div>
                        <h5 className="font-bold text-sm text-slate-900">{f.name}</h5>
                        <p className="text-xs text-brand-700 font-semibold">{f.farmName}</p>
                        <p className="text-[11px] text-slate-500">{f.location} • {f.farmSize}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        verifyFarmer(f.id, !f.verified);
                        addToast(`Updated verification status for ${f.name}`, 'info');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        f.verified
                          ? 'bg-emerald-100 text-brand-900 border-emerald-300'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      {f.verified ? '✓ Verified' : 'Pending Verification'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Customers Directory */}
          {activeTab === 'customers' && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Active Customer Accounts
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      <th className="pb-3 px-3">Customer Name</th>
                      <th className="pb-3 px-3">Contact</th>
                      <th className="pb-3 px-3">Delivery Address</th>
                      <th className="pb-3 px-3">Orders</th>
                      <th className="pb-3 px-3">Total Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {mockCustomers.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">{c.name}</td>
                        <td className="py-3 px-3 text-slate-500">{c.phone}</td>
                        <td className="py-3 px-3 text-slate-700">{c.address}</td>
                        <td className="py-3 px-3 font-bold text-brand-700">{c.ordersCount} orders</td>
                        <td className="py-3 px-3 font-black text-slate-900">₹{c.spent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: Daily Mandi Rates Control */}
          {activeTab === 'mandi' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Update Today's Mandi Wholesale & Supermarket Benchmark Rates
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      <th className="pb-3 px-3">Vegetable</th>
                      <th className="pb-3 px-3">Unit</th>
                      <th className="pb-3 px-3 text-emerald-700">Farmdoor Price (₹)</th>
                      <th className="pb-3 px-3 text-slate-500">Supermarket (₹)</th>
                      <th className="pb-3 px-3">Customer Savings</th>
                      <th className="pb-3 px-3 text-right">Edit Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {mandiRates.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">{m.name}</td>
                        <td className="py-3 px-3 text-slate-500">{m.unit}</td>
                        <td className="py-3 px-3 font-black text-brand-700">₹{m.farmdoorPrice}</td>
                        <td className="py-3 px-3 text-slate-500">₹{m.supermarketPrice}</td>
                        <td className="py-3 px-3">
                          <span className="bg-emerald-100 text-brand-900 px-2 py-0.5 rounded font-bold">
                            {m.savingsPercent}% OFF
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              const newFp = prompt(`New Farmdoor price for ${m.name}:`, m.farmdoorPrice);
                              const newSp = prompt(`New Supermarket price for ${m.name}:`, m.supermarketPrice);
                              if (newFp && newSp) {
                                updateMandiRate(m.name, Number(newFp), Number(newSp));
                                addToast(`Updated mandi rate for ${m.name}!`, 'success');
                              }
                            }}
                            className="px-3 py-1 bg-slate-100 hover:bg-brand-600 hover:text-white rounded-lg font-bold text-[11px] transition-colors"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
