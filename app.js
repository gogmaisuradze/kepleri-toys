// კეპლერი (Kepler) - Interactive Web Application
// Strictly focused on children's toys and smart gadgets.

const STATE = {
  cart: JSON.parse(localStorage.getItem('kepler_cart') || localStorage.getItem('keplo_cart') || localStorage.getItem('altakids_cart')) || INITIAL_CART,
  wishlist: JSON.parse(localStorage.getItem('kepler_wishlist') || localStorage.getItem('keplo_wishlist') || localStorage.getItem('altakids_wishlist')) || INITIAL_WISHLIST,
  selectedCategory: 'all',
  selectedAge: 'all',
  selectedBrand: 'all',
  searchQuery: '',
  brandSearchQuery: '',
  sortBy: 'featured',
  activeProductModal: null
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  checkUrlParams();
  renderBrandsGrid();
  renderProducts();
  renderDealOfTheDay();
  updateHeaderCounters();
  setupEventListeners();
  initCountdownTimer();
}

function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const brand = params.get('brand');
  if (brand) {
    STATE.selectedBrand = brand;
  }
}

// Save State to LocalStorage
function saveState() {
  localStorage.setItem('kepler_cart', JSON.stringify(STATE.cart));
  localStorage.setItem('kepler_wishlist', JSON.stringify(STATE.wishlist));
  updateHeaderCounters();
}

// Update Header Counters
function updateHeaderCounters() {
  const cartTotalQty = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalAmount = calculateCartTotal();
  
  const cartBadge = document.getElementById('cart-badge');
  const cartPrice = document.getElementById('cart-price');
  if (cartBadge) cartBadge.textContent = cartTotalQty;
  if (cartPrice) cartPrice.textContent = `${cartTotalAmount.toFixed(2)} ₾`;

  const wishlistBadge = document.getElementById('wishlist-badge');
  if (wishlistBadge) wishlistBadge.textContent = STATE.wishlist.length;
}

// Calculate Total Cart Price
function calculateCartTotal() {
  return STATE.cart.reduce((sum, item) => {
    const prod = PRODUCTS.find(p => p.id === item.productId);
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);
}

// Render Brands Grid (Alta-style /brands showcase)
function renderBrandsGrid() {
  const container = document.getElementById('brands-grid-container');
  if (!container) return;

  let filteredBrands = BRANDS;
  if (STATE.brandSearchQuery.trim() !== '') {
    const bq = STATE.brandSearchQuery.toLowerCase();
    filteredBrands = BRANDS.filter(b => 
      b.name.toLowerCase().includes(bq) || 
      b.category.toLowerCase().includes(bq) || 
      b.desc.toLowerCase().includes(bq)
    );
  }

  container.innerHTML = filteredBrands.map(brand => {
    const isSelected = STATE.selectedBrand === brand.id;
    return `
      <div 
        onclick="selectBrand('${brand.id}')"
        class="group p-4 rounded-2xl bg-surface-card border transition-all duration-200 cursor-pointer flex flex-col justify-between tap-effect ${
          isSelected 
            ? 'border-secondary tactile-floating ring-2 ring-secondary/50 bg-white' 
            : 'border-white tactile-extruded hover:tactile-floating'
        }">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="w-10 h-10 rounded-full bg-surface-bg tactile-inset flex items-center justify-center text-xl text-secondary">
              <span class="material-symbols-outlined text-[22px]">${brand.icon}</span>
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              isSelected ? 'bg-secondary text-white' : 'bg-surface-bg text-text-muted tactile-inset-sm'
            }">
              ${brand.count} სათამაშო
            </span>
          </div>

          <h3 class="font-heading font-bold text-base text-text-primary group-hover:text-secondary transition-colors flex items-center gap-1.5">
            <span>${brand.name}</span>
            <span class="text-xs text-text-muted font-normal">(${brand.country})</span>
          </h3>
          <p class="text-xs text-text-muted mt-1 line-clamp-2 leading-relaxed">${brand.desc}</p>
        </div>

        <div class="mt-4 pt-2.5 border-t border-shadow-dark/30 flex items-center justify-between text-[11px]">
          <span class="font-semibold text-secondary flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">verified</span>
            ${brand.badge}
          </span>
          <span class="text-text-muted group-hover:text-secondary font-medium">კატალოგი →</span>
        </div>
      </div>
    `;
  }).join('');
}

// Select Brand
function selectBrand(brandId) {
  // If on brands.html, redirect to index.html with brand query param
  if (!document.getElementById('products-container')) {
    window.location.href = `index.html?brand=${brandId}#hot-deals`;
    return;
  }

  if (STATE.selectedBrand === brandId) {
    STATE.selectedBrand = 'all';
  } else {
    STATE.selectedBrand = brandId;
  }
  renderBrandsGrid();
  renderProducts();

  // Scroll to catalog section if selected
  const catSection = document.getElementById('hot-deals');
  if (catSection && STATE.selectedBrand !== 'all') {
    catSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById('products-container');
  const activeBrandBanner = document.getElementById('active-brand-banner');
  if (!container) return;

  // Active brand indicator banner
  if (activeBrandBanner) {
    if (STATE.selectedBrand !== 'all') {
      const bObj = BRANDS.find(b => b.id === STATE.selectedBrand);
      activeBrandBanner.classList.remove('hidden');
      activeBrandBanner.innerHTML = `
        <div class="p-3.5 rounded-2xl bg-white border border-secondary/30 tactile-extruded-sm flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[20px]">${bObj.icon}</span>
            </span>
            <div>
              <span class="text-xs text-text-muted">ფილტრი ბრენდით:</span>
              <h4 class="font-heading font-bold text-sm text-text-primary">${bObj.name} • ${bObj.badge}</h4>
            </div>
          </div>
          <button onclick="selectBrand('${STATE.selectedBrand}')" class="px-3 py-1 rounded-xl bg-surface-bg tactile-inset-sm text-xs font-semibold text-text-primary hover:text-accent-sale tap-effect flex items-center gap-1">
            <span>გასუფთავება</span>
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      `;
    } else {
      activeBrandBanner.classList.add('hidden');
    }
  }

  let filtered = PRODUCTS.filter(prod => {
    // Filter Brand
    if (STATE.selectedBrand !== 'all' && prod.brandId !== STATE.selectedBrand) {
      return false;
    }
    // Filter Category
    if (STATE.selectedCategory !== 'all' && prod.category !== STATE.selectedCategory) {
      return false;
    }
    // Filter Age
    if (STATE.selectedAge !== 'all' && prod.age !== STATE.selectedAge) {
      return false;
    }
    // Filter Search
    if (STATE.searchQuery.trim() !== '') {
      const q = STATE.searchQuery.toLowerCase();
      const matchTitle = prod.title.toLowerCase().includes(q);
      const matchBrand = prod.brand.toLowerCase().includes(q);
      const matchCategory = prod.categoryLabel.toLowerCase().includes(q);
      const matchDesc = prod.description.toLowerCase().includes(q);
      const matchSku = prod.sku ? prod.sku.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchBrand && !matchCategory && !matchDesc && !matchSku) return false;
    }
    return true;
  });

  // Sorting
  if (STATE.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (STATE.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (STATE.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (STATE.sortBy === 'discount') {
    filtered.sort((a, b) => b.discount - a.discount);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto rounded-full bg-surface-bg tactile-inset flex items-center justify-center text-text-muted mb-4">
          <span class="material-symbols-outlined text-4xl">search_off</span>
        </div>
        <h3 class="text-xl font-bold text-text-primary font-heading">სათამაშო ვერ მოიძებნა</h3>
        <p class="text-text-muted text-sm mt-1 max-w-md mx-auto">სცადეთ სხვა საძიებო სიტყვა ან მოხსენით აქტიური ფილტრები.</p>
        <button onclick="resetFilters()" class="mt-4 px-6 py-2.5 rounded-full bg-secondary text-white font-semibold text-sm tactile-extruded-sm hover:bg-secondary-container tap-effect">
          ფილტრების გასუფთავება
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => createProductCardHTML(prod)).join('');
}

// Generate Product Card HTML
function createProductCardHTML(prod) {
  const isWishlisted = STATE.wishlist.includes(prod.id);
  const badgeClass = prod.badgeColor === 'sale' 
    ? 'bg-accent-sale text-white' 
    : prod.badgeColor === 'blue' 
      ? 'bg-secondary text-white' 
      : prod.badgeColor === 'green'
        ? 'bg-emerald-500 text-white'
        : 'bg-badge-yellow text-primary';

  return `
    <div class="group rounded-2xl bg-surface-card p-4 tactile-extruded hover:tactile-floating transition-all duration-200 border border-white flex flex-col justify-between relative cursor-pointer" onclick="openQuickView(${prod.id}, event)">
      <div>
        <!-- Top Badges & Favorite -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1.5">
            <span class="px-2.5 py-0.5 rounded-full ${badgeClass} text-[11px] font-bold tracking-wide">
              ${prod.badge}
            </span>
            <span class="text-[10px] text-text-muted font-mono font-semibold">${prod.sku}</span>
          </div>
          <button 
            type="button"
            onclick="toggleWishlist(${prod.id}, event)"
            class="w-8 h-8 rounded-full bg-surface-bg tactile-inset flex items-center justify-center transition-transform active:scale-90 ${isWishlisted ? 'text-accent-sale' : 'text-text-muted hover:text-accent-sale'}"
            title="${isWishlisted ? 'სურვილებიდან წაშლა' : 'სურვილებში დამატება'}">
            <span class="material-symbols-outlined text-[19px]" style="${isWishlisted ? "font-variation-settings: 'FILL' 1;" : ''}">
              favorite
            </span>
          </button>
        </div>

        <!-- Product Image Viewport -->
        <div class="w-full h-44 rounded-xl bg-surface-bg p-3 tactile-inset flex items-center justify-center mb-3 overflow-hidden relative">
          <img 
            src="${prod.image}" 
            alt="${prod.title}" 
            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span class="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-text-primary uppercase tracking-wider">
            ${prod.brand}
          </span>
        </div>

        <!-- Category & Title -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px] font-semibold text-secondary">
            <span>${prod.categoryLabel}</span>
            <span class="text-text-muted font-normal">• ${prod.ageLabel}</span>
          </div>
          <h3 class="text-title-card font-heading font-semibold text-text-primary line-clamp-2 group-hover:text-secondary transition-colors" title="${prod.title}">
            ${prod.title}
          </h3>
        </div>

        <!-- Rating & Stock -->
        <div class="flex items-center justify-between mt-2.5 text-xs">
          <div class="flex items-center gap-1 text-badge-yellow">
            <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
            <span class="text-text-primary font-bold">${prod.rating.toFixed(1)}</span>
            <span class="text-text-muted text-[11px]">(${prod.reviewsCount})</span>
          </div>
          <span class="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            მარაგშია ონლაინ
          </span>
        </div>
      </div>

      <!-- Price & Add to Cart -->
      <div class="mt-4 pt-3 border-t border-shadow-dark/40 space-y-2.5">
        <div class="flex items-baseline justify-between">
          <div>
            <span class="text-xl font-bold font-heading text-text-primary">${prod.price.toFixed(2)} ₾</span>
            ${prod.oldPrice ? `<span class="text-xs text-text-muted line-through ml-2">${prod.oldPrice.toFixed(2)} ₾</span>` : ''}
          </div>
          <span class="text-[11px] text-text-muted font-medium bg-surface-bg px-2 py-0.5 rounded tactile-inset-sm">
            ${prod.installment} ₾/თვე
          </span>
        </div>
        <button 
          type="button"
          onclick="addToCart(${prod.id}, 1, event)"
          class="w-full py-2.5 rounded-xl bg-text-primary text-white font-heading text-sm font-semibold hover:shadow-[0_0_12px_rgba(58,134,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 tap-effect">
          <span class="material-symbols-outlined text-[18px] text-tertiary-fixed">add_shopping_cart</span>
          <span>კალათაში</span>
        </button>
      </div>
    </div>
  `;
}

// Render Deal of the Day widget
function renderDealOfTheDay() {
  const deal = PRODUCTS.find(p => p.isDealOfDay);
  if (!deal) return;

  const dealEl = document.getElementById('deal-of-the-day-container');
  if (dealEl) {
    dealEl.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-accent-sale text-white flex items-center justify-center tactile-extruded-sm">
            <span class="material-symbols-outlined text-[18px]">timer</span>
          </span>
          <div>
            <span class="text-[11px] font-bold text-accent-sale uppercase block">დღის შეთავაზება</span>
            <span class="text-title-card font-heading font-bold text-text-primary">სუპერ ფასდაკლება</span>
          </div>
        </div>
        <span class="px-2.5 py-1 rounded-full bg-accent-sale text-white text-xs font-bold font-heading">-${deal.discount}%</span>
      </div>

      <!-- Mini Product Card Layout -->
      <div class="flex items-center gap-4 my-2 cursor-pointer group" onclick="openQuickView(${deal.id}, event)">
        <div class="w-24 h-24 rounded-xl bg-surface-bg p-2 tactile-inset flex items-center justify-center shrink-0">
          <img src="${deal.image}" alt="${deal.title}" class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
        </div>
        <div class="flex-1 min-w-0">
          <span class="text-[11px] font-bold text-secondary tracking-wider uppercase">${deal.brand}</span>
          <h4 class="text-title-card font-heading text-text-primary font-semibold truncate group-hover:text-secondary transition-colors">${deal.title}</h4>
          <div class="flex items-baseline gap-2 mt-1">
            <span class="text-xl font-bold font-heading text-secondary">${deal.price.toFixed(2)} ₾</span>
            <span class="text-xs text-text-muted line-through">${deal.oldPrice.toFixed(2)} ₾</span>
          </div>
          <span class="text-[11px] text-text-muted">განვადებით ${deal.installment} ₾/თვე</span>
        </div>
      </div>

      <!-- Tactile Countdown Display -->
      <div class="pt-3 border-t border-shadow-dark/40">
        <span class="text-[11px] text-text-muted font-medium block mb-2">აქციის დასრულებამდე დარჩა:</span>
        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="bg-surface-bg rounded-xl py-1.5 tactile-inset">
            <span class="text-xl font-bold font-heading text-text-primary block leading-none" id="countdown-hours">07</span>
            <span class="text-[10px] text-text-muted uppercase">საათი</span>
          </div>
          <div class="bg-surface-bg rounded-xl py-1.5 tactile-inset">
            <span class="text-xl font-bold font-heading text-text-primary block leading-none" id="countdown-minutes">37</span>
            <span class="text-[10px] text-text-muted uppercase">წუთი</span>
          </div>
          <div class="bg-surface-bg rounded-xl py-1.5 tactile-inset">
            <span class="text-xl font-bold font-heading text-text-primary block leading-none" id="countdown-seconds">42</span>
            <span class="text-[10px] text-text-muted uppercase">წამი</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Add to Cart
function addToCart(productId, quantity = 1, event) {
  if (event) event.stopPropagation();
  
  const existingIndex = STATE.cart.findIndex(item => item.productId === productId);
  if (existingIndex > -1) {
    STATE.cart[existingIndex].quantity += quantity;
  } else {
    STATE.cart.push({ productId, quantity });
  }

  saveState();
  const prod = PRODUCTS.find(p => p.id === productId);
  showToast(`🎉 "${prod.title.substring(0, 30)}..." დაემატა კალათაში!`, 'success');
}

// Remove from Cart
function removeFromCart(productId) {
  STATE.cart = STATE.cart.filter(item => item.productId !== productId);
  saveState();
  renderCartDrawer();
  showToast('ნივთი წაიშალა კალათიდან');
}

// Update Cart Quantity
function updateCartQty(productId, delta) {
  const item = STATE.cart.find(i => i.productId === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveState();
  renderCartDrawer();
}

// Toggle Wishlist
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  const idx = STATE.wishlist.indexOf(productId);
  const prod = PRODUCTS.find(p => p.id === productId);

  if (idx > -1) {
    STATE.wishlist.splice(idx, 1);
    showToast(`სურვილების სიიდან წაიშალა "${prod.title.substring(0, 25)}..."`);
  } else {
    STATE.wishlist.push(productId);
    showToast(`❤️ დაემატა სურვილების სიაში!`, 'sale');
  }

  saveState();
  renderProducts();
  renderWishlistDrawer();
}

// Setup UI Event Listeners
function setupEventListeners() {
  // Main search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Brand search input
  const brandSearchInput = document.getElementById('brand-search-input');
  if (brandSearchInput) {
    brandSearchInput.addEventListener('input', (e) => {
      STATE.brandSearchQuery = e.target.value;
      renderBrandsGrid();
    });
  }

  // Filter category buttons
  const catButtons = document.querySelectorAll('[data-category-filter]');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category-filter');
      STATE.selectedCategory = cat;

      catButtons.forEach(b => {
        b.classList.remove('bg-primary-container', 'text-white', 'space-cosmic-glow');
        b.classList.add('bg-surface-card', 'text-text-muted', 'tactile-extruded');
      });

      btn.classList.remove('bg-surface-card', 'text-text-muted', 'tactile-extruded');
      btn.classList.add('bg-primary-container', 'text-white', 'space-cosmic-glow');

      renderProducts();
    });
  });

  // Age filter buttons
  function updateAgeButtonsUI() {
    const ageButtons = document.querySelectorAll('[data-age-filter]');
    ageButtons.forEach(btn => {
      const age = btn.getAttribute('data-age-filter');
      const isActive = (STATE.selectedAge === age);
      const iconWrap = btn.querySelector('.age-icon-wrap');
      const icon = btn.querySelector('.material-symbols-outlined');
      const title = btn.querySelector('.age-title');
      const desc = btn.querySelector('.age-desc');

      if (isActive) {
        btn.className = "group p-4 rounded-2xl bg-primary-container text-white tactile-floating flex flex-col items-center text-center space-cosmic-glow tap-effect transition-all";
        if (iconWrap) iconWrap.className = "age-icon-wrap w-14 h-14 rounded-full bg-white/10 p-2.5 flex items-center justify-center mb-2 transition-transform";
        if (icon) icon.className = "material-symbols-outlined text-[28px] text-tertiary-fixed";
        if (title) title.className = "age-title font-heading font-bold text-sm text-white";
        if (desc) desc.className = "age-desc text-xs text-white/90 font-medium";
      } else {
        btn.className = "group p-4 rounded-2xl bg-surface-bg tactile-extruded hover:tactile-floating transition-all flex flex-col items-center text-center tap-effect";
        if (iconWrap) iconWrap.className = "age-icon-wrap w-14 h-14 rounded-full bg-surface-card p-2.5 tactile-inset flex items-center justify-center mb-2 group-hover:scale-105 transition-transform";
        if (icon) {
          // Restore appropriate category icon colors
          const iconColor = age === '3-5' ? 'text-badge-yellow' : (age === '9-12' ? 'text-accent-sale' : 'text-secondary');
          icon.className = `material-symbols-outlined text-[28px] ${iconColor}`;
        }
        if (title) title.className = "age-title font-heading font-bold text-sm text-text-primary";
        if (desc) desc.className = "age-desc text-xs text-text-muted";
      }
    });
  }
  window.updateAgeButtonsUI = updateAgeButtonsUI;

  const ageButtons = document.querySelectorAll('[data-age-filter]');
  ageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const age = btn.getAttribute('data-age-filter');
      if (STATE.selectedAge === age) {
        STATE.selectedAge = 'all';
      } else {
        STATE.selectedAge = age;
      }

      updateAgeButtonsUI();
      renderProducts();
    });
  });

  // Ensure initial render matches state
  updateAgeButtonsUI();

  // Cart Button in Header
  const cartTrigger = document.getElementById('cart-trigger');
  if (cartTrigger) {
    cartTrigger.addEventListener('click', openCartDrawer);
  }

  // Wishlist Button in Header
  const wishlistTrigger = document.getElementById('wishlist-trigger');
  if (wishlistTrigger) {
    wishlistTrigger.addEventListener('click', openWishlistDrawer);
  }

  // Catalog Dropdown Trigger
  const catalogBtn = document.getElementById('catalog-dropdown-trigger');
  const catalogMenu = document.getElementById('catalog-mega-menu');
  if (catalogBtn && catalogMenu) {
    catalogBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      catalogMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!catalogMenu.contains(e.target) && !catalogBtn.contains(e.target)) {
        catalogMenu.classList.add('hidden');
      }
    });
  }

  // Mobile menu button
  const mobileMenuBtn = document.getElementById('mobile-menu-trigger');
  const mobileMenu = document.getElementById('mobile-drawer');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Reset all filters
function resetFilters() {
  STATE.selectedCategory = 'all';
  STATE.selectedAge = 'all';
  STATE.selectedBrand = 'all';
  STATE.searchQuery = '';
  STATE.brandSearchQuery = '';
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const brandSearchInput = document.getElementById('brand-search-input');
  if (brandSearchInput) brandSearchInput.value = '';

  const catButtons = document.querySelectorAll('[data-category-filter]');
  catButtons.forEach(b => {
    if (b.getAttribute('data-category-filter') === 'all') {
      b.classList.add('bg-primary-container', 'text-white', 'space-cosmic-glow');
      b.classList.remove('bg-surface-card', 'text-text-muted', 'tactile-extruded');
    } else {
      b.classList.remove('bg-primary-container', 'text-white', 'space-cosmic-glow');
      b.classList.add('bg-surface-card', 'text-text-muted', 'tactile-extruded');
    }
  });

  if (window.updateAgeButtonsUI) {
    window.updateAgeButtonsUI();
  }

  renderBrandsGrid();
  renderProducts();
}

// Quick View Modal
function openQuickView(productId, event) {
  if (event) event.stopPropagation();

  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('quickview-modal');
  const modalContent = document.getElementById('quickview-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative bg-surface-card rounded-3xl p-6 md:p-8 max-w-3xl w-full border border-white tactile-floating overflow-hidden">
      <button onclick="closeQuickView()" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-bg tactile-inset flex items-center justify-center text-text-primary hover:text-accent-sale tap-effect">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Image with Glow -->
        <div class="rounded-2xl bg-surface-bg p-6 tactile-inset flex items-center justify-center relative min-h-[280px]">
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold font-heading">
            ${prod.brand}
          </span>
          <img src="${prod.image}" alt="${prod.title}" class="max-h-64 object-contain" />
        </div>

        <!-- Details -->
        <div class="space-y-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
              <span>${prod.categoryLabel}</span>
              <span>•</span>
              <span>${prod.ageLabel}</span>
              <span>•</span>
              <span class="text-text-muted font-mono font-normal">${prod.sku}</span>
            </div>
            <h2 class="text-2xl font-bold font-heading text-text-primary">${prod.title}</h2>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1 text-badge-yellow">
              <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="font-bold text-text-primary">${prod.rating.toFixed(1)}</span>
              <span class="text-text-muted text-xs">(${prod.reviewsCount} შეფასება)</span>
            </div>
            <span class="text-xs text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> მარაგშია ონლაინ
            </span>
          </div>

          <p class="text-text-muted text-sm leading-relaxed">${prod.description}</p>

          <!-- Specs List -->
          <div class="bg-surface-bg p-3 rounded-xl tactile-inset-sm space-y-1">
            ${prod.specs.map(s => `<div class="text-xs text-text-primary flex items-center gap-1.5"><span class="text-secondary font-bold">•</span> ${s}</div>`).join('')}
          </div>

          <!-- Price & Actions -->
          <div class="pt-3 border-t border-shadow-dark/50">
            <div class="flex items-baseline gap-3 mb-4">
              <span class="text-3xl font-bold font-heading text-text-primary">${prod.price.toFixed(2)} ₾</span>
              ${prod.oldPrice ? `<span class="text-base text-text-muted line-through">${prod.oldPrice.toFixed(2)} ₾</span>` : ''}
              <span class="text-xs text-secondary font-semibold ml-auto bg-blue-50 px-2.5 py-1 rounded-full">
                0% განვადებით ${prod.installment} ₾/თვე
              </span>
            </div>

            <div class="flex items-center gap-3">
              <div class="flex items-center bg-surface-bg rounded-xl tactile-inset p-1">
                <button onclick="decrementModalQty()" class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-text-primary hover:bg-white tap-effect">-</button>
                <span id="modal-qty" class="w-10 text-center font-bold text-sm">1</span>
                <button onclick="incrementModalQty()" class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-text-primary hover:bg-white tap-effect">+</button>
              </div>

              <button onclick="addModalToCart(${prod.id})" class="flex-1 py-3 px-6 rounded-xl bg-text-primary text-white font-heading font-semibold hover:shadow-[0_0_16px_rgba(58,134,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 tap-effect">
                <span class="material-symbols-outlined text-[20px] text-tertiary-fixed">add_shopping_cart</span>
                <span>კალათაში დამატება</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

let modalQtyCount = 1;
function incrementModalQty() {
  modalQtyCount++;
  const el = document.getElementById('modal-qty');
  if (el) el.textContent = modalQtyCount;
}

function decrementModalQty() {
  if (modalQtyCount > 1) {
    modalQtyCount--;
    const el = document.getElementById('modal-qty');
    if (el) el.textContent = modalQtyCount;
  }
}

function addModalToCart(productId) {
  addToCart(productId, modalQtyCount);
  closeQuickView();
  modalQtyCount = 1;
}

// Cart Drawer
function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('translate-x-full');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('translate-x-full');
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const emptyEl = document.getElementById('cart-empty-state');
  const footerEl = document.getElementById('cart-footer');
  if (!container) return;

  if (STATE.cart.length === 0) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    if (footerEl) footerEl.classList.add('hidden');
    return;
  }

  if (emptyEl) emptyEl.classList.add('hidden');
  if (footerEl) footerEl.classList.remove('hidden');

  const total = calculateCartTotal();
  const freeShippingThreshold = 50.00;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - total);
  const freeShippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  // Free shipping bar
  const shippingMsgEl = document.getElementById('free-shipping-msg');
  const shippingBarEl = document.getElementById('free-shipping-bar');
  if (shippingMsgEl && shippingBarEl) {
    if (freeShippingRemaining === 0) {
      shippingMsgEl.innerHTML = `🎉 <strong>უფასო საკურიერო მიწოდება გააქტიურებულია!</strong>`;
      shippingBarEl.style.width = '100%';
      shippingBarEl.className = 'h-full bg-emerald-500 rounded-full transition-all duration-300';
    } else {
      shippingMsgEl.innerHTML = `დაგრჩათ <strong>${freeShippingRemaining.toFixed(2)} ₾</strong> უფასო მიწოდებამდე`;
      shippingBarEl.style.width = `${freeShippingProgress}%`;
      shippingBarEl.className = 'h-full bg-secondary rounded-full transition-all duration-300';
    }
  }

  container.innerHTML = STATE.cart.map(item => {
    const prod = PRODUCTS.find(p => p.id === item.productId);
    if (!prod) return '';

    return `
      <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-bg tactile-inset-sm">
        <div class="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
          <img src="${prod.image}" alt="${prod.title}" class="w-full h-full object-contain" />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-semibold text-text-primary truncate" title="${prod.title}">${prod.title}</h4>
          <span class="text-sm font-bold font-heading text-secondary">${(prod.price * item.quantity).toFixed(2)} ₾</span>
          <div class="flex items-center gap-2 mt-1">
            <div class="flex items-center bg-white rounded-lg tactile-inset-sm px-1.5 py-0.5">
              <button onclick="updateCartQty(${prod.id}, -1)" class="w-5 h-5 flex items-center justify-center font-bold text-xs tap-effect">-</button>
              <span class="w-6 text-center text-xs font-bold">${item.quantity}</span>
              <button onclick="updateCartQty(${prod.id}, 1)" class="w-5 h-5 flex items-center justify-center font-bold text-xs tap-effect">+</button>
            </div>
            <button onclick="removeFromCart(${prod.id})" class="text-text-muted hover:text-accent-sale ml-auto text-xs tap-effect">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Cart summary footer
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping-cost');
  const grandTotalEl = document.getElementById('cart-grand-total');

  if (subtotalEl) subtotalEl.textContent = `${total.toFixed(2)} ₾`;
  if (shippingEl) shippingEl.textContent = total >= 50 ? 'უფასო (1-2 დღე)' : '5.00 ₾';
  if (grandTotalEl) grandTotalEl.textContent = `${(total + (total >= 50 ? 0 : 5)).toFixed(2)} ₾`;
}

// Wishlist Drawer
function openWishlistDrawer() {
  renderWishlistDrawer();
  const drawer = document.getElementById('wishlist-drawer');
  if (drawer) drawer.classList.remove('translate-x-full');
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  if (drawer) drawer.classList.add('translate-x-full');
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlist-items-container');
  const emptyEl = document.getElementById('wishlist-empty-state');
  if (!container) return;

  if (STATE.wishlist.length === 0) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }

  if (emptyEl) emptyEl.classList.add('hidden');

  container.innerHTML = STATE.wishlist.map(id => {
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return '';

    return `
      <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-bg tactile-inset-sm">
        <div class="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
          <img src="${prod.image}" alt="${prod.title}" class="w-full h-full object-contain" />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-semibold text-text-primary truncate">${prod.title}</h4>
          <span class="text-sm font-bold font-heading text-text-primary">${prod.price.toFixed(2)} ₾</span>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="addToCart(${prod.id}, 1); toggleWishlist(${prod.id});" class="px-3 py-1 bg-text-primary text-white text-xs font-heading font-semibold rounded-lg tap-effect flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-tertiary-fixed">add_shopping_cart</span>
              <span>კალათაში</span>
            </button>
            <button onclick="toggleWishlist(${prod.id})" class="text-text-muted hover:text-accent-sale text-xs ml-auto tap-effect">
              წაშლა
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Checkout Flow
function openCheckout() {
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  const total = calculateCartTotal();
  const grandTotal = total >= 50 ? total : total + 5;
  const checkoutTotalEl = document.getElementById('checkout-total-display');
  if (checkoutTotalEl) checkoutTotalEl.textContent = `${grandTotal.toFixed(2)} ₾`;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeCheckout() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function submitOrder(e) {
  e.preventDefault();
  const orderNum = 'KPL-' + Math.floor(10000 + Math.random() * 90000);
  
  const modalContent = document.getElementById('checkout-form-container');
  if (modalContent) {
    modalContent.innerHTML = `
      <div class="text-center py-8 space-y-4">
        <div class="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center space-cosmic-glow">
          <span class="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h3 class="text-2xl font-bold font-heading text-text-primary">შეკვეთა მიღებულია!</h3>
        <p class="text-text-muted text-sm max-w-sm mx-auto">
          თქვენი შეკვეთის ნომერია: <strong class="text-secondary font-bold font-heading text-base">#${orderNum}</strong>.
          დეტალები და SMS დადასტურება გამოგეგზავნათ მითითებულ ნომერზე.
        </p>
        <div class="p-4 rounded-2xl bg-surface-bg tactile-inset max-w-xs mx-auto text-xs text-text-muted text-left space-y-1.5">
          <div>🚚 <strong>მიწოდება:</strong> 1-2 სამუშაო დღეში კურიერით პირდაპირ მისამართზე</div>
          <div>💳 <strong>გადახდა:</strong> შერჩეული მეთოდით</div>
          <div>📞 <strong>კურიერის ზარი:</strong> ჩაბარებამდე 30 წთ-ით ადრე</div>
        </div>
        <button onclick="finishOrder()" class="mt-4 px-8 py-3 rounded-xl bg-text-primary text-white font-heading font-semibold tap-effect">
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    `;
  }

  // Clear Cart
  STATE.cart = [];
  saveState();
}

function finishOrder() {
  closeCheckout();
  location.reload();
}

// Toast Notifications System
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'sale' ? 'toast-sale' : type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] ${type === 'sale' ? 'text-accent-sale' : type === 'success' ? 'text-emerald-500' : 'text-secondary'}">
      ${type === 'sale' ? 'favorite' : type === 'success' ? 'check_circle' : 'info'}
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Live Countdown Timer
function initCountdownTimer() {
  let hours = 7, minutes = 37, seconds = 42;
  const hEl = document.getElementById("countdown-hours");
  const mEl = document.getElementById("countdown-minutes");
  const sEl = document.getElementById("countdown-seconds");

  setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else {
      seconds = 59;
      if (minutes > 0) {
        minutes--;
      } else {
        minutes = 59;
        if (hours > 0) hours--;
      }
    }
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

// Auth Modal
function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
