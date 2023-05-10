function onSale(booksArray) {
  const perc = 0.05;
  const saleBooks = booksArray.map((book) => {
    return { ...book, preco: book.preco *= (1 - perc) };
  });
  return saleBooks;
}

function onFilter(booksArray, filter) {
  const filtered = booksArray.filter(
    (book) => 
      book.categoria == filter
  )
  return filtered
}

function availableBooks(booksArray) {
  const filtered = booksArray.filter((book) => book.quantidade > 0)
  createElements(filtered)
}

function sortBooks(booksArray) {
  const sorted = booksArray.sort((a, b) => a.preco - b.preco)
  createElements(sorted)
}

function filterBooks(booksArray, filter) {
  if (filter == 'available') {
    availableBooks(booksArray)
    return
  }
  
  if (filter == 'price') {
    sortBooks(booksArray)
    return
  }

  const filtered = onFilter(booksArray, filter)
  createElements(filtered)
}


