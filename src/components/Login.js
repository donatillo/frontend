import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

class Login extends Component {

  loginFailure = (e) => {
    console.log(e); // TODO - deal with error
  }

  render() {
    return <GoogleLogin
      clientId="811389324926-r7avgrieateldgm2sbg9oudu10ulsrho.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={this.props.updateSession}
      onFailure={this.loginFailure}
    />;
  }
}

export default Login;
