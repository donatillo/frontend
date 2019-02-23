import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Main from './Main';

class App extends Component {

  logged_in() { return false; }

  render() {
    if (this.logged_in())
      return <Main />;
    else
      return <Login />;
  }
}

export default App;
