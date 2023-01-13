'use script'

const addBtn = document.querySelector('.btn-add');
const newTitleInput = document.querySelector('.title-book-add');
const newAuthorInput = document.querySelector('.author-book-add');
const newPagesInput = document.querySelector('.pages-book-add');
const libraryContainer = document.querySelector('.library');
const listLink = document.querySelector('.nav-list');
const addLink = document.querySelector('.nav-add');
const contactLink = document.querySelector('.nav-contact');
const listSection = document.querySelector('.list-section');
const addSection = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');
const dateToday = document.querySelector('.date-display');
const checkbox = document.querySelector('input[name="checkbox"]');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message')
const openModal = document.querySelector('.add-book-mobile');
const modal = document.querySelector('.form-container');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
let newId = 0;

// class constructor of the book object
class Book {
  constructor(title, author,pages, status, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
    this.id = id;
  }
}
// Class for Local Storage
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));//
    }
    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Class for interaction with UI
class UI {
  static displayBook() {
    const books = Storage.getBooks();
    books.forEach((newBook) => {
      UI.addBooktoLibrary(newBook);
    });
  }

  static addBooktoLibrary(newBook) {
    newBook.id = newId;
    if(newBook.status) {
      const html = `
    <div class="book-wrapper" id ="${newBook.id}">
      <p id="info-book" class="book-title">${newBook.title}</p>
      <p id="info-book" class="book-author">${newBook.author}</p>
      <p id="pages" class="book-pages">${newBook.pages}</p>
      <div id="readornot">
      <p class="read">READ</p>
      </div>
      <button id="${newBook.id}" class="remove-btn">x</button>
      <div class="line-bottom"></div>
    </div>
  `;
    libraryContainer.innerHTML += html;
    newId += 1;
    } if(newBook.status === false) {
      const html = `
    <div class="book-wrapper" id ="${newBook.id}">
      <p id="info-book" class="book-title">${newBook.title}</p>
      <p id="info-book" class="book-author">${newBook.author}</p>
      <p id="pages" class="book-pages">${newBook.pages}</p>
      <div>
      <p id="readornot" class="not-read">Not Yet</p>
      </div>
      <button id="${newBook.id}" class="remove-btn">
     x
      </button>
      <div class="line-bottom"></div>
    </div>
  `;
    libraryContainer.innerHTML += html;
    newId += 1;
    }
    
  }

  static clearFields() {
    newTitleInput.value = '';
    newAuthorInput.value = '';
    newPagesInput.value = '';
  }

  static successMsg() {
    successMessage.style.display = 'flex';
    setTimeout(() => successMessage.remove(), 3000);
  }
  static errorMsg() {
    errorMessage.style.display = 'flex';
    setTimeout(() => errorMessage.remove(), 3000);
  }
}
const addBookPressed = function (e) {
  e.preventDefault();
  const books = Storage.getBooks();
  const newTitle = newTitleInput.value;
  const newAuthor = newAuthorInput.value;
  const newPages = newPagesInput.value;
  let newId;
  const len = books.length;
  if (len === 0 || len === null) {
    newId = 0;
  } else {
    newId = books[len - 1].id + 1;
  }
  if (newTitle && newAuthor && newPages ) {
    if (checkbox.checked){
      const newBook = new Book(newTitle, newAuthor, newPages, true,newId); //
      UI.successMsg();
      Storage.addBook(newBook);
    UI.addBooktoLibrary(newBook);
    UI.clearFields();
      
    } else {
      const newBook = new Book(newTitle, newAuthor, newPages, false, newId); //
      Storage.addBook(newBook);
      UI.successMsg();
    UI.addBooktoLibrary(newBook);
    UI.clearFields();
    
    } 
  
  } else {
    UI.errorMsg();
  }
};

const openModalF = function() {
  modal.style.display = 'flex';
  modal.style.position = "fixed";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "white"
  modal.style.padding = "0"
  openModal.style.display = "none"
  
}

const closeModalF = function() {
  modal.style.display = "none";
  openModal.style.display = "block"
}
// Function to remove new Book
const removeBook = function (e) {
  if (e.target.classList.contains('remove-btn')) {
    let library = Storage.getBooks();
    const { id } = e.target;
    library = library.filter((bk) => JSON.stringify(bk.id) !== id);
    localStorage.setItem('books', JSON.stringify(library));
    e.target.parentElement.remove();
  }
};
///// EVENT LISTENERS
addBtn.addEventListener('click', addBookPressed);
libraryContainer.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', UI.displayBook);
openModal.addEventListener('click', openModalF);
closeModal.addEventListener('click',closeModalF)