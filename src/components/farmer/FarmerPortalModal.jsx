import React, { useState } from 'react';
import { 
  X, 
  Tractor, 
  Upload, 
  PlusCircle, 
  Package, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Trash2, 
  Edit3, 
  Sun,
  Coins,
  Scale
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';

export default function FarmerPortalModal({ isOpen, onClose }) {
  const { user, updateUserProfile } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, toggleStock } = useProducts();
  const { orders } = useOrders();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'upload' | 'inventory' | 'orders'

  // New Produce Form State
  const [formData, setFormData] = useState({
    name: 'Sweet Green Peas (Matar)',
    localName: 'Taza Matar',
    category: 'Daily Essentials',
    price: 48,
    originalPrice: 70,
    unit: '500g',
    stockKg: 40,
    harvestTime: 'Tomorrow, 5:15 AM Sunrise Pick',
    isOrganic: true,
    description: 'Freshly podded sweet winter peas grown with natural compost and mountain spring water.',
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80',
    farmName: user?.farmName || 'Green Valley Organic Acres',
    farmLocation: user?.location || 'Nashik, Maharashtra',
  });

  if (!isOpen) return null;

  // Preset vegetables for instant 1-click fill
  const PRESET_VEGGIES = [
    {
      name: 'Sweet Green Peas (Matar)',
      localName: 'Taza Matar',
      category: 'Daily Essentials',
      price: 48,
      originalPrice: 70,
      unit: '500g',
      stockKg: 40,
      image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-picked crisp sweet peas, tender pods and zero chemical sprays.',
    },
    {
      name: 'Organic Red Beetroot (Chukandar)',
      localName: 'Chukandar',
      category: 'Root & Tubers',
      price: 35,
      originalPrice: 50,
      unit: '500g',
      stockKg: 60,
      image: 'https://images.unsplash.com/photo-1585672840545-ebc2668b8e0f?auto=format&fit=crop&w=800&q=80',
      description: 'Earthy, mineral-rich red beets harvested with lush green edible tops.',
    },
    {
      name: 'Crisp Ridge Gourd (Turai)',
      localName: 'Desi Turai',
      category: 'Exotic & Gourds',
      price: 32,
      originalPrice: 48,
      unit: '500g',
      stockKg: 35,
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80',
      description: 'Tender ridge gourd, easily digestible, zero bitterness, grown on bamboo trellis.',
    },
    {
      name: 'Fresh Mint Leaves (Pudina)',
      localName: 'Hara Pudina',
      category: 'Herbs & Seasonings',
      price: 15,
      originalPrice: 25,
      unit: '100g bunch',
      stockKg: 20,
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
      description: 'Vibrant, fragrant country spearmint freshly harvested at sunrise.',
    }
  ];

  const handleApplyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      ...preset,
    }));
    addToast(`Filled details for ${preset.name}!`, 'info');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      addToast('Please fill all required vegetable details', 'error');
      return;
    }

    const created = addProduct({
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      stockKg: Number(formData.stockKg),
      farmerId: user?.id || 'farmer-1',
      farmName: user?.farmName || 'Green Valley Organic Acres',
      farmLocation: user?.location || 'Nashik, Maharashtra',
      inStock: true,
    });

    addToast(`Harvest published! "${created.name}" is now live for customers.`, 'success');
    setActiveTab('inventory');
  };

  // Farmer's own products
  const myProducts = products.filter(p => p.farmerId === (user?.id || 'farmer-1') || p.farmName === user?.farmName);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-brand-900 via-emerald-800 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <Tractor className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Farmer Partner Dashboard
                </span>
                <span className="text-xs text-emerald-200">Kisan Direct</span>
              </div>
              <h3 className="text-2xl font-black text-white mt-0.5">
                {user?.farmName || 'Green Valley Organic Acres'}
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 pt-3 gap-2 bg-slate-50/80 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'overview' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            🌱 Farm Overview & Earnings
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'upload' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-brand-600" />
            <span>Upload New Harvest</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'inventory' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            📦 My Harvest Catalog ({myProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-3 border-b-2 cursor-pointer transition-colors whitespace-nowrap ${
              activeTab === 'orders' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500'
            }`}
          >
            🚜 Customer Harvest Demands
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Farm Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
                    <Coins className="w-4 h-4 text-emerald-600" />
                    <span>Direct Earnings</span>
                  </div>
                  <p className="text-2xl font-black text-brand-900">₹42,850</p>
                  <p className="text-[11px] text-emerald-700 mt-1">Paid directly to bank</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
                    <Scale className="w-4 h-4 text-amber-600" />
                    <span>Harvest Delivered</span>
                  </div>
                  <p className="text-2xl font-black text-amber-950">1,420 kg</p>
                  <p className="text-[11px] text-amber-700 mt-1">This month alone</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-800 text-xs font-bold mb-1">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span>Active Crops</span>
                  </div>
                  <p className="text-2xl font-black text-blue-950">{myProducts.length}</p>
                  <p className="text-[11px] text-blue-700 mt-1">Ready for dawn pick</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2 text-purple-800 text-xs font-bold mb-1">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Farmer Rating</span>
                  </div>
                  <p className="text-2xl font-black text-purple-950">4.95 / 5</p>
                  <p className="text-[11px] text-purple-700 mt-1">From 210 urban homes</p>
                </div>
              </div>

              {/* Farmer Profile Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80"
                    alt="Farmer Ramesh"
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-md"
                  />
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span>{user?.name || 'Ramesh Patil'}</span>
                      <span className="bg-emerald-100 text-brand-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                        Verified Organic Farmer
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {user?.farmName || 'Green Valley Organic Acres'} • {user?.location || 'Dindori, Nashik'}
                    </p>
                    <p className="text-xs text-emerald-700 font-semibold mt-1">
                      Kisan ID: FD-K-8921 • Registered with Maharashtra Krishi Dept.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Tomorrow's Harvest</span>
                </button>
              </div>

              {/* Quick Harvest Tips for Farmers */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>Daily Morning Harvest Protocol:</span>
                </p>
                <p className="text-amber-800">
                  Please confirm your harvest quantities by 7:00 PM today. Our temperature-controlled electric collection van will arrive at your farm gate at 5:30 AM tomorrow for weighing and instant digital payment.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Upload New Harvest */}
          {activeTab === 'upload' && (
            <div className="space-y-6 animate-fade-in">
              {/* Quick Pick Presets */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  ⚡ Quick Pick Presets (Click to autofill):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_VEGGIES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all group"
                    >
                      <p className="font-bold text-xs text-slate-900 group-hover:text-brand-700 truncate">
                        {preset.name}
                      </p>
                      <p className="text-[10px] text-slate-400">₹{preset.price} / {preset.unit}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Harvest Upload Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Vegetable Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Baby Carrots, Farm Spinach"
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Local Indian Name / Hindi *
                    </label>
                    <input
                      type="text"
                      value={formData.localName}
                      onChange={(e) => setFormData({ ...formData, localName: e.target.value })}
                      placeholder="e.g. Desi Gajar, Palak"
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 font-bold"
                    >
                      <option value="Daily Essentials">Daily Essentials</option>
                      <option value="Leafy Greens">Leafy Greens</option>
                      <option value="Root & Tubers">Root & Tubers</option>
                      <option value="Exotic & Gourds">Exotic & Gourds</option>
                      <option value="Organic Combos">Organic Combos</option>
                      <option value="Herbs & Seasonings">Herbs & Seasonings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Direct Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Supermarket Benchmark Price (₹)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Unit (e.g. 500g, 1 kg, bunch) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Harvest Quantity Available (kg/bunches) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formData.stockKg}
                      onChange={(e) => setFormData({ ...formData, stockKg: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Harvest Time Slot *
                    </label>
                    <input
                      type="text"
                      value={formData.harvestTime}
                      onChange={(e) => setFormData({ ...formData, harvestTime: e.target.value })}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vegetable Photo URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Harvest Notes & Taste Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-hidden focus:border-brand-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-brand-900 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={formData.isOrganic}
                      onChange={(e) => setFormData({ ...formData, isOrganic: e.target.checked })}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span>100% Naturally Grown / Zero Pesticides</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Publish Harvest to Marketplace</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: Manage Harvest Catalog */}
          {activeTab === 'inventory' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Vegetables Listed Under Your Farm
                </h4>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-3 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Another Crop</span>
                </button>
              </div>

              <div className="space-y-3">
                {myProducts.length > 0 ? (
                  myProducts.map(p => (
                    <div
                      key={p.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h5 className="font-bold text-sm text-slate-900">{p.name}</h5>
                          <p className="text-xs text-slate-500">
                            {p.category} • {p.unit} • Stock: <span className="font-bold text-slate-800">{p.stockKg || 50} kg</span>
                          </p>
                          <p className="text-xs font-black text-brand-700 mt-0.5">
                            ₹{p.price} <span className="text-[10px] text-slate-400 font-normal">per unit</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => {
                            toggleStock(p.id);
                            addToast(`Toggled stock status for ${p.name}`, 'info');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                            p.inStock
                              ? 'bg-emerald-100 text-brand-900 border-emerald-300'
                              : 'bg-slate-200 text-slate-600 border-slate-300'
                          }`}
                        >
                          {p.inStock ? 'In-Stock' : 'Harvest Sold'}
                        </button>

                        <button
                          onClick={() => {
                            const newPrice = prompt(`Enter new price for ${p.name}:`, p.price);
                            if (newPrice && !isNaN(newPrice)) {
                              updateProduct(p.id, { price: Number(newPrice) });
                              addToast(`Updated ${p.name} price to ₹${newPrice}`, 'success');
                            }
                          }}
                          className="p-2 text-slate-600 hover:text-brand-700 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 transition-colors"
                          title="Edit Price"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Remove ${p.name} from listing?`)) {
                              deleteProduct(p.id);
                              addToast(`Removed ${p.name}`, 'info');
                            }
                          }}
                          className="p-2 text-rose-500 hover:text-rose-700 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-8">
                    No crops listed yet. Click "Upload New Harvest" to begin selling!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Customer Harvest Demands */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Customer Demand for Tomorrow Morning Collection
              </h4>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-brand-900 space-y-2">
                <p className="font-bold">Total Confirmed Harvest for Dispatch:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-semibold">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="block text-slate-500 text-[10px]">Country Tomatoes:</span>
                    <span className="text-sm font-black text-brand-800">24 kg needed</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="block text-slate-500 text-[10px]">Fresh Farm Spinach:</span>
                    <span className="text-sm font-black text-brand-800">18 bunches needed</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="block text-slate-500 text-[10px]">Baby Carrots:</span>
                    <span className="text-sm font-black text-brand-800">15 kg needed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {orders.slice(0, 3).map(o => (
                  <div key={o.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">Order #{o.id}</span>
                      <span className="text-slate-500 ml-2">Slot: {o.deliverySlot}</span>
                    </div>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
