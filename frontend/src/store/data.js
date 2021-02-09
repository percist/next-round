import { fetch } from './csrf.js';

const SET_SITE_DATA = "SET_SITE_DATA";

const setSiteData = (data) => {
    return {
        type: SET_SITE_DATA,
        payload: data
    }
}

export const fetchDataForSite = (siteId, dateRange) => {
    return async (dispatch) => {
        const response = await fetch(`/api/data/${siteId}/${dateRange}`);
        dispatch(setSiteData(response.data.payload));
    }
}

const initialState = {}

function reducer(state = initialState, action){
    let newState;
    switch (action.type){
        case SET_SITE_DATA:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reducer;