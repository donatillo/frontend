import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
  console.log(response.getAuthResponse().id_token);

  /*
  var xhr = new XMLHttpRequest();
  xhr.open('POST', process.env.REACT_APP_BACKEND_URL + 'tokensignin');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send('idtoken=' + id_token);
  */
}

class Login extends Component {
  render() {
    return <GoogleLogin
      clientId="811389324926-r7avgrieateldgm2sbg9oudu10ulsrho.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />;
  }
}

export default Login;
