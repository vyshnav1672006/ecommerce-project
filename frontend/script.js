const API = "http://localhost:5000";



// REGISTER

async function register() {

    const username = document.getElementById("username").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch(`${API}/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await response.json();

    alert(data.message);
}



// LOGIN

async function login() {

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch(`${API}/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    alert(data.message);
}



// LOAD PRODUCTS

async function loadProducts() {

    const response = await fetch(`${API}/products`);

    const products = await response.json();

    const productsDiv = document.getElementById("products");

    productsDiv.innerHTML = "";

    products.forEach((product) => {

        productsDiv.innerHTML += `

        <div class="product">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="addToCart('${product.name}', ${product.price})">
                Add To Cart
            </button>

        </div>
        `;
    });
}



// ADD TO CART

async function addToCart(productName, price) {

    const response = await fetch(`${API}/cart`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            productName,
            price
        })
    });

    const data = await response.json();

    alert(data.message);

    loadCart();
}



// LOAD CART

async function loadCart() {

    const response = await fetch(`${API}/cart`);

    const cartItems = await response.json();

    const cartDiv = document.getElementById("cart");

    cartDiv.innerHTML = "";

    cartItems.forEach((item) => {

        cartDiv.innerHTML += `

        <div class="cart-item">

            <h4>${item.productName}</h4>

            <p>₹${item.price}</p>

        </div>
        `;
    });
}



loadProducts();
loadCart();