function loginUser(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Store user data in localStorage, including surname
    localStorage.setItem("user", JSON.stringify({ name, surname, email, phone }));

    alert("You are now logged in!");
    navigateTo("products.html");
}
