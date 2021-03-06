import React from 'react';
import PropTypes from 'prop-types';

const BookItem = ({ book, handleShelfUpdate }) => {
  const { imageLinks, shelf, title, authors } = book;
  const selectedShelf = shelf ? shelf : 'none';
  const thumb = imageLinks ? imageLinks.thumbnail : 'https://via.placeholder.com/128x193?text=No%20Cover';

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumb}")` }}></div>
        <div className="book-shelf-changer">
          <select value={selectedShelf} onChange={(event) => handleShelfUpdate(book, event)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{!authors ? '' : authors.join(', ')}</div>
    </div>);
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  handleShelfUpdate: PropTypes.func.isRequired,
};

export default BookItem;
