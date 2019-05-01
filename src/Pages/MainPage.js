import React from 'react';
import { Link } from 'react-router-dom'
import BooksOnTheShelf from '../components/BooksOnTheShelf'

class MainPage extends React.Component {
  render() {
    const { allBooks, handleShelfUpdate } = this.props
    const shelves = new Map()
    allBooks.map(book => {
      let booksOnTheShelf = shelves.get(book.shelf)
      if (!booksOnTheShelf) {
        shelves.set(book.shelf, [book])
      } else {
        booksOnTheShelf.push(book)
        shelves.set(book.shelf, booksOnTheShelf)
      }
      return book
    })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BooksOnTheShelf
          shelves={shelves}
          handleShelfUpdate={handleShelfUpdate}
          />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>)
  }
}

export default MainPage
