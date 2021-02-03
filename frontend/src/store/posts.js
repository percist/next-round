import { fetch } from './csrf.js';

const SET_ALL_POSTS = "SET_ALL_POSTS";

const setAllPosts = (posts) => {
    return {
        type: SET_ALL_POSTS,
        payload: posts
    }
}

export const fetchAllBuddyPosts = (userid) => {
    return async (dispatch) => {
        const response = await fetch(`/api/posts/buddies/${userid}`);
        dispatch(setAllPosts(response.data.posts));
    };
};


const initialState = {}

function reducer(state = initialState, action){
    let newState;
    switch (action.type){
        case SET_ALL_POSTS:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reducer;