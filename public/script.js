// --- 1. Definición de Íconos ---
const icons = {
    ShoppingCart: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    User: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    Menu: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    X: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    Search: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    LogOut: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
    Package: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
    ChevronDown: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>`,
    Sparkles: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
    Star: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    Edit: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
    Trash: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
    MapPin: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    Phone: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    Mail: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    Clock: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    Heart: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    Target: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    Eye: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    Instagram: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
    Facebook: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    Twitter: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
    Send: (size, className = '') => `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" stroke="currentColor"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
};

// --- 2. Estado Global y Funciones de Utilidad ---
let state = {
    currentPage: 'home',
    isLoggedIn: false, 
    currentUser: null, 
    cart: [],
    menuOpen: false,
    categoryDropdownOpen: false, 
    adminMenuOpen: false, 
    carouselIndex: 0,
    carouselImages: [
        './aventus.jpg', './bleu.jpg', './Allure.jpg',
        './eternity.jpg', './guilty.jpg', './invictus.jpg',
        './L1212.jpg', './savage.jpg', './tomford.jpg'
    ],
    products: [
        { id: 1, name: 'Dior Sauvage', price: 2499, image: './savage.jpg', category: 'hombre', badge: '🔥 Best Seller', rating: 4.9 },
        { id: 2, name: 'Chanel Bleu', price: 3299, image: './bleu.jpg', category: 'mujer', badge: '👑 Icónico', rating: 5.0 },
        { id: 3, name: 'Creed Aventus', price: 4999, image: './aventus.jpg', category: 'hombre', badge: '💎 Premium', rating: 4.8 },
        { id: 4, name: 'Montblanc Explorer', price: 1899, image: './explorer.jpg', category: 'hombre', badge: '⭐ Nuevo', rating: 4.7 },
        { id: 5, name: 'Tom Ford Black Orchid', price: 3899, image: './tomford.jpg', category: 'mujer', badge: '✨ Exclusivo', rating: 4.9 },
        { id: 6, name: 'Versace Eros', price: 1999, image: './eros.jpg', category: 'hombre', badge: '🎁 Oferta', rating: 4.6 }
    ],
    users: [
        { id: 'U001', name: 'Laura García', email: 'laura.garcia@gmail.com', last_access: '22/10/2025 13:45' },
        { id: 'U002', name: 'Carlos Ruiz', email: 'carlos.ruiz@gmail.com', last_access: '22/10/2025 15:02' },
        { id: 'U003', name: 'Mariana López', email: 'mariana.lopez@gmail.com', last_access: '22/10/2025 14:10' },
    ],
    admins: [
        { id: 'A001', name: 'Luis Ángel', email: 'admin@parfum.com', privileges: 'Control total' },
        { id: 'A002', name: 'Andrea Torres', email: 'atorres@parfum.com', privileges: 'Gestión de usuarios' },
    ],
    error: null
};

let carouselInterval;

function setState(newState) {
    state = { ...state, ...newState };
    renderApp();
}

function html(strings, ...values) {
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
        result += values[i];
        result += strings[i + 1];
    }
    return result;
}

function startCarousel() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        const currentImages = state.currentPage === 'admin' ? 
            ['./savage.jpg', './eros.jpg', './explorer.jpg', './bleu.jpg', './aventus.jpg'] : 
            state.carouselImages;
        setState({ carouselIndex: (state.carouselIndex + 1) % currentImages.length });
    }, 4500);
}

// --- LÓGICA DE AUTENTICACIÓN ---
function logout() {
    setState({
        isLoggedIn: false,
        currentUser: null,
        currentPage: 'home',
        cart: [],
        error: '👋 Has cerrado sesión exitosamente.',
        categoryDropdownOpen: false,
        adminMenuOpen: false
    });
}

function handleLogin(e) {
    e.preventDefault();
    const form = document.getElementById('login-form');
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    
    if (!username || !password) {
        setState({ error: '❌ Por favor, introduce usuario y contraseña.' });
        return;
    }
    // Lógica simulada de autenticación
    if (username && password) {
        setState({
            currentUser: { name: username, role: username === 'admin' ? 'admin' : 'user' },
            isLoggedIn: true,
            currentPage: username === 'admin' ? 'admin' : 'catalog',
            error: `¡Bienvenido de nuevo, ${username}!`
        });
    }
}

function handleRegister(e) {
    e.preventDefault();
    const form = document.getElementById('register-form');
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;
    
    if (password !== confirmPassword) {
        setState({ error: '🚨 Las contraseñas no coinciden. Por favor, verifica.' });
        return;
    }
    if (name && email && password) {
        setState({
            currentUser: { name: name, role: 'user' },
            isLoggedIn: true,
            currentPage: 'catalog',
            error: `🎉 ¡Cuenta creada con éxito! Bienvenido, ${name}.`
        });
    } else {
        setState({ error: '⚠️ Por favor, completa todos los campos obligatorios.' });
    }
}

function handleContact(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const name = form.elements.contactName.value;
    const email = form.elements.contactEmail.value;
    const subject = form.elements.contactSubject.value;
    const message = form.elements.contactMessage.value;
    
    if (name && email && message) {
        setState({ error: `✅ ¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto.` });
        form.reset();
    } else {
        setState({ error: '⚠️ Por favor, completa los campos obligatorios.' });
    }
}

// --- MANEJO DEL CARRITO ---
function addToCart(product) {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
        const newCart = state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setState({ cart: newCart, error: `✅ Añadido: ¡${product.name} tiene ahora ${existing.quantity + 1} unidades!` });
    } else {
        setState({ cart: [...state.cart, { ...product, quantity: 1 }], error: `✅ ¡${product.name} añadido al carrito!` });
    }
}

function removeFromCart(productId) {
    const productToRemove = state.cart.find(item => item.id === productId);
    const newCart = state.cart.filter(item => item.id !== productId);
    setState({ cart: newCart, error: `🗑️ ${productToRemove ? productToRemove.name : 'Artículo'} eliminado.` });
}

function updateQuantity(productId, newQuantity) {
    const quantity = parseInt(newQuantity);
    const product = state.cart.find(item => item.id === productId);
    if (quantity <= 0 || isNaN(quantity)) {
        removeFromCart(productId);
    } else {
        const newCart = state.cart.map(item =>
            item.id === productId ? { ...item, quantity: quantity } : item
        );
        setState({ cart: newCart, error: `🔄 Cantidad de ${product.name} actualizada a ${quantity}.` });
    }
}

// --- 3. COMPONENTES REUTILIZABLES ---
function NotificationBanner() {
    if (!state.error) return '';
    return html` 
        <div id="notification-banner" class="notification-banner fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-3 rounded-xl shadow-2xl z-[100] 
            ${state.error.includes('❌') || state.error.includes('🚨') || state.error.includes('⚠️') || state.error.includes('🗑️') ? 'bg-red-700' : 'bg-green-600'} 
            text-white font-semibold flex items-center gap-3 border border-white/20">
            <button class="text-xl" onclick="setState({error: null})">${icons.X(18, 'text-white')}</button>
            ${state.error}
        </div>
    `;
}

function CategoryDropdown() {
    const categories = [
        { name: 'Para Hombre', page: 'catalog/hombre' },
        { name: 'Para Mujer', page: 'catalog/mujer' },
        { name: 'Nicho', page: 'catalog/nicho' },
        { name: 'Más Populares', page: 'catalog/populares' },
        { name: 'De Diseñador', page: 'catalog/disenador' }
    ];
    return html`
        <div class="relative">
            <button onclick="setState({categoryDropdownOpen: !state.categoryDropdownOpen})" 
                    class="flex items-center text-amber-200 hover:text-amber-400 transition-all font-semibold tracking-wide">
                CATEGORÍA ${icons.ChevronDown(18, 'ml-1 transition-transform ' + (state.categoryDropdownOpen ? 'rotate-180' : ''))}
            </button>
            ${state.categoryDropdownOpen ? html`
                <div class="absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 glass-dark rounded-xl shadow-2xl border border-amber-400/30 overflow-hidden z-50 animate-fadeInUp">
                    ${categories.map(cat => html`
                        <a href="#" onclick="setState({currentPage: 'catalog', categoryDropdownOpen: false})"
                           class="block px-4 py-3 text-sm text-amber-200 hover:bg-amber-500/30 transition-colors">${cat.name}</a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function AdminNavbarDropdown() {
    return html`
        <button onclick="setState({currentPage: 'admin', categoryDropdownOpen: false})" 
                class="flex items-center text-red-400 hover:text-red-500 transition-all font-bold tracking-wide">
            PANEL ADMIN
        </button>
    `;
}

function Navbar() {
    const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    const isAdmin = state.currentUser && state.currentUser.role === 'admin';
    return html`
        <header class="glass sticky top-0 z-50 border-b border-amber-400/30 shadow-2xl">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between py-4">
                    <div class="flex items-center gap-3 cursor-pointer group" onclick="setState({currentPage: state.isLoggedIn ? 'catalog' : 'home', categoryDropdownOpen: false, adminMenuOpen: false})">
                        <div class="gradient-gold p-3 rounded-2xl shadow-xl transform group-hover:rotate-12 transition-all duration-300 animate-pulse-glow">
                            ${icons.Package(30, 'text-gray-900')}
                        </div>
                        <div>
                            <span class="text-3xl font-display font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">Parfum</span>
                            <p class="text-xs text-amber-300 font-light tracking-[0.2em] uppercase">Luxury Fragrances</p>
                        </div>
                    </div>
                    <nav class="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide">
                        ${isAdmin ? AdminNavbarDropdown() : html`
                            <button onclick="setState({currentPage: 'catalog', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">CATÁLOGO</button>
                            ${CategoryDropdown()}
                            <button onclick="setState({currentPage: 'about', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">NOSOTROS</button>
                            <button onclick="setState({currentPage: 'location', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">UBICACIÓN</button>
                            <button onclick="setState({currentPage: 'contact', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">CONTACTO</button>
                        `}
                    </nav>
                    <div class="flex items-center gap-4">
                        ${!isAdmin ? html`
                            <button onclick="setState({currentPage: 'cart', menuOpen: false, categoryDropdownOpen: false})" class="relative group">
                                <div class="glass-dark p-3 rounded-xl hover:bg-amber-500/20 transition-all shadow-lg">
                                    ${icons.ShoppingCart(26, 'text-amber-300 group-hover:text-amber-400')}
                                    ${cartCount > 0 ? html`<span class="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900">${cartCount}</span>` : ''}
                                </div>
                            </button>
                        ` : ''}
                        ${state.isLoggedIn ? html`
                            <div class="flex items-center gap-2">
                                <div class="hidden md:block glass-dark p-3 rounded-xl shadow-lg">${icons.User(26, 'text-amber-300')}</div>
                                <button class="hidden md:block text-amber-100 font-medium glass-dark px-4 py-3 rounded-xl hover:bg-amber-500/20 transition-all">
                                    ${isAdmin ? 'ADMIN' : 'MI CUENTA'}
                                </button>
                            </div>
                            <button onclick="logout()" class="glass-dark p-3 rounded-xl hover:bg-red-500/20 transition-all group shadow-lg">
                                ${icons.LogOut(22, 'text-amber-300 group-hover:text-red-400')}
                            </button>
                        ` : html`
                            <div class="flex items-center gap-2">
                                <div onclick="setState({currentPage: 'login', categoryDropdownOpen: false})" class="hidden md:block glass-dark p-3 rounded-xl shadow-lg cursor-pointer hover:bg-amber-500/20 transition-all">
                                    ${icons.User(26, 'text-amber-300')}
                                </div>
                                <button onclick="setState({currentPage: 'login', categoryDropdownOpen: false})" class="gradient-gold text-gray-900 px-8 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium">
                                    INGRESAR
                                </button>
                            </div>
                        `}
                        <button class="lg:hidden glass-dark p-3 rounded-xl shadow-lg" onclick="setState({menuOpen: !state.menuOpen, categoryDropdownOpen: false})">
                            ${state.menuOpen ? icons.X(26, 'text-amber-300') : icons.Menu(26, 'text-amber-300')}
                        </button>
                    </div>
                </div>
                ${state.menuOpen ? html`
                    <div class="lg:hidden pb-4 animate-fadeInUp">
                        <nav class="flex flex-col gap-2">
                            <button onclick="setState({currentPage: 'catalog', menuOpen: false})" class="text-amber-200 hover:text-amber-400 py-2 text-left">CATÁLOGO</button>
                            <button onclick="setState({currentPage: 'about', menuOpen: false})" class="text-amber-200 hover:text-amber-400 py-2 text-left">NOSOTROS</button>
                            <button onclick="setState({currentPage: 'location', menuOpen: false})" class="text-amber-200 hover:text-amber-400 py-2 text-left">UBICACIÓN</button>
                            <button onclick="setState({currentPage: 'contact', menuOpen: false})" class="text-amber-200 hover:text-amber-400 py-2 text-left">CONTACTO</button>
                        </nav>
                    </div>
                ` : ''}
            </div>
        </header>
    `;
}

function Footer() {
    return html`
        <footer class="glass-dark border-t border-amber-400/30 mt-16">
            <div class="container mx-auto px-4 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <div class="gradient-gold p-2 rounded-xl">${icons.Package(24, 'text-gray-900')}</div>
                            <span class="text-2xl font-display font-bold text-amber-300">Parfum</span>
                        </div>
                        <p class="text-amber-200/70 text-sm">Fragancias de lujo exclusivas para quienes aprecian lo extraordinario.</p>
                    </div>
                    
                    <div>
                        <h4 class="text-amber-400 font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" onclick="setState({currentPage: 'catalog'})" class="text-amber-200/70 hover:text-amber-400 transition">Catálogo</a></li>
                            <li><a href="#" onclick="setState({currentPage: 'about'})" class="text-amber-200/70 hover:text-amber-400 transition">Quiénes Somos</a></li>
                            <li><a href="#" onclick="setState({currentPage: 'location'})" class="text-amber-200/70 hover:text-amber-400 transition">Ubicación</a></li>
                            <li><a href="#" onclick="setState({currentPage: 'contact'})" class="text-amber-200/70 hover:text-amber-400 transition">Contacto</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-amber-400 font-semibold mb-4">Contacto</h4>
                        <ul class="space-y-2 text-sm text-amber-200/70">
                            <li class="flex items-center gap-2">${icons.MapPin(16, 'text-amber-400')} Av. Reforma 123, CDMX</li>
                            <li class="flex items-center gap-2">${icons.Phone(16, 'text-amber-400')} +52 55 1234 5678</li>
                            <li class="flex items-center gap-2">${icons.Mail(16, 'text-amber-400')} info@parfum.com</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-amber-400 font-semibold mb-4">Síguenos</h4>
                        <div class="flex gap-4">
                            <a href="https://instagram.com" target="_blank" class="glass p-3 rounded-xl hover:bg-amber-500/20 transition-all group">
                                ${icons.Instagram(24, 'text-amber-300 group-hover:text-amber-400')}
                            </a>
                            <a href="https://facebook.com" target="_blank" class="glass p-3 rounded-xl hover:bg-amber-500/20 transition-all group">
                                ${icons.Facebook(24, 'text-amber-300 group-hover:text-amber-400')}
                            </a>
                            <a href="https://twitter.com" target="_blank" class="glass p-3 rounded-xl hover:bg-amber-500/20 transition-all group">
                                ${icons.Twitter(24, 'text-amber-300 group-hover:text-amber-400')}
                            </a>
                        </div>
                        <p class="text-amber-200/50 text-xs mt-4">Únete a nuestra comunidad de amantes de las fragancias.</p>
                    </div>
                </div>
                
                <div class="border-t border-amber-400/20 mt-8 pt-8 text-center">
                    <p class="text-amber-200/50 text-sm">&copy; 2025 Parfum Luxury Fragrances. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    `;
}

// =============================================
// COMPONENTES DE PÁGINA FALTANTES (Placeholders funcionales)
// =============================================

function HomePage() {
    return html`
        <div class="container mx-auto px-4 py-16 text-center">
            <h1 class="text-6xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Bienvenido a Parfum</h1>
            <p class="text-xl text-amber-200/80 mt-4 max-w-3xl mx-auto">Sumérgete en el mundo de las fragancias de lujo. Exclusividad y elegancia en cada botella.</p>
            <div id="carousel" class="mt-12">
                <div class="glass-dark rounded-3xl overflow-hidden border border-amber-400/30 h-96 flex items-center justify-center">
                    <img src="${state.carouselImages[state.carouselIndex]}" alt="Carousel Image" class="w-full h-full object-cover opacity-80 transition-opacity duration-1000"/>
                </div>
            </div>
            <button onclick="setState({currentPage: 'catalog'})" class="mt-12 gradient-gold text-gray-900 px-10 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-xl">
                ${icons.Sparkles(20, 'mr-2')} Explorar Colección
            </button>
        </div>
    `;
}

function LoginPage() {
    return html`
        <div class="flex items-center justify-center min-h-screen bg-gray-900/90 py-12">
            <div class="glass-dark p-8 md:p-12 rounded-3xl shadow-2xl border border-amber-400/30 w-full max-w-md animate-fadeInUp">
                <h2 class="text-3xl font-display font-bold text-amber-300 mb-6 text-center">Ingresar a Mi Cuenta</h2>
                <form id="login-form" onsubmit="handleLogin(event)">
                    <div class="mb-5">
                        <label for="username" class="block text-sm font-medium text-amber-300 mb-2">Usuario (o Email)</label>
                        <input type="text" id="username" name="username" required value="user" 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                               placeholder="ej: user o admin"/>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-amber-300 mb-2">Contraseña</label>
                        <input type="password" id="password" name="password" required value="12345" 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                               placeholder="********"/>
                    </div>
                    <button type="submit" class="w-full gradient-gold text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg">
                        ACCEDER
                    </button>
                </form>
                <p class="text-center text-amber-200/70 mt-6">
                    ¿No tienes cuenta? 
                    <button onclick="setState({currentPage: 'register'})" class="text-amber-400 font-bold hover:underline">Regístrate aquí</button>
                </p>
                <p class="text-xs text-center text-amber-200/50 mt-4">
                    Prueba con: user/12345 (Cliente) o admin/12345 (Admin)
                </p>
            </div>
        </div>
    `;
}

function RegisterPage() {
    return html`
        <div class="flex items-center justify-center min-h-screen bg-gray-900/90 py-12">
            <div class="glass-dark p-8 md:p-12 rounded-3xl shadow-2xl border border-amber-400/30 w-full max-w-lg animate-fadeInUp">
                <h2 class="text-3xl font-display font-bold text-amber-300 mb-6 text-center">Crear Nueva Cuenta</h2>
                <form id="register-form" onsubmit="handleRegister(event)">
                    <div class="mb-5">
                        <label for="name" class="block text-sm font-medium text-amber-300 mb-2">Nombre Completo *</label>
                        <input type="text" id="name" name="name" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                               placeholder="Ej: Juan Pérez"/>
                    </div>
                    <div class="mb-5">
                        <label for="email" class="block text-sm font-medium text-amber-300 mb-2">Correo Electrónico *</label>
                        <input type="email" id="email" name="email" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                               placeholder="tu@email.com"/>
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block text-sm font-medium text-amber-300 mb-2">Contraseña *</label>
                        <input type="password" id="password" name="password" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                               placeholder="Crea una contraseña"/>
                    </div>
                    <div class="mb-6">
                        <label for="confirmPassword" class="block text-sm font-medium text-amber-300 mb-2">Confirmar Contraseña *</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                               placeholder="Repite la contraseña"/>
                    </div>
                    <button type="submit" class="w-full gradient-gold text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg">
                        REGISTRARSE
                    </button>
                </form>
                <p class="text-center text-amber-200/70 mt-6">
                    ¿Ya tienes una cuenta? 
                    <button onclick="setState({currentPage: 'login'})" class="text-amber-400 font-bold hover:underline">Ingresa aquí</button>
                </p>
            </div>
        </div>
    `;
}

function ProductCard(product) {
    const starIcons = Array(5).fill().map((_, i) => 
        i < Math.floor(product.rating) ? icons.Star(18, 'text-yellow-400 fill-yellow-400') : 
        i < product.rating ? icons.Star(18, 'text-yellow-400 fill-current') : 
        icons.Star(18, 'text-gray-600')
    ).join('');
    
    return html`
        <div class="glass-dark rounded-2xl p-6 shadow-2xl border border-amber-400/30 flex flex-col transform hover:scale-[1.02] transition-all duration-300">
            <div class="relative mb-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover rounded-xl shadow-lg"/>
                ${product.badge ? html`<span class="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">${product.badge}</span>` : ''}
            </div>
            <h3 class="text-xl font-bold text-amber-200">${product.name}</h3>
            <p class="text-amber-300 font-semibold text-lg mt-1">$${product.price.toLocaleString('es-MX')}</p>
            <div class="flex items-center mt-2 mb-4">
                ${starIcons}
                <span class="text-sm text-amber-200/70 ml-2">(${product.rating.toFixed(1)})</span>
            </div>
            <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" 
                    class="mt-auto w-full gradient-gold text-gray-900 px-4 py-3 rounded-full font-bold shadow-md transition-all hover:ring-2 hover:ring-yellow-400 flex items-center justify-center gap-2">
                ${icons.ShoppingCart(20, 'text-gray-900')} Añadir al Carrito
            </button>
        </div>
    `;
}

function CatalogPage() {
    return html`
        <div class="container mx-auto px-4 py-16">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
                    Catálogo de Fragancias
                </h1>
                <p class="text-xl text-amber-200/80 max-w-3xl mx-auto">
                    Explora nuestra colección curada de perfumes de lujo.
                </p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                ${state.products.map(ProductCard).join('')}
            </div>
        </div>
    `;
}

function CartPage() {
    const subtotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 0 && subtotal < 2000 ? 199 : 0;
    const total = subtotal + shipping;

    if (state.cart.length === 0) {
        return html`
            <div class="container mx-auto px-4 py-32 text-center">
                <div class="glass-dark p-12 rounded-3xl max-w-xl mx-auto border border-amber-400/30">
                    ${icons.ShoppingCart(64, 'text-amber-400 mb-6 mx-auto')}
                    <h1 class="text-4xl font-display font-bold text-amber-200 mb-4">Tu Carrito Está Vacío</h1>
                    <p class="text-lg text-amber-200/70 mb-8">Parece que aún no has añadido ninguna fragancia de lujo.</p>
                    <button onclick="setState({currentPage: 'catalog'})" 
                            class="gradient-gold text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg">
                        Ir al Catálogo
                    </button>
                </div>
            </div>
        `;
    }

    return html`
        <div class="container mx-auto px-4 py-16">
            <h1 class="text-5xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-12">
                Tu Carrito de Compras
            </h1>
            
            <div class="grid lg:grid-cols-3 gap-12">
                <div class="lg:col-span-2 space-y-6">
                    ${state.cart.map(item => html`
                        <div class="glass-dark p-6 rounded-2xl border border-amber-400/30 flex items-center justify-between gap-6">
                            <div class="flex items-center gap-6">
                                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl shadow-lg"/>
                                <div>
                                    <h3 class="text-xl font-bold text-amber-200">${item.name}</h3>
                                    <p class="text-amber-300 font-semibold">$${item.price.toLocaleString('es-MX')}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-8">
                                <input type="number" min="1" value="${item.quantity}" 
                                       onchange="updateQuantity(${item.id}, this.value)"
                                       class="w-16 px-3 py-2 text-center glass rounded-xl text-white border border-amber-400/30 bg-transparent"/>
                                <p class="text-xl font-bold text-amber-400">$${(item.price * item.quantity).toLocaleString('es-MX')}</p>
                                <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-600 transition">
                                    ${icons.Trash(24, '')}
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="glass-dark p-8 rounded-3xl border border-amber-400/30 h-fit sticky top-24">
                    <h2 class="text-3xl font-display font-bold text-amber-300 mb-6">Resumen</h2>
                    <div class="space-y-4 text-amber-200/80">
                        <div class="flex justify-between border-b border-amber-400/20 pb-3">
                            <span>Subtotal:</span>
                            <span class="font-medium">$${subtotal.toLocaleString('es-MX')}</span>
                        </div>
                        <div class="flex justify-between border-b border-amber-400/20 pb-3">
                            <span>Envío (Estándar):</span>
                            <span class="font-medium ${shipping === 0 ? 'text-green-400' : ''}">
                                ${shipping === 0 ? 'GRATIS' : '$' + shipping.toLocaleString('es-MX')}
                            </span>
                        </div>
                        <div class="flex justify-between pt-4">
                            <span class="text-2xl font-bold text-amber-400">Total:</span>
                            <span class="text-2xl font-bold text-amber-400">$${total.toLocaleString('es-MX')}</span>
                        </div>
                    </div>
                    <button class="w-full mt-8 gradient-gold text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg">
                        PROCEDER AL PAGO
                    </button>
                    <div class="flex items-center justify-center gap-2 text-amber-200/70 mt-4">
                        ${icons.Sparkles(18, 'text-yellow-400')} 
                        <span class="text-sm">Envío gratis en compras mayores a $2,000</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function AdminPage() {
    const isAdmin = state.currentUser && state.currentUser.role === 'admin';

    if (!isAdmin) {
        return html`
            <div class="container mx-auto px-4 py-32 text-center">
                <div class="glass-dark p-12 rounded-3xl max-w-xl mx-auto border border-red-400/30">
                    ${icons.X(64, 'text-red-400 mb-6 mx-auto')}
                    <h1 class="text-4xl font-display font-bold text-red-300 mb-4">Acceso Denegado</h1>
                    <p class="text-lg text-amber-200/70 mb-8">Esta sección es solo para administradores. Por favor, inicia sesión como tal.</p>
                    <button onclick="setState({currentPage: 'home'})" 
                            class="bg-red-700 text-white px-8 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 text-lg">
                        Volver al Inicio
                    </button>
                </div>
            </div>
        `;
    }

    const totalUsers = state.users.length;
    const totalAdmins = state.admins.length;
    const totalProducts = state.products.length;
    const recentOrders = [
        { id: 'O005', product: 'Dior Sauvage', amount: 2499, status: 'Entregado', user: 'Laura G.' },
        { id: 'O004', product: 'Chanel Bleu', amount: 3299, status: 'Enviado', user: 'Carlos R.' },
        { id: 'O003', product: 'Creed Aventus', amount: 4999, status: 'Pendiente', user: 'Mariana L.' },
    ];

    return html`
        <div class="container mx-auto px-4 py-16">
            <h1 class="text-5xl font-display font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-12 flex items-center gap-3">
                ${icons.Eye(40, 'text-red-400')} Panel de Administración
            </h1>

            <div class="grid md:grid-cols-3 gap-8 mb-12">
                ${[
                    { title: 'Usuarios Registrados', value: totalUsers, icon: 'User', color: 'bg-green-600' },
                    { title: 'Productos en Stock', value: totalProducts, icon: 'Package', color: 'bg-blue-600' },
                    { title: 'Administradores Activos', value: totalAdmins, icon: 'Eye', color: 'bg-red-600' },
                ].map(metric => html`
                    <div class="glass-dark p-6 rounded-xl border border-red-400/30 shadow-xl">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-amber-200/70">${metric.title}</p>
                                <p class="text-4xl font-bold text-red-400 mt-1">${metric.value}</p>
                            </div>
                            <div class="${metric.color} p-3 rounded-full">
                                ${icons[metric.icon](28, 'text-white')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="grid lg:grid-cols-2 gap-12">
                <div class="glass-dark p-8 rounded-3xl border border-red-400/30">
                    <h2 class="text-2xl font-display font-bold text-red-400 mb-6">Órdenes Recientes</h2>
                    <div class="space-y-4">
                        ${recentOrders.map(order => html`
                            <div class="flex items-center justify-between p-3 rounded-lg border border-red-400/20 hover:bg-red-500/10 transition">
                                <div>
                                    <p class="font-semibold text-amber-200">${order.product} <span class="text-sm text-amber-200/70 ml-2">(${order.user})</span></p>
                                    <p class="text-sm text-amber-300 font-medium">$${order.amount.toLocaleString('es-MX')}</p>
                                </div>
                                <span class="text-xs font-bold px-3 py-1 rounded-full ${order.status === 'Entregado' ? 'bg-green-600' : order.status === 'Enviado' ? 'bg-blue-600' : 'bg-yellow-600'} text-white">
                                    ${order.status}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="glass-dark p-8 rounded-3xl border border-red-400/30">
                    <h2 class="text-2xl font-display font-bold text-red-400 mb-6">Administrar Usuarios</h2>
                    <div class="space-y-4">
                        ${state.users.slice(0, 3).map(user => html`
                            <div class="flex items-center justify-between p-3 rounded-lg border border-red-400/20 hover:bg-red-500/10 transition">
                                <div>
                                    <p class="font-semibold text-amber-200">${user.name}</p>
                                    <p class="text-sm text-amber-200/70">${user.email}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button class="text-blue-400 hover:text-blue-600 transition">${icons.Edit(18, '')}</button>
                                    <button class="text-red-400 hover:text-red-600 transition">${icons.Trash(18, '')}</button>
                                </div>
                            </div>
                        `).join('')}
                        <p class="text-center text-sm text-amber-200/50 mt-4">Mostrando 3 de ${totalUsers} usuarios.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =============================================
// ABOUT US PAGE - Quiénes Somos
// =============================================
function AboutUsPage() {
    return html`
        <div class="container mx-auto px-4 py-16">
            <div class="text-center mb-16 animate-fadeInUp">
                <h1 class="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-6">
                    Quiénes Somos
                </h1>
                <p class="text-xl text-amber-200/80 max-w-3xl mx-auto">
                    Descubre la pasión detrás de cada fragancia y conoce nuestra historia de excelencia en el mundo de la perfumería de lujo.
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div class="glass-dark p-8 rounded-3xl border border-amber-400/30 animate-fadeInUp">
                    <div class="flex items-center gap-3 mb-6">
                        ${icons.Heart(32, 'text-amber-400')}
                        <h2 class="text-3xl font-display font-bold text-amber-200">Nuestra Historia</h2>
                    </div>
                    <p class="text-amber-200/70 leading-relaxed mb-4">
                        Fundada en 2015, <strong class="text-amber-400">Parfum</strong> nació de una pasión compartida por las fragancias más exquisitas del mundo. Lo que comenzó como un pequeño emprendimiento familiar se ha convertido en el destino preferido para los conocedores de perfumes de lujo en México.
                    </p>
                    <p class="text-amber-200/70 leading-relaxed">
                        Durante casi una década, hemos curado cuidadosamente nuestra colección, viajando por el mundo para traer las fragancias más exclusivas directamente a nuestros clientes.
                    </p>
                </div>
                <div class="relative">
                    <div class="glass-dark rounded-3xl overflow-hidden border border-amber-400/30 h-80">
                        <img src="./aventus.jpg" alt="Nuestra Historia" class="w-full h-full object-cover opacity-80"/>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 mb-20">
                <div class="glass-dark p-8 rounded-3xl border border-amber-400/30 hover:border-amber-400/60 transition-all card-luxury">
                    <div class="gradient-gold w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        ${icons.Target(32, 'text-gray-900')}
                    </div>
                    <h3 class="text-2xl font-display font-bold text-amber-200 mb-4">Nuestra Misión</h3>
                    <p class="text-amber-200/70 leading-relaxed">
                        Ofrecer a nuestros clientes una experiencia única en el mundo de la perfumería, brindando acceso a las fragancias más exclusivas del mercado con un servicio personalizado y de primera clase. Nos comprometemos a ser el puente entre las grandes casas de perfumería y los amantes de las fragancias en México.
                    </p>
                </div>
                
                <div class="glass-dark p-8 rounded-3xl border border-amber-400/30 hover:border-amber-400/60 transition-all card-luxury">
                    <div class="gradient-gold w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        ${icons.Eye(32, 'text-gray-900')}
                    </div>
                    <h3 class="text-2xl font-display font-bold text-amber-200 mb-4">Nuestra Visión</h3>
                    <p class="text-amber-200/70 leading-relaxed">
                        Ser reconocidos como la boutique de perfumes de lujo líder en Latinoamérica, expandiendo nuestra presencia mientras mantenemos la esencia artesanal y el trato personalizado que nos caracteriza. Aspiramos a crear una comunidad de apasionados por las fragancias.
                    </p>
                </div>
            </div>
            
            <div class="text-center mb-12">
                <h2 class="text-4xl font-display font-bold text-amber-200 mb-4">Nuestros Valores</h2>
                <p class="text-amber-200/70">Los pilares que guían cada decisión que tomamos</p>
            </div>
            <div class="grid md:grid-cols-4 gap-6">
                ${[
                    { icon: 'Star', title: 'Excelencia', desc: 'Solo lo mejor para nuestros clientes' },
                    { icon: 'Heart', title: 'Pasión', desc: 'Amamos lo que hacemos cada día' },
                    { icon: 'User', title: 'Servicio', desc: 'Atención personalizada siempre' },
                    { icon: 'Package', title: 'Autenticidad', desc: '100% productos originales' }
                ].map(v => html`
                    <div class="glass-dark p-6 rounded-2xl border border-amber-400/20 text-center hover:border-amber-400/50 transition-all">
                        <div class="gradient-gold w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                            ${icons[v.icon](24, 'text-gray-900')}
                        </div>
                        <h4 class="text-lg font-bold text-amber-300 mb-2">${v.title}</h4>
                        <p class="text-amber-200/60 text-sm">${v.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// =============================================
// LOCATION PAGE - Ubicación
// =============================================
function LocationPage() {
    return html`
        <div class="container mx-auto px-4 py-16">
            <div class="text-center mb-16 animate-fadeInUp">
                <h1 class="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-6">
                    Nuestra Ubicación
                </h1>
                <p class="text-xl text-amber-200/80 max-w-3xl mx-auto">
                    Visítanos en nuestra boutique y vive la experiencia Parfum en persona.
                </p>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12">
                <div class="glass-dark rounded-3xl overflow-hidden border border-amber-400/30 h-96 lg:h-auto">
                    <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                        <div class="absolute inset-4 border-2 border-amber-400/20 rounded-2xl"></div>
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div class="gradient-gold p-4 rounded-full animate-pulse-glow">
                                ${icons.MapPin(48, 'text-gray-900')}
                            </div>
                        </div>
                        <div class="absolute top-1/4 left-0 right-0 h-px bg-amber-400/20"></div>
                        <div class="absolute top-3/4 left-0 right-0 h-px bg-amber-400/20"></div>
                        <div class="absolute left-1/4 top-0 bottom-0 w-px bg-amber-400/20"></div>
                        <div class="absolute left-3/4 top-0 bottom-0 w-px bg-amber-400/20"></div>
                        <p class="absolute bottom-4 left-4 text-amber-400/60 text-sm">📍 Av. Paseo de la Reforma 123</p>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div class="glass-dark p-6 rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all">
                        <div class="flex items-start gap-4">
                            <div class="gradient-gold p-3 rounded-xl">${icons.MapPin(24, 'text-gray-900')}</div>
                            <div>
                                <h3 class="text-xl font-bold text-amber-200 mb-2">Dirección</h3>
                                <p class="text-amber-200/70">Av. Paseo de la Reforma 123</p>
                                <p class="text-amber-200/70">Col. Juárez, Cuauhtémoc</p>
                                <p class="text-amber-200/70">06600, Ciudad de México</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-dark p-6 rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all">
                        <div class="flex items-start gap-4">
                            <div class="gradient-gold p-3 rounded-xl">${icons.Phone(24, 'text-gray-900')}</div>
                            <div>
                                <h3 class="text-xl font-bold text-amber-200 mb-2">Teléfono</h3>
                                <p class="text-amber-200/70">+52 55 1234 5678</p>
                                <p class="text-amber-200/70">+52 55 8765 4321</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-dark p-6 rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all">
                        <div class="flex items-start gap-4">
                            <div class="gradient-gold p-3 rounded-xl">${icons.Mail(24, 'text-gray-900')}</div>
                            <div>
                                <h3 class="text-xl font-bold text-amber-200 mb-2">Correo Electrónico</h3>
                                <p class="text-amber-200/70">info@parfum.com</p>
                                <p class="text-amber-200/70">ventas@parfum.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-dark p-6 rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all">
                        <div class="flex items-start gap-4">
                            <div class="gradient-gold p-3 rounded-xl">${icons.Clock(24, 'text-gray-900')}</div>
                            <div>
                                <h3 class="text-xl font-bold text-amber-200 mb-2">Horario de Atención</h3>
                                <p class="text-amber-200/70">Lunes a Viernes: 10:00 - 20:00</p>
                                <p class="text-amber-200/70">Sábado: 11:00 - 19:00</p>
                                <p class="text-amber-200/70">Domingo: 12:00 - 18:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =============================================
// CONTACT PAGE - Contacto
// =============================================
function ContactPage() {
    return html`
        <div class="container mx-auto px-4 py-16">
            <div class="text-center mb-16 animate-fadeInUp">
                <h1 class="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-6">
                    Contáctanos
                </h1>
                <p class="text-xl text-amber-200/80 max-w-3xl mx-auto">
                    ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
                </p>
            </div>
            
            <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div class="glass-dark p-8 rounded-3xl border border-amber-400/30 animate-fadeInUp">
                    <h2 class="text-2xl font-display font-bold text-amber-200 mb-6">Envíanos un Mensaje</h2>
                    <form id="contact-form" onsubmit="handleContact(event)">
                        <div class="mb-5">
                            <label for="contactName" class="block text-sm font-medium text-amber-300 mb-2">Nombre Completo *</label>
                            <input type="text" id="contactName" name="contactName" required 
                                   class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                                   placeholder="Tu nombre"/>
                        </div>
                        <div class="mb-5">
                            <label for="contactEmail" class="block text-sm font-medium text-amber-300 mb-2">Correo Electrónico *</label>
                            <input type="email" id="contactEmail" name="contactEmail" required 
                                   class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition" 
                                   placeholder="tu@email.com"/>
                        </div>
                        <div class="mb-5">
                            <label for="contactSubject" class="block text-sm font-medium text-amber-300 mb-2">Asunto</label>
                            <select id="contactSubject" name="contactSubject" 
                                    class="w-full px-4 py-3 glass rounded-xl outline-none text-white focus:border-amber-400 border border-amber-400/30 transition bg-transparent">
                                <option value="general" class="bg-gray-900">Consulta General</option>
                                <option value="productos" class="bg-gray-900">Información de Productos</option>
                                <option value="pedidos" class="bg-gray-900">Estado de Pedido</option>
                                <option value="devoluciones" class="bg-gray-900">Devoluciones</option>
                                <option value="colaboraciones" class="bg-gray-900">Colaboraciones</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label for="contactMessage" class="block text-sm font-medium text-amber-300 mb-2">Mensaje *</label>
                            <textarea id="contactMessage" name="contactMessage" rows="5" required 
                                      class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 border border-amber-400/30 transition resize-none" 
                                      placeholder="Escribe tu mensaje aquí..."></textarea>
                        </div>
                        <button type="submit" class="w-full gradient-gold text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg flex items-center justify-center gap-2">
                            ${icons.Send(20, 'text-gray-900')} Enviar Mensaje
                        </button>
                    </form>
                </div>
                
                <div class="space-y-6">
                    <div class="glass-dark p-8 rounded-3xl border border-amber-400/30">
                        <h3 class="text-2xl font-display font-bold text-amber-200 mb-4">Información de Contacto</h3>
                        <div class="space-y-4">
                            <div class="flex items-center gap-4">
                                <div class="gradient-gold p-2 rounded-lg">${icons.Mail(20, 'text-gray-900')}</div>
                                <div>
                                    <p class="text-amber-300 font-medium">Email</p>
                                    <p class="text-amber-200/70">info@parfum.com</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="gradient-gold p-2 rounded-lg">${icons.Phone(20, 'text-gray-900')}</div>
                                <div>
                                    <p class="text-amber-300 font-medium">Teléfono</p>
                                    <p class="text-amber-200/70">+52 55 1234 5678</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="gradient-gold p-2 rounded-lg">${icons.Clock(20, 'text-gray-900')}</div>
                                <div>
                                    <p class="text-amber-300 font-medium">Horario de Atención</p>
                                    <p class="text-amber-200/70">Lun - Vie: 10:00 - 20:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-dark p-8 rounded-3xl border border-amber-400/30">
                        <h3 class="text-2xl font-display font-bold text-amber-200 mb-4">Síguenos</h3>
                        <p class="text-amber-200/70 mb-6">Mantente al día con nuestras últimas novedades y ofertas exclusivas.</p>
                        <div class="flex gap-4">
                            <a href="https://instagram.com" target="_blank" class="glass p-4 rounded-xl hover:bg-amber-500/20 transition-all group flex items-center gap-2">
                                ${icons.Instagram(24, 'text-amber-300 group-hover:text-amber-400')}
                                <span class="text-amber-200/70 group-hover:text-amber-400">Instagram</span>
                            </a>
                            <a href="https://facebook.com" target="_blank" class="glass p-4 rounded-xl hover:bg-amber-500/20 transition-all group flex items-center gap-2">
                                ${icons.Facebook(24, 'text-amber-300 group-hover:text-amber-400')}
                                <span class="text-amber-200/70 group-hover:text-amber-400">Facebook</span>
                            </a>
                        </div>
                    </div>
                    
                    <div class="glass-dark p-8 rounded-3xl border border-amber-400/30">
                        <h3 class="text-2xl font-display font-bold text-amber-200 mb-4">Preguntas Frecuentes</h3>
                        <ul class="space-y-3 text-amber-200/70">
                            <li class="flex items-start gap-2">
                                <span class="text-amber-400">•</span>
                                <span>Tiempo de respuesta: 24-48 horas hábiles</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-amber-400">•</span>
                                <span>Envíos a toda la República Mexicana</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-amber-400">•</span>
                                <span>Garantía de autenticidad en todos los productos</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =============================================
// FUNCIÓN RENDERAPP COMPLETA
// =============================================

function renderApp() {
    clearInterval(carouselInterval);
    
    const appContainer = document.getElementById('app-container');
    let pageContent = '';

    if (state.categoryDropdownOpen || state.adminMenuOpen) {
        state.menuOpen = false;
    }

    switch (state.currentPage) {
        case 'home':
            pageContent = HomePage();
            break;
        case 'login':
            pageContent = LoginPage();
            break;
        case 'register':
            pageContent = RegisterPage();
            break;
        case 'catalog':
            pageContent = CatalogPage();
            break;
        case 'cart':
            pageContent = CartPage();
            break;
        case 'admin':
            pageContent = AdminPage();
            break;
        case 'about':
            pageContent = AboutUsPage();
            break;
        case 'location':
            pageContent = LocationPage();
            break;
        case 'contact':
            pageContent = ContactPage();
            break;
        default:
            pageContent = HomePage();
    }

    // Login y Register sin navbar ni footer
    if (state.currentPage === 'login' || state.currentPage === 'register') {
        appContainer.innerHTML = NotificationBanner() + pageContent;
    } 
    // Admin sin footer
    else if (state.currentPage === 'admin') {
        appContainer.innerHTML = NotificationBanner() + Navbar() + '<main class="pb-16">' + pageContent + '</main>';
    }
    // Resto de páginas con navbar Y footer
    else {
        appContainer.innerHTML = NotificationBanner() + Navbar() + '<main class="pb-16">' + pageContent + '</main>' + Footer();
    }

    if (state.currentPage === 'home' || state.currentPage === 'admin') {
        startCarousel();
    }
}

window.onload = function() {
    renderApp();
};
