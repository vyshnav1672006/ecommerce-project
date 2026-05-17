const API = "https://ecommerce-backend-9fzo.onrender.com";

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");

async function loadProducts() {

    const response = await fetch(`${API}/products`);

    const products = await response.json();

    productsDiv.innerHTML = "";

    products.forEach((product) => {

        const div = document.createElement("div");

        div.className = "product-card";

        div.innerHTML = `
        
            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick='addToCart("${product.name}", ${product.price})'>
            
                Add To Cart
            
            </button>
        `;

        productsDiv.appendChild(div);
    });
}

async function addToCart(productName, price) {

    await fetch(`${API}/cart`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            productName,
            price
        })
    });

    loadCart();
}

async function loadCart() {

    const response = await fetch(`${API}/cart`);

    const items = await response.json();

    cartDiv.innerHTML = "";

    items.forEach((item) => {

        const div = document.createElement("div");

        div.className = "cart-card";

        div.innerHTML = `
        
            <h3>${item.productName}</h3>

            <p>₹${item.price}</p>
        `;

        cartDiv.appendChild(div);
    });
}

loadProducts();

loadCart();



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