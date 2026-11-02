import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USERS = {
  customer: {
    id: 'user-demo-1',
    name: 'Priya Sharma',
    email: 'priya@farmdoor.com',
    role: 'customer',
    phone: '+91 98765 01234',
    address: 'Flat 402, Green Meadows, 14th Main, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  farmer: {
    id: 'farmer-1',
    name: 'Ramesh Patil',
    email: 'ramesh.patil@farmdoor.com',
    role: 'farmer',
    farmerId: 'farmer-1',
    phone: '+91 98231 44521',
    farmName: 'Green Valley Organic Acres',
    location: 'Dindori, Nashik (Maharashtra)',
    state: 'Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80',
  },
  admin: {
    id: 'admin-1',
    name: 'Farmdoor Operations',
    email: 'admin@farmdoor.com',
    role: 'admin',
    phone: '+91 80 4455 6677',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('farmdoor_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.customer;
    } catch {
      return DEMO_USERS.customer;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'
  const [authRoleTarget, setAuthRoleTarget] = useState('customer'); // 'customer' | 'farmer'

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('farmdoor_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('farmdoor_user');
      }
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [user]);

  const login = (email, password, roleHint = 'customer') => {
    // Check if matching any demo accounts
    if (email.toLowerCase().includes('farmer') || email.toLowerCase().includes('ramesh')) {
      setUser(DEMO_USERS.farmer);
      setAuthModalOpen(false);
      return { success: true, role: 'farmer' };
    }
    if (email.toLowerCase().includes('admin')) {
      setUser(DEMO_USERS.admin);
      setAuthModalOpen(false);
      return { success: true, role: 'admin' };
    }

    // Default or new customer login
    const loggedUser = {
      id: 'usr-' + Date.now().toString(36),
      name: email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()),
      email: email,
      role: roleHint,
      phone: '+91 98765 00000',
      address: 'House #12, Rose Garden Layout',
      city: 'Bengaluru',
      pincode: '560001',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };
    setUser(loggedUser);
    setAuthModalOpen(false);
    return { success: true, role: loggedUser.role };
  };

  const register = ({ name, email, password, phone, role, farmName, location, address, pincode }) => {
    const newUser = {
      id: (role === 'farmer' ? 'farmer-' : 'user-') + Date.now().toString(36),
      name,
      email,
      role,
      phone: phone || '+91 98765 43210',
      avatar: role === 'farmer' 
        ? 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      ...(role === 'farmer' ? {
        farmerId: 'farmer-' + Date.now().toString(36),
        farmName: farmName || 'Green Field Organic',
        location: location || 'Nashik, Maharashtra',
        state: 'Maharashtra',
        verified: false,
      } : {
        address: address || 'Main Road, Green Park',
        pincode: pincode || '560001',
        city: 'Bengaluru',
      })
    };
    setUser(newUser);
    setAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (role) => {
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
    }
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const openAuthModal = (tab = 'login', role = 'customer') => {
    setAuthModalTab(tab);
    setAuthRoleTarget(role);
    setAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        DEMO_USERS,
        login,
        register,
        logout,
        switchDemoRole,
        updateUserProfile,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        authRoleTarget,
        setAuthRoleTarget,
        openAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
