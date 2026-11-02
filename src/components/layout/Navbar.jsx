import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Tractor, 
  ShieldCheck, 
  LogOut, 
  ClipboardList, 
  TrendingDown, 
  Sparkles, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';

export default function Navbar({ onOpenFarmerPortal, onOpenAdminDashboard }) {
  const { user, logout, openAuthModal, switchDemoRole } = useAuth();
  const { totalItemsCount, setCartDrawerOpen } = useCart();
  const { searchQuery, setSearchQuery, setMandiModalOpen } = useProducts();
  const { setMyOrdersModalOpen } = useOrders();
  const { addToast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [demoRoleDropdownOpen, setDemoRoleDropdownOpen] = useState(false);

  const handleRoleSwitch = (role) => {
    switchDemoRole(role);
    setDemoRoleDropdownOpen(false);
    addToast(`Switched view to ${role.toUpperCase()} mode!`, 'info');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-brand-600/25 group-hover:scale-105 transition-transform duration-200">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-brand-950 font-sans">
                    Farm<span className="text-brand-600">door</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-brand-100 text-brand-800 rounded">
                    Direct
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 tracking-tight hidden lg:inline-block">
                  Fresh from Farmers, Direct to Your Door
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-md mx-2 relative">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search fresh tomatoes, spinach, organic boxes, farmers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-brand-500 rounded-full outline-hidden transition-all duration-200 focus:ring-2 focus:ring-brand-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#vegetables" className="hover:text-brand-600 transition-colors">
              Vegetables
            </a>
            <button
              onClick={() => setMandiModalOpen(true)}
              className="hover:text-brand-600 flex items-center gap-1 transition-colors text-slate-700"
            >
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span>Mandi Prices</span>
            </button>
            <a href="#farmers" className="hover:text-brand-600 transition-colors">
              Our Farmers
            </a>
            <a href="#offers" className="hover:text-brand-600 flex items-center gap-1 transition-colors text-amber-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Offers</span>
            </a>
          </nav>

          {/* Role Switcher Pill & Actions */}
          <div className="flex items-center gap-3">
            
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setDemoRoleDropdownOpen(!demoRoleDropdownOpen)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  user?.role === 'admin'
                    ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                    : user?.role === 'farmer'
                    ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    : 'bg-brand-50 text-brand-800 border-brand-200 hover:bg-brand-100'
                }`}
                title="Switch role for quick testing"
              >
                <span className="w-2 h-2 rounded-full bg-current"></span>
                <span className="capitalize">{user ? user.role : 'Guest'} Mode</span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
              </button>

              {demoRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fade-in text-xs font-medium">
                  <div className="px-3 py-1.5 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    Test As Demo Role
                  </div>
                  <button
                    onClick={() => handleRoleSwitch('customer')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    <span>Customer (Priya)</span>
                    {user?.role === 'customer' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('farmer')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    <span>Farmer (Ramesh)</span>
                    {user?.role === 'farmer' && <span className="text-amber-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    <span>Admin Operations</span>
                    {user?.role === 'admin' && <span className="text-purple-600 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Farmer Portal Shortcut Button */}
            <button
              onClick={onOpenFarmerPortal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-brand-800 rounded-lg text-xs font-bold border border-emerald-200 transition-colors"
            >
              <Tractor className="w-3.5 h-3.5 text-brand-700" />
              <span>Farmer Portal</span>
            </button>

            {/* Admin Dashboard Shortcut Button (Accessible to Admin or via quick test) */}
            <button
              onClick={onOpenAdminDashboard}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Admin Hub</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-brand-700 bg-slate-50 hover:bg-brand-50/60 rounded-xl transition-all border border-slate-200 hover:border-brand-300"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce-subtle">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-full transition-colors border border-transparent hover:border-slate-200"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/30"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden md:inline-block max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:inline-block" />
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Profile Dropdown */}
              {profileDropdownOpen && user && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-fade-in text-sm">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
                    <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    <span className="mt-2 inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                      {user.role} account
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setMyOrdersModalOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 font-medium"
                    >
                      <ClipboardList className="w-4 h-4 text-brand-600" />
                      <span>My Orders & Tracking</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenFarmerPortal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 font-medium"
                    >
                      <Tractor className="w-4 h-4 text-emerald-600" />
                      <span>Farmer Produce Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAdminDashboard();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 text-slate-700 flex items-center gap-2.5 font-medium"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>Admin Management Hub</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        addToast('Signed out successfully', 'info');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2.5 font-medium text-xs"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl xl:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search vegetables, spinach, mandi rates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-full outline-hidden focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-100 py-4 animate-fade-in space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  onOpenFarmerPortal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-brand-800 font-bold text-xs border border-emerald-200"
              >
                <Tractor className="w-4 h-4" />
                <span>Farmer Portal</span>
              </button>
              <button
                onClick={() => {
                  onOpenAdminDashboard();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-purple-50 text-purple-800 font-bold text-xs border border-purple-200"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Hub</span>
              </button>
            </div>

            <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
              <a
                href="#vegetables"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 hover:bg-slate-50 rounded-lg"
              >
                🥬 Browse All Vegetables
              </a>
              <button
                onClick={() => {
                  setMandiModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 text-left hover:bg-slate-50 rounded-lg flex items-center justify-between"
              >
                <span>📊 Daily Mandi Market Rates</span>
                <span className="text-xs bg-emerald-100 text-brand-800 px-2 py-0.5 rounded-full font-bold">Compare</span>
              </button>
              <button
                onClick={() => {
                  setMyOrdersModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 text-left hover:bg-slate-50 rounded-lg flex items-center justify-between"
              >
                <span>📦 My Orders & Live Tracking</span>
              </button>
              <a
                href="#farmers"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 hover:bg-slate-50 rounded-lg"
              >
                🚜 Meet Our Local Farmers
              </a>
              <a
                href="#offers"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 hover:bg-slate-50 rounded-lg text-amber-700"
              >
                🎁 Special Offers & Coupons
              </a>
            </div>

            {/* Mobile Switch Role */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Switch Demo Account</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleRoleSwitch('customer');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${user?.role === 'customer' ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  Customer
                </button>
                <button
                  onClick={() => {
                    handleRoleSwitch('farmer');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${user?.role === 'farmer' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  Farmer
                </button>
                <button
                  onClick={() => {
                    handleRoleSwitch('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${user?.role === 'admin' ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
