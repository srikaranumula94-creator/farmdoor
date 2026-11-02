import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import TopBarBanner from './components/layout/TopBarBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';

// Home & Product Components
import HeroSection from './components/home/HeroSection';
import MandiPriceTicker from './components/home/MandiPriceTicker';
import ProductGrid from './components/products/ProductGrid';
import SpecialOffers from './components/home/SpecialOffers';
import FarmerSpotlight from './components/home/FarmerSpotlight';
import HowItWorks from './components/home/HowItWorks';
import CustomerReviews from './components/home/CustomerReviews';

// Modals & Drawers
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/cart/CheckoutModal';
import OrderTrackingModal from './components/orders/OrderTrackingModal';
import MyOrdersModal from './components/orders/MyOrdersModal';
import FarmerPortalModal from './components/farmer/FarmerPortalModal';
import AdminDashboardModal from './components/admin/AdminDashboardModal';
import ProductDetailModal from './components/products/ProductDetailModal';
import DailyMandiModal from './components/products/DailyMandiModal';
import AuthModal from './components/auth/AuthModal';

function MainContent() {
  const [farmerPortalOpen, setFarmerPortalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfc] text-slate-800">
      {/* Top Banner Announcement */}
      <TopBarBanner />

      {/* Main Responsive Header */}
      <Navbar 
        onOpenFarmerPortal={() => setFarmerPortalOpen(true)}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section with Branding & Tagline */}
        <HeroSection onOpenFarmerPortal={() => setFarmerPortalOpen(true)} />

        {/* Daily Mandi Prices Real-time Ticker */}
        <MandiPriceTicker />

        {/* Product Catalog & Search/Filters */}
        <ProductGrid />

        {/* Special Offers & Promo Codes */}
        <SpecialOffers />

        {/* Farmer Details & Farm Locations */}
        <FarmerSpotlight />

        {/* How Farmdoor Works (Farm to Plate) */}
        <HowItWorks />

        {/* Customer Reviews & Feedback */}
        <CustomerReviews />
      </main>

      {/* Comprehensive Footer */}
      <Footer 
        onOpenFarmerPortal={() => setFarmerPortalOpen(true)}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Floating WhatsApp Customer Support */}
      <WhatsAppFloat />

      {/* Modals & Slide-overs */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <MyOrdersModal />
      <ProductDetailModal />
      <DailyMandiModal />
      <AuthModal />
      
      {/* Farmer Portal & Admin Dashboard */}
      <FarmerPortalModal 
        isOpen={farmerPortalOpen} 
        onClose={() => setFarmerPortalOpen(false)} 
      />
      <AdminDashboardModal 
        isOpen={adminDashboardOpen} 
        onClose={() => setAdminDashboardOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <ToastProvider>
              <MainContent />
            </ToastProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
