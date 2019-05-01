import React from 'react'
import './App.css'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import { BrowserRouter as Router, Route } from "react-router-dom"

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
