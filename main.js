'use script'

let library = [
  {
    title: 'The fine balance',
    author: 'Rohinton Mistry'
  },
  {
    title: 'The alchemist',
    author: 'Paulo Coelho'
  }
];

const Book = function (title,author) {
  this.title = title
  this.author = author
}

// display books
const libraryContainer = document.querySelector('.library')

  for(let i=0; i<library.length; i++){
    const html = ` <div class="book-card">
    <p class="book-title">${library[i].title}</p>
    <p class="book-author">${library[i].author}</p>
    <button class="remove-btn">Remove</button>
  </div>`
  libraryContainer.innerHTML += html;
  }

const addBtn = document.querySelector('.btn-add');
const newAuthor = document.querySelector('.author-book-add');
const newTitle = document.querySelector('.title-book-add');

console.log(newTitle.value);

const newBook = function (e) {
   e.preventDefault();
   const titleNew = newTitle.value;
   const authorNew = newAuthor.value;
   const newBook = new Book(titleNew,authorNew);
   library.push(newBook);
   const html = `<div class="book-card">
   <p class="book-title">${titleNew}</p>
   <p class="book-author">${authorNew}</p>
   <button class="remove-btn">Remove</button>
 </div>`
 libraryContainer.innerHTML += html;
}
addBtn.addEventListener('click',newBook)

