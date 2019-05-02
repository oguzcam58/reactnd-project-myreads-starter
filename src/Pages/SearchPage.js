import React from 'react';
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
    let filteredResults = results && results.length > 0 ? results.filter(book => book.authors) : []

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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

export default SearchPage
