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

  handleShelfUpdate(id, event) {
    const { allBooks } = this.state
    const book = allBooks.filter(book => book.id === id).map(book => book)
    const selectedShelf = event.target.value
    BooksAPI.update(book, selectedShelf)
    let updatedBooks = allBooks.map(book => {
      if (book.id === id) {
        book.shelf = selectedShelf
      }
      return book
    })
    this.setState({ allBooks: updatedBooks })
  }

  render() {
    const { allBooks } = this.state
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={() =>
            <MainPage
              allBooks={allBooks}
              handleShelfUpdate={this.handleShelfUpdate}
              />
            }/>
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
