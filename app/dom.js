const booksDOM = document.querySelector("#livros");
const navDOM = document.querySelector('.nav')
const buttonsDOM = document.querySelectorAll('.btn')

const filterFrontBtn = navDOM.querySelector('#btnFiltrarLivrosFront')
const filterBackBtn = navDOM.querySelector('#btnFiltrarLivrosBack')
const filterDataBtn = navDOM.querySelector('#btnFiltrarLivrosDados')
const filterAvailableBtn = navDOM.querySelector('#btnLivrosDisponiveis')
const sortBooksBtn = navDOM.querySelector('#btnOrdenarPorPreco')

//
// DOM HANDLING
//

function createElements(elements) {
  // cleaning mess that might have been made beforehand
  booksDOM.innerHTML = ''

  let total_price = 0
  
  elements.forEach((
    element => {
      createElement(element)
      total_price += element.preco
    }
  ))
  
  // ! below example is shit because it's an unnecessary second for loop
  // ! but it is indeed a good example of using reduce
  // total_price = elements.reduce((acc, book) => acc + book.preco, 0)

  document.querySelector('#valor').textContent = (total_price * 0.93).toFixed(2)
}

function createElement(element) {
  fragment = document.createDocumentFragment();

  const div = document.createElement("div");
  div.classList.add("livro");

  const img = document.createElement("img");
  img.classList.add("livro__imagens");
  if (element.quantidade <= 0) {
    img.classList.add('indisponivel')
  }
  img.src = element.imagem;
  img.alt = element.alt;

  const h2 = document.createElement("h2");
  h2.classList.add("livro__titulo");
  h2.innerHTML = element.titulo;

  const desc = document.createElement("p");
  desc.classList.add("livro__descricao");
  desc.innerHTML = element.autor;

  const price = document.createElement("p");
  price.classList.add("livro__preco");
  price.innerHTML = `R$ ${element.preco.toFixed(2)}`;

  const tags = document.createElement("div");
  tags.classList.add("tags");
  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.innerHTML = element.categoria;
  tags.appendChild(tag);

  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(desc);
  div.appendChild(price);
  div.appendChild(tags);

  fragment.appendChild(div);
  booksDOM.appendChild(fragment);
}

//
// EVENT LISTENERS
//

/* rationalisations
! this only loads when you click, loadBooks() runs only when you click a button
! thing is it could be many many times

buttonsDOM.forEach(
  (button) => {
    button.addEventListener('click', () => {
    const tag = button.value
    console.log('this many times')
    loadBooks().then(
      (elements) => filterBooks(elements, tag)
    )
    })
  }
)

! this pre-loads every event, loadBooks() runs 5 times but always before

buttonsDOM.forEach(
  (button) => {
    loadBooks().then(
      (elements) => {
      console.log('loadBooks was used this many times.')
      button.addEventListener('click', () => {
        const tag = button.value
        filterBooks(elements, tag) 
      })
    }
    )
  }
)
*/

// ! this is parfait, because it runs only once, regardless of how many
// ! times you click on it, loadBooks() only runs once
// ! downside is you need to F5 the page if a new book is inserted

loadBooks().then(
  (books) => {
    books = onSale(books)
    buttonsDOM.forEach(
      (button) => button.addEventListener('click', () => {
        const tag = button.value
        filterBooks(books, tag)
      })
    )
  }
)













/* rationalisations
! this is what I did first, but too verbose, I suppose, got rid of it
! after checking out that Guilherme was doing a forEach on the buttons

filterFrontBtn.addEventListener('click', () => {
  loadBooks().then(
    (elements) => filterBooks(elements, 'front-end')
  )
})

filterBackBtn.addEventListener('click', () => {
  loadBooks().then(
    (elements) => filterBooks(elements, 'back-end')
  )
})

filterDataBtn.addEventListener('click', () => {
  loadBooks().then(
    (elements) => filterBooks(elements, 'dados')
  )
})

filterAvailableBtn.addEventListener('click', () => {
  loadBooks().then(
    (elements) => availableBooks(elements)
  )
})

sortBooksBtn.addEventListener('click', () => {
  loadBooks().then(
    (elements) => sortBooks(elements)
  )
})
*/
