import { fetch } from './csrf.js';

const SET_ALL_ROUNDS = "SET_ALL_ROUNDS";
const SET_ONE_ROUND = "SET_ONE_ROUND";
const SET_UPDATED_ROUND = "SET_UPDATED_ROUND";

const setAllRounds = (rounds) => {
    return {
        type: SET_ALL_ROUNDS,
        payload: rounds
    }
}

const setOneRound = (round) => {
    return {
        type: SET_ONE_ROUND,
        payload: round
    }
}

const setUpdatedRound = (round) => {
    return {
        type: SET_UPDATED_ROUND,
        payload: round
    }
}

export const fetchAllBuddyRounds = (userid) => {
    return async (dispatch) => {
        const response = await fetch(`/api/rounds/buddies/${userid}`);
        dispatch(setAllRounds(response.data.payload));
    };
};

export const fetchAllUserRounds = (userid) => {
    return async (dispatch) => {
        const response = await fetch(`/api/rounds/users/${userid}`);
        dispatch(setAllRounds(response.data));
    };
};

export const fetchAllSiteRounds = (siteId) => {
    return async (dispatch) => {
        const response = await fetch(`/api/rounds/sites/${siteId}`);
        dispatch(setAllRounds(response.data));
    };
};

export const createOneRound = ({itemId, receiverId}) => async (dispatch) => {
    const response = await fetch(`/api/rounds`, {
        method: 'POST',
        headers:{
            'Content-Type': "application/json", 
            },
        body: JSON.stringify({
            itemId,
            receiverId
        })
    }); 
    dispatch(setOneRound(response.data));
    return response.data;
}

export const fetchUpdateRoundToClaimed = (roundId, comment) => async (dispatch) => {
    const response = await fetch(`/api/rounds/${roundId}`, {
        method: 'PUT',
        headers:{
            'Content-Type': "application/json", 
          },
        body: JSON.stringify({
            status: "recipientClaimed",
            comment: comment
        })
    })
    dispatch(setUpdatedRound(response.data));
    return response.data
}

const initialState = {}

function reducer(state = initialState, action){
    let newState;
    switch (action.type){
        case SET_ONE_ROUND:
            newState = action.payload;
            return newState;
        case SET_ALL_ROUNDS:
            newState = action.payload;
            return newState;
        case SET_UPDATED_ROUND:
            newState = [...state, action.payload];
            return newState;
        default:
            return state;
    }
}

export default reducer;