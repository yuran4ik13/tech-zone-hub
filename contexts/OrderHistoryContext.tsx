"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface OrderHistoryItem {
  orderId: string;
  orderNumber: string;
  trackingNumber: string;
  createdAt: string;
}

interface OrderHistoryContextType {
  orders: OrderHistoryItem[];
  addOrder: (order: OrderHistoryItem) => void;
  removeOrder: (orderId: string) => void;
  clearOrders: () => void;
  getOrderCount: () => number;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(
  undefined
);

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("Error loading order history:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("orderHistory", JSON.stringify(orders));
    }
  }, [orders, isClient]);

  const addOrder = (order: OrderHistoryItem) => {
    setOrders((currentOrders) => {
      const exists = currentOrders.some((o) => o.orderId === order.orderId);
      if (exists) {
        return currentOrders;
      }
      return [order, ...currentOrders];
    });
  };

  const removeOrder = (orderId: string) => {
    setOrders((currentOrders) =>
      currentOrders.filter((order) => order.orderId !== orderId)
    );
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const getOrderCount = () => {
    return orders.length;
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orders,
        addOrder,
        removeOrder,
        clearOrders,
        getOrderCount,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  const context = useContext(OrderHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useOrderHistory must be used within an OrderHistoryProvider"
    );
  }
  return context;
}
