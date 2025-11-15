"use client";

import { useOrderHistory } from "@/contexts/OrderHistoryContext";
import Link from "next/link";

interface OrderHistorySidebarProps {
  onClose: () => void;
}

export default function OrderHistorySidebar({
  onClose,
}: OrderHistorySidebarProps) {
  const { orders, removeOrder, clearOrders } = useOrderHistory();

  if (orders.length === 0) {
    return (
      <div className="cart-sidebar-content">
        <div className="cart-header">
          <h2>My Orders</h2>
          <button
            onClick={onClose}
            className="close-btn"
            aria-label="Close orders"
          >
            ✕
          </button>
        </div>
        <div className="empty-cart">
          <p>No orders yet</p>
          <button onClick={onClose} className="btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-sidebar-content">
      <div className="cart-header">
        <h2>My Orders ({orders.length})</h2>
        <button
          onClick={onClose}
          className="close-btn"
          aria-label="Close orders"
        >
          ✕
        </button>
      </div>

      <div className="cart-items order-list">
        {orders.map((order) => (
          <div key={order.orderId} className="order-item">
            <div className="order-icon">📦</div>
            <div className="order-details">
              <h4>Order #{order.orderNumber}</h4>
              <p className="order-tracking">Order ID: {order.orderId}</p>
              <p className="order-tracking">Tracking: {order.trackingNumber}</p>
            </div>
            <div className="order-actions">
              <Link
                href={`/order-confirmation?orderId=${order.orderId}`}
                className="btn-link"
                onClick={onClose}
              >
                Track
              </Link>
              <button
                onClick={() => removeOrder(order.orderId)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <Link
          href="/order-confirmation"
          className="btn btn-primary btn-block"
          onClick={onClose}
        >
          Track an Order
        </Link>
        <button onClick={clearOrders} className="btn btn-secondary btn-block">
          Clear History
        </button>
      </div>
    </div>
  );
}
