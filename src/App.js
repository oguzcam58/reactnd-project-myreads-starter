import React from 'react'
import './App.css'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import { BrowserRouter as Router, Route } from "react-router-dom"
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { allBooks: []}

    this.handleShelfUpdate = this.handleShelfUpdate.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(response => {
      this.setState({ allBooks: response })
    })
  }

  handleShelfUpdate(selectedBook, event) {
    const { allBooks } = this.state
    const selectedShelf = event.target.value
    BooksAPI.update(selectedBook, selectedShelf)
    let existingBook = false
    let updatedBooks = allBooks.map(book => {
      if (book.id === selectedBook.id) {
        book.shelf = selectedShelf
        existingBook = true
      }
      return book
    })
    if (!existingBook) {
      selectedBook.shelf = selectedShelf
      updatedBooks.push(selectedBook)
    }
    this.setState({ allBooks: updatedBooks })
  }

  render() {
    const { allBooks } = this.state
    return (
      <Router>
        <div className="app">
          <Route exact path="/"
            render={() =>
              <MainPage
                allBooks={allBooks}
                handleShelfUpdate={this.handleShelfUpdate}
                />
            } />
          <Route path="/search"
            render={() =>
              <SearchPage
                handleShelfUpdate={this.handleShelfUpdate}
              />
            } />
        </div>
      </Router>
    )
  }
}

export default BooksApp
