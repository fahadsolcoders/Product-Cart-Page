const cartContainer = document.querySelector("#cart-table-body");
const cartTotal = document.querySelector("#cart-total");

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
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
  } else {
    console.error(`Product with ID ${productId} not found in cart`);
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const initialLength = cart.length;
  cart = cart.filter((item) => item.id !== productId);
  if (cart.length < initialLength) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  } else {
    console.error(`Product with ID ${productId} not found in cart`);
  }
}

function renderCart() {
  if (!cartContainer) {
    console.error("cartContainer not found");
    return;
  }
  cartContainer.innerHTML = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <tr>
        <td colspan="11" class="empty-cart">Your cart is empty.</td>
      </tr>
    `;
  } else {
    cart.forEach((item) => {
      const productRow = document.createElement("tr");

      productRow.innerHTML = `
        <td class="img"><img src = "${item.images[0]}" alt = ""></td>
        <td class="title">${item.name}</td>
        <td class="description">${item.description}</td>
        <td class="category">${item.category}</td>
        <td class="brand">${item.brand}</td>
        <td class="stock">${item.stock}</td>
        <td class="ratings">${item.rating}/5</td>
        <td class="reviews">${item.reviews}</td>
        <td class="price">$${item.price.toFixed(2)}</td>
        <td class="quantity-controls">
          <button class="decrement" data-id="${item.id}">-</button>
          <span>${item.quantity || 1}</span>
          <button class="increment" data-id="${item.id}">+</button>
        </td>
        <td class="total">$${(item.price * (item.quantity || 1)).toFixed(
          2
        )}</td>
        <td>
          <button class="btn remove-from-cart" data-id="${
            item.id
          }"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;

      cartContainer.appendChild(productRow);
    });
  }

  updateCartTotal();
}

function initialize() {
  if (!cartContainer) {
    console.error("cartContainer element not found in DOM");
    return;
  }

  renderCart();

  cartContainer.addEventListener("click", (e) => {
    const button = e.target.closest(
      ".remove-from-cart, .increment, .decrement"
    );
    if (!button) {
      console.log("No relevant button clicked");
      return;
    }

    const productId = parseInt(button.getAttribute("data-id"));
    if (isNaN(productId)) {
      console.error("Invalid product ID:", button.getAttribute("data-id"));
      return;
    }

    if (button.classList.contains("remove-from-cart")) {
      console.log(`Removing product with ID ${productId}`);
      removeFromCart(productId);
    } else if (button.classList.contains("increment")) {
      console.log(`Incrementing quantity for product ID ${productId}`);
      updateQuantity(productId, 1);
    } else if (button.classList.contains("decrement")) {
      console.log(`Decrementing quantity for product ID ${productId}`);
      updateQuantity(productId, -1);
    }
  });
}

document.addEventListener("DOMContentLoaded", initialize);