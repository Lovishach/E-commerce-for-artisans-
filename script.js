// script.js
const apiUrl = 'http://localhost:3000';

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

fetch(`${apiUrl}/products`)
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: ${product.price}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            `;
            productList.appendChild(productItem);
        });
    });

productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const product = e.target.parentNode;
        const productId = product.dataset.id;
        fetch(`${apiUrl}/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                cart.push(product);
                renderCart();
            });
    }
});

checkoutBtn.addEventListener('click', () => {
    fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products: cart })
    })
        .then(response => response.json())
        .then(order => {
            console.log(order);
            cart = [];
            renderCart();
        });
});

function renderCart() {
    cartList.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <