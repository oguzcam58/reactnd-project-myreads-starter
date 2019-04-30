import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './Pages/MainPage'
import SearchPage from './Pages/SearchPage'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class BooksApp extends React.Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={MainPage} />
          <Route path="/search" component={SearchPage} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
