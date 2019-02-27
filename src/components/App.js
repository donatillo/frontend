import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginScreen from './LoginScreen';
import Main from './Main';

const mapStateToProps = state => {
  return { token: state.token };
}

class App extends Component {
  render() {
    if (this.props.token != null)
      return <Main />;
    else
      return <LoginScreen />;
  }
}

App.propTypes = {
  token: PropTypes.string
}

export default connect(mapStateToProps)(App);
