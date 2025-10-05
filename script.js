document.addEventListener("DOMContentLoaded", () => {
  // --- UTILITY FUNCTIONS ---
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
  const getWishlist = () => JSON.parse(localStorage.getItem("wishlist")) || [];
  const saveWishlist = (wishlist) =>
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // --- UI UPDATE FUNCTIONS ---
  const updateCounts = () => {
    const cartCountEl = document.getElementById("cart-count");
    const wishlistCountEl = document.getElementById("wishlist-count");
    if (cartCountEl)
      cartCountEl.textContent = getCart().reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    if (wishlistCountEl) wishlistCountEl.textContent = getWishlist().length;
  };

  const showToast = (message) => {
    // Simple alert for now, can be replaced with a custom notification
    alert(message);
  };

  const calculateTotal = () => {
    const cart = getCart();
    const subtotalEl = document.getElementById("subtotal");
    const totalCostEl = document.getElementById("total-cost");

    if (!subtotalEl || !totalCostEl) return;

    const subtotal = cart.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

    subtotalEl.textContent = formatter.format(subtotal);
    totalCostEl.textContent = formatter.format(subtotal); // Assuming shipping is free for now
  };

  const displayCartItems = () => {
    const container = document.getElementById("cart-items-container");
    if (!container) return;

    const cart = getCart();
    container.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
      container.innerHTML = `<p class="empty_cart_message">Your shopping cart is empty.</p>`;
      document.getElementById("order-summary-card").style.display = "none";
      return;
    }

    document.getElementById("order-summary-card").style.display = "flex";

    cart.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "product_card cart_product_card";
      card.innerHTML = `
                <h4>${item.name}</h4>
                <p>${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.price)}</p>
                <img src="${item.img}" alt="${item.name}">
                <div class="cart_item_actions">
                    <div class="quantity_control">
                        <button class="quantity_btn" data-index="${index}" data-action="decrease">-</button>
                        <span class="quantity_text">${item.quantity}</span>
                        <button class="quantity_btn" data-index="${index}" data-action="increase">+</button>
                    </div>
                </div>
            `;
      container.appendChild(card);
    });

    calculateTotal();
  };

  const displayWishlistItems = () => {
    const container = document.getElementById("wishlist-items-container");
    if (!container) return;

    const wishlist = getWishlist();
    container.innerHTML = ""; // Clear existing items

    if (wishlist.length === 0) {
      container.innerHTML = `<p class="empty_wishlist_message">Your wishlist is empty.</p>`;
      return;
    }

    wishlist.forEach((item) => {
      const card = document.createElement("div");
      card.className = "product_card wishlist_product_card";
      card.dataset.price = item.price;
      card.innerHTML = `
                <h4>${item.name}</h4>
                <p>${new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.price)}</p>
                <img src="${item.img}" alt="${item.name}">
                <div class="wishlist_actions">
                    <button class="add_to_cart_btn">Add to Cart</button>
                    <button class="remove_wishlist_btn">Remove</button>
                </div>
            `;
      container.appendChild(card);
    });
  };

  // --- EVENT HANDLER FUNCTIONS ---
  const handleAddToCart = (e) => {
    const card = e.target.closest(".product_card");
    if (!card) return;

    const name = card.querySelector("h4").textContent;
    const img = card.querySelector("img").src;

    // --- THIS IS THE DEFINITIVE FIX ---
    // We now reliably read the clean number from the 'data-price' attribute.
    const price = parseFloat(card.dataset.price);
    // ------------------------------------

    if (isNaN(price)) {
      console.error(
        "Could not find a valid data-price attribute on the product card.",
        card
      );
      return; // Stop if the price is not a valid number
    }

    const qtySpan = card.querySelector(".quantity_text");
    const quantity = qtySpan ? parseInt(qtySpan.textContent) || 1 : 1;

    let cart = getCart();
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, img, quantity });
    }

    saveCart(cart);
    updateCounts();
    showToast(`${name} has been added to your cart.`);
  };

  const handleAddToWishlist = (e) => {
    const card = e.target.closest(".product_card");
    if (!card) return;

    const name = card.querySelector("h4").textContent;
    const img = card.querySelector("img").src;
    // Fix: Use the price text content and parse it to float instead of dataset.price which may be missing
    const priceText = card.querySelector("p").textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

    if (isNaN(price)) {
      console.error("Could not find a valid price on the product card.", card);
      return;
    }

    let wishlist = getWishlist();
    if (wishlist.find((item) => item.name === name)) {
      showToast("This item is already in your wishlist!");
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
      if (action === "increase") {
        cart[index].quantity += 1;
      } else if (action === "decrease") {
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
  document.body.addEventListener("click", (e) => {
    const target = e.target;
    // Check closest ancestor for the button class
    if (target.closest(".add_btn")) {
      handleAddToCart(e);
    }
    if (target.closest(".wish_btn")) {
      handleAddToWishlist(e);
    }
    if (target.matches(".view_btn")) {
      const card = target.closest(".product_card");
      if (!card) return;
      const name = card.querySelector("h4").textContent;
      const img = card.querySelector("img").src;
      const priceText = card.querySelector("p").textContent;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
      const category = card.dataset.category || "Uncategorized";
      // For demo, description is static or can be enhanced to fetch real data
      const description = "Detailed description of " + name + " goes here.";
      const quantity =
        parseInt(card.querySelector(".quantity_text")?.textContent) || 1;
      createProductDetailsPopup({
        name,
        img,
        price,
        category,
        description,
        quantity,
      });
    }
    // Quantity picker buttons
    if (target.matches(".qty_btn")) {
      const picker = target.closest(".quantity_picker");
      const input = picker.querySelector(".qty_input");
      let currentVal = parseInt(input.value) || 1;
      if (target.getAttribute("aria-label") === "Increase quantity") {
        if (currentVal < parseInt(input.max)) {
          input.value = currentVal + 1;
        }
      } else if (target.getAttribute("aria-label") === "Decrease quantity") {
        if (currentVal > parseInt(input.min)) {
          input.value = currentVal - 1;
        }
      }
    }
    if (target.matches(".checkout_btn")) {
      window.location.href = "checkout.html";
    }
    if (target.matches(".quantity_btn")) {
      if (target.dataset.index !== undefined) {
        // For cart page
        const index = target.dataset.index;
        const action = target.dataset.action;
        updateCartQuantity(index, action);
      } else {
        // For products page
        const controls = target.closest(".quantity_controls");
        const span = controls.querySelector(".quantity_text");
        let currentVal = parseInt(span.textContent) || 1;
        if (target.dataset.action === "increase") {
          span.textContent = currentVal + 1;
        } else if (target.dataset.action === "decrease" && currentVal > 1) {
          span.textContent = currentVal - 1;
        }
        // Update price display
        const p = controls.closest(".product_card").querySelector("p");
        const unitPrice = parseFloat(p.dataset.unitPrice);
        const quantity = parseInt(span.textContent);
        const total = unitPrice * quantity;
        p.textContent = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(total);
      }
    }
    if (target.closest(".add_to_cart_btn")) {
      const card = target.closest(".wishlist_product_card");
      const name = card.querySelector("h4").textContent;
      const img = card.querySelector("img").src;
      const price = parseFloat(card.dataset.price);
      let cart = getCart();
      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, img, quantity: 1 });
      }
      saveCart(cart);
      updateCounts();
      showToast(`${name} has been added to your cart.`);
    }
    if (target.matches(".remove_wishlist_btn")) {
      const card = target.closest(".wishlist_product_card");
      const name = card.querySelector("h4").textContent;
      let wishlist = getWishlist();
      wishlist = wishlist.filter((item) => item.name !== name);
      saveWishlist(wishlist);
      displayWishlistItems();
      updateCounts();
      showToast(`${name} has been removed from your wishlist.`);
    }
  });

  // --- NEW: SEARCH AND FILTER FUNCTIONS ---
  function performSearch(searchTerm) {
    const productCards = document.querySelectorAll(
      ".product_grid .product_card"
    );
    const productGrid = document.querySelector(".product_grid");
    let itemsFound = 0;

    document
      .querySelectorAll(".product_filters .filter_btn")
      .forEach((btn) => btn.classList.remove("active"));

    productCards.forEach((card) => {
      const productName = card.querySelector("h4").textContent.toLowerCase();
      if (productName.includes(searchTerm.toLowerCase())) {
        card.style.display = "flex";
        itemsFound++;
      } else {
        card.style.display = "none";
      }
    });

    let noResultsMessage = productGrid.querySelector(".no_results_message");
    if (itemsFound === 0) {
      if (!noResultsMessage) {
        noResultsMessage = document.createElement("p");
        noResultsMessage.className = "no_results_message";
        productGrid.appendChild(noResultsMessage);
      }
      noResultsMessage.textContent = `No products found for "${searchTerm}"`;
      noResultsMessage.style.display = "block";
    } else if (noResultsMessage) {
      noResultsMessage.style.display = "none";
    }
  }

  function filterByCategory(filterValue) {
    const productCards = document.querySelectorAll(
      ".product_grid .product_card"
    );
    const productGrid = document.querySelector(".product_grid");

    document.querySelector(".nav_search input").value = "";
    let noResultsMessage = productGrid.querySelector(".no_results_message");
    if (noResultsMessage) noResultsMessage.style.display = "none";

    productCards.forEach((card) => {
      card.style.display =
        filterValue === "all" || card.dataset.category === filterValue
          ? "flex"
          : "none";
    });

    document.querySelectorAll(".product_filters .filter_btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filterValue);
    });
  }

  // --- NEW: SEARCH EVENT LISTENERS ---
  const searchInput = document.querySelector(".nav_search input");
  const searchIcon = document.querySelector(".nav_search span");

  if (searchInput && searchIcon) {
    const triggerSearch = () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        if (window.location.pathname.includes("products.html")) {
          performSearch(searchTerm);
        } else {
          window.location.href = `products.html?search=${encodeURIComponent(
            searchTerm
          )}`;
        }
      }
    };
    searchIcon.addEventListener("click", triggerSearch);
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") triggerSearch();
    });
  }

  // --- INITIALIZATION ---
  // This code runs on every page that includes script.js
  updateCounts();

  // This code runs only if it finds the cart container (i.e., on cart.html)
  if (document.getElementById("cart-items-container")) {
    displayCartItems();
  }

  // --- NEW: LOGIC FOR PRODUCTS PAGE ---
  if (window.location.pathname.includes("products.html")) {
    const filterButtons = document.querySelectorAll(
      ".product_filters .filter_btn"
    );
    filterButtons.forEach((button) => {
      button.addEventListener("click", () =>
        filterByCategory(button.dataset.filter)
      );
    });

    // Dynamically render products from product-data.js
    const productGrid = document.querySelector(".product_grid");
    if (productGrid && typeof products !== "undefined") {
      productGrid.innerHTML = ""; // Clear existing content
      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product_card";
        card.dataset.category = product.category
          .toLowerCase()
          .replace(/\s+/g, "");
        card.dataset.price =
          parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
        const unitPrice = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
        card.innerHTML = `
                    <h4>${product.name}</h4>
                    <p data-unit-price="${unitPrice}">${product.price}</p>
                    <img src="${product.image}" alt="${product.name}" />
                    <button class="wish_btn top_right" title="Add to Wishlist"><i class="ri-heart-3-line"></i></button>
                    <div class="product_actions">
                        <button class="add_btn">Add to Cart</button>
                        <button class="view_btn">View Details</button>
                        <div class="quantity_controls">
                            <button class="quantity_btn" data-action="decrease" title="Decrease Quantity">-</button>
                            <span class="quantity_text">1</span>
                            <button class="quantity_btn" data-action="increase" title="Increase Quantity">+</button>
                        </div>
                    </div>
                `;
        productGrid.appendChild(card);
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    const filterParam = urlParams.get("filter");

    if (searchParam) {
      searchInput.value = searchParam;
      performSearch(searchParam);
    } else if (filterParam) {
      filterByCategory(filterParam);
    }
  }

  // Initialize header swiper
  if (document.querySelector(".header-swiper")) {
    new Swiper(".header-swiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  // Initialize testimonials swiper
  if (document.querySelector(".client_container .swiper")) {
    new Swiper(".client_container .swiper", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
});
closeBtn.style.right = "15px";
closeBtn.style.background = "transparent";
closeBtn.style.border = "none";
closeBtn.style.fontSize = "28px";
closeBtn.style.fontWeight = "bold";
