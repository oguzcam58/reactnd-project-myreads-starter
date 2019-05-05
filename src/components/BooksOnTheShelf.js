import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';

const BooksOnTheShelf = (props) => {
  const { booksOnShelves, handleShelfUpdate } = props;
  const bookShelves = [
    {title: "Currently Reading", books: booksOnShelves.get("currentlyReading")},
    {title: "Want to Read", books: booksOnShelves.get("wantToRead")},
    {title: "Read", books: booksOnShelves.get("read")}
  ];

  return (
    <div className="list-books-content">
      <div>
        { bookShelves.map(shelf =>
          <div className="bookshelf" key={shelf.title}>
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
    </div>
  );
}

BooksOnTheShelf.propTypes = {
  booksOnShelves: PropTypes.instanceOf(Map).isRequired,
  handleShelfUpdate: PropTypes.func.isRequired,
};

export default BooksOnTheShelf;
