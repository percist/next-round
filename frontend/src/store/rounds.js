import { fetch } from './csrf.js';

const SET_ALL_ROUNDS = "SET_ALL_ROUNDS";

const setAllRounds = (rounds) => {
    return {
        type: SET_ALL_ROUNDS,
        payload: rounds
    }
}

export const fetchAllBuddyRounds = (userid) => {
    return async (dispatch) => {
        const response = await fetch(`/api/rounds/buddies/${userid}`);
        dispatch(setAllRounds(response.data.payload));
    };
};

export const fetchAllSiteRounds = (siteId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/rounds/sites/${siteId}`);
        dispatch(setAllRounds(response.data.payload));
    };
};

const initialState = {}

function reducer(state = initialState, action){
    let newState;
    switch (action.type){
        case SET_ALL_ROUNDS:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reducer;