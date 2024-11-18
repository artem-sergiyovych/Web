// Function to display the cart items on the page
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContents = document.getElementById("cart-contents");

    if (cart.length === 0) {
        cartContents.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        // Group products by ID to handle quantities
        const groupedCart = cart.reduce((acc, product) => {
            const existingProduct = acc.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice += product.price;
            } else {
                acc.push({
                    ...product,
                    quantity: 1,
                    totalPrice: product.price,
                });
            }
            return acc;
        }, []);

        // Render the grouped cart items
        let cartHTML = '';
        groupedCart.forEach(product => {
            cartHTML += `
                <div class="cart-item">
                    <h3>Product: ${product.name}</h3>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Total: $${product.totalPrice.toFixed(2)}</p>
                    <button onclick="removeFromCart(${product.id})">Remove</button>
                </div>
            `;
        });
        cartContents.innerHTML = cartHTML;
    }
}

// Function to handle sending the request for the cart
function sendRequest() {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!user) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    console.log("Request sent for:", cart);
    alert("Request sent to the store owner!");

    // Optionally clear cart after request
    localStorage.removeItem("cart");
    displayCart(); // Refresh cart display after clearing
}

// Function to add a product to the cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Fetch the product from the `products` array
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    } else {
        alert("Product not found!");
    }
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find and remove the first instance of the product by ID
    const productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product removed from the cart.");
        displayCart(); // Refresh the cart display
    } else {
        alert("Product not found in the cart.");
    }
}

// Automatically load and display the cart when the page is browsed
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-contents")) {
        displayCart();
    }
});
