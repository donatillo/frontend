import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
  const id_token = response.getAuthResponse().id_token;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', process.env.REACT_APP_BACKEND_URL + '/tokensignin', true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send(JSON.stringify({ "token": id_token }));
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
