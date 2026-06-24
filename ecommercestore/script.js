

let allProducts = [];

let searchQuery = "";
let selectedCategory = "all";
let sortOption = "default";

let cart = JSON.parse(localStorage.getItem("cart")) || [];


const productGrid = document.getElementById("productGrid");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");

const cartItems = document.getElementById("cartItems");

const totalProducts = document.getElementById("totalProducts");
const totalQuantity = document.getElementById("totalQuantity");
const grandTotal = document.getElementById("grandTotal");

const cartCount = document.getElementById("cartCount");

const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-btn");


async function fetchProducts() {

    try {

        const response =
            await fetch("https://fakestoreapi.com/products");

        const data = await response.json();

        allProducts = data;

        renderProducts();

    } catch (error) {

        productGrid.innerHTML = `
            <p class="status-message">
                Failed to load products.
            </p>
        `;

        console.error(error);
    }

}



function getFilteredProducts() {

    let products = [...allProducts];



    if (searchQuery.trim() !== "") {

        products = products.filter(product =>
            product.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

    }

    

    if (selectedCategory !== "all") {

        products = products.filter(product =>
            product.category === selectedCategory
        );

    }


    if (sortOption === "price-low-high") {

        products.sort((a, b) =>
            a.price - b.price
        );

    }

    else if (sortOption === "price-high-low") {

        products.sort((a, b) =>
            b.price - a.price
        );

    }

    else if (sortOption === "rating-high-low") {

        products.sort((a, b) =>
            b.rating.rate - a.rating.rate
        );

    }

    return products;

}


function renderProducts() {

    const products = getFilteredProducts();

    if (products.length === 0) {

        productGrid.innerHTML = `
            <p class="no-results">
                No products found.
            </p>
        `;

        return;
    }

    productGrid.innerHTML = products.map(product => `

        <div
            class="product-card"
            onclick="showProductDetails(${product.id})"
        >

            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <p class="name">
                ${product.title}
            </p>

            <p class="category">
                ${product.category}
            </p>

            <p class="price">
                $${product.price.toFixed(2)}
            </p>

            <p class="rating">
                ⭐ ${product.rating.rate}
                (${product.rating.count} reviews)
            </p>

            <button
                onclick="event.stopPropagation(); addToCart(${product.id})"
            >
                Add To Cart
            </button>

        </div>

    `).join("");

}


function showProductDetails(id) {

    const product =
        allProducts.find(item => item.id === id);

    modalBody.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.title}"
        >

        <h2>${product.title}</h2>

        <p>
            <strong>Description:</strong>
            ${product.description}
        </p>

        <p>
            <strong>Price:</strong>
            $${product.price}
        </p>

        <p>
            <strong>Category:</strong>
            ${product.category}
        </p>

        <p>
            <strong>Rating:</strong>
            ⭐ ${product.rating.rate}
            (${product.rating.count} reviews)
        </p>

    `;

    modal.style.display = "block";

}

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});



function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

function addToCart(productId) {

    const product =
        allProducts.find(item => item.id === productId);

    const existingItem =
        cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    renderCart();

}

function increaseQuantity(id) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity++;

    saveCart();

    renderCart();

}

function decreaseQuantity(id) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }

    saveCart();

    renderCart();

}

function removeProduct(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    renderCart();

}


function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        updateCartSummary();

        return;
    }

    cartItems.innerHTML = cart.map(item => `

        <div class="cart-item">

            <h4>
                ${item.title}
            </h4>

            <p>
                Price:
                $${item.price}
            </p>

            <p>
                Quantity:
                ${item.quantity}
            </p>

            <p>
                Subtotal:
                $${(
                    item.price *
                    item.quantity
                ).toFixed(2)}
            </p>

            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    -
                </button>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeProduct(${item.id})"
            >
                Remove
            </button>

        </div>

    `).join("");

    updateCartSummary();

}


function updateCartSummary() {

    const totalItems =
        cart.length;

    const quantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (item.price * item.quantity),
            0
        );

    totalProducts.textContent =
        totalItems;

    totalQuantity.textContent =
        quantity;

    grandTotal.textContent =
        total.toFixed(2);

    cartCount.textContent =
        quantity;

}


const checkoutForm =
    document.getElementById("checkoutForm");

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }

        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    (item.price * item.quantity),
                0
            );

        const orderId =
            "ORD-" +
            Math.floor(
                1000 + Math.random() * 9000
            );

        const date =
            new Date()
                .toLocaleDateString();

        document
            .getElementById(
                "orderConfirmation"
            ).innerHTML = `

            <h3>
                Order Placed Successfully!
            </h3>

            <p>
                Order ID:
                ${orderId}
            </p>

            <p>
                Date:
                ${date}
            </p>

            <p>
                Total Amount:
                $${total.toFixed(2)}
            </p>

        `;

        cart = [];

        saveCart();

        renderCart();

        checkoutForm.reset();

    }
);



searchInput.addEventListener(
    "input",
    function () {

        searchQuery = this.value;

        renderProducts();

    }
);


categoryFilter.addEventListener(
    "change",
    function () {

        selectedCategory = this.value;

        renderProducts();

    }
);



sortSelect.addEventListener(
    "change",
    function () {

        sortOption = this.value;

        renderProducts();

    }
);


renderCart();

fetchProducts();
