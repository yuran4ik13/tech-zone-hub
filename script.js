/* Main site JS:
 - product data (demo)
 - render products
 - add to cart, cart panel, localStorage persistence
 - language switcher (EN/SK)
 - small search & category filter
*/
// ---------- Sample product data ----------
const products = [
  // Laptops
  
  {
    id: "Lenovo",
    title: "Lenovo 14",
    category: "laptops",
    price: 899.00,
    desc: "Notebook – Intel Core 7 240H, 14 IPS antireflexný 1920 × 1200, RAM 32 GB DDR5, Intel Graphics, SSD 1000 GB, podsvietená klávesnica, webkamera, USB 3.2 Gen 1, USB-C, čítačka odtlačkov prstov, WiFi 6 E, hmotnosť 1,36 kg, Windows 11 Pro",
    img: "https://www.bhphotovideo.com/images/fb/lenovo_21jk0084us_14_thinkpad_e14_gen_1775836.jpg"
  },
  {
    id: "ASUS ROG Strix G15",
    title: "ASUS ROG Strix G15 Gaming Laptop, 15",
    category: "laptops",
    price: 1899.00,
    desc: "ASUS ROG Strix G15 (2022) Gaming Laptop, 15” 16:10 FHD 144Hz, GeForce RTX 3050, AMD Ryzen™ 7 6800H/HS, 16GB DDR5, 512GB PCIe SSD, Wi-Fi 6E, Windows 11, G513RC-ES73, Eclipse Gray",
    img: "https://m.media-amazon.com/images/I/71OyrTkxpGL.jpg"
  } ,  
  {
    id: "MakBook",
    title: "MakBook Pro 15",
    category: "laptops",
    price: 1199.00,
    desc: "MacBook – Apple M4 (10-jadrový), 15,3 IPS lesklý 2880 × 1864 px, RAM 16 GB, Apple Apple M4 10-jadrová GPU, SSD 256 GB podsvietená klávesnica, webkamera, čítačka odtlačkov prstov, WiFi 6E, Bluetooth, hmotnosť 1,51 kg, macOS",
    img: "https://www.istore.ua/upload/iblock/f1e/z3zzoov73bk9mujlz8un3nfku220a8kh/MRXV3_6_is.png"
  } ,  
  // Phones
  {
    id: "Iphone",
    title: "IPhone 17 PRO MAX",
    category: "phones",
    price: 1499.00,
    desc: "smartfón • 6,9″ uhlopriečka • OLED displej • 2868 × 1320 px • obnovovacia frekvencia 120 Hz • procesor Apple A19 Pro (6-jadrový) • interná pamäť 256 GB • zadný fotoaparát 48 (f/1.78) + 48 (f/2.2) +…",
    img: "https://istyle.sk/cdn/shop/files/IMG-18066240_m_jpeg_1_3f02c4ad-6b61-4053-a95f-05dfb3336fbe.jpg?v=1757467899&width=823"
  },
  {
    id: "Xiaomi",
    title: "Xiaomi 15",
    category: "phones",
    price: 599.00,
    desc: "Mobilný telefón – 6,36 AMOLED 2670 × 1200 (120 Hz), operačná pamäť 12 GB, vnútorná pamäť 512 GB, Dual SIM + eSIM, procesor Qualcomm Snapdragon 8 Elite, fotoaparát: 50 Mpx (f/1,62) hlavný + 50 Mpx širokouhlý + 50 Mpx teleobjektív, predná kamera 32 Mpx, čítačka odtlačkov prstov, GPS, NFC, LTE, 5G, USB-C, vodoodolný podľa IP68, rýchle nabíjanie 90 W, bezdrôtové nabíjanie 50 W, batéria 5240 mAh, model 2025, Android",
    img: "https://cdn.alza.sk/Foto/or/articles/45876/img/xiaomi-15-a-15-pro-preview-xiaomi-15-pro-2.jpg"
  },
  {
    id: "Samsung",
    title: "samsung Galaxy s24 ultra",
    category: "phones",
    price: 750.00,
    desc: "Smartfón s 6,2 Full HD+ displej s rozlíšením 2340 x 1080 px, 8-jadrový procesor Exynos 2400, Kapacita batérie 4000 mAh, NFC, 5G...",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0wITd4PnUHx-Bvf0JwRZUteluPgEokruI-A&s"
  },
  // Headphones
  {
    id: "Airpods ",
    title: "Airpods Pro 3 ",
    category: "headphones",
    price: 399.00,
    desc: "Bezdrôtové slúchadlá – s mikrofónom, True Wireless, štuple, 2× silnejšie aktívne potlačenie hluku (ANC), nové snímanie tepovej frekvencie a funkcie živého prekladu, Bluetooth 5.3, prepínanie skladieb, prijímanie hovorov, uzatvorená konštrukcia, s ovládaním hlasitosti, certifikácia IP54, výdrž batérie až 30 h (6 h+24 h)",
    img: "https://istyle.sk/cdn/shop/files/IMG-18062380_m_jpeg_1.jpg?v=1757467912&width=823"
  },
  {
    id: "Airpods",
    title: "Airpods Max",
    category: "headphones",
    price: 529.00,
    desc: "Wireless Headphones – over-ear, with built-in microphone, active noise cancellation (ANC), closed-back design, Bluetooth 5.0, Hi-Res audio, voice assistant, 7.1 surround sound, track switching, call handling, volume control, 40 mm driver, battery life up to 20 h.",
    img: "https://mobilky.sk/wp-content/uploads/2024/09/2-800x800-7.jpg"
  },
  {
    id: "AirpodBeats Studio Pro ",
    title: "Beats Studio Pro ",
    category: "headphones",
    price: 255.00,
    desc: "Wireless Headphones, Over-Ear – Color: Blue, 3.5 mm, Bluetooth, USB-C, Bluetooth 5.3, Battery life: 40 h, Battery life with case: 40 h, Built-in microphone, Call handling, Voice assistant, Active noise cancellation.",
    img: "https://bhcase.sk/wp-content/uploads/2024/05/MQTQ3.jpeg"
  },
  // Watches
  {
    id: "Apple watch",
    title: "Apple watch Ultra 2",
    category: "watches",
    price: 899.00,
    desc: "Smartwatch – for men and women, compatible with iOS, OLED display, NFC payments via Apple Pay, Bluetooth 5.3, GPS, WiFi, LTE, pedometer, blood oxygen (SpO₂) and ECG measurement, sleep tracking, heart rate monitoring, waterproof up to 100 m (10 ATM), maximum battery life 72 h.",
    img: "https://www.pgs.sk/images/data/product/479/apple-watch-ultra-2-gps-cellular-49mm-black-titanium-case-with-black-ocean-band-mx4p3cs-a-479592.jpg"
  },
  {
    id: "Samsung watch",
    title: "Samsung watch Galaxy Watch 6 40mm",
    category: "watches",
    price: 399.00,
    desc: "Smartwatch – for men and women, compatible with Android OS, 1.34-inch display, NFC payments via Google Pay, Bluetooth 5.3, GPS, WiFi, make calls from the watch via a phone paired with Bluetooth, pedometer, blood oxygen (SpO₂) and ECG measurement, sleep tracking, heart rate monitoring, waterproof up to 50 m (5 ATM).",
    img: "https://www.irisimo.sk/files/product/56235/SAMSUNG-Galaxy-Watch-6-40mm-Grafite-SM-R930NZKAEUE.gif"
  },
  {
    id: "Mi Band",
    title: "Mi Band ",
    category: "watches",
    price: 39.00,
    desc: "Fitness Bracelet – for men and women, AMOLED touchscreen display, heart rate monitoring, sleep tracking, pedometer, phone finder, music player control on your phone, customizable watch faces, weather forecast, Always On Display, suitable for running, cycling, yoga, waterproof up to 50 m (5 ATM), maximum battery life 504 h, aluminum case material.",
    img: "https://data.planeo.sk/planeo/30/xiaomi/Smart-Band-10/dizajn-Xiaomi-Smart-Band-10_1750941926.webp"
  },
  // Accessories
  {
    id: "PowerCharge",
    title: "PowerCharge 65W",
    category: "accessories",
    price: 49.00,
    desc: "Wall Charger – supports fast charging, total output 65 W (1× USB-C up to 45 W, 1× USB-C up to 20 W), USB Power Delivery (PD) technology, overvoltage and undervoltage protection, GaN technology, compatible with Android and iPhone.",
    img: "https://alfasport.com.ua/Media/shop-8179/%D0%97%D0%B0%D1%80%D1%8F%D0%B4%D0%BA%D0%B8/5060948065924/65W%20(4)%20.jpg"
  },
  {
    id: "PowerBank",
    title: "Power bank 60000mah",
    category: "accessories",
    price: 129.00,
    desc: "Power Bank 72000 mAh – total output 180 W, 4 or more outputs: 1× USB-A, 2× USB-C, DC and 12 V socket, max output current 15 A, max output voltage 24 V, LED status indicator, wireless charging, reinforced construction for durability, Pass-Through Charging, USB-C and DC input, weight 1558 g.",
    img: "https://cdn.shopiforge.com.ua/uploads/1822/images/3907763-large-poverbank-60000mah-65w.png"
  },
  {
    id: "Phone cases",
    title: "Phone cases for iphone",
    category: "accessories",
    price: 15.00,
    desc: "Phone Case for Apple iPhone 15 Pro – made of TPU, durable and soft, easy to put on and take off, raised back for camera module protection, MagSafe compatible, supports wireless charging, screen protection against scratches, lanyard hole, precise cutouts for connectors and buttons, thickness 1.8 mm.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYv7oUp4OlennfLsTf1YKdGWOyfAXm4Qqz47gWrfCcJ4aBjObUzS0ujOIPbQMeoFC_CM&usqp=CAU"
  },

];
// ---------- DOM helpers ----------
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));
// ---------- Cart logic ----------
const CART_KEY = "tz_cart_v1";
let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
// Save cart to localStorage
function saveCart(){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  renderCartItems(); // update UI if open
}
// Add product to cart
function addToCart(productId, qty = 1){
  const p = products.find(x => x.id === productId);
  if(!p) return;
  const existing = cart.find(i => i.id === productId);
  if(existing) existing.qty += qty;
  else cart.push({ id: p.id, title: p.title, price: p.price, img: p.img, qty });
  saveCart();
  openCartPanel();
}
// Remove item
function removeFromCart(productId){
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}
// Update quantity
function updateQty(productId, qty){
  const it = cart.find(i => i.id === productId);
  if(!it) return;
  it.qty = Math.max(1, Number(qty));
  saveCart();
}
// Clear cart
function clearCart(){
  cart = [];
  saveCart();
}
// Get total
function cartTotal(){
  return cart.reduce((s,it) => s + it.price * it.qty, 0);
}
// Update cart count UI
function updateCartCount(){
  const totalItems = cart.reduce((s,i)=>s+i.qty,0);
  qsa("#cart-count, #cart-count-2, #cart-count-3, #cart-count-4").forEach(el=>{
    if(el) el.textContent = totalItems;
  });
}
// Render cart items into panel
function renderCartItems(){
  const panel = qs("#cart-panel");
  if(!panel) return;
  const container = panel.querySelector("#cart-items");
  const totalPriceEl = panel.querySelector("#cart-total-price");
  container.innerHTML = "";
  if(cart.length === 0){
    container.innerHTML = `<p class="text-muted" style="padding:12px">Cart is empty.</p>`;
  } else {
    cart.forEach(item=>{
      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${item.img}" alt="${escapeHtml(item.title)}" />
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="font-size:0.95rem">${escapeHtml(item.title)}</strong>
            <button class="icon-btn remove-item" data-id="${item.id}" title="Remove">✕</button>
          </div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
            <input class="qty" type="number" min="1" value="${item.qty}" data-id="${item.id}" />
            <div class="text-muted">${formatPrice(item.price)} / pc</div>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
  }
  totalPriceEl.textContent = formatPrice(cartTotal());
  // attach listeners for remove & qty change
  qsa(".remove-item").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      const id = btn.dataset.id;
      removeFromCart(id);
    });
  });
  qsa(".cart-items .qty").forEach(input=>{
    input.addEventListener("change", ()=>{
      updateQty(input.dataset.id, input.value);
    });
  });
}
// Open / close cart panel
function openCartPanel(){
  const panel = qs("#cart-panel");
  if(!panel) return;
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");
  renderCartItems();
}
function closeCartPanel(){
  const panel = qs("#cart-panel");
  if(!panel) return;
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
}
// ---------- Rendering products ----------
function renderProducts(list){
  const grid = qs("#product-grid");
  if(!grid) return;
  grid.innerHTML = "";
  list.forEach(p=>{
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(p.title)}" />
      <div>
        <h3 style="margin:0 0 6px 0">${escapeHtml(p.title)}</h3>
        <p class="text-muted" style="margin:0 0 8px">${escapeHtml(p.desc)}</p>
        <div class="product-meta">
          <div class="price">${formatPrice(p.price)}</div>
          <div class="product-actions">
            <input class="qty" type="number" min="1" value="1" aria-label="Quantity" />
            <button class="btn add-to-cart" data-id="${p.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  qsa(".add-to-cart").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.dataset.id;
      const card = btn.closest(".product-card");
      const qtyInput = card.querySelector(".qty");
      const qty = Math.max(1, Number(qtyInput.value || 1));
      addToCart(id, qty);
    });
  });
}
// ---------- Helpers ----------
function formatPrice(num){
  // Use Euro symbol; change if needed.
  return num.toLocaleString(getCurrentLocale(), {style:"currency", currency:"EUR"});
}
function getCurrentLocale(){
  return (localStorage.getItem("tz_lang") || "en") === "sk" ? "sk-SK" : "en-US";
}
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); });
}
// ---------- Filters & search ----------
function applyFilters(){
  const search = qs("#search") ? qs("#search").value.trim().toLowerCase() : "";
  const category = qs("#category") ? qs("#category").value : "all";
  let list = products.slice();
  if(category !== "all"){
    list = list.filter(p => p.category === category);
  }
  if(search){
    list = list.filter(p => (p.title + " " + p.desc).toLowerCase().includes(search));
  }
  renderProducts(list);
}
// ---------- Language (EN / SK) ----------
const translations = {
  en: {
    nav_home: "Home",
    nav_shop: "Shop",
    nav_about: "About",
    nav_contact: "Contact",
    hero_title: "Smart gadgets for everyday life",
    hero_sub: "Top brands · Trusted quality · Fast shipping",
    shop_now: "Shop Now",
    learn_more: "Learn More",
    verified: "Verified Products",
    verified_desc: "Only trusted items from top suppliers.",
    delivery: "Fast Delivery",
    delivery_desc: "Trackable & secure shipping.",
    support: "24/7 Support",
    support_desc: "We are here to help whenever you need.",
    deals: "Exclusive Deals",
    deals_desc: "Save with our offers and bundles.",
    popular: "Popular categories",
    shop: "Shop",
    shop_sub: "Browse our curated selection of electronics",
    search_label: "Search",
    category_label: "Category",
    all: "All",
    cart_title: "Your Cart",
    total: "Total",
    clear: "Clear",
    checkout: "Checkout",
    about_title: "About Us",
    about_lead: "Welcome to TechZoneHub — your destination for trusted technology that makes life simpler.",
    who_we_are: "Who We Are",
    who_desc: "At TechZoneHub, we bring the latest and most trusted technology to your fingertips. Our mission is to make life smarter, faster, and more connected — through innovation and quality.",
    mission: "Our Mission",
    mission_desc: "To make premium tech accessible to everyone. We curate products from top brands and ensure a smooth shopping experience.",
    team_desc: "Small but dedicated team of tech lovers and customer-first people.",
    logistics: "Logistics",
    logistics_desc: "Fast shipping and secure packaging across regions.",
    support_long: "24/7 friendly support to answer all questions.",
    contact_title: "Contact Us",
    contact_sub: "We’re happy to help — send us a message.",
    your_name: "Your name",
    your_email: "Your email",
    message: "Message",
    send: "Send Message",
    get_in_touch: "Get in touch",
    office_hours: "Office hours: Mon–Fri, 9:00–18:00",
    footer_rights: "© 2025 TechZoneHub. All rights reserved."
  },
  sk: {
    nav_home: "Domov",
    nav_shop: "Obchod",
    nav_about: "O nás",
    nav_contact: "Kontakt",
    hero_title: "Inteligentné gadgety pre každodenný život",
    hero_sub: "Top značky · Overená kvalita · Rýchle doručenie",
    shop_now: "Kúpiť teraz",
    learn_more: "Zistiť viac",
    verified: "Overené produkty",
    verified_desc: "Len spoľahlivé produkty od popredných dodávateľov.",
    delivery: "Rýchle doručenie",
    delivery_desc: "Sledovateľné a bezpečné doručenie.",
    support: "Podpora 24/7",
    support_desc: "Sme tu, aby sme vám pomohli kedykoľvek.",
    deals: "Exkluzívne ponuky",
    deals_desc: "Ušetrite s našimi akciami a balíkmi.",
    popular: "Populárne kategórie",
    shop: "Obchod",
    shop_sub: "Prezrite si našu vybranú elektroniku",
    search_label: "Hľadať",
    category_label: "Kategória",
    all: "Všetky",
    cart_title: "Váš košík",
    total: "Spolu",
    clear: "Vymazať",
    checkout: "Objednať",
    about_title: "O nás",
    about_lead: "Vitajte v TechZoneHub — vašom mieste pre overené technológie, ktoré uľahčujú život.",
    who_we_are: "Kto sme",
    who_desc: "V TechZoneHub prinášame najnovšie a najspoľahlivejšie technológie priamo do vašich rúk. Našou misiou je robiť život inteligentnejším, rýchlejším a viac prepojeným prostredníctvom inovácií a kvality.“",
    mission: "Naša misia",
    mission_desc: "Sprístupniť prémiovú techniku každému. Vyberáme produkty od popredných značiek a zabezpečujeme pohodlný nákupný zážitok.",
    team_desc: "Malý, ale oddaný tím technofanúšikov a zákaznícky orientovaných ľudí.",
    logistics: "Logistika",
    logistics_desc: "Rýchle doručenie a bezpečné balenie v regiónoch.",
    support_long: "Prívetivá podpora 24/7 na zodpovedanie všetkých otázok.",
    contact_title: "Kontakty",
    contact_sub: "Radi pomôžeme — pošlite nám správu.",
    your_name: "Vaše meno",
    your_email: "Vaš email",
    message: "Správa",
    send: "Odoslať",
    get_in_touch: "Spojiť sa",
    office_hours: "Úradné hodiny: Po–Pia, 8:00–18:00",
    footer_rights: "„© 2025 TechZoneHub. Všetky práva vyhradené."
  }
};
function translatePage(lang){
  // store choice
  localStorage.setItem("tz_lang", lang);
  // find all elements with data-i18n
  qsa("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(translations[lang] && translations[lang][key]){
      el.textContent = translations[lang][key];
    }
  });
  // update placeholder for search input if exists
  const search = qs("#search");
  if(search){
    search.placeholder = lang === "sk" ? "Hľadať produkty..." : "Search products...";
  }
  // update currency formatting by re-rendering cart and products
  renderProducts(products);
  renderCartItems();
  updateCartCount();
}
// Initialize language UI buttons
function initLangBtns(){
  const lang = localStorage.getItem("tz_lang") || "en";
  // set active classes for all language btns across pages
  qsa(".lang-btn").forEach(btn=>{
    btn.classList.remove("active");
  });
  // mark each pair; buttons have id patterns
  qsa("#lang-en, #lang-en-2, #lang-en-3, #lang-en-4").forEach(b=>{ if(b) b.classList.toggle("active", lang==="en"); });
  qsa("#lang-sk, #lang-ua-2, #lang-sk-3, #lang-sk-4").forEach(b=>{ if(b) b.classList.toggle("active", lang==="sk"); });
  // set listene
  qsa("#lang-en, #lang-en-2, #lang-en-3, #lang-en-4").forEach(b=>{
    if(!b) return;
    b.addEventListener("click", ()=>{
      initLangBtns(); // reset others
      qsa(".lang-btn").forEach(x=>x.classList.remove("active"));
      qsa("#lang-en, #lang-en-2, #lang-en-3, #lang-en-4").forEach(x=>{ if(x) x.classList.add("active");});
      translatePage("en");
    });
  });
  qsa("#lang-sk, #lang-sk-2, #lang-sk-3, #lang-sk-4").forEach(b=>{
    if(!b) return;
    b.addEventListener("click", ()=>{
      initLangBtns();
      qsa(".lang-btn").forEach(x=>x.classList.remove("active"));
      qsa("#lang-sk, #lang-sk-2, #lang-sk-3, #lang-sk-4").forEach(x=>{ if(x) x.classList.add("active");});
      translatePage("sk");
    });
  });
  // apply initial translation
  translatePage(lang);
}
// ---------- Event bindings ----------
document.addEventListener("DOMContentLoaded", ()=>{
  // render products if on shop page
  if(qs("#product-grid")) renderProducts(products);
  // filters
  if(qs("#search")){
    qs("#search").addEventListener("input", debounce(()=>applyFilters(), 250));
  }
  if(qs("#category")){
    qs("#category").addEventListener("change", applyFilters);
  }
  // cart buttons - multiple IDs across pages
  qsa("#cart-btn, #cart-btn-2, #cart-btn-3, #cart-btn-4").forEach(btn=>{
    if(!btn) return;
    btn.addEventListener("click", openCartPanel);
  });
  qsa("#cart-close").forEach(b=>{ if(b) b.addEventListener("click", closeCartPanel); });
  // close cart if click outside
  document.addEventListener("click", (e)=>{
    const panel = qs("#cart-panel");
    if(!panel) return;
    const isOpen = panel.classList.contains("open");
    if(!isOpen) return;
    if(!panel.contains(e.target) && !e.target.closest(".icon-btn")) {
      // if clicked outside and not on cart button
      closeCartPanel();
    }
  });
  // clear cart
  qsa("#clear-cart").forEach(b=>{
    if(!b) return;
    b.addEventListener("click", ()=>{
      if(confirm(getCurrentLang() === "sk" ? "Vyprázdniť košík?" : "Clear cart?")) clearCart();
    });
  });
  // checkout (simulated)
  qsa("#checkout-btn").forEach(b=>{
    if(!b) return;
    b.addEventListener("click", ()=>{
      if(cart.length === 0){ alert(getCurrentLang() === "sk" ? "Košík je prázdny." : "Your cart is empty."); return; }
      // simulate success + clear cart
      alert(getCurrentLang() === "sk" ? "Ďakujeme! Vaša objednávka bola prijatá (simulácia)." : "Thank you! Your order has been placed (simulation).");
      clearCart();
      closeCartPanel();
    });
  });
  // contact form demo
  const cf = qs("#contact-form");
  if(cf){
    cf.addEventListener("submit", (e)=>{
      e.preventDefault();
      alert(getCurrentLang() === "sk" ? "Správa bola odoslaná (simulácia)." : "Message sent (simulation).");
      cf.reset();
    });
  }
  // cart close buttons (since multiple with same id on pages)
  qsa("#cart-close").forEach(btn=>{
    if(btn) btn.addEventListener("click", closeCartPanel);
  });
  // init language buttons
  initLangBtns();
  // initial cart render & count
  updateCartCount();
  renderCartItems();
});
// ---------- Utilities ----------
function debounce(fn, wait){
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(()=>fn(...a), wait); };
}
function getCurrentLang(){
  return localStorage.getItem("tz_lang") || "en";
}
