document.addEventListener("DOMContentLoaded", function () {
    checkLogin();
    loadBooks();
});

function checkLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

function logout(){
    if(localStorage.getItem("loggedIn")){
        localStorage.setItem("loggedIn","false");
        window.location.href = "index.html";
    }
}
function addBook() {
    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let year = document.getElementById("year").value.trim();

    if (title === "" || author === "" || year === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let id = crypto.randomUUID(); 
    let newBook = { id, title, author, year };

    fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
    })
    .then(response => response.json())
    .then(() => {
        loadBooks();
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("year").value = "";
    })
    .catch(error => console.error("Lỗi:", error));
}

function loadBooks() {
    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(books => {
        let bookList = document.getElementById("bookList");
        bookList.innerHTML = "";

        books.forEach(book => {
            let li = document.createElement("li");
            li.innerHTML = `${book.title} - ${book.author} (${book.year}) 
                <button onclick="deleteBook('${book.id}')">Xóa</button>`;
            bookList.appendChild(li);
        });
    })
    .catch(error => console.error("Lỗi:", error));
}

function deleteBook(bookId) {
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: "DELETE",
    })
    .then(() => {
        loadBooks();
    })
    .catch(error => console.error("Lỗi:", error));
}
