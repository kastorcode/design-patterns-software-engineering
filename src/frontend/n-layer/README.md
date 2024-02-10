## N-Layer
Approach to organize code into different layers, each with its specific responsibility, helping to improve code modularity, maintainability and scalability. This architectural pattern has three major layers: data access, business logic and presentation, but it is open to add as many as necessary, i.e., n layers.

## Data Access Layer (Repository)
Deals with data storage and retrieval operations.

## Business Logic Layer (Service)
Manages application logic, processes data and enforces business rules.

## Presentation Layer (UI)
Responsible for interacting with the user, for example: a user interface (UI) or command line console.
```js
class BookRepository {
  constructor () {
    this.books = [
      { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
      { id: 2, title: 'Design Patterns', author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides' },
      { id: 3, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford' }
    ]
  }
  getAllBooks () {
    return this.books
  }
  getBooksLength () {
    return this.books.length
  }
  getBookByIndex (index) {
    return this.books[index] || null
  }
  getBookById (bookId) {
    return this.books.find(({ id }) => id === bookId) || null
  }
  findBook (bookTitle, bookAuthor) {
    return this.books.find(({ title, author }) => title === bookTitle && author === bookAuthor) || null
  }
  addBook (book) {
    return this.books.push(book)
  }
  deleteBookByIndex (index) {
    return this.books.splice(index, 1)[0]
  }
  deleteBookById (bookId) {
    const index = this.books.findIndex(({ id }) => id === bookId)
    if (index === -1) return null
    return this.books.splice(index, 1)[0]
  }
  createBookId () {
    return this.books[this.books.length - 1].id + 1
  }
  createBook ({ title, author }) {
    return {
      id: this.createBookId(),
      title,
      author
    }
  }
  validateBook ({ id, title, author }) {
    if (typeof id !== 'number' || id < 1) {
      throw new Error('invalid id')
    }
    if (typeof title !== 'string' || title.length < 2 || title.length > 64) {
      throw new Error('invalid title')
    }
    if (typeof author !== 'string' || author.length < 2 || author.length > 64) {
      throw new Error('invalid author')
    }
  }
}

class LibraryService {
  constructor (bookRepository) {
    this.bookRepository = bookRepository
  }
  getAllBooks () {
    return this.bookRepository.getAllBooks()
  }
  getBookByIndex (index) {
    return this.bookRepository.getBookByIndex(index)
  }
  getBookById (bookId) {
    return this.bookRepository.getBookById(bookId)
  }
  findBook (bookTitle, bookAuthor) {
    return this.bookRepository.findBook(bookTitle, bookAuthor)
  }
  addBook (book) {
    this.bookRepository.validateBook(book)
    const exist =
      this.bookRepository.getBookById(book.id) ||
      this.bookRepository.findBook(book.title, book.author)
    if (exist) throw new Error('book already added')
    return this.bookRepository.addBook(book)
  }
  deleteBookByIndex (index) {
    if (typeof index !== 'number' || index < 0 || index > this.bookRepository.getBooksLength()) {
      return null
    }
    return this.bookRepository.deleteBookByIndex(index)
  }
  deleteBookById (bookId) {
    return this.bookRepository.deleteBookById(bookId)
  }
  createBook ({ title, author }) {
    const book = this.bookRepository.createBook({ title, author })
    this.bookRepository.validateBook(book)
    return book
  }
}

class LibraryUI {
  static getLengthiest (books) {
    let lengthiest = 0
    books.forEach(({ title: { length } }) => {
      if (length > lengthiest) lengthiest = length
    })
    return lengthiest
  }
  static getSpaces (length, lengthiest) {
    const l = lengthiest - length + 2
    let spaces = ''
    for (let i = 0; i < l; i++) {
      spaces += ' '
    }
    return spaces
  }
  static displayAllBooks (books) {
    const lengthiest = LibraryUI.getLengthiest(books)
    console.log('***** LIBRARY *****')
    books.forEach(({ id, title, author }) => {
      console.log(`[${id}]`, title, LibraryUI.getSpaces(title.length, lengthiest), author)
    })
    console.log('*******************\n')
  }
  static displayBook ({ id, title, author }) {
    console.log('***** BOOK *****')
    console.log(`${id}. ${title}\n${author}`)
    console.log('****************\n')
  }
}

const bookRepository = new BookRepository()
const libraryService = new LibraryService(bookRepository)

libraryService.addBook(libraryService.createBook({
  title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas'
}))

LibraryUI.displayAllBooks(libraryService.getAllBooks())
LibraryUI.displayBook(libraryService.getBookByIndex(0))
```