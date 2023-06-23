console.log('ES6 version of library');

showBooks();

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.type = type;
        this.author = author;
    }
}


class Display {
    add(book) {
        // console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `
                        <tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                            <td><button onClick = "deleteBook(this.id)" type="button" class="btn btn-primary">Delete</button></td>
                        </tr>
        `;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'success';
        }
        else {
            boldText = 'Error!'
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText} : </strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;

        setTimeout(() => {
            message.innerHTML = ``;
        }, 5000);
    }
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSumbit);

function libraryFormSumbit(e) {
    // console.log('You have summited library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    // console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        let books = localStorage.getItem('booksName');
        let booksObj;
        if (books == null) {
            booksObj = [];
        }
        else {
            booksObj = JSON.parse(books);
        }
        booksObj.push(book);
        localStorage.setItem('booksName', JSON.stringify(booksObj))
        // console.log(`Add Successfully ${book}`)
        showBooks();
        display.clear();
        display.show('success', 'You book has been successfully added.');
    }
    else {
        // Show error to user 
        display.show('danger', 'Sorry you can not add this book to library.');
    }
    e.preventDefault();
}

function showBooks() {
    let books = localStorage.getItem('booksName');
    if (books !== null) {
        let booksObj = JSON.parse(books);
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ``;
        booksObj.forEach(function (element,index) {
            // console.log(element.name);
            let uiString = `
                        <tr>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td><button type="button" onClick = "deleteBook(this.id)" id="${index}" class="btn btn-primary">Delete</button></td>
                        </tr>
        `;
            tableBody.innerHTML += uiString;
        });
    }
}

function deleteBook(index) {
    // console.log('I am deleting',index);
    let books = localStorage.getItem('booksName');
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }

    booksObj.splice(index, 1);
    localStorage.setItem('booksName', JSON.stringify(booksObj));
    showBooks();
}

