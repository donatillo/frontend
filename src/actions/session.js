export function userLogin(token) {
    return {
        type: 'USER_LOGGED_IN',
        token: token,
    };
}

export function enterWithoutLogin() {
    return {
        type: 'ENTERED_WITHOUT_LOGIN',
    };
}