const addButton = document.querySelector(".add button");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const read = document.getElementById("checkboxtrue");
const submitBook = document.querySelector("input[type='submit']");
const closeDisplay = document.getElementById("close");
const addContainerDisplay = document.querySelector(".add-container");
const bookDisplay = document.querySelector(".book-display");
const bookForm = document.querySelector(".add-container form");



let arrayBook = [];
let y = null;
let x = null;
let mouseClick = false;

document.onmousedown = () => {
    mouseClick = true;
}

document.onmouseup = () => {
mouseClick = false;
}

document.addEventListener("mousemove", (e) => {
    y = e.clientY
    x = e.clientX
    
})

bookForm.addEventListener("mousemove", (e) => {
    if(mouseClick==true) {
        bookForm.style.top = y + "px";
        bookForm.style.left = x + "px";
        
    }
    
    
})


class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    readUpdate() {
        return this.read = this.read == "not read" ? "read" : "not read";
    }
}

function addBookLibrary() {
    
    let readTrue = read.checked ? "read" : "not read";
    let bookInstance = new Book(inputTitle.value, inputAuthor.value, inputPages.value, readTrue);
    arrayBook.push(bookInstance);
    addBookPages(bookInstance, arrayBook.length - 1);
    addContainerDisplay.style.display = "none";

}

function addPage() {
    addButton.addEventListener("click", () => {
        addContainerDisplay.style.display = "block"
    })

    closeDisplay.addEventListener("click", () => {
        addContainerDisplay.style.display = "none"
    })

    sendInput()
}

function sendInput() {
    submitBook.addEventListener("click", (e) => {
        e.preventDefault()
        addBookLibrary()
    })
    
}

function addBookPages(book, index) {
    const divElement = document.createElement("div");
    divElement.id = `book-${index}`

    divElement.classList.add("book-decoration")

    const h1 = document.createElement("h1")
    h1.textContent = book.title

    const p1 = document.createElement("p")
    p1.textContent = book.author

    const p2 = document.createElement("p")
    p2.textContent = book.pages

    const p3 = document.createElement("p")
    p3.textContent = book.read


    const buttonRemove = document.createElement("button")
    buttonRemove.textContent = "remove"
    
    buttonRemove.addEventListener("click", () => {
        bookDisplay.innerHTML = ""
        arrayBook.splice(index, 1)
        arrayBook.forEach((book, index) => addBookPages(book, index))
    })

    p3.addEventListener("click", () => {
        p3.textContent = book.readUpdate()
        p3.classList.toggle("read", book.read == "read")
        p3.classList.toggle("notread", book.read == "not read")
    })

    divElement.append(h1, p1, p2, p3, buttonRemove);
    bookDisplay.appendChild(divElement);
}


addPage()