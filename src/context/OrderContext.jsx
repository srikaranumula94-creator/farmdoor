import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_ORDERS } from '../data/initialData';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('farmdoor_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [myOrdersModalOpen, setMyOrdersModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('farmdoor_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#16a34a', '#86efac', '#eab308', '#ffffff']
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const placeOrder = ({
    user,
    cartItems,
    subtotal,
    deliveryFee,
    discount,
    total,
    paymentMethod,
    deliveryAddress,
    deliverySlot,
    customerPhone,
  }) => {
    const orderId = 'FD-' + Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: orderId,
      userId: user?.id || 'guest',
      customerName: user?.name || 'Customer',
      customerPhone: customerPhone || user?.phone || '+91 98765 43210',
      deliveryAddress: deliveryAddress || user?.address || 'Indiranagar, Bengaluru',
      deliverySlot: deliverySlot || 'Morning Sunrise (6:00 AM - 9:00 AM)',
      placedAt: now.toISOString(),
      status: 'Placed',
      statusTimeline: [
        { step: 'Order Placed', time: timeString, done: true, description: 'Order confirmed and notified to regional farmers' },
        { step: 'Harvested at Farm', time: 'Pending Sunrise', done: false, description: 'Hand-picked with morning dew' },
        { step: 'Quality Checked & Packed', time: 'Pending', done: false, description: 'Double graded in hygienic bio-crates' },
        { step: 'Out for Delivery', time: 'Pending', done: false, description: 'Dispatched in cold-chain electric van' },
        { step: 'Delivered', time: 'Estimated by delivery slot', done: false, description: 'Direct to your door with smile' }
      ],
      deliveryPartner: {
        name: 'Santhosh M.',
        phone: '+91 98765 22110',
        vehicle: 'Farmdoor EV Courier (KA-03-FA-9912)'
      },
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        unit: item.product.unit,
        quantity: item.quantity,
        image: item.product.image,
        farmName: item.product.farmName,
      })),
      subtotal,
      deliveryFee,
      discount: discount || 0,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery (COD)' ? 'Pending on Delivery' : 'Paid'
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    setTrackingModalOpen(true);
    triggerCelebration();

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const STATUS_FLOW = ['Placed', 'Harvesting', 'Quality Checked', 'Out for Delivery', 'Delivered'];
    const targetIdx = STATUS_FLOW.indexOf(newStatus);

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedTimeline = order.statusTimeline.map((step, idx) => {
          const stepDone = idx <= (targetIdx === -1 ? 0 : targetIdx);
          return {
            ...step,
            done: stepDone,
            time: stepDone && !step.time.includes(':') ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : step.time,
          };
        });

        const updatedOrder = {
          ...order,
          status: newStatus,
          statusTimeline: updatedTimeline,
          paymentStatus: newStatus === 'Delivered' && order.paymentMethod === 'Cash on Delivery (COD)' ? 'Paid (Cash Received)' : order.paymentStatus
        };

        if (activeTrackingOrder?.id === orderId) {
          setActiveTrackingOrder(updatedOrder);
        }

        return updatedOrder;
      }
      return order;
    }));
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'Cancelled',
          statusTimeline: [
            ...order.statusTimeline,
            { step: 'Cancelled', time: 'Just now', done: true, description: 'Order was cancelled by customer request' }
          ]
        };
      }
      return order;
    }));
  };

  const trackOrder = (order) => {
    setActiveTrackingOrder(order);
    setTrackingModalOpen(true);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        trackingModalOpen,
        setTrackingModalOpen,
        myOrdersModalOpen,
        setMyOrdersModalOpen,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        trackOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
