import unknownAvatar from '../images/unknown.jpg';
const { fromJS } = require('immutable');

const initialState = fromJS({
    session: {
        token: null, 
        userName: null,
        userImage: null,
        userEmail: null,
        userCode: null,
    },
});

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            // TODO - save in local storage
            console.log(action.response);
            return state.set('session', {
                token: action.token,
                userName: action.response.name,
                userImage: action.response.picture,
                userEmail: action.response.email,
                userCode: action.response.id,
            });
        case 'ENTERED_WITHOUT_LOGIN':
            return state.set('session', {
                token: action.token,
                userName: 'Anonymous',
                userImage: unknownAvatar,
                userEmail: 'unknown@anonymous.com',
                userCode: -1,
            });
        default:
            return state;
    }
}

export default rootReducer;
