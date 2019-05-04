import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookItem from '../components/BookItem'
import * as BooksAPI from '../BooksAPI'
import { debounce } from 'throttle-debounce'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: [],
      errorOccurred: false,
    }
    this.searchCall = debounce(500, this.searchCall);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
  }

  handleQueryUpdate(event) {
    const query = event.target.value
    this.setState({ query })
    this.searchCall(query)
  }

  searchCall(query) {
    if (!query || query.length < 1) {
      this.setState({ errorOccurred: false, results: [] })
    } else {
      BooksAPI.search(query).then(res => {
        if (query === this.state.query) {
          this.setState({ errorOccurred: false, results: res })
        }
      }).catch(() => {
        if (query === this.state.query) {
          this.setState( { errorOccurred: true, results: []} )
        }
      })
    }
  }

  render() {
    const { query, results, errorOccurred } = this.state
    const { allBooks } = this.props
    let filteredResults = results && results.length > 0 ?
      results.filter(book => book.imageLinks && book.imageLinks.thumbnail) :
      []

    filteredResults = filteredResults.map(currentBook => {
      let bookOnTheShelf = allBooks.filter(book => book.id === currentBook.id)
      currentBook.shelf = bookOnTheShelf.length === 1 ? bookOnTheShelf[0].shelf : 'none'
      return currentBook
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleQueryUpdate}/>
          </div>
        </div>
        <div className="search-books-results">
          { errorOccurred && (
            <span>Couldn't search for books for query '{query}'!</span>
          )}
          { query && !errorOccurred && filteredResults && filteredResults.length < 1 && (
            <span>Couldn't find any books for query '{query}'!</span>
          )}
          { filteredResults && filteredResults.length > 0 && (
            <ol className="books-grid">
              { filteredResults.map(book => (
                <li key={book.id}>
                  <BookItem
                    book={book}
                    handleShelfUpdate={this.props.handleShelfUpdate}
                    />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>)
  }
}

SearchPage.propTypes = {
  allBooks: PropTypes.array.isRequired,
  handleShelfUpdate: PropTypes.func.isRequired,
}

export default SearchPage
