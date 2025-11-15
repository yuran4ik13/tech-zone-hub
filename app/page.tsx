export default function Home() {
  return (
    <div className="page-wrapper">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1 data-i18n="hero_title">Smart gadgets for everyday life</h1>
            <p data-i18n="hero_sub">
              Top brands · Trusted quality · Fast shipping
            </p>
            <div className="hero-cta">
              <a className="btn" href="shop.html" data-i18n="shop_now">
                Shop Now
              </a>
              <a
                className="btn btn-outline"
                href="about.html"
                data-i18n="learn_more"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc"
              alt="Gadgets"
            />
          </div>
        </div>
      </section>
      <section className="features container">
        <div className="feature-card">
          <h3>
            ✅ <span data-i18n="verified">Verified Products</span>
          </h3>
          <p data-i18n="verified_desc">
            Only trusted items from top suppliers.
          </p>
        </div>
        <div className="feature-card">
          <h3>
            🚚 <span data-i18n="delivery">Fast Delivery</span>
          </h3>
          <p data-i18n="delivery_desc">Trackable & secure shipping.</p>
        </div>
        <div className="feature-card">
          <h3>
            💬 <span data-i18n="support">24/7 Support</span>
          </h3>
          <p data-i18n="support_desc">We are here to help whenever you need.</p>
        </div>
        <div className="feature-card">
          <h3>
            💰 <span data-i18n="deals">Exclusive Deals</span>
          </h3>
          <p data-i18n="deals_desc">Save with our offers and bundles.</p>
        </div>
      </section>

      <section className="container categories">
        <h2 data-i18n="popular">Popular categories</h2>
        <div className="category-grid">
          <a className="cat" href="shop.html#laptops">
            Laptops
          </a>
          <a className="cat" href="shop.html#phones">
            Smartphones
          </a>
          <a className="cat" href="shop.html#headphones">
            Headphones
          </a>
          <a className="cat" href="shop.html#watches">
            Smartwatches
          </a>
          <a className="cat" href="shop.html#accessories">
            Accessories
          </a>
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
