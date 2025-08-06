const cartContainer = document.querySelector("#cart-container");
const cartTotal = document.querySelector("#cart-total");

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotal) {
    cartTotal.textContent = total.toFixed(2);
  }
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = Math.max(1, (item.quantity || 1) + change);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  if (!cartContainer) return;
  cartContainer.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-details");

      productDiv.innerHTML = `
        <h1 class="title">${item.name}</h1>
        <p class="description">${item.description}</p>
        <div class="category">Category: ${item.category}</div>
        <div class="brand">Brand: ${item.brand}</div>
        <div class="stock">Stock: ${item.stock}</div>
        <div class="ratings">Rating: ${item.rating}/5</div>
        <div class="reviews">Reviews: ${item.reviews}</div>
        <div class="price">$${item.price.toFixed(2)} x ${item.quantity}</div>
        <div class="quantity-controls">
          <button class="decrement" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increment" data-id="${item.id}">+</button>
        </div>
        <div class="price">Total: $${(item.price * item.quantity).toFixed(2)}</div>
        <button class="btn remove-from-cart" data-id="${item.id}">Remove from Cart</button>
      `;

      cartContainer.appendChild(productDiv);
    });
  }

  updateCartTotal();
}

function initialize() {
  renderCart();

  cartContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".remove-from-cart, .increment, .decrement");
    if (!button) return;

    const productId = parseInt(button.getAttribute("data-id"));

    if (button.classList.contains("remove-from-cart")) {
      removeFromCart(productId);
    } else if (button.classList.contains("increment")) {
      updateQuantity(productId, 1);
    } else if (button.classList.contains("decrement")) {
      updateQuantity(productId, -1);
    }
  });
}

document.addEventListener("DOMContentLoaded", initialize);