const addButton = document.querySelector(".add button");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const read = document.getElementById("checkboxtrue");
const submitBook = document.querySelector("input[type='submit']");
const closeDisplay = document.getElementById("close");
const addContainerDisplay = document.querySelector(".add-container");
const bookDisplay = document.querySelector(".book-display");



let arrayBook = []
let readTrue = true;
let readMessage = "not read"
let nbrLivres = 0;
let instance = null;

read.addEventListener("input", () => {
    if(readTrue == false) {
        readMessage = "not read"
        readTrue = true;
    } else {
        readMessage = "read"
        readTrue = false;
    }
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

function addBookLibrary() {
    arrayBook.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, readMessage))
    console.log(arrayBook);
    
    
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
        addContainerDisplay.style.display = "none"
        addBookPages()
    })
    
}

function addBookPages() {
    bookDisplay.innerHTML = ""
    for(let i=0; i<arrayBook.length; i++) {
        let divBook = document.createElement("div");

        bookDisplay.appendChild(divBook);
        divBook.id = `book-id${i}`;
        divBook.classList.add("book-decoration");

        divBook.innerHTML = `
        <h1>${arrayBook[i].title}</h1>
        <p>${arrayBook[i].author}</p>
        <p>${arrayBook[i].pages}</p>
        <p id="readP${i}" value="${i}">${arrayBook[i].read}</p>
        <button value="${i}">remove</button>
        `

        let buttonRemove = document.querySelector(`#readP${i}`)

        if(buttonRemove.innerHTML == "not read") {
            buttonRemove.classList.add("notread")
            
        } else {
            buttonRemove.classList.add("read")
            
        }

        buttonRemove.addEventListener("click", (e) => {

            

            if(e.target.innerHTML == "not read") {
                arrayBook[i].read = "read"
                e.target.textContent = "read"
                buttonRemove.classList.add("read")
                buttonRemove.classList.remove("notread")
                
            } else {
                arrayBook[i].read = "not read"
                e.target.textContent = "not read"
                buttonRemove.classList.add("notread")
                buttonRemove.classList.remove("read")
                
            }
        })

        removeBook(i)
    }
}

function removeBook(i) {
    let buttonRemove = document.querySelector(`#book-id${i} button`)

    buttonRemove.addEventListener("click", (e) => {
        let books1 = document.querySelector(`#book-id${e.target.value}`)
        arrayBook.splice(i, 1)
        books1.remove()
        addBookPages()
    })
}


addPage()