document.addEventListener('DOMContentLoaded', () => {
    // --- UTILITY FUNCTIONS ---
    const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
    const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
    const getWishlist = () => JSON.parse(localStorage.getItem('wishlist')) || [];
    const saveWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // --- UI UPDATE FUNCTIONS ---
    const updateCounts = () => {
        const cartCountEl = document.getElementById('cart-count');
        const wishlistCountEl = document.getElementById('wishlist-count');
        if (cartCountEl) cartCountEl.textContent = getCart().reduce((acc, item) => acc + item.quantity, 0);
        if (wishlistCountEl) wishlistCountEl.textContent = getWishlist().length;
    };

    const showToast = (message) => {
        // Simple alert for now, can be replaced with a custom notification
        alert(message);
    };

    const calculateTotal = () => {
        const cart = getCart();
        const subtotalEl = document.getElementById('subtotal');
        const totalCostEl = document.getElementById('total-cost');

        if (!subtotalEl || !totalCostEl) return;

        const subtotal = cart.reduce((acc, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return acc + (price * quantity);
        }, 0);

        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        });

        subtotalEl.textContent = formatter.format(subtotal);
        totalCostEl.textContent = formatter.format(subtotal); // Assuming shipping is free for now
    };

    const displayCartItems = () => {
        const container = document.getElementById('cart-items-container');
        if (!container) return;

        const cart = getCart();
        container.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            container.innerHTML = `<p class="empty_cart_message">Your shopping cart is empty.</p>`;
            document.getElementById('order-summary-card').style.display = 'none';
            return;
        }
        
        document.getElementById('order-summary-card').style.display = 'flex';

        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'product_card cart_product_card';
            card.innerHTML = `
                <h4>${item.name}</h4>
                <p>${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}</p>
                <img src="${item.img}" alt="${item.name}">
                <div class="cart_item_actions">
                    <div class="quantity_control">
                        <button class="quantity_btn" data-index="${index}" data-action="decrease">-</button>
                        <span class="quantity_text">${item.quantity}</span>
                        <button class="quantity_btn" data-index="${index}" data-action="increase">+</button>
                    </div>
                    <button class="remove_btn" data-index="${index}">Remove</button>
                </div>
            `;
            container.appendChild(card);
        });

        calculateTotal();
    };


    // --- EVENT HANDLER FUNCTIONS ---
    const handleAddToCart = (e) => {
        const card = e.target.closest('.product_card');
        if (!card) return;

        const name = card.querySelector('h4').textContent;
        const img = card.querySelector('img').src;
        
        // --- THIS IS THE DEFINITIVE FIX ---
        // We now reliably read the clean number from the 'data-price' attribute.
        const price = parseFloat(card.dataset.price);
        // ------------------------------------
        
        if (isNaN(price)) {
            console.error("Could not find a valid data-price attribute on the product card.", card);
            return; // Stop if the price is not a valid number
        }

        let cart = getCart();
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, img, quantity: 1 });
        }

        saveCart(cart);
        updateCounts();
        showToast(`${name} has been added to your cart.`);
    };

    const handleAddToWishlist = (e) => {
        const card = e.target.closest('.product_card');
        if (!card) return;

        const name = card.querySelector('h4').textContent;
        const img = card.querySelector('img').src;
        const price = parseFloat(card.dataset.price);

        if (isNaN(price)) {
            console.error("Could not find a valid data-price attribute on the product card.", card);
            return;
        }

        let wishlist = getWishlist();
        if (wishlist.find(item => item.name === name)) {
            showToast('This item is already in your wishlist!');
            return;
        }

        wishlist.push({ name, price, img });
        saveWishlist(wishlist);
        updateCounts();
        showToast(`${name} has been added to your wishlist.`);
    };

    const updateCartQuantity = (index, action) => {
        let cart = getCart();
        if (cart[index]) {
            if (action === 'increase') {
                cart[index].quantity += 1;
            } else if (action === 'decrease') {
                cart[index].quantity -= 1;
            }

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1); // Remove item if quantity is 0 or less
            }
        }
        saveCart(cart);
        displayCartItems(); // Re-render the cart
        updateCounts();
    };

    const removeFromCart = (index) => {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        displayCartItems();
        updateCounts();
    };

    // --- GLOBAL EVENT LISTENER ---
    document.body.addEventListener('click', (e) => {
        const target = e.target;
        // Check closest ancestor for the button class
        if (target.closest('.add_btn')) {
            handleAddToCart(e);
        }
        if (target.closest('.wish_btn')) {
            handleAddToWishlist(e);
        }
        if (target.matches('.quantity_btn')) {
            const index = target.dataset.index;
            const action = target.dataset.action;
            updateCartQuantity(index, action);
        }
        if (target.matches('.remove_btn')) {
            const index = target.dataset.index;
            removeFromCart(index);
        }
    });

    // --- INITIALIZATION ---
    // This code runs on every page that includes script.js
    updateCounts();

    // This code runs only if it finds the cart container (i.e., on cart.html)
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- All your existing cart and wishlist functions remain here ---
    // ... (getCart, saveCart, updateCounts, showToast, calculateTotal, etc.) ...
    const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
    const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
    const getWishlist = () => JSON.parse(localStorage.getItem('wishlist')) || [];
    const saveWishlist = (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist));

    const updateCounts = () => {
        const cartCountEl = document.getElementById('cart-count');
        const wishlistCountEl = document.getElementById('wishlist-count');
        if (cartCountEl) cartCountEl.textContent = getCart().reduce((acc, item) => acc + item.quantity, 0);
        if (wishlistCountEl) wishlistCountEl.textContent = getWishlist().length;
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast_notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }, 10);
    };

    const calculateTotal = () => {
        const cart = getCart();
        const subtotalEl = document.getElementById('subtotal');
        const totalCostEl = document.getElementById('total-cost');

        if (!subtotalEl || !totalCostEl) return;

        const subtotal = cart.reduce((acc, item) => {
            return acc + (Number(item.price) * Number(item.quantity));
        }, 0);

        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        });

        subtotalEl.textContent = formatter.format(subtotal);
        totalCostEl.textContent = formatter.format(subtotal);
    };

    const displayCartItems = () => {
        const container = document.getElementById('cart-items-container');
        const summaryCard = document.getElementById('order-summary-card');
        if (!container || !summaryCard) return;

        const cart = getCart();
        container.innerHTML = '';

        if (cart.length === 0) {
            container.innerHTML = `<p class="empty_cart_message">Your shopping cart is empty.</p>`;
            summaryCard.style.display = 'none';
            return;
        }
        
        summaryCard.style.display = 'flex';

        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'product_card cart_product_card';
            card.innerHTML = `<h4>${item.name}</h4><p>${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}</p><img src="${item.img}" alt="${item.name}"><div class="cart_item_actions"><div class="quantity_control"><button class="quantity_btn" data-index="${index}" data-action="decrease">-</button><span class="quantity_text">${item.quantity}</span><button class="quantity_btn" data-index="${index}" data-action="increase">+</button></div><button class="remove_btn" data-index="${index}">Remove</button></div>`;
            container.appendChild(card);
        });

        calculateTotal();
    };

    const handleAddToCart = (e) => {
        const card = e.target.closest('.product_card');
        if (!card) return;
        const name = card.querySelector('h4').textContent;
        const img = card.querySelector('img').src;
        const price = parseFloat(card.dataset.price);
        
        if (isNaN(price)) return;

        let cart = getCart();
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, img, quantity: 1 });
        }
        saveCart(cart);
        updateCounts();
        showToast(`${name} has been added to your cart.`);
    };

    const handleAddToWishlist = (e) => {
        const card = e.target.closest('.product_card');
        if (!card) return;
        const name = card.querySelector('h4').textContent;
        const img = card.querySelector('img').src;
        const price = parseFloat(card.dataset.price);
        if (isNaN(price)) return;

        let wishlist = getWishlist();
        if (wishlist.find(item => item.name === name)) {
            showToast('This item is already in your wishlist!');
            return;
        }
        wishlist.push({ name, price, img });
        saveWishlist(wishlist);
        updateCounts();
        showToast(`${name} has been added to your wishlist.`);
    };

    const updateCartQuantity = (index, action) => {
        let cart = getCart();
        if (cart[index]) {
            if (action === 'increase') cart[index].quantity += 1;
            else if (action === 'decrease') cart[index].quantity -= 1;
            if (cart[index].quantity <= 0) cart.splice(index, 1);
        }
        saveCart(cart);
        displayCartItems();
        updateCounts();
    };

    const removeFromCart = (index) => {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        displayCartItems();
        updateCounts();
    };

    // --- NEW: SEARCH AND FILTER FUNCTIONS ---
    function performSearch(searchTerm) {
        const productCards = document.querySelectorAll('.product_grid .product_card');
        const productGrid = document.querySelector('.product_grid');
        let itemsFound = 0;

        document.querySelectorAll('.product_filters .filter_btn').forEach(btn => btn.classList.remove('active'));

        productCards.forEach(card => {
            const productName = card.querySelector('h4').textContent.toLowerCase();
            if (productName.includes(searchTerm.toLowerCase())) {
                card.style.display = 'flex';
                itemsFound++;
            } else {
                card.style.display = 'none';
            }
        });

        let noResultsMessage = productGrid.querySelector('.no_results_message');
        if (itemsFound === 0) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('p');
                noResultsMessage.className = 'no_results_message';
                productGrid.appendChild(noResultsMessage);
            }
            noResultsMessage.textContent = `No products found for "${searchTerm}"`;
            noResultsMessage.style.display = 'block';
        } else if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
    }

    function filterByCategory(filterValue) {
        const productCards = document.querySelectorAll('.product_grid .product_card');
        const productGrid = document.querySelector('.product_grid');
        
        document.querySelector('.nav_search input').value = '';
        let noResultsMessage = productGrid.querySelector('.no_results_message');
        if (noResultsMessage) noResultsMessage.style.display = 'none';

        productCards.forEach(card => {
            card.style.display = (filterValue === 'all' || card.dataset.category === filterValue) ? 'flex' : 'none';
        });

        document.querySelectorAll('.product_filters .filter_btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filterValue);
        });
    }

    // --- GLOBAL EVENT LISTENERS ---
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.add_btn')) handleAddToCart(e);
        if (e.target.closest('.wish_btn')) handleAddToWishlist(e);
        if (e.target.matches('.quantity_btn')) updateCartQuantity(e.target.dataset.index, e.target.dataset.action);
        if (e.target.matches('.remove_btn')) removeFromCart(e.target.dataset.index);
    });

    // --- NEW: SEARCH EVENT LISTENERS ---
    const searchInput = document.querySelector('.nav_search input');
    const searchIcon = document.querySelector('.nav_search span');

    if (searchInput && searchIcon) {
        const triggerSearch = () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                if (window.location.pathname.includes('products.html')) {
                    performSearch(searchTerm);
                } else {
                    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        };
        searchIcon.addEventListener('click', triggerSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') triggerSearch();
        });
    }

    // --- INITIALIZATION ---
    updateCounts();

    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }

    // --- NEW: LOGIC FOR PRODUCTS PAGE ---
    if (window.location.pathname.includes('products.html')) {
        const filterButtons = document.querySelectorAll('.product_filters .filter_btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => filterByCategory(button.dataset.filter));
        });

        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        const filterParam = urlParams.get('filter');

        if (searchParam) {
            searchInput.value = searchParam;
            performSearch(searchParam);
        } else if (filterParam) {
            filterByCategory(filterParam);
        }
    }
});


