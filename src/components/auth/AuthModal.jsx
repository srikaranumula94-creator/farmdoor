import React, { useState } from 'react';
import { 
  X, 
  User, 
  Tractor, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AuthModal() {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    authRoleTarget, 
    setAuthRoleTarget,
    login,
    register,
    switchDemoRole
  } = useAuth();

  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    const res = login(email, password, authRoleTarget);
    addToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;

    const res = register({
      name,
      email,
      password,
      phone,
      role: authRoleTarget,
      farmName,
      location,
      address,
      pincode
    });

    addToast(`Welcome to Farmdoor, ${name}! Your ${authRoleTarget} account is ready.`, 'success');
  };

  const handleQuickDemo = (role) => {
    switchDemoRole(role);
    setAuthModalOpen(false);
    addToast(`Signed in as demo ${role.toUpperCase()}!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="p-5 bg-gradient-to-r from-brand-900 to-emerald-950 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Farmdoor Access
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              {authModalTab === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h3>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Click Demo Quick Logins */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>1-Click Prototype Demo Logins:</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemo('customer')}
              className="py-1.5 px-2 bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-400 rounded-xl text-xs font-bold text-slate-800 transition-all shadow-2xs"
            >
              🟢 Customer
            </button>
            <button
              onClick={() => handleQuickDemo('farmer')}
              className="py-1.5 px-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl text-xs font-bold text-slate-800 transition-all shadow-2xs"
            >
              🚜 Farmer
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="py-1.5 px-2 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-400 rounded-xl text-xs font-bold text-slate-800 transition-all shadow-2xs"
            >
              👑 Admin
            </button>
          </div>
        </div>

        {/* Login / Register Tab selector */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 text-xs font-bold">
          <button
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 py-3 border-b-2 transition-colors cursor-pointer text-center ${
              authModalTab === 'login' ? 'border-brand-600 text-brand-700 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthModalTab('register')}
            className={`flex-1 py-3 border-b-2 transition-colors cursor-pointer text-center ${
              authModalTab === 'register' ? 'border-brand-600 text-brand-700 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[65vh] space-y-4">
          
          {/* Target Role Selector (Customer vs Farmer) */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setAuthRoleTarget('customer')}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authRoleTarget === 'customer'
                  ? 'bg-white text-brand-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthRoleTarget('farmer')}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authRoleTarget === 'farmer'
                  ? 'bg-white text-brand-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Tractor className="w-3.5 h-3.5" />
              <span>Farmer / Producer</span>
            </button>
          </div>

          {/* Form: LOGIN */}
          {authModalTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@farmdoor.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Sign In to Farmdoor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Form: REGISTER */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil / Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                />
              </div>

              {/* Farmer Specific Fields */}
              {authRoleTarget === 'farmer' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Farm Name / Organic Estate *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Golden Valley Natural Farms"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Farm Location (District & State) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nashik, Maharashtra"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                    />
                  </div>
                </>
              ) : (
                /* Customer Specific Fields */
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      placeholder="Apartment, Street name"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      placeholder="560038"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-brand-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Register as {authRoleTarget === 'farmer' ? 'Farmer Producer' : 'Customer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
