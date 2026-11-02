import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Check, RefreshCw, X, Sprout } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    organicOnly,
    setOrganicOnly,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    farmers,
    selectedFarmerId,
    setSelectedFarmerId,
    searchQuery,
    setSearchQuery,
  } = useProducts();

  const categories = [
    { name: 'All', icon: '🥬' },
    { name: 'Daily Essentials', icon: '🥔' },
    { name: 'Leafy Greens', icon: '🌿' },
    { name: 'Root & Tubers', icon: '🥕' },
    { name: 'Organic Combos', icon: '🧺' },
    { name: 'Herbs & Seasonings', icon: '🌶️' },
    { name: 'Exotic & Gourds', icon: '🥒' },
  ];

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setOrganicOnly(false);
    setInStockOnly(false);
    setSelectedFarmerId('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'All' || organicOnly || inStockOnly || selectedFarmerId !== 'all' || searchQuery !== '';

  return (
    <section id="vegetables" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-900 text-xs font-bold mb-2">
              <Sprout className="w-3.5 h-3.5 text-brand-700" />
              <span>Straight from the Field</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Today's Fresh Vegetable Harvest
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select produce harvested this morning. Zero cold storage, maximum freshness and crunch.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            Showing <span className="text-brand-700">{filteredProducts.length}</span> fresh items available
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                selectedCategory === cat.name
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20 scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#f8faf8] p-4 rounded-2xl border border-emerald-100 mb-8 flex flex-wrap items-center justify-between gap-4">
          
          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Organic Only Toggle */}
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>100% Organic Only</span>
            </label>

            {/* In Stock Only Toggle */}
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>In-Stock Only</span>
            </label>

            {/* Filter by Farmer Dropdown */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-400 font-medium">Farmer:</span>
              <select
                value={selectedFarmerId}
                onChange={(e) => setSelectedFarmerId(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent outline-hidden cursor-pointer"
              >
                <option value="all">All Farmers</option>
                {farmers.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.location.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Dropdown & Reset */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent outline-hidden cursor-pointer"
              >
                <option value="featured">Featured / Harvest Fresh</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="discount">Biggest Savings %</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Active Indicator */}
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2 text-xs text-slate-600 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
            <span>Filtering vegetables matching: <strong>"{searchQuery}"</strong></span>
            <button
              onClick={() => setSearchQuery('')}
              className="ml-auto text-slate-500 hover:text-slate-800 p-0.5 rounded hover:bg-emerald-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
            <span className="text-4xl">🥬</span>
            <h3 className="text-lg font-bold text-slate-800 mt-3">No vegetables match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search keywords, clear category filters, or explore our full daily morning harvest list.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors"
            >
              View All Vegetables
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
