const products = [
    { id: 1, name: "Headphones", price: 1999, image: "img/headphones.png" },
    { id: 2, name: "Watch", price: 2999, image: "img/watch.jpg" },
    { id: 3, name: "Shoes", price: 2499, image: "img/shoes.png" },
    { id: 4, name: "Backpack", price: 1499, image: "img/backpack.jpg" }
];

let cart = [];
let currentUser = localStorage.getItem("user");

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const authSection = document.getElementById("auth-section");

function renderAuth() {
    if (currentUser) {
        authSection.innerHTML = `
            <span class="user-info">Hello, ${currentUser}</span>
            <span class="login-btn" onclick="logout()">Logout</span>
        `;
    } else {
        authSection.innerHTML = `
            <span class="login-btn" onclick="openAuth()">Login</span>
        `;
    }
}

products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
});

function addToCart(id) {
    if (!currentUser) {
        alert("Please login first!");
        openAuth();
        return;
    }
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeItem(${index})">X</button>
            </div>
        `;
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* AUTH */
function openAuth() {
    document.getElementById("auth-modal").style.display = "flex";
}

function handleAuth() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("user", username);
        currentUser = username;
        renderAuth();
        document.getElementById("auth-modal").style.display = "none";
    } else {
        alert("Enter username and password");
    }
}

function logout() {
    localStorage.removeItem("user");
    currentUser = null;
    renderAuth();
}

renderAuth();
