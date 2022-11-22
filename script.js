"use strict"

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const pride = new Book(
  "Pride and Prejudice",
  "Jane Austen",
  432,
  false
)

const gatsby = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  208,
  true
)

addBookToLibrary(pride);
addBookToLibrary(gatsby);

function renderBooks() {
  myLibrary.forEach((book) => {
    createBookCard(book);
  })
}

function markupFor(book) {
  return (
    `<div class='library__card'>
      <div>${book.title}</div>
      <div>${book.author}</div>
      <div>${book.pages}</div>
      <div>${book.readStatus}</div>
    </div>`
  )
}

function createBookCard(book) {
  const range = document.createRange();
  const tagString = markupFor(book)

  range.selectNode(document.querySelector(".library"));
  const bookFragment = range.createContextualFragment(tagString);
  document.body.appendChild(bookFragment);
}

renderBooks();
