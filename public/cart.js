function sendRequest() {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!user) {
        alert("Please log in first!");
        navigateTo("login.html");
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
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added product ${productId} to cart!`);
}