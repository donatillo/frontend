import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import Login from './Login';
import Main from './Main';
import Session from '../service/Session';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { session : new Session() };
  }

  updateSession = (response) => {
    this.state.session.update(response);
    this.setState({ session : this.state.session });
  }

  render() {
    if (this.state.session.is_logged_in())
      return <Main />;
    else
      return <Login updateSession={this.updateSession} />;
  }
}

export default App;
