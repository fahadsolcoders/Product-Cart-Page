const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI and silent clicks.",
    price: 25.99,
    category: "Electronics",
    brand: "LogiTech",
    stock: 120,
    rating: 4.5,
    reviews: 340,
    features: [
      { title: "Adjustable DPI settings", enabled: "true" },
      { title: "Mobile phone compatibility", enabled: "false" },
    ],
    tags: ["electronics", "accessories", "mouse", "wireless"],
    images: [
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
    ],
  },
  {
    id: 2,
    name: "Headphones",
    description: "Over-ear headphones with noise cancellation and 30-hour battery life.",
    price: 89.99,
    category: "Electronics",
    brand: "Sony",
    stock: 75,
    rating: 4.7,
    reviews: 850,
    features: [
      { title: "Noise cancellation", enabled: "true" },
      { title: "Mobile phone compatibility", enabled: "false" },
    ],
    tags: ["headphones", "audio", "bluetooth", "noise-cancelling"],
    images: [
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
    ],
  },
  {
    id: 3,
    name: "Water Bottle",
    description: "Double-walled, vacuum insulated bottle that keeps drinks cold for 24 hours.",
    price: 18.5,
    category: "Home & Kitchen",
    brand: "HydroMate",
    stock: 200,
    rating: 4.3,
    reviews: 120,
    features: [
      { title: "Vacuum insulation", enabled: "true" },
      { title: "Mobile phone compatibility", enabled: "false" },
    ],
    tags: ["bottle", "kitchen", "hydration", "eco-friendly"],
    images: [
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
    ],
  },
  {
    id: 4,
    name: "Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with customizable macro keys.",
    price: 59.99,
    category: "Electronics",
    brand: "Razer",
    stock: 40,
    rating: 4.6,
    reviews: 560,
    features: [
      { title: "RGB backlighting", enabled: "true" },
      { title: "Mobile phone compatibility", enabled: "false" },
    ],
    tags: ["gaming", "keyboard", "rgb", "mechanical"],
    images: [
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
      "https://lapntabmart.pk/wp-content/uploads/2024/07/Telzeal-TC4G-Android-Ultra-Smart-Watch.webp",
    ],
  },
];

const container = document.querySelector(".container");

function addToCart(product) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const existingProduct = cart.find((item) => item.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    cart.push({product, quantity: 1 });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
}


products.forEach((item) => {
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
    <h2 class="head-features">Features</h2>
    <div class="features0">
    ${item.features
        .map(
          (feature) => `
        <div class="${feature.enabled === "true" ? "Enabled" : "Disabled"}">
          ${feature.title} (${feature.enabled === "true" ? "Enabled" : "Disabled"})
        </div>
        `
      )
        .join("")}
        </div>
        <h2 class="head-tags">Tags</h2>
    <div class="tags">
      ${item.tags.map((tag) => `<div>${tag}</div>`).join("")}
    </div>
    <div class="img">   
    ${item.images
      .map((img) => `<img src="${img}" alt="${item.name}"/>`)
      .join("")}
    </div>
    <div class="price">$${item.price.toFixed(2)}</div>
    <a href="#" class="btn">Buy Now</a>
    <a href="#" class="btn add-to-cart" data-id="${item.id}">Add To Cart</a>
  `;

  container.appendChild(productDiv);
});


document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); 
    const productId = parseInt(button.getAttribute("data-id"));
    const product = products.find((item) => item.id === productId);
    addToCart(product); 
    window.location.href = "index2.html"; 
  });
});