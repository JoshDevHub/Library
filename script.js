"use strict"

const myLibrary = [];

const createUUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    this.id = createUUID();
  }

  isInvalid() {
    return Object.values(this).some((v) => v.length === 0);
  }

  getTextProps() {
    return ['title', 'author', 'pages'];
  }

  toggleReadStatus() {
    this.readStatus = !this.readStatus;
  }
}

function addBookToLibrary(book) {
  if (book.isInvalid()) return;

  myLibrary.push(book);
}

function removeBookFromLibrary(bookID) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookID);
  myLibrary.splice(bookIndex, 1);
}

function updateReadStatusFor(bookID) {
  const book = myLibrary.find((book) => book.id === bookID);
  book.toggleReadStatus();
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
  const inputs = document.querySelectorAll("form input");

  let errorStatus = false;
  for (const input of inputs) {
    if (!input.validity.valid) {
      showErrorFor(input);
      errorStatus = true;
    }
  }
  if (errorStatus) return;

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

  book.getTextProps().forEach((prop) => {
    const field = clone.querySelector(`[data-prop='${prop}']`);
    field.textContent = book[prop];
  })

  const parent = clone.querySelector('div');
  parent.setAttribute("data-id", book.id);

  const toggleInput = clone.querySelector('input');
  const toggleLabel = clone.querySelector('label');

  toggleInput.checked = book.readStatus;
  toggleInput.setAttribute("id", book.id);
  toggleLabel.setAttribute("for", book.id);

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

  const id = target.parentElement.dataset.id;
  removeBookFromLibrary(id);
  renderBooks();
}

function updateReadHandler(event) {
  const target = event.target;
  if (target.dataset.btn !== 'update') return;

  const bookID = target.getAttribute('for')
  updateReadStatusFor(bookID);
}

libraryContainer.addEventListener("click", removeBookHandler);
libraryContainer.addEventListener("click", updateReadHandler);

const addBookButton = document.getElementById("add-book");
addBookButton.addEventListener("click", toggleModal);

renderBooks();

// Constraint Validations
const titleField = document.getElementById("title");
const authorField = document.getElementById("author");
const pagesField = document.getElementById("pages");

const patternValidations = {
  author: "Must contain letters and spaces only",
  pages: "Pages must be a number",
}

function showErrorFor(element) {
  const errorContainer = element.nextElementSibling;
  if (element.validity.valueMissing) {
    errorContainer.textContent = `${capitalize(element.id)} must be present.`;
  } else if (element.validity.patternMismatch) {
    errorContainer.textContent = patternValidations[element.id];
  }

  errorContainer.className = "error active";
}

function handleValidations(event) {
  const inputField = event.target;
  if (inputField.validity.valid) {
    const errorContainer = inputField.nextElementSibling;
    errorContainer.textContent = "";
    errorContainer.className = "error";
  } else {
    console.log("happening");
    showErrorFor(inputField);
  }
}

window.onload = () => {
  titleField.addEventListener("change", handleValidations);
  authorField.addEventListener("change", handleValidations);
  pagesField.addEventListener("change", handleValidations);
}
