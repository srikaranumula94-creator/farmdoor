import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_FARMERS, MANDI_RATES, INITIAL_REVIEWS } from '../data/initialData';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('farmdoor_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [farmers, setFarmers] = useState(() => {
    try {
      const saved = localStorage.getItem('farmdoor_farmers');
      return saved ? JSON.parse(saved) : INITIAL_FARMERS;
    } catch {
      return INITIAL_FARMERS;
    }
  });

  const [mandiRates, setMandiRates] = useState(() => {
    try {
      const saved = localStorage.getItem('farmdoor_mandi');
      return saved ? JSON.parse(saved) : MANDI_RATES;
    } catch {
      return MANDI_RATES;
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('farmdoor_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedFarmerId, setSelectedFarmerId] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [mandiModalOpen, setMandiModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('farmdoor_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('farmdoor_farmers', JSON.stringify(farmers));
    } catch (e) {
      console.error(e);
    }
  }, [farmers]);

  useEffect(() => {
    try {
      localStorage.setItem('farmdoor_mandi', JSON.stringify(mandiRates));
    } catch (e) {
      console.error(e);
    }
  }, [mandiRates]);

  useEffect(() => {
    try {
      localStorage.setItem('farmdoor_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Farmer / Admin Product Management
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: 'veg-' + Date.now().toString(36),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      originalPrice: newProduct.originalPrice || Math.round(newProduct.price * 1.35),
      discountPercent: Math.round((( (newProduct.originalPrice || Math.round(newProduct.price * 1.35)) - newProduct.price ) / (newProduct.originalPrice || Math.round(newProduct.price * 1.35))) * 100),
      harvestTime: newProduct.harvestTime || 'Fresh Morning Harvest',
    };
    setProducts(prev => [product, ...prev]);
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updatedFields };
        if (updatedFields.price && merged.originalPrice) {
          merged.discountPercent = Math.max(0, Math.round(((merged.originalPrice - merged.price) / merged.originalPrice) * 100));
        }
        return merged;
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleStock = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  const addReview = ({ productId, rating, comment, userName }) => {
    const newRev = {
      id: 'rev-' + Date.now().toString(36),
      productId,
      userName: userName || 'Happy Farmdoor Customer',
      rating: Number(rating),
      date: 'Just now',
      comment,
      verified: true
    };
    setReviews(prev => [newRev, ...prev]);

    // Update product rating and reviewsCount
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const prodReviews = reviews.filter(r => r.productId === productId).concat(newRev);
        const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewsCount: p.reviewsCount + 1,
        };
      }
      return p;
    }));

    return newRev;
  };

  const updateMandiRate = (name, farmdoorPrice, supermarketPrice) => {
    setMandiRates(prev => prev.map(m => {
      if (m.name.toLowerCase() === name.toLowerCase()) {
        const savingsPercent = Math.round(((supermarketPrice - farmdoorPrice) / supermarketPrice) * 100);
        return {
          ...m,
          farmdoorPrice: Number(farmdoorPrice),
          supermarketPrice: Number(supermarketPrice),
          savingsPercent,
          lastUpdated: 'Just now'
        };
      }
      return m;
    }));
  };

  const verifyFarmer = (farmerId, verifiedState) => {
    setFarmers(prev => prev.map(f => f.id === farmerId ? { ...f, verified: verifiedState } : f));
  };

  // Filtered & Sorted Products
  const filteredProducts = products.filter(product => {
    const matchesQuery = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.localName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesOrganic = !organicOnly || product.isOrganic;
    const matchesStock = !inStockOnly || product.inStock;
    const matchesFarmer = selectedFarmerId === 'all' || product.farmerId === selectedFarmerId;

    return matchesQuery && matchesCategory && matchesOrganic && matchesStock && matchesFarmer;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
    return 0; // 'featured' keep natural order
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        farmers,
        mandiRates,
        reviews,
        filteredProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        organicOnly,
        setOrganicOnly,
        inStockOnly,
        setInStockOnly,
        selectedFarmerId,
        setSelectedFarmerId,
        sortBy,
        setSortBy,
        activeProductDetail,
        setActiveProductDetail,
        mandiModalOpen,
        setMandiModalOpen,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        addReview,
        updateMandiRate,
        verifyFarmer,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
