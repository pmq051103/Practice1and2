function validateLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.querySelector(".error-message");

    if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("loggedIn", "true"); 
        window.location.href = "books.html";
        return false;
    } else {
        errorMessage.innerHTML = "Email hoặc mật khẩu không đúng!";
        errorMessage.style.color = "red";
        return false;
    }
}
