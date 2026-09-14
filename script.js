/* ==========================================================================
   AHLULILMBOOKS — STORE LOGIC
   ========================================================================== */

// ---- Product catalogue (real inventory) ----------------------------------
const PRODUCTS = [
  {
    id: "rawdatul-muhibbin-v1",
    title: "Rawdatul-Muhibbin wa Nuzhatul-Mushtaqin — Vol. 1",
    shortTitle: "Rawdatul-Muhibbin (Vol. 1)",
    arabic: "روضة المحبين ونزهة المشتاقين",
    author: "Ibn Qayyim al-Jawziyyah",
    category: "fiqh",
    categoryLabel: "Fiqh & Tazkiyah",
    price: 58.18,
    description: "The first volume of Ibn al-Qayyim's classical treatise on love, its rulings, and its purification — a foundational work on the heart and its attachments, grounded firmly in the Qur'an and Sunnah.",
    coverPalette: ["#3E6FA1", "#5C8FC4"]
  },
  {
    id: "rawdatul-muhibbin-v2",
    title: "Rawdatul-Muhibbin wa Nuzhatul-Mushtaqin — Vol. 2",
    shortTitle: "Rawdatul-Muhibbin (Vol. 2)",
    arabic: "روضة المحبين ونزهة المشتاقين",
    author: "Ibn Qayyim al-Jawziyyah",
    category: "fiqh",
    categoryLabel: "Fiqh & Tazkiyah",
    price: 58.15,
    description: "The second volume continuing Ibn al-Qayyim's treatment of love and its rulings, examining its stations and the path from base desire to sound, purified love of Allah.",
    coverPalette: ["#3E6FA1", "#5C8FC4"]
  },
  {
    id: "rawdatul-muhibbin-v3",
    title: "Rawdatul-Muhibbin wa Nuzhatul-Mushtaqin — Vol. 3",
    shortTitle: "Rawdatul-Muhibbin (Vol. 3)",
    arabic: "روضة المحبين ونزهة المشتاقين",
    author: "Ibn Qayyim al-Jawziyyah",
    category: "fiqh",
    categoryLabel: "Fiqh & Tazkiyah",
    price: 65.38,
    description: "The concluding volume of the set, completing Ibn al-Qayyim's classical exploration of love, longing, and their proper place in the life of a believer.",
    coverPalette: ["#3E6FA1", "#5C8FC4"]
  },
  {
    id: "madaarij-as-saalikeen",
    title: "Madaarij as-Saalikeen fi Manazil Iyyaka Na'budu wa Iyyaka Nasta'in",
    shortTitle: "Madaarij as-Saalikeen",
    arabic: "مدارج السالكين",
    author: "Ibn Qayyim al-Jawziyyah",
    category: "aqeedah",
    categoryLabel: "Aqeedah & Suluk",
    price: 73.90,
    description: "Ibn al-Qayyim's monumental commentary on the 'stations of the wayfarers,' mapping the spiritual path of the servant toward Allah. A cornerstone text of Islamic spirituality, printed in Lebanese (Saudi quality) binding.",
    coverPalette: ["#2F5A82", "#4C7BA8"]
  },
  {
    id: "badaai-at-tafsir",
    title: "Badaa'i at-Tafsir — al-Jaami' li Tafsir Ibn al-Qayyim (3 Volumes)",
    shortTitle: "Badaa'i at-Tafsir (3 Vols.)",
    arabic: "بدائع التفسير",
    author: "Compiled from Ibn Qayyim al-Jawziyyah",
    category: "tafsir",
    categoryLabel: "Qur'an & Tafsir",
    price: 121.78,
    description: "A complete, three-volume compilation gathering Ibn al-Qayyim's scattered tafsir remarks from across his works into a single running commentary on the Qur'an — an essential reference for students of tafsir.",
    coverPalette: ["#4A7BA6", "#7FA9CE"]
  },
  {
    id: "mutoon-taalib-al-ilm",
    title: "Mutoon at-Taalib al-Ilm — Level Two (5-Book Bundle)",
    shortTitle: "Mutoon at-Taalib al-Ilm",
    arabic: "متون طالب العلم",
    author: "Various Classical Authors",
    category: "arabic",
    categoryLabel: "Islamic Studies",
    price: 43.90,
    description: "A curated bundle of five foundational texts (mutoon) for the second level of the seeker's curriculum — compact, memorizable primers relied upon in traditional Islamic study circles.",
    coverPalette: ["#6E8FB0", "#3E6FA1"]
  }
];

// ---- State -----------------------------------------------------------------
let cart = [];
try{
  const saved = localStorage.getItem("ahlulilmbooks_cart");
  if(saved) cart = JSON.parse(saved);
}catch(e){ cart = []; }

let activeFilter = "all";

// ---- Helpers -----------------------------------------------------------------
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const money = (n) => "$" + n.toFixed(2);

function saveCart(){
  try{ localStorage.setItem("ahlulilmbooks_cart", JSON.stringify(cart)); }catch(e){}
}

function coverMotifSVG(){
  return `<svg class="cover-motif" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6 L30 18 L42 24 L30 30 L24 42 L18 30 L6 24 L18 18 Z" stroke="rgba(255,255,255,0.85)" stroke-width="1"/>
  </svg>`;
}

function coverStyle(product){
  const [c1, c2] = product.coverPalette;
  return `background: linear-gradient(150deg, ${c1}, ${c2});`;
}

// ---- Render product cards ---------------------------------------------------
function renderProducts(){
  const grid = $("#productGrid");
  const list = activeFilter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  if(list.length === 0){
    grid.innerHTML = `<p class="cart-empty" style="grid-column:1/-1;">No titles in this collection yet — check back soon.</p>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-cover-wrap">
        <div class="product-cover" style="${coverStyle(p)}">
          ${coverMotifSVG()}
          <p class="cover-title">${p.shortTitle}</p>
          <p class="cover-arabic">${p.arabic}</p>
        </div>
      </div>
      <div class="product-body">
        <p class="product-category">${p.categoryLabel}</p>
        <h3 class="product-title">${p.shortTitle}</h3>
        <p class="product-author">${p.author}</p>
        <div class="product-footer">
          <span class="product-price">${money(p.price)}</span>
          <div class="product-actions">
            <button class="quick-view-btn" data-action="quick-view" data-id="${p.id}">Quick View</button>
            <button data-action="add" data-id="${p.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

// ---- Cart logic ---------------------------------------------------------------
function addToCart(id, qty = 1){
  const product = PRODUCTS.find(p => p.id === id);
  if(!product) return;
  const existing = cart.find(item => item.id === id);
  if(existing){ existing.qty += qty; }
  else{ cart.push({ id, qty }); }
  saveCart();
  renderCart();
  showToast(`Added “${product.shortTitle}” to your cart`);
}

function updateQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){ cart = cart.filter(i => i.id !== id); }
  saveCart();
  renderCart();
}

function removeFromCart(id){
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function cartTotal(){
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function cartCount(){
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart(){
  const itemsEl = $("#cartItems");
  const count = cartCount();
  $("#cartCount").textContent = count;
  $("#cartSubtotal").textContent = money(cartTotal());

  if(cart.length === 0){
    itemsEl.innerHTML = `<p class="cart-empty">Your cart is empty.<br>Explore our collection to find your next book.</p>`;
    return;
  }

  itemsEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if(!p) return "";
    return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item-cover" style="${coverStyle(p)}"></div>
        <div class="cart-item-info">
          <p class="cart-item-title">${p.shortTitle}</p>
          <p class="cart-item-price">${money(p.price)}</p>
          <div class="cart-item-qty">
            <button data-action="dec" data-id="${p.id}">–</button>
            <span>${item.qty}</span>
            <button data-action="inc" data-id="${p.id}">+</button>
          </div>
          <button class="cart-item-remove" data-action="remove" data-id="${p.id}">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

// ---- Quick view modal -----------------------------------------------------
function openQuickView(id){
  const p = PRODUCTS.find(pr => pr.id === id);
  if(!p) return;
  $("#quickView").innerHTML = `
    <button class="qv-close" id="qvClose" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none"><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
    </button>
    <div class="qv-cover" style="${coverStyle(p)}">
      ${coverMotifSVG()}
      <p class="cover-title">${p.shortTitle}</p>
      <p class="cover-arabic">${p.arabic}</p>
    </div>
    <div class="qv-info">
      <p class="qv-category">${p.categoryLabel}</p>
      <h3 class="qv-title">${p.title}</h3>
      <p class="qv-author">${p.author}</p>
      <p class="qv-desc">${p.description}</p>
      <span class="qv-price">${money(p.price)}</span>
      <button class="qv-add" data-action="add" data-id="${p.id}">Add to Cart</button>
    </div>
  `;
  $("#modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickView(){
  $("#modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ---- Toast --------------------------------------------------------------------
let toastTimer;
function showToast(msg){
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ---- Search -------------------------------------------------------------------
function runSearch(query){
  const resultsEl = $("#searchResults");
  const q = query.trim().toLowerCase();
  if(!q){ resultsEl.innerHTML = ""; return; }
  const matches = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.author.toLowerCase().includes(q) ||
    p.categoryLabel.toLowerCase().includes(q)
  );
  if(matches.length === 0){
    resultsEl.innerHTML = `<p class="search-empty">No titles found for “${query}”.</p>`;
    return;
  }
  resultsEl.innerHTML = matches.map(p => `
    <a href="#books" class="search-result-item" data-action="search-jump" data-id="${p.id}">
      <span>${p.shortTitle} — <em>${p.author}</em></span>
      <span>${money(p.price)}</span>
    </a>
  `).join("");
}

// ---- Event wiring ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  renderProducts();
  renderCart();

  // mobile nav
  const navToggle = $("#navToggle");
  const mainNav = $("#mainNav");
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", () => mainNav.classList.remove("open")));

  // header shrink shadow on scroll (subtle, non-intrusive)
  const header = $("#siteHeader");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 10 ? "0 8px 24px rgba(20,35,55,0.12)" : "none";
  });

  // search
  const searchToggle = $("#searchToggle");
  const searchPanel = $("#searchPanel");
  const searchInput = $("#searchInput");
  searchToggle.addEventListener("click", () => {
    searchPanel.classList.toggle("open");
    if(searchPanel.classList.contains("open")) setTimeout(() => searchInput.focus(), 150);
  });
  $("#searchClose").addEventListener("click", () => searchPanel.classList.remove("open"));
  searchInput.addEventListener("input", (e) => runSearch(e.target.value));

  // filters
  $("#productFilters").addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if(!chip) return;
    $$(".filter-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderProducts();
  });

  // collection cards jump to filtered books
  $("#categories").addEventListener("click", (e) => {
    const card = e.target.closest(".collection-card");
    if(!card) return;
    const filter = card.dataset.filter;
    activeFilter = filter;
    $$(".filter-chip").forEach(c => c.classList.toggle("active", c.dataset.filter === filter));
    renderProducts();
    document.getElementById("books").scrollIntoView({ behavior: "smooth" });
  });

  // product grid actions (add / quick view) — delegated
  $("#productGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    const { action, id } = btn.dataset;
    if(action === "add") addToCart(id);
    if(action === "quick-view") openQuickView(id);
  });

  // quick view modal
  $("#modalOverlay").addEventListener("click", (e) => {
    if(e.target.id === "modalOverlay") closeQuickView();
  });
  $("#quickView").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    if(btn.id === "qvClose"){ closeQuickView(); return; }
    if(btn.dataset.action === "add"){
      addToCart(btn.dataset.id);
      closeQuickView();
    }
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){ closeQuickView(); closeCart(); }
  });

  // cart drawer
  const cartDrawer = $("#cartDrawer");
  const cartOverlay = $("#cartOverlay");
  function openCart(){
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
  }
  function closeCartFn(){
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
  }
  window.closeCart = closeCartFn;
  $("#cartToggle").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCartFn);
  cartOverlay.addEventListener("click", closeCartFn);

  $("#cartItems").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    const { action, id } = btn.dataset;
    if(action === "inc") updateQty(id, 1);
    if(action === "dec") updateQty(id, -1);
    if(action === "remove") removeFromCart(id);
  });

  $("#checkoutBtn").addEventListener("click", () => {
    if(cart.length === 0){
      showToast("Your cart is empty");
      return;
    }
    showToast(`Checkout is coming soon — subtotal ${money(cartTotal())}`);
  });

  // newsletter (front-end only — no backend wired up)
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#newsletterNote").textContent = "Thank you — you're on the list.";
    e.target.reset();
  });

  // search result jump
  $("#searchResults").addEventListener("click", (e) => {
    const item = e.target.closest(".search-result-item");
    if(!item) return;
    searchPanel.classList.remove("open");
    activeFilter = "all";
    $$(".filter-chip").forEach(c => c.classList.toggle("active", c.dataset.filter === "all"));
    renderProducts();
    setTimeout(() => openQuickView(item.dataset.id), 300);
  });

  // scrollspy for nav active state
  const sections = ["home","books","categories","about","contact"].map(id => document.getElementById(id)).filter(Boolean);
  const navLinks = $$(".nav-link");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => spy.observe(s));
});
