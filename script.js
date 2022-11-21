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
  const container = document.querySelector(".book-container");
  myLibrary.forEach((book) => {
    const newCard = document.createElement('div');
    newCard.textContent = `${book.title} | ${book.author} | ${book.pages} | ${book.readStatus}`
    container.append(newCard);
  })
}

renderBooks();
