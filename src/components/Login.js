import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { user_login } from '../actions/token'

class Login extends Component {

  loginFailure = (e) => {
    console.log(e); // TODO - deal with error
  }

  loginSuccess = (e) => {
    // TODO - login
    console.log(e); // TODO - deal with error
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

export default Login;
