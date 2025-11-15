"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useOrderHistory } from "@/contexts/OrderHistoryContext";
import { useState } from "react";
import CartSidebar from "./CartSidebar";
import OrderHistorySidebar from "./OrderHistorySidebar";

export default function Header() {
  const { getTotalItems } = useCart();
  const { getOrderCount } = useOrderHistory();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="logo" href="/">
            TechZoneHub
          </Link>

          <nav className="main-nav">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-actions">
            <button
              onClick={() => setIsOrdersOpen(!isOrdersOpen)}
              className="icon-btn"
              aria-label="Orders"
              title="My Orders"
            >
              📦 <span className="cart-count">{getOrderCount()}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="icon-btn"
              aria-label="Cart"
              title="Shopping Cart"
            >
              🛒 <span className="cart-count">{getTotalItems()}</span>
            </button>

            <button id="menu-toggle" className="icon-btn mobile-only">
              ☰
            </button>
          </div>
        </div>
      </header>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <CartSidebar onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}

      {isOrdersOpen && (
        <div className="cart-overlay" onClick={() => setIsOrdersOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <OrderHistorySidebar onClose={() => setIsOrdersOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
