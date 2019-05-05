import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BooksOnTheShelf from '../components/BooksOnTheShelf';

const MainPage = (props) => {
  const { allBooks, handleShelfUpdate } = props;
  const booksOnShelves = new Map();
  allBooks.forEach(book => {
    let booksOnTheShelf = booksOnShelves.get(book.shelf)
    if (!booksOnTheShelf) {
      booksOnShelves.set(book.shelf, [book])
    } else {
      booksOnTheShelf.push(book)
      booksOnShelves.set(book.shelf, booksOnTheShelf)
    }
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <BooksOnTheShelf
        booksOnShelves={booksOnShelves}
        handleShelfUpdate={handleShelfUpdate}
        />
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

MainPage.propTypes = {
  allBooks: PropTypes.array.isRequired,
  handleShelfUpdate: PropTypes.func.isRequired,
};

export default MainPage;
