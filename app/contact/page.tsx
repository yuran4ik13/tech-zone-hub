export default function ContactPage() {
  return (
    <div className="page-wrapper">
      <section className="container contact-top">
        <h1 data-i18n="contact_title">Contact Us</h1>
        <p data-i18n="contact_sub">We’re happy to help — send us a message.</p>

        <div className="contact-grid">
          <form id="contact-form" className="contact-form">
            <label data-i18n="your_name">Your name</label>
            <input type="text" id="cf-name" required />

            <label data-i18n="your_email">Your email</label>
            <input type="email" id="cf-email" required />

            <label data-i18n="message">Message</label>
            <textarea id="cf-message" rows={6} required></textarea>

            <button type="submit" className="btn" data-i18n="send">
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <h3 data-i18n="get_in_touch">Get in touch</h3>
            <p>
              <strong>Email:</strong> support@techzonehub.example
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p data-i18n="office_hours">
              <strong>Office hours:</strong> Mon–Fri, 9:00–18:00
            </p>
          </div>
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
