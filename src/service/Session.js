import axios from "axios";

export default class Session {
  token = null;

  // TODO - initialize with browser value

  is_logged_in() { 
    return this.token != null;
  }

  update(response) {
    const id_token = response.getAuthResponse().id_token;
    console.log(id_token);

    // call backend
    axios.post(process.env.REACT_APP_BACKEND_URL + '/user', { 'token': id_token })
      .then(function (response) {})
      .catch(function (response) { throw response; });

    // TODO - if token valid, update values

    
    // TODO - save value in browser
  }
}
