const { Map } = require('immutable');

const initialState = Map({
    token: null, 
});

function reducer(state = initialState, action) {
    return state;
}

export default reducer;