"use client";

import { useCart } from "@/contexts/CartContext";
import formatPrice from "@/utils/formatPrice";
import resolveStaticUrl from "@/utils/resolveStaticUrl";
import Link from "next/link";

interface CartSidebarProps {
  onClose: () => void;
}

export default function CartSidebar({ onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="cart-sidebar-content">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>
        <div className="empty-cart">
          <p>Your cart is empty</p>
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
        <h2>Shopping Cart ({items.length})</h2>
        <button onClick={onClose} className="close-btn" aria-label="Close cart">
          ✕
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.cartItemId} className="cart-item">
            <img
              src={resolveStaticUrl(item.images[0]?.path ?? "")}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <p className="cart-item-price">{formatPrice(item.price)}</p>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartItemId, item.quantity - 1)
                    }
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cartItemId, item.quantity + 1)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total:</span>
          <span className="total-price">{formatPrice(getTotalPrice())}</span>
        </div>
        <Link
          href="/checkout"
          className="btn btn-primary btn-block"
          onClick={onClose}
        >
          Proceed to Checkout
        </Link>
        <button onClick={clearCart} className="btn btn-secondary btn-block">
          Clear Cart
        </button>
      </div>
    </div>
  );
}
