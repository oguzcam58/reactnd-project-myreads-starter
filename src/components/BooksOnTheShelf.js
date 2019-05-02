import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'

class BooksOnTheShelf extends Component {
  render() {
    const { booksOnShelves, handleShelfUpdate } = this.props
    const bookShelves = [{title: "Currently Reading", books: booksOnShelves.get("currentlyReading")},
      {title: "Want to Read", books: booksOnShelves.get("wantToRead")},
      {title: "Read", books: booksOnShelves.get("read")}]

    return (
      <div className="list-books-content">
        <div>
          { bookShelves.map(shelf =>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { shelf.books && shelf.books.map(book => (
                    <li key={book.id}>
                      <BookItem
                        book={book}
                        handleShelfUpdate={handleShelfUpdate}
                        />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>)
  }
}

BooksOnTheShelf.propTypes = {
  booksOnShelves: PropTypes.instanceOf(Map).isRequired,
  handleShelfUpdate: PropTypes.func.isRequired,
}

export default BooksOnTheShelf
