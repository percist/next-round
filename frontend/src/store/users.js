import { fetch } from './csrf.js';

const SET_ALL_USERS = 'SET_ALL_USERS';

const setUsers = (users) => {
    return {
        type: SET_ALL_USERS,
        payload: users,
    }
}

export const fetchAllBuddies = (userId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/users/${userId}/buddies`);
        dispatch(
            setUsers(response.data.follower)
        );
    };
}

const initialState = {}

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ALL_USERS:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reducer;