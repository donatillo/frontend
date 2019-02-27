import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions/token'
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

function mapDispatchToProps(dispatch) {
  return {
    userLogin: token => dispatch(userLogin(token))
  }
}

class Login extends Component {

  loginFailure = (e) => {
    console.log(e); // TODO - deal with error
  }

  loginSuccess = (e) => {
    console.log('Successful login!');
    console.log(e);
    this.props.userLogin(e.tokenId);
  }

  render() {
    return <GoogleLogin
      clientId="811389324926-r7avgrieateldgm2sbg9oudu10ulsrho.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={this.loginSuccess}
      onFailure={this.loginFailure}
    />;
  }
}

export default connect(null, mapDispatchToProps)(Login);
