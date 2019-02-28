export const userLogin = token => {
    return (dispatch, getState) => {
        dispatch(userLoginStarted());

        fetch(process.env.REACT_APP_BACKEND_URL + "/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ token: token })
        })
        .then(resp => resp.json())
        .then(data => dispatch(userLoginSuccess(token, data)))
        .catch(err => dispatch(userLoginError(err)));   // TODO - deal with error
    };
}

const userLoginStarted = token => {
    return {
        type: 'USER_LOGIN_STARTED',
    };
}

const userLoginSuccess = (token, response) => {
    return {
        type: 'USER_LOGIN_SUCCESS',
        token: token,
        response: response,
    };
}

const userLoginError = error => {
    return {
        type: 'USER_LOGIN_ERROR',
        error: error,
    };
}

export function enterWithoutLogin() {
    return {
        type: 'ENTERED_WITHOUT_LOGIN',
    };
}
