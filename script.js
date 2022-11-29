"use strict"

const myLibrary = [];

const createUUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;

  this.id = createUUID();
}

Book.prototype.isInvalid = function() {
  return Object.values(this).some((v) => v.length === 0);
}

function addBookToLibrary(book) {
  if (book.isInvalid()) return;

  myLibrary.push(book);
}

function removeBookFromLibrary(bookID) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookID);
  myLibrary.splice(bookIndex, 1);
}

// stock books
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

const libraryContainer = document.querySelector(".library");

function buildBookFromForm() {
  const properties = ["title", "author", "pages"];
  const formNodes = properties.map((prop) => document.getElementById(prop));
  const inputValues = formNodes.map((node) => node.value);
  inputValues.push(document.getElementById("readStatus").checked);
  formNodes.forEach((node) => node.value = "");
  return new Book(...inputValues);
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newBook = buildBookFromForm();
  addBookToLibrary(newBook);
  renderBooks();
  toggleModal();
})

function renderBooks() {
  libraryContainer.replaceChildren();
  myLibrary.forEach((book) => {
    createBookCard(book);
  })
}

function createBookCard(book) {
  const template = document.getElementById("book-template");

  const clone = template.content.cloneNode(true);

  for (const [prop, value] of Object.entries(book)) {
    if (prop === "id") {
      const deleteButton = clone.querySelector('button');
      deleteButton.setAttribute("data-id", value)
      continue;
    };

    const field = clone.querySelector(`[data-prop='${prop}']`)
    field.textContent = value;
  }

  libraryContainer.appendChild(clone);
}

function toggleModal() {
  const modalBox = document.querySelector('.modal-box');
  const modalOverlay = document.querySelector('.modal-overlay');
  modalBox.classList.toggle('closed');
  modalOverlay.classList.toggle('closed');
}

function removeBookHandler(event) {
  const target = event.target;
  if (target.dataset.btn !== "delete") return;

  const id = target.dataset.id;
  removeBookFromLibrary(id);
  renderBooks();
}

libraryContainer.addEventListener("click", removeBookHandler);

const addBookButton = document.getElementById("add-book");
addBookButton.addEventListener("click", toggleModal);

renderBooks();
