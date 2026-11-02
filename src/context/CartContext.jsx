import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMO_CODES } from '../data/initialData';

const CartContext = createContext();

const FREE_DELIVERY_THRESHOLD = 249;
const STANDARD_DELIVERY_FEE = 30;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('farmdoor_cart');
      return saved ? JSON.parse(saved) : [
        // Realistic initial item for instant preview delight
        {
          product: {
            id: 'veg-1',
            name: 'Country Tomatoes (Desi Tamatar)',
            price: 36,
            originalPrice: 55,
            unit: '1 kg',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
            farmName: 'Green Valley Organic Acres',
            farmLocation: 'Nashik, Maharashtra'
          },
          quantity: 2
        },
        {
          product: {
            id: 'veg-2',
            name: 'Fresh Farm Spinach (Palak)',
            price: 24,
            originalPrice: 40,
            unit: '250g bunch',
            image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
            farmName: 'Deccan Green Organic Fields',
            farmLocation: 'Chikkaballapur, Karnataka'
          },
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState('Morning Sunrise (6:00 AM - 9:00 AM)');

  useEffect(() => {
    try {
      localStorage.setItem('farmdoor_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );

  const retailMarketValue = cartItems.reduce(
    (sum, item) => sum + ((item.product.originalPrice || item.product.price * 1.3) * item.quantity),
    0
  );

  const farmerDirectSavings = Math.max(0, Math.round(retailMarketValue - subtotal));

  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  // Apply Coupon
  const applyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');
    
    const promo = PROMO_CODES.find(p => p.code === code);
    if (!promo) {
      setCouponError('Invalid promo code. Try FARMFRESH10');
      setAppliedCoupon(null);
      return false;
    }

    if (subtotal < promo.minOrder) {
      setCouponError(`Minimum order of ₹${promo.minOrder} required for this code`);
      setAppliedCoupon(null);
      return false;
    }

    setAppliedCoupon(promo);
    setCouponCode(code);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = appliedCoupon.discountAmount;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        retailMarketValue,
        farmerDirectSavings,
        deliveryFee,
        amountToFreeDelivery,
        freeDeliveryProgress,
        appliedCoupon,
        couponCode,
        setCouponCode,
        couponError,
        applyCoupon,
        removeCoupon,
        discountAmount,
        grandTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        cartDrawerOpen,
        setCartDrawerOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        deliverySlot,
        setDeliverySlot,
        FREE_DELIVERY_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
