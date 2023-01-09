'use script'

let library = [
  {
    title: 'The fine balance',
    author: 'Rohinton Mistry',
    pages: 600
  },
  {
    title: 'The alchemist',
    author: 'Paulo Coelho',
    pages: 192
  }
];

const Book = function (title,author,pages) {
  this.title = title
  this.author = author
  this.pages = pages
}

Book.prototype.readornot = function(){

}
//Local storage

const bookValue = JSON.parse(localStorage.getItem('library'));
if (bookValue === 0 || bookValue === null) {
  localStorage.setItem('local', JSON.stringify(library));
} else {
  library = bookValue;
}

// display books
const libraryContainer = document.querySelector('.library')

  for(let i=0; i<library.length; i++){
    const html = ` <div class="book-card">
    <p class="book-title">${library[i].title}</p>
    <p class="book-author">${library[i].author}</p>
    <p class="book-pages">${library[i].pages}</p>
    <button data-id="${i}" class="read-btn">Not yet</button>
    <button data-id="${i}"class="remove-btn">Remove</button>
    
  </div>`
  libraryContainer.innerHTML += html;
  
  }
const addBtn = document.querySelector('.btn-add');
const newAuthor = document.querySelector('.author-book-add');
const newTitle = document.querySelector('.title-book-add');
const removeBtn = document.querySelectorAll('.remove-btn');

//Add new book
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
   <button class="read-btn">Not read</button>
 </div>`
 libraryContainer.innerHTML += html;
 localStorage.setItem('local', JSON.stringify(library)); // LOCAL STORAGE
}

addBtn.addEventListener('click',newBook)



document.getElementById('book-list').addEventListener('click',function(e){
if(e.target.className=== "remove-btn") {
  const { id } = e.target;
    library = library.filter((bk) => JSON.stringify(bk.id) !== id);
    localStorage.setItem('local', JSON.stringify(library)); // LOCAL STORAGE
  e.target.parentElement.remove();
}
})

document.getElementById('book-list').addEventListener('click', function(e){
  if(e.target.className ==="read-btn" && e.target.textContent === 'Not read'){
    e.target.textContent = 'Read'
  } if (e.target.className === 'read-btn' && e.target.texContent === 'Read'){
    e.target.textContent = 'Not read'
  }
})