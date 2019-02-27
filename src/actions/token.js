export function userLogin(token) {
    return {
        type: 'USER_LOGGED_IN',
        token: token,
    };
}