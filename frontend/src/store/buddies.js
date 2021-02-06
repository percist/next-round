import { fetch } from './csrf.js';

const SET_ALL_BUDDIES = 'SET_ALL_BUDDIES';

const setBuddies = (buddies) => {
    return {
        type: SET_ALL_BUDDIES,
        payload: buddies,
    }
}

export const fetchAllBuddies = (userId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/users/${userId}/buddies`);
        dispatch(
            setBuddies(response.data.following)
        );
    };
}

const initialState = {}

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ALL_BUDDIES:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reducer;