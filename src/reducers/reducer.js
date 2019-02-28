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
        case 'USER_LOGGED_IN':
            // get data from API
            fetch(process.env.REACT_APP_BACKEND_URL + "/authenticate", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ token: action.token })
            })
                .then((response) => {
                    console.log(response.status());
                })
                .catch(() => console.log("error"));

            // TODO - save in local storage
            return state.set('session', {
                token: action.token,
                userName: null,  // TODO
                userImage: null,  // TODO
                userEmail: null,  // TODO
                userCode: 0,  // TODO
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
