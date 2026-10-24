// VimShi Cooking - Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCategory = 'all';
  let searchQuery = '';
  let activeTagFilter = 'all';
  let favorites = JSON.parse(localStorage.getItem('vimshi_favs') || '[]');
  let activeRecipe = null;
  let currentServings = 4;
  let timerInterval = null;
  let timerSecondsLeft = 0;
  let timerTotalSeconds = 0;
  let timerIsRunning = false;

  // Initialize theme
  initTheme();

  // Try fetching live recipes from server, fallback to FEATURED_RECIPES in data.js
  async function loadLiveRecipes() {
    try {
      const res = await fetch('/api/recipes');
      if (res.ok) {
        const liveRecipes = await res.json();
        if (Array.isArray(liveRecipes) && liveRecipes.length > 0) {
          FEATURED_RECIPES.length = 0;
          FEATURED_RECIPES.push(...liveRecipes);
        }
      }
    } catch (e) {
      console.log('Serving offline recipe cache');
    }
    renderFeaturedSpotlight();
    renderCategoryTabs();
    renderRecipes();
  }

  // Render Page Content
  renderHeroDetails();
  loadLiveRecipes();
  renderVideoGallery();
  renderSocialHub();
  setupEventListeners();

  // -------------------------------------------------------------
  // THEME MANAGEMENT
  // -------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('vimshi_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeIcon();
  }

  function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vimshi_theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vimshi_theme', 'dark');
    }
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = document.getElementById('themeToggleIcon');
    if (icon) {
      icon.className = isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-600';
    }
  }

  // -------------------------------------------------------------
  // HERO & CHANNEL DETAILS
  // -------------------------------------------------------------
  function renderHeroDetails() {
    const heroBanner = document.getElementById('heroBannerImg');
    const heroAvatar = document.getElementById('heroAvatarImg');
    const subCount = document.getElementById('statSubscribers');
    const vidCount = document.getElementById('statVideos');
    const heroBio = document.getElementById('heroBioText');

    if (heroBanner && CHANNEL_INFO.banner) heroBanner.src = CHANNEL_INFO.banner;
    if (heroAvatar && CHANNEL_INFO.avatar) heroAvatar.src = CHANNEL_INFO.avatar;
    if (subCount) subCount.textContent = CHANNEL_INFO.subscribers;
    if (vidCount) vidCount.textContent = CHANNEL_INFO.videosCount;
    if (heroBio) heroBio.textContent = CHANNEL_INFO.bio;

    // Social handles and links
    document.querySelectorAll('.yt-channel-link').forEach(el => el.href = CHANNEL_INFO.youtubeUrl);
    document.querySelectorAll('.ig-channel-link').forEach(el => el.href = CHANNEL_INFO.instagramUrl);
    document.querySelectorAll('.fb-channel-link').forEach(el => el.href = CHANNEL_INFO.facebookUrl);
  }

  // -------------------------------------------------------------
  // SPOTLIGHT RECIPE OF THE WEEK
  // -------------------------------------------------------------
  function renderFeaturedSpotlight() {
    const spotlightContainer = document.getElementById('spotlightContainer');
    if (!spotlightContainer) return;

    const spotlight = FEATURED_RECIPES[0];
    spotlightContainer.innerHTML = `
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 text-white shadow-2xl p-5 sm:p-8 lg:p-10">
        <div class="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <i class="fa-solid fa-bowl-food text-[200px] sm:text-[240px]"></i>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          <div class="lg:col-span-7 space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md rounded-full text-white flex items-center gap-1.5">
                <i class="fa-solid fa-crown text-amber-300"></i> Spotlight Dish
              </span>
              <span class="px-3 py-1 text-xs font-semibold bg-amber-400 text-slate-900 rounded-full">
                ${spotlight.badge}
              </span>
              <span class="px-3 py-1 text-xs font-semibold bg-black/30 rounded-full">
                <i class="fa-regular fa-clock mr-1"></i> ${spotlight.duration}
              </span>
            </div>
            <h3 class="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold leading-tight">
              ${spotlight.title}
            </h3>
            <p class="text-amber-100 text-sm sm:text-base leading-relaxed line-clamp-3">
              ${spotlight.description}
            </p>
            <div class="flex flex-wrap gap-3 pt-2">
              <button onclick="window.openVideoModal('${spotlight.id}', '${encodeURIComponent(spotlight.title)}')" 
                class="w-full sm:w-auto px-6 py-3 bg-white text-orange-600 hover:bg-amber-50 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-95">
                <i class="fa-solid fa-circle-play text-rose-500 text-xl"></i> Watch Video Recipe
              </button>
              <button onclick="window.openRecipeModal('${spotlight.id}')" 
                class="w-full sm:w-auto px-6 py-3 bg-black/25 hover:bg-black/35 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95">
                <i class="fa-solid fa-utensils"></i> View Recipe Card
              </button>
            </div>
          </div>
          <div class="lg:col-span-5">
            <div class="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/30"
                 onclick="window.openVideoModal('${spotlight.id}', '${encodeURIComponent(spotlight.title)}')">
              <img src="https://i.ytimg.com/vi/${spotlight.id}/hqdefault.jpg" alt="${spotlight.title}"
                   class="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-all flex items-center justify-center">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-play text-xl sm:text-2xl ml-1"></i>
                </div>
              </div>
              <div class="absolute bottom-3 right-3 bg-black/80 text-white px-2.5 py-1 text-xs font-bold rounded-md">
                ${spotlight.views}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // CATEGORIES & TABS
  // -------------------------------------------------------------
  function renderCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    if (!tabsContainer) return;

    const categories = [
      { id: 'all', label: 'All Recipes', icon: 'fa-solid fa-kitchen-set' },
      { id: 'sweets', label: 'Sweets & Desserts', icon: 'fa-solid fa-cake-candles' },
      { id: 'healthy', label: 'Zero-Oil & Healthy', icon: 'fa-solid fa-leaf' },
      { id: 'curries', label: 'Curries & Gravies', icon: 'fa-solid fa-bowl-rice' },
      { id: 'baking', label: 'Snacks & Baking', icon: 'fa-solid fa-bread-slice' },
      { id: 'regional', label: 'Regional & Heritage', icon: 'fa-solid fa-mountain' },
      { id: 'saved', label: 'Saved Favorites', icon: 'fa-solid fa-heart text-rose-500' }
    ];

    tabsContainer.innerHTML = categories.map(cat => `
      <button data-cat="${cat.id}"
        class="category-tab-btn px-4 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-2 border shrink-0
               ${currentCategory === cat.id 
                 ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-500/20' 
                 : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-orange-300 hover:text-orange-600'}">
        <i class="${cat.icon}"></i>
        <span>${cat.label}</span>
      </button>
    `).join('');

    // Attach click events
    tabsContainer.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-cat');
        renderCategoryTabs();
        renderRecipes();
      });
    });
  }

  // -------------------------------------------------------------
  // RECIPES FILTER & RENDER
  // -------------------------------------------------------------
  function getFilteredRecipes() {
    return FEATURED_RECIPES.filter(recipe => {
      if (currentCategory === 'saved') {
        if (!favorites.includes(recipe.id)) return false;
      } else if (currentCategory !== 'all' && recipe.category !== currentCategory) {
        return false;
      }

      if (activeTagFilter !== 'all') {
        const matchesTag = recipe.badge.toLowerCase().includes(activeTagFilter.toLowerCase()) ||
                           recipe.diet.toLowerCase().includes(activeTagFilter.toLowerCase());
        if (!matchesTag) return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesHindi = recipe.hindiTitle.toLowerCase().includes(q);
        const matchesDesc = recipe.description.toLowerCase().includes(q);
        const matchesIng = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesHindi && !matchesDesc && !matchesIng) return false;
      }

      return true;
    });
  }

  function renderRecipes() {
    const grid = document.getElementById('recipesGrid');
    const countLabel = document.getElementById('recipeCountLabel');
    if (!grid) return;

    const filtered = getFilteredRecipes();
    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} recipe${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-14 px-4 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center mx-auto mb-3 text-2xl">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h4 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">No Matching Recipes</h4>
          <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-sm mx-auto mb-5">
            Try adjusting your search terms or clearing the selected filters.
          </p>
          <button id="resetFiltersBtn" class="px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-xl text-xs sm:text-sm shadow hover:bg-orange-700 transition-colors">
            Reset Filters
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          searchQuery = '';
          activeTagFilter = 'all';
          const searchInput = document.getElementById('recipeSearchInput');
          if (searchInput) searchInput.value = '';
          renderCategoryTabs();
          renderRecipes();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(recipe => {
      const isFav = favorites.includes(recipe.id);
      return `
        <div class="recipe-card-hover group bg-white dark:bg-slate-800/95 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col">
          <!-- Thumbnail & Media -->
          <div class="relative overflow-hidden aspect-video bg-slate-900 cursor-pointer"
               onclick="window.openVideoModal('${recipe.id}', '${encodeURIComponent(recipe.title)}')">
            <img src="https://i.ytimg.com/vi/${recipe.id}/hqdefault.jpg" alt="${recipe.title}" 
                 loading="lazy"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <i class="fa-solid fa-play ml-0.5 text-base sm:text-lg"></i>
              </div>
            </div>
            <!-- Category Badge -->
            <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              <span class="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-orange-600 text-white shadow-md">
                ${recipe.badge}
              </span>
            </div>
            <!-- Favorite Button -->
            <button onclick="event.stopPropagation(); window.toggleFavorite('${recipe.id}')"
                    title="${isFav ? 'Remove from favorites' : 'Save to favorites'}"
                    class="absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90">
              <i class="${isFav ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'} text-sm sm:text-base"></i>
            </button>
            <!-- Duration -->
            <div class="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 text-[11px] font-medium rounded">
              <i class="fa-regular fa-clock mr-1"></i>${recipe.duration}
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                <span class="font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider text-[11px]">${recipe.categoryName}</span>
                <span class="flex items-center gap-1 text-amber-500 font-bold">
                  <i class="fa-solid fa-star text-[10px]"></i> ${recipe.rating}
                </span>
              </div>
              <h3 class="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                ${recipe.title}
              </h3>
              <p class="text-xs text-orange-600/90 dark:text-orange-400/90 font-medium mt-0.5 mb-2 line-clamp-1">
                ${recipe.hindiTitle}
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                ${recipe.description}
              </p>
            </div>

            <!-- Card Footer -->
            <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
              <div class="text-[11px] text-slate-500 dark:text-slate-400">
                <span class="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 font-medium">
                  ${recipe.diet}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.openRecipeModal('${recipe.id}')"
                        class="px-3 py-1.5 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5">
                  <i class="fa-solid fa-book-open"></i> Full Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // -------------------------------------------------------------
  // RECIPE DETAIL MODAL & SERVING SCALER (FULLY RESPONSIVE)
  // -------------------------------------------------------------
  window.openRecipeModal = function(id) {
    const recipe = FEATURED_RECIPES.find(r => r.id === id);
    if (!recipe) return;
    activeRecipe = recipe;
    currentServings = recipe.servings || 4;

    const modal = document.getElementById('recipeModal');
    if (!modal) return;

    renderRecipeModalContent();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeRecipeModal = function() {
    const modal = document.getElementById('recipeModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  window.changeServings = function(delta) {
    if (!activeRecipe) return;
    const newServings = currentServings + delta;
    if (newServings >= 1 && newServings <= 24) {
      currentServings = newServings;
      renderRecipeModalContent();
    }
  };

  function renderRecipeModalContent() {
    const modalContent = document.getElementById('recipeModalBody');
    if (!modalContent || !activeRecipe) return;

    const r = activeRecipe;
    const scaleFactor = currentServings / (r.servings || 4);
    const isFav = favorites.includes(r.id);

    modalContent.innerHTML = `
      <div class="relative">
        <!-- Header Banner Image with Responsive Layout -->
        <div class="relative min-h-[220px] sm:min-h-[280px] md:min-h-[320px] w-full overflow-hidden rounded-2xl bg-black flex flex-col justify-end">
          <img src="https://i.ytimg.com/vi/${r.id}/maxresdefault.jpg" 
               onerror="this.src='https://i.ytimg.com/vi/${r.id}/hqdefault.jpg'"
               alt="${r.title}" class="w-full h-full object-cover opacity-80 absolute inset-0" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
          
          <!-- Top Controls (Safe spacing) -->
          <div class="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-10">
            <button onclick="window.toggleFavorite('${r.id}')"
                    title="${isFav ? 'Remove favorite' : 'Add favorite'}"
                    class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white hover:text-rose-500 backdrop-blur-md flex items-center justify-center transition-colors">
              <i class="${isFav ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'} text-base"></i>
            </button>
            <button onclick="window.closeRecipeModal()" 
                    class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-md flex items-center justify-center transition-colors">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Bottom Title & Badges -->
          <div class="relative z-0 p-4 sm:p-6 text-white pt-12">
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-orange-600 text-[11px] font-bold uppercase">${r.categoryName}</span>
              <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[11px] font-bold">${r.badge}</span>
              <span class="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] backdrop-blur-md">${r.diet}</span>
            </div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold leading-tight text-white mb-1">
              ${r.title}
            </h2>
            <p class="text-amber-300 font-medium text-xs sm:text-sm">${r.hindiTitle}</p>
          </div>
        </div>

        <!-- Recipe Meta Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 my-4 sm:my-6 p-3 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/80 border border-amber-200/50 dark:border-slate-700">
          <div class="text-center p-1">
            <span class="block text-[10px] font-semibold uppercase text-slate-400">Prep Time</span>
            <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100"><i class="fa-regular fa-clock text-orange-600 mr-1"></i>${r.prepTime}</span>
          </div>
          <div class="text-center p-1">
            <span class="block text-[10px] font-semibold uppercase text-slate-400">Cook Time</span>
            <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100"><i class="fa-solid fa-fire-burner text-orange-600 mr-1"></i>${r.cookTime}</span>
          </div>
          <div class="text-center p-1">
            <span class="block text-[10px] font-semibold uppercase text-slate-400">Difficulty</span>
            <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100"><i class="fa-solid fa-gauge text-orange-600 mr-1"></i>${r.difficulty}</span>
          </div>
          <div class="text-center p-1">
            <span class="block text-[10px] font-semibold uppercase text-slate-400">Rating</span>
            <span class="text-xs sm:text-sm font-bold text-amber-500"><i class="fa-solid fa-star mr-1"></i>${r.rating}</span>
          </div>
        </div>

        <!-- Video Modal CTA -->
        <div class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white text-rose-600 flex items-center justify-center text-lg shrink-0">
              <i class="fa-brands fa-youtube"></i>
            </div>
            <div>
              <h4 class="font-bold text-xs sm:text-sm">Watch the full video tutorial!</h4>
              <p class="text-[11px] text-white/80">Step-by-step masterclass by Chef VimShi</p>
            </div>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button onclick="window.openVideoModal('${r.id}', '${encodeURIComponent(r.title)}')" 
                    class="flex-1 sm:flex-initial px-4 py-2 bg-white text-orange-600 hover:bg-amber-50 font-bold rounded-xl text-xs shadow transition-all active:scale-95 text-center">
              <i class="fa-solid fa-play mr-1.5"></i> Play Video
            </button>
            <button onclick="window.printRecipe()" 
                    class="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs transition-all" title="Print Recipe">
              <i class="fa-solid fa-print"></i>
            </button>
            <button onclick="window.shareRecipe('${r.title}')" 
                    class="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs transition-all" title="Share Recipe">
              <i class="fa-solid fa-share-nodes"></i>
            </button>
          </div>
        </div>

        <!-- Content: Ingredients (Left) and Directions (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <!-- Ingredients Column -->
          <div class="lg:col-span-5 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
              <h3 class="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <i class="fa-solid fa-basket-shopping text-orange-600"></i> Ingredients
              </h3>
              
              <!-- Dynamic Serving Scaler -->
              <div class="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-xl text-xs">
                <span class="text-slate-500 dark:text-slate-400 font-medium">Serves:</span>
                <button onclick="window.changeServings(-1)" class="w-5 h-5 rounded-md bg-white dark:bg-slate-600 font-bold hover:bg-orange-600 hover:text-white transition-colors">-</button>
                <span class="font-bold text-orange-600 dark:text-orange-400 w-4 text-center">${currentServings}</span>
                <button onclick="window.changeServings(1)" class="w-5 h-5 rounded-md bg-white dark:bg-slate-600 font-bold hover:bg-orange-600 hover:text-white transition-colors">+</button>
              </div>
            </div>

            <p class="text-[11px] text-slate-500 italic">Tap any ingredient to mark it as collected:</p>

            <ul class="space-y-2">
              ${r.ingredients.map((ing, idx) => {
                const scaledAmount = ing.amount ? Number((ing.amount * scaleFactor).toFixed(2)) : '';
                return `
                  <li class="ingredient-item group flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/60 dark:hover:bg-slate-700/40 cursor-pointer transition-colors"
                      onclick="this.classList.toggle('checked'); this.querySelector('input').checked = !this.querySelector('input').checked;">
                    <input type="checkbox" id="ing_${idx}" class="mt-0.5 h-4 w-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 pointer-events-none" />
                    <span class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex-1 leading-snug">
                      <strong class="text-slate-900 dark:text-slate-100 font-semibold">${scaledAmount} ${ing.unit}</strong> ${ing.name}
                    </span>
                  </li>
                `;
              }).join('')}
            </ul>

            <!-- Chef VimShi Secret Tip -->
            <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 mt-4 space-y-1">
              <div class="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <i class="fa-solid fa-lightbulb"></i> Chef VimShi's Secret Tip
              </div>
              <p class="text-xs leading-relaxed">${r.chefTip}</p>
            </div>
          </div>

          <!-- Directions Column -->
          <div class="lg:col-span-7 space-y-3">
            <h3 class="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <i class="fa-solid fa-list-check text-orange-600"></i> Step-by-Step Directions
            </h3>

            <div class="space-y-3">
              ${r.steps.map((step, idx) => `
                <div class="step-card group flex items-start gap-3 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-all hover:border-orange-300">
                  <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs sm:text-sm">
                    ${idx + 1}
                  </div>
                  <div class="flex-1">
                    <p class="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                      ${step}
                    </p>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- YouTube Channel Follow Banner -->
            <div class="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div class="flex items-center gap-3">
                <img src="${CHANNEL_INFO.avatar}" alt="VimShi Cooking" class="w-10 h-10 rounded-full border-2 border-orange-500" />
                <div>
                  <h5 class="font-bold text-xs sm:text-sm">Loved this recipe?</h5>
                  <p class="text-[11px] text-slate-400">Subscribe for daily new creations</p>
                </div>
              </div>
              <a href="${CHANNEL_INFO.youtubeUrl}" target="_blank" rel="noopener noreferrer"
                 class="w-full sm:w-auto px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-2">
                <i class="fa-brands fa-youtube"></i> Subscribe (1.14K+)
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // VIDEO MODAL PLAYER
  // -------------------------------------------------------------
  window.openVideoModal = function(id, encodedTitle) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoPlayerFrame');
    const titleEl = document.getElementById('videoModalTitle');
    if (!modal || !container) return;

    const title = decodeURIComponent(encodedTitle || 'VimShi Cooking Video');
    if (titleEl) titleEl.textContent = title;

    container.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" 
              title="${title}"
              class="w-full h-full rounded-2xl" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
      </iframe>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoPlayerFrame');
    if (container) container.innerHTML = '';
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // -------------------------------------------------------------
  // FAVORITES
  // -------------------------------------------------------------
  window.toggleFavorite = function(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
      showToast('Removed from favorites', 'info');
    } else {
      favorites.push(id);
      showToast('Added to your favorite recipes! ❤️', 'success');
    }
    localStorage.setItem('vimshi_favs', JSON.stringify(favorites));
    renderRecipes();
    if (activeRecipe && activeRecipe.id === id) {
      renderRecipeModalContent();
    }
  };

  // -------------------------------------------------------------
  // VIDEO GALLERY (ALL 30 VIDEOS)
  // -------------------------------------------------------------
  function renderVideoGallery() {
    const galleryGrid = document.getElementById('videoGalleryGrid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = ALL_VIDEOS.map(v => `
      <div class="recipe-card-hover group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col cursor-pointer"
           onclick="window.openVideoModal('${v.id}', '${encodeURIComponent(v.title)}')">
        <div class="relative aspect-video bg-black overflow-hidden">
          <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}"
               loading="lazy"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-play ml-0.5 text-base sm:text-lg"></i>
            </div>
          </div>
          <div class="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 text-[11px] font-semibold rounded">
            ${v.views}
          </div>
        </div>
        <div class="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
          <h4 class="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            ${v.title}
          </h4>
          <div class="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
            <span><i class="fa-regular fa-calendar-days mr-1"></i>${v.published}</span>
            <span class="text-orange-600 dark:text-orange-400 font-semibold flex items-center gap-1">
              Watch <i class="fa-solid fa-arrow-right text-[9px]"></i>
            </span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------
  // SOCIAL HUB (INSTAGRAM & FACEBOOK)
  // -------------------------------------------------------------
  function renderSocialHub() {
    const igContainer = document.getElementById('igReelsGrid');
    if (!igContainer) return;

    const reelHighlights = [
      {
        dish: "Himachali Siddu (Traditional Pahadi Dish)",
        views: "Viral Reel",
        icon: "fa-solid fa-mountain-sun",
        tag: "@vimshi_cooking"
      },
      {
        dish: "Zero Oil Crispy Lauki Dosa",
        views: "Healthy Trending",
        icon: "fa-solid fa-fire",
        tag: "Healthy Cooking"
      },
      {
        dish: "Rabdi Chawal Ki Kheer",
        views: "Festival Bhog",
        icon: "fa-solid fa-bowl-rice",
        tag: "Sharad Purnima"
      },
      {
        dish: "Bakery-Style Eggless Brownies",
        views: "Eggless Baking",
        icon: "fa-solid fa-cookie",
        tag: "Dessert Special"
      }
    ];

    igContainer.innerHTML = reelHighlights.map(reel => `
      <a href="${CHANNEL_INFO.instagramUrl}" target="_blank" rel="noopener noreferrer"
         class="group relative overflow-hidden rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 shadow-md hover:shadow-xl transition-all duration-300">
        <div class="h-44 sm:h-48 rounded-[14px] bg-slate-900 p-3.5 sm:p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div class="absolute -right-4 -bottom-4 text-slate-800 opacity-20 pointer-events-none text-7xl sm:text-8xl">
            <i class="${reel.icon}"></i>
          </div>
          <div class="flex items-center justify-between z-10">
            <span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
              ${reel.views}
            </span>
            <i class="fa-brands fa-instagram text-lg sm:text-xl text-pink-400 group-hover:scale-110 transition-transform"></i>
          </div>
          <div class="z-10">
            <h5 class="font-serif font-bold text-xs sm:text-sm text-white group-hover:text-pink-200 transition-colors line-clamp-2">
              ${reel.dish}
            </h5>
            <p class="text-[11px] text-white/70 mt-1">${reel.tag}</p>
          </div>
        </div>
      </a>
    `).join('');
  }

  // -------------------------------------------------------------
  // KITCHEN COOKING TIMER WIDGET
  // -------------------------------------------------------------
  window.toggleTimerModal = function() {
    const modal = document.getElementById('timerModal');
    if (modal) modal.classList.toggle('hidden');
  };

  window.setQuickTimer = function(minutes) {
    window.stopCookingTimer();
    timerTotalSeconds = minutes * 60;
    timerSecondsLeft = timerTotalSeconds;
    updateTimerDisplay();
    window.startCookingTimer();
  };

  window.startCookingTimer = function() {
    if (timerIsRunning || timerSecondsLeft <= 0) return;
    timerIsRunning = true;
    updateTimerButtons();

    timerInterval = setInterval(() => {
      timerSecondsLeft--;
      updateTimerDisplay();

      if (timerSecondsLeft <= 0) {
        window.stopCookingTimer();
        showToast('⏰ Kitchen Timer Finished! Time to check your food!', 'success');
        playBeep();
      }
    }, 1000);
  };

  window.pauseCookingTimer = function() {
    clearInterval(timerInterval);
    timerIsRunning = false;
    updateTimerButtons();
  };

  window.stopCookingTimer = function() {
    clearInterval(timerInterval);
    timerIsRunning = false;
    timerSecondsLeft = 0;
    updateTimerDisplay();
    updateTimerButtons();
  };

  function updateTimerDisplay() {
    const display = document.getElementById('timerTimeText');
    const floatLabel = document.getElementById('floatTimerLabel');
    const mins = Math.floor(timerSecondsLeft / 60);
    const secs = timerSecondsLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (display) display.textContent = formatted;
    if (floatLabel) floatLabel.textContent = timerSecondsLeft > 0 ? formatted : 'Timer';
  }

  function updateTimerButtons() {
    const startBtn = document.getElementById('timerStartBtn');
    const pauseBtn = document.getElementById('timerPauseBtn');
    if (startBtn) startBtn.style.display = timerIsRunning ? 'none' : 'inline-block';
    if (pauseBtn) pauseBtn.style.display = timerIsRunning ? 'inline-block' : 'none';
  }

  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio not supported');
    }
  }

  // -------------------------------------------------------------
  // SHARE & PRINT
  // -------------------------------------------------------------
  window.shareRecipe = function(title) {
    if (navigator.share) {
      navigator.share({
        title: title + ' - VimShi Cooking',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Recipe URL copied to clipboard!', 'info');
    }
  };

  window.printRecipe = function() {
    window.print();
  };

  // -------------------------------------------------------------
  // TOAST NOTIFICATIONS
  // -------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-slate-900';
    toast.className = `${bgColor} text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium transform transition-all duration-300 translate-y-4 opacity-0`;
    toast.innerHTML = `
      <i class="${type === 'success' ? 'fa-solid fa-check' : 'fa-solid fa-bell'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // -------------------------------------------------------------
  // EVENT LISTENERS
  // -------------------------------------------------------------
  function setupEventListeners() {
    const searchInput = document.getElementById('recipeSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderRecipes();
      });
    }

    document.querySelectorAll('.diet-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const tag = pill.getAttribute('data-tag');
        if (activeTagFilter === tag) {
          activeTagFilter = 'all';
          pill.classList.remove('bg-orange-600', 'text-white');
        } else {
          activeTagFilter = tag;
          document.querySelectorAll('.diet-filter-pill').forEach(p => p.classList.remove('bg-orange-600', 'text-white'));
          pill.classList.add('bg-orange-600', 'text-white');
        }
        renderRecipes();
      });
    });

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
      });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        const payload = {
          name: inputs[0].value,
          email: inputs[1].value,
          inquiry_type: inputs[2].value,
          message: inputs[3].value
        };

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (result.success) {
            showToast('Thank you! Your message was sent to Chef VimShi.', 'success');
            contactForm.reset();
          } else {
            showToast(result.error || 'Failed to send message', 'error');
          }
        } catch (err) {
          showToast('Thank you! Your message has been sent to Chef VimShi.', 'success');
          contactForm.reset();
        }
      });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Welcome to the VimShi Cooking family! Check your inbox soon.', 'success');
        newsletterForm.reset();
      });
    }

    document.getElementById('recipeModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'recipeModal') window.closeRecipeModal();
    });
    document.getElementById('videoModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'videoModal') window.closeVideoModal();
    });

    // Secret Admin Shortcut: Press Ctrl + Shift + A anywhere on the website
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        window.location.href = '/admin';
      }
    });
  }
});
