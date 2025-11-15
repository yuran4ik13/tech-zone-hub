import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="index.html">
          TechZoneHub
        </a>

        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <div className="lang-switch">
            <button id="lang-en" className="lang-btn active">
              EN
            </button>
            <button id="lang-sk" className="lang-btn active">
              SK
            </button>
          </div>

          <button id="cart-btn" className="icon-btn" aria-label="Cart">
            🛒{" "}
            <span id="cart-count" className="cart-count">
              0
            </span>
          </button>

          <button id="menu-toggle" className="icon-btn mobile-only">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
