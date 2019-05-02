import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookItem from '../components/BookItem'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
  }

  handleQueryUpdate(event) {
    const query = event.target.value
    this.setState({ query })
    if (!query || query.length < 1) {
      this.setState({ results: [] })
    } else {
      BooksAPI.search(query).then(res => {
        this.setState({ results: res })
      })
    }
  }

  render() {
    const { query, results } = this.state
    let filteredResults = results && results.length > 0 ?
      results.filter(book => book.imageLinks && book.imageLinks.thumbnail) :
      []

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleQueryUpdate}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { filteredResults && filteredResults.map(book => (
              <li key={book.id}>
                <BookItem
                  book={book}
                  handleShelfUpdate={this.props.handleShelfUpdate}
                  />
              </li>
            ))}
          </ol>
        </div>
      </div>)
  }
}

SearchPage.propTypes = {
  handleShelfUpdate: PropTypes.func.isRequired,
}

export default SearchPage
