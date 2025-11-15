"use server";

import { searchProducts } from "@/api/product";
import ProductList from "@/components/ProductList/ProductList";

export default async function ShopPage() {
  const products = await searchProducts("", null);

  return (
    <div className="page-wrapper">
      <section className="container shop-top">
        <h1 data-i18n="shop">Shop</h1>
        <p data-i18n="shop_sub">Browse our curated selection of electronics</p>
      </section>

      <ProductList serverProducts={products} />

      <div id="cart-panel" className="cart-panel" aria-hidden="true">
        <div className="cart-header">
          <h3 data-i18n="cart_title">Your Cart</h3>
          <button id="cart-close" className="icon-btn">
            ✕
          </button>
        </div>
        <div id="cart-items" className="cart-items"></div>
        <div className="cart-footer">
          <div className="cart-total">
            <span data-i18n="total">Total</span>
            <strong id="cart-total-price">0.00€</strong>
          </div>
          <div className="cart-actions">
            <button
              id="clear-cart"
              className="btn btn-outline"
              data-i18n="clear"
            >
              Clear
            </button>
            <button id="checkout-btn" className="btn" data-i18n="checkout">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
