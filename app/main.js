const endpoint = `https://guilhermeonrails.github.io/casadocodigo/livros.json`;

async function loadBooks() {
  try {
    const response = await fetch(endpoint);
    books = await response.json();
    return books;
  } catch (error) {
    console.log(error);
  }
}

//
// MAIN.JS
//

loadBooks().then((books) =>
  books != undefined && books != null
    ? createElements(onSale(books))
    : null
);
