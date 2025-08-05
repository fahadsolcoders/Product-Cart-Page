const cartContainer = document.getElementById("cart-container");

function renderCart() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="p-cart">Your cart is empty.</p>`;
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
            <div class="img">   
      ${item.images
        .map((img) => `<img src="${img}" alt="${item.name}"/>`)
        .join("")}
    </div>
        <div class="price">Total: $${(item.price * item.quantity).toFixed(
          2
        )}</div>
        <button class="btn remove-from-cart" data-id="${
          item.id
        }">Remove from Cart</button>
      `;

      cartContainer.appendChild(productDiv);
    });

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(button.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.id !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

renderCart()