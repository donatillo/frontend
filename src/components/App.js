import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Main from './Main';

class App extends Component {

  render() {
    if (this.props.token != null)
      return <Main />;
    else
      return <Login updateSession={this.updateSession} />;
  }
}

export default connect()(App);
