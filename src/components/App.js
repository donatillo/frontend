import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Login';
import Main from './Main';

const mapStateToProps = state => {
  return { token: state.token };
}

class App extends Component {
  render() {
    if (this.props.token != null)
      return <Main />;
    else
      return <Login />;
  }
}

App.propTypes = {
  token: PropTypes.string
}

export default connect(mapStateToProps)(App);
