export default function ShopPage() {
  return (
    <div className="page-wrapper">
      <section className="container shop-top">
        <h1 data-i18n="shop">Shop</h1>
        <p data-i18n="shop_sub">Browse our curated selection of electronics</p>
      </section>

      <section className="container product-filters">
        <div className="filters-left">
          <label htmlFor="search" data-i18n="search_label">
            Search
          </label>
          <input id="search" type="search" placeholder="Search products..." />
        </div>
        <div>
          <label htmlFor="category" data-i18n="category_label">
            Category
          </label>
          <select id="category">
            <option value="all" data-i18n="all">
              All
            </option>
            <option value="laptops">Laptops</option>
            <option value="phones">Smartphones</option>
            <option value="headphones">Headphones</option>
            <option value="watches">Smartwatches</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </section>
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
