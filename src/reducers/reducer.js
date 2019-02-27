const { Map } = require('immutable');

const initialState = Map({
    token: null, 
});

function rootReducer(state = initialState, action) {
    if (action.type === 'USER_LOGGED_IN') {
        console.log('Login received.');
        // TODO - everything else
        return Object.assign({}, state, {
            token: action.token
        });
    }
    return state;
}

export default rootReducer;