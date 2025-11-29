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
};

// --- 2. Estado Global y Funciones de Utilidad ---
let state = {
    currentPage: 'home',
    // Configuración inicial (desconectado)
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
    // Datos para probar el panel de administración
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
            ['/savage.jpg', '/eros.jpg', '/explorer.jpg', '/bleu.jpg', '/aventus.jpg'] : 
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

    // Aqui simulamos el login exitoso, aun no sirve
    if (username && password) {
        // Si el usuario es 'admin', asignará el rol 'admin'
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
        setState({ error: '🚨 Las contraseñas no es igual. Por favor, verificalo.' });
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

// --- MANEJO DEL CARRITO ---
function addToCart(product) {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
        const newCart = state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setState({ cart: newCart, error: `✅ Añadido: ¡${product.name} tiene ahora ${existing.quantity + 1} unidades en tu carrito!` });
    } else {
        setState({ cart: [...state.cart, { ...product, quantity: 1 }], error: `✅ ¡${product.name} ha sido añadido a tu carrito!` });
    }
}

function removeFromCart(productId) {
    const productToRemove = state.cart.find(item => item.id === productId);
    const newCart = state.cart.filter(item => item.id !== productId);
    setState({ cart: newCart, error: `🗑️ ${productToRemove ? productToRemove.name : 'Un artículo'} fue eliminado del carrito.` });
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
            <button class="text-xl" onclick="setState({error: null})">
                ${icons.X(18, 'text-white')}
            </button>
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
                        <a href="#" 
                           onclick="setState({currentPage: 'catalog', categoryDropdownOpen: false}); /* Aquí se podría añadir lógica para filtrar por: ${cat.name} */"
                           class="block px-4 py-3 text-sm text-amber-200 hover:bg-amber-500/30 transition-colors">
                            ${cat.name}
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function AdminNavbarDropdown() {
    // Este es solo un enlace simple para el panel en la navbar principal
    return html`
        <button onclick="setState({currentPage: 'admin', categoryDropdownOpen: false, adminMenuOpen: false})" 
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
                            <button onclick="setState({currentPage: 'about', categoryDropdownOpen: false, adminMenuOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">QUIÉNES SOMOS</button>
                            <button onclick="setState({currentPage: 'catalog', categoryDropdownOpen: false, adminMenuOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">CATÁLOGO</button>
                            ${CategoryDropdown()}
                            <button onclick="setState({currentPage: 'location', categoryDropdownOpen: false, adminMenuOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">UBICACIÓN</button>
                            <button onclick="setState({currentPage: 'contact', categoryDropdownOpen: false, adminMenuOpen: false})" class="text-amber-200 hover:text-amber-400 transition-all">CONTACTO</button>
                        `}
                    </nav>

                    <div class="flex items-center gap-4">
                        ${!isAdmin ? html`
                            <button onclick="setState({currentPage: 'cart', menuOpen: false, categoryDropdownOpen: false, adminMenuOpen: false})" class="relative group">
                                <div class="glass-dark p-3 rounded-xl hover:bg-amber-500/20 transition-all shadow-lg">
                                    ${icons.ShoppingCart(26, 'text-amber-300 group-hover:text-amber-400')}
                                    ${cartCount > 0 ? html`
                                        <span class="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900">
                                            ${cartCount}
                                        </span>
                                    ` : ''}
                                </div>
                            </button>
                        ` : ''}
                        
                        ${state.isLoggedIn ? html`
                            <div class="flex items-center gap-2">
                                <div class="hidden md:block glass-dark p-3 rounded-xl shadow-lg">
                                    ${icons.User(26, 'text-amber-300')}
                                </div>
                                <button class="hidden md:block text-amber-100 font-medium glass-dark px-4 py-3 rounded-xl hover:bg-amber-500/20 transition-all">
                                    ${isAdmin ? 'ADMIN' : 'MI CUENTA'}
                                </button>
                            </div>

                            <button onclick="logout()" class="glass-dark p-3 rounded-xl hover:bg-red-500/20 transition-all group shadow-lg">
                                ${icons.LogOut(22, 'text-amber-300 group-hover:text-red-400')}
                            </button>
                        ` : html`
                            <div class="flex items-center gap-2">
                                <div onclick="setState({currentPage: 'login', categoryDropdownOpen: false, adminMenuOpen: false})" class="hidden md:block glass-dark p-3 rounded-xl shadow-lg cursor-pointer hover:bg-amber-500/20 transition-all">
                                    ${icons.User(26, 'text-amber-300')}
                                </div>
                                <button onclick="setState({currentPage: 'login', categoryDropdownOpen: false, adminMenuOpen: false})" class="gradient-gold text-gray-900 px-8 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium">
                                    INGRESAR
                                </button>
                            </div>
                        `}
                        <button class="lg:hidden glass-dark p-3 rounded-xl shadow-lg" onclick="setState({menuOpen: !state.menuOpen, categoryDropdownOpen: false, adminMenuOpen: false})">
                            ${state.menuOpen ? icons.X(26, 'text-amber-300') : icons.Menu(26, 'text-amber-300')}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}

function Carousel() {
    const is_admin = state.currentPage === 'admin';
    const images = is_admin ? 
        ['tomford.jpg', 'explorer.jpg', 'savage.jpg', 'eternity.jpg', 'aventus.jpg'] : 
        state.carouselImages;
    const current = state.carouselIndex % images.length;
    const currentImage = images[current];
    const heightClass = is_admin ? 'h-96' : 'h-96 lg:h-[500px]';

    return html`
        <div class="relative overflow-hidden w-full ${heightClass} shadow-2xl glass-dark">
            <div class="w-full h-full transition-opacity duration-1000 ease-in-out" style="background-image: url('${currentImage}'); background-size: cover; background-position: center;">
                <div class="absolute inset-0 bg-black/${is_admin ? '60' : '50'} flex flex-col justify-center items-center text-center p-8">
                    <div class="animate-fadeInUp">
                        <span class="text-amber-400 font-display text-4xl md:text-6xl font-bold mb-4 tracking-wider">${is_admin ? 'PANEL DE ADMINISTRACIÓN' : (current === 0 ? 'Dior Sauvage' : 'Fragancias Exclusivas')}</span>
                        <p class="text-amber-200 text-lg md:text-xl max-w-2xl mx-auto mt-4 mb-8">
                            ${is_admin ? 'Control total sobre usuarios, inventario y ventas.' : (current === 0 ? 'Una fragancia icónica y salvaje.' : 'Cada perfume es una historia de arte y seducción.')}
                        </p>
                        ${!is_admin ? html`
                            <a href="#" onclick="setState({currentPage: 'catalog'})" class="gradient-gold text-gray-900 px-10 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium">
                                VER COLECCIÓN
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>

            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                ${images.map((_, index) => html`
                    <button onclick="setState({carouselIndex: ${index}})" class="w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-amber-400 w-6' : 'bg-white/50 hover:bg-white'}"></button>
                `).join('')}
            </div>
        </div>
    `;
}

function ProductCard(product) {
    const { id, name, price, image, badge, rating } = product;
    const productJsonString = JSON.stringify(product).replace(/"/g, "'");

    return html`
        <div class="card-luxury glass-dark rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center border-2 border-amber-400/20 hover:border-amber-400/60 transition-all duration-500">
            <div class="relative w-full h-64 overflow-hidden rounded-2xl mb-4">
                <img src="${image}" alt="${name}" class="w-full h-full object-cover transform image-hover" />
                <span class="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">${badge}</span>
            </div>
            
            <h3 class="font-display text-2xl font-bold text-amber-200 mb-2">${name}</h3>
            <div class="flex items-center mb-3">
                ${[...Array(5)].map((_, i) => icons.Star(18, i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-600')).join('')}
                <span class="text-amber-400 ml-2 text-sm">(${rating})</span>
            </div>
            <p class="text-3xl font-bold gradient-gold bg-clip-text text-transparent mb-4">$${price.toLocaleString('es-MX')}</p>
            
            <button onclick="addToCart(${productJsonString})" class="w-full gradient-gold text-gray-900 px-8 py-3 rounded-full font-bold shadow-xl transition-all btn-premium text-lg">
                ${icons.ShoppingCart(20, 'text-gray-900 mr-2')} Añadir al Carrito
            </button>
        </div>
    `;
}

function ProductList() {
    return html`
        <section class="container mx-auto px-4 py-16">
            <h2 class="text-5xl font-display font-extrabold text-center mb-12 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent animate-fadeInUp">
                ✨ Fragancias Exclusivas
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                ${state.products.map(ProductCard).join('')}
            </div>
        </section>
    `;
}

// --- 4. PÁGINAS DE CLIENTE ---

function HomePage() { 
    return html`
        ${Carousel()}
        ${ProductList()}
    `;
}

function LoginPage() {
    return html`
        <div class="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
            <div class="glass-dark w-full max-w-md p-8 rounded-3xl shadow-2xl border border-amber-400/30 animate-fadeInUp">
                <h2 class="text-4xl font-display font-bold text-center text-amber-200 mb-6">Iniciar Sesión</h2>
                <form id="login-form" onsubmit="handleLogin(event)">
                    <div class="mb-5">
                        <label for="username" class="block text-sm font-medium text-amber-300 mb-2">Usuario (Prueba con 'admin' para entrar a administrador)</label>
                        <input type="text" id="username" name="username" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <div class="mb-8">
                        <label for="password" class="block text-sm font-medium text-amber-300 mb-2">Contraseña</label>
                        <input type="password" id="password" name="password" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <button type="submit" class="w-full gradient-gold text-gray-900 px-8 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg">
                        INGRESAR
                    </button>
                </form>
                <p class="text-center text-amber-300 mt-6">
                    ¿No tienes cuenta? <a href="#" onclick="setState({currentPage: 'register'})" class="text-amber-400 hover:text-amber-500 font-semibold underline">Regístrate</a>
                </p>
            </div>
        </div>
    `;
}

function RegisterPage() {
    return html`
        <div class="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
            <div class="glass-dark w-full max-w-md p-8 rounded-3xl shadow-2xl border border-amber-400/30 animate-fadeInUp">
                <h2 class="text-4xl font-display font-bold text-center text-amber-200 mb-6">Crear Cuenta</h2>
                <form id="register-form" onsubmit="handleRegister(event)">
                    <div class="mb-5">
                        <label for="name" class="block text-sm font-medium text-amber-300 mb-2">Nombre</label>
                        <input type="text" id="name" name="name" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <div class="mb-5">
                        <label for="email" class="block text-sm font-medium text-amber-300 mb-2">Email</label>
                        <input type="email" id="email" name="email" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block text-sm font-medium text-amber-300 mb-2">Contraseña</label>
                        <input type="password" id="password" name="password" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <div class="mb-8">
                        <label for="confirmPassword" class="block text-sm font-medium text-amber-300 mb-2">Confirmar Contraseña</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <button type="submit" class="w-full gradient-gold text-gray-900 px-8 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg">
                        CREAR CUENTA
                    </button>
                </form>
                <p class="text-center text-amber-300 mt-6">
                    ¿Ya tienes cuenta? <a href="#" onclick="setState({currentPage: 'login'})" class="text-amber-400 hover:text-amber-500 font-semibold underline">Ingresa aquí</a>
                </p>
            </div>
        </div>
    `;
}

function CatalogPage() { return ProductList(); }

function CartPage() {
    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    if (state.cart.length === 0) {
        return html`<div class="p-16 text-center text-amber-200 min-h-[50vh]">
            <h1 class="text-6xl font-display font-bold mb-6 text-amber-400">🛒 Carrito Vacío</h1>
            <p class="text-xl">Parece que aún no has encontrado tu fragancia perfecta. ¡Explora el catálogo!</p>
            <button onclick="setState({currentPage: 'catalog'})" class="mt-8 gradient-gold text-gray-900 px-10 py-4 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium">
                IR AL CATÁLOGO
            </button>
        </div>`;
    }

    return html`
        <div class="container mx-auto px-4 py-16">
            <h1 class="text-5xl font-display font-extrabold text-center mb-12 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent animate-fadeInUp">
                Tu Carrito de Lujo (${totalItems} artículos)
            </h1>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div class="lg:col-span-2 space-y-6">
                    ${state.cart.map(item => html`
                        <div class="glass-dark p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between border-2 border-amber-400/20">
                            <div class="flex items-center gap-6 w-full">
                                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl shadow-lg"/>
                                <div class="flex-1">
                                    <h3 class="text-xl font-display font-bold text-amber-200">${item.name}</h3>
                                    <p class="text-sm text-amber-300/70">Precio unitario: $${item.price.toLocaleString('es-MX')}</p>
                                </div>
                                <div class="flex items-center gap-4 mt-4 md:mt-0">
                                    <input type="number" 
                                           value="${item.quantity}" 
                                           min="1" 
                                           onchange="updateQuantity(${item.id}, this.value)"
                                           class="w-16 text-center bg-gray-900 text-amber-200 border border-amber-400/50 rounded-lg p-2 focus:ring-amber-400 focus:border-amber-400" />
                                    
                                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-400 transition">
                                        ${icons.X(24, 'text-red-500')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="lg:col-span-1 glass-dark p-8 rounded-2xl shadow-2xl sticky top-24 h-fit border-2 border-amber-400/30">
                    <h2 class="text-3xl font-display font-bold text-amber-200 mb-6 border-b border-amber-400/50 pb-4">Resumen de Compra</h2>
                    
                    <div class="space-y-3 text-lg text-amber-300">
                        <div class="flex justify-between">
                            <span>Subtotal (${totalItems} artículos):</span>
                            <span class="font-semibold">$${total.toLocaleString('es-MX')}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Envío (Estándar):</span>
                            <span class="font-semibold text-green-400">¡GRATIS!</span>
                        </div>
                        <div class="flex justify-between pt-4 border-t border-amber-400/30 text-2xl font-extrabold text-amber-100">
                            <span>Total:</span>
                            <span>$${total.toLocaleString('es-MX')}</span>
                        </div>
                    </div>

                    <button class="w-full mt-8 gradient-gold text-gray-900 px-8 py-4 rounded-full font-bold shadow-2xl transition-all btn-premium text-lg">
                        FINALIZAR COMPRA
                    </button>
                </div>
            </div>
        </div>
    `;
}

// --- NUEVAS PÁGINAS AGREGADAS ---

function AboutUsPage() {
    return html`
        <div class="container mx-auto px-4 py-16 text-amber-200 min-h-[50vh] animate-fadeInUp">
            <h1 class="text-5xl font-display font-extrabold text-center mb-12 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Quiénes Somos
            </h1>
            <div class="glass-dark p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-amber-400/30">
                <p class="text-xl mb-6">
                    **Parfum** nació de la pasión por capturar la esencia de la elegancia y el lujo en cada gota. Creemos que una fragancia es más que un aroma; es una declaración de identidad.
                </p>
                <h3 class="text-3xl font-display font-bold text-amber-400 mt-8 mb-4">Nuestra Misión</h3>
                <p class="mb-4">
                    Ofrecer una curada selección de las fragancias más exclusivas y duraderas del mundo, asegurando una experiencia de compra tan exquisita como nuestros perfumes.
                </p>
                <h3 class="text-3xl font-display font-bold text-amber-400 mt-8 mb-4">Nuestra Visión</h3>
                <p>
                    Ser el destino en línea de referencia para los conocedores de perfumes de nicho y de diseñador en Latinoamérica.
                </p>
            </div>
        </div>
    `;
}

function LocationPage() {
    return html`
        <div class="container mx-auto px-4 py-16 text-amber-200 min-h-[50vh] animate-fadeInUp">
            <h1 class="text-5xl font-display font-extrabold text-center mb-12 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Nuestra Ubicación
            </h1>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                <div class="glass-dark p-8 rounded-3xl shadow-2xl border border-amber-400/30">
                    <h3 class="text-3xl font-display font-bold text-amber-400 mb-4">Oficina Central</h3>
                    <p class="mb-4">
                        📍 **Dirección:** Av. Perfume Dorado #123, Col. Lujo, CDMX, México.
                    </p>
                    <p class="mb-4">
                        📞 **Teléfono:** (55) 5555-5555
                    </p>
                    <p class="mb-4">
                        📧 **Email:** info@parfum.com
                    </p>
                    <p class="text-sm text-amber-300/70 mt-6">
                        (Nota: La tienda es exclusivamente en línea, esta es nuestra dirección administrativa.)
                    </p>
                </div>
                <div class="glass-dark p-2 rounded-3xl shadow-2xl border border-amber-400/30">
                    <div class="w-full h-80 rounded-2xl bg-gray-900 flex items-center justify-center text-amber-400 font-bold text-xl">
                        
                        Mapa de Ubicación Simulado
                    </div>
                </div>
            </div>
        </div>
    `;
}

function ContactPage() {
    return html`
        <div class="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 animate-fadeInUp">
            <div class="glass-dark w-full max-w-xl p-8 rounded-3xl shadow-2xl border border-amber-400/30">
                <h2 class="text-4xl font-display font-bold text-center text-amber-200 mb-6">Contáctanos</h2>
                <form onsubmit="event.preventDefault(); setState({error: '✅ Mensaje enviado con éxito. Te responderemos pronto.', currentPage: 'home'})">
                    <div class="mb-5">
                        <label for="contact-name" class="block text-sm font-medium text-amber-300 mb-2">Nombre Completo</label>
                        <input type="text" id="contact-name" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <div class="mb-5">
                        <label for="contact-email" class="block text-sm font-medium text-amber-300 mb-2">Correo Electrónico</label>
                        <input type="email" id="contact-email" required 
                               class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition" />
                    </div>
                    <div class="mb-8">
                        <label for="contact-message" class="block text-sm font-medium text-amber-300 mb-2">Mensaje</label>
                        <textarea id="contact-message" rows="4" required
                                  class="w-full px-4 py-3 glass rounded-xl outline-none text-white placeholder-amber-400/50 focus:border-amber-400 transition"></textarea>
                    </div>
                    <button type="submit" class="w-full gradient-gold text-gray-900 px-8 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 btn-premium text-lg">
                        ENVIAR MENSAJE
                    </button>
                </form>
            </div>
        </div>
    `;
}

// --- Footer con Redes Sociales ---

function Footer() {
    // Definimos los iconos para las redes sociales (simulando que tenemos más iconos SVG)
    const SocialIcons = {
        Instagram: (size, className = '') => icons.Sparkles(size, className), 
        Facebook: (size, className = '') => icons.User(size, className), 
        Twitter: (size, className = '') => icons.Package(size, className), 
    };

    return html`
        <footer class="glass mt-16 border-t border-amber-400/30 shadow-2xl">
            <div class="container mx-auto px-4 py-12">
                <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    
                    <div class="mb-6 md:mb-0">
                        <span class="text-2xl font-display font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">Parfum</span>
                        <p class="text-sm text-amber-300/80 mt-1">© 2025 Parfum. Todos los derechos reservados.</p>
                    </div>

                    <nav class="flex flex-wrap justify-center gap-6 text-sm font-semibold mb-6 md:mb-0">
                        <button onclick="setState({currentPage: 'about', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-colors">Quiénes Somos</button>
                        <button onclick="setState({currentPage: 'location', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-colors">Ubicación</button>
                        <button onclick="setState({currentPage: 'contact', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-colors">Contacto</button>
                        <button onclick="setState({currentPage: 'login', categoryDropdownOpen: false})" class="text-amber-200 hover:text-amber-400 transition-colors">Mi Cuenta</button>
                    </nav>

                    <div class="flex gap-4">
                        <a href="https://instagram.com" target="_blank" class="glass-dark p-3 rounded-full hover:bg-amber-500/20 transition-all shadow-lg group">
                            ${SocialIcons.Instagram(20, 'text-amber-300 group-hover:text-amber-400')}
                        </a>
                        <a href="https://facebook.com" target="_blank" class="glass-dark p-3 rounded-full hover:bg-amber-500/20 transition-all shadow-lg group">
                            ${SocialIcons.Facebook(20, 'text-amber-300 group-hover:text-amber-400')}
                        </a>
                        <a href="https://twitter.com" target="_blank" class="glass-dark p-3 rounded-full hover:bg-amber-500/20 transition-all shadow-lg group">
                            ${SocialIcons.Twitter(20, 'text-amber-300 group-hover:text-amber-400')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// --- 5. PÁGINA DE ADMINISTRADOR ---

function UserControlTable(title, users, isUserTable) {
    return html`
        <section class="container mx-auto px-4 py-12" id="${isUserTable ? 'activos' : 'admins'}">
            <h2 class="text-4xl font-display font-bold text-center mb-8 text-amber-200">${title}</h2>
            <div class="overflow-x-auto glass-dark rounded-xl shadow-2xl border border-amber-400/30">
                <table class="w-full text-sm text-left admin-table">
                    <thead class="text-xs uppercase">
                        <tr>
                            <th scope="col" class="py-3 px-6">${isUserTable ? 'ID Usuario' : 'ID Admin'}</th>
                            <th scope="col" class="py-3 px-6">Nombre</th>
                            <th scope="col" class="py-3 px-6">Correo</th>
                            <th scope="col" class="py-3 px-6">${isUserTable ? 'Último acceso' : 'Privilegios'}</th>
                            <th scope="col" class="py-3 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => html`
                            <tr class="border-b border-amber-400/20 transition-all hover:bg-amber-400/10">
                                <td class="py-4 px-6 font-medium text-amber-100">${isUserTable ? user.id : user.id}</td>
                                <td class="py-4 px-6">${user.name}</td>
                                <td class="py-4 px-6">${user.email}</td>
                                <td class="py-4 px-6">${isUserTable ? user.last_access : user.privileges}</td>
                                <td class="py-4 px-6 space-x-2">
                                    <button class="btn btn-edit bg-green-600 hover:bg-green-700 p-2 rounded-full shadow-md transition-all">
                                        ${icons.Edit(18, 'text-white')}
                                    </button>
                                    <button class="btn btn-delete bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-md transition-all">
                                        ${icons.Trash(18, 'text-white')}
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

function AdminPage() {
    if (!state.currentUser || state.currentUser.role !== 'admin') {
        return html`<div class="p-16 text-center text-red-400 min-h-[50vh]">
            <h1 class="text-6xl font-display font-bold mb-6">🚫 Acceso Denegado</h1>
            <p class="text-xl">Solo los administradores pueden acceder a este panel. Intenta iniciar sesión con el usuario **admin**.</p>
        </div>`;
    }

    return html`
        ${Carousel()}
        <div class="flex flex-col lg:flex-row min-h-screen">
            <nav class="lg:w-64 glass-dark p-6 sticky top-[80px] h-fit hidden lg:block border-r border-amber-400/30">
                <h3 class="text-2xl font-display font-bold text-amber-400 mb-6 border-b border-amber-400/50 pb-3">Menú Admin</h3>
                <ul class="space-y-3">
                    <li><a href="#activos" onclick="setState({adminMenuOpen: false})" class="block text-amber-200 hover:text-amber-400 font-medium transition-colors">Usuarios Activos</a></li>
                    <li><a href="#admins" onclick="setState({adminMenuOpen: false})" class="block text-amber-200 hover:text-amber-400 font-medium transition-colors">Administradores</a></li>
                    <li><a href="#" onclick="setState({error: 'Función de productos no implementada'})" class="block text-amber-200 hover:text-amber-400 font-medium transition-colors">Gestión de Productos</a></li>
                    <li><a href="#" onclick="setState({error: 'Función de ventas no implementada'})" class="block text-amber-200 hover:text-amber-400 font-medium transition-colors">Mis Ventas</a></li>
                    <li><a href="#" onclick="logout()" class="block text-red-400 hover:text-red-500 font-semibold transition-colors mt-6">${icons.LogOut(18, 'mr-2')} Cerrar Sesión</a></li>
                </ul>
            </nav>

            <div class="flex-1">
                ${UserControlTable('Usuarios Activos', state.users, true)}
                ${UserControlTable('Administradores', state.admins, false)}
            </div>
        </div>
    `;
}

// --- 6. RENDERIZACIÓN DE LA APLICACIÓN ---

function renderApp() {
    // FIX: Detener el carrusel antes de cualquier renderizado para evitar que el setInterval
    // reinicie los formularios mientras se escribe.
    clearInterval(carouselInterval);
    
    const appContainer = document.getElementById('app-container');
    let pageContent = '';

    // Asegurar que los menús se cierren al cambiar de estado
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

    // Integración de NotificationBanner
    if (state.currentPage === 'login' || state.currentPage === 'register') {
        appContainer.innerHTML = NotificationBanner() + pageContent;
    } else {
        // Las demás páginas incluyen el Navbar, el main tag y el Footer
        appContainer.innerHTML = NotificationBanner() + Navbar() + '<main>' + pageContent + '</main>' + Footer();
    }

    // Inicia el carrusel solo en las páginas que lo requieren
    if (state.currentPage === 'home' || state.currentPage === 'admin') {
        startCarousel();
    }
}

window.onload = function() {
    renderApp();
};
