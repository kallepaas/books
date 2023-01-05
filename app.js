const form = document.querySelector('#book-form')
form.addEventListener('submit', addBook)

document.addEventListener('DOMContentLoaded', getBooks)

const booksTable = document.querySelector('#books')
booksTable.addEventListener('click', deleteBook)

function getBooks(){
    let books // array for LS data
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.forEach(function(book){
        const bookRow = document.createElement('tr')
        bookRow.innerHTML = `
                        <td>${book[0]}</td>
                        <td>${book[1]}</td>
                        <td>${book[2]}</td>
                        <td><a href="#">X</a></td>`
        const booksTable = document.querySelector('#books')
        booksTable.appendChild(bookRow)
    })
}

function deleteBook(event){
    if(event.target.textContent === 'X'){
        if(confirm('Do you want to delete this book?')){
            event.target.parentElement.parentElement.remove()
            const isbn = event.target.parentElement.previousElementSibling
            const author = event.target.parentElement.previousElementSibling.previousElementSibling
            const title = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling

            const book = [title.textContent, author.textContent, isbn.textContent]

            let books // array for LS data
            if(localStorage.getItem('books') === null){
                books = []
            } else {
                books = JSON.parse(localStorage.getItem('books'))
            }
            books.forEach(function(bookFromLS, index){
                if( bookFromLS[0] === book[0] && bookFromLS[1] === book[1] && bookFromLS[2] === book[2]){
                    books.splice(index, 1)
                }
            })
            localStorage.setItem('books', JSON.stringify(books))
        }
    }
}

function addBook(event){
    // read user inputs
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    // create table row withj user inputs data
    const bookRow = document.createElement('tr')
    bookRow.innerHTML = `
                        <td>${title}</td>
                        <td>${author}</td>
                        <td>${isbn}</td>
                        <td><a href="#">X</a></td>`
    const booksTable = document.querySelector('#books')
    booksTable.appendChild(bookRow)

    // add books to LS
    const book = [title, author, isbn]
    let books // arrary for user inputs
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))

    // clear inputs
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
    event.preventDefault()
}