
function validateForm() {
    const inputEmail = document.getElementById("email").value.trim();
    const inputPassword = document.getElementById("password").value.trim();
    let result = document.querySelector(".result");

    if (inputEmail === "test@example.com" && inputPassword === "123456") {
        result.innerHTML = " Đăng nhập thành công!";
        result.style.color = "green";
    } else {
        result.innerHTML = "Đăng nhập thất bại!";
        result.style.color = "red";
    }

    return false; 
}
