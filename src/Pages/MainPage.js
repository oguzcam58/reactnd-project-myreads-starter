import React from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BooksOnTheShelf from '../components/BooksOnTheShelf'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allBooks: []};
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(response => {
      console.log(`Response is ${JSON.stringify(response)}`)
      this.setState({ allBooks: response })
    })
  }

  render() {
    const { allBooks } = this.state
    const shelves = new Map()
    allBooks.map(book => {
      let booksOnTheShelf = shelves.get(book.shelf)
      if (!booksOnTheShelf) {
        shelves.set(book.shelf, [book])
      } else {
        booksOnTheShelf.push(book)
        shelves.set(book.shelf, booksOnTheShelf)
      }
    })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BooksOnTheShelf
          shelves={ shelves }
          />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>)
  }
}

export default MainPage
