import { fetch } from './csrf.js';

const SET_ONE_SITE = "SET_ONE_SITE"

const setSite = (site) => ({
    type: SET_ONE_SITE,
    payload: site
});

export const createNewSite = (site) => async (dispatch) => {
    const { name, address, city, state, image, website, zip, active } = site;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("website", website);
    formData.append("zip", zip);
    formData.append("active", active);
    if (image) formData.append("image", image);
    const response = await fetch('/api/sites', {
      method: 'POST',
      body: formData, 
    });
  
    dispatch(setSite(response.data.site));
    return response;
};

export const fetchOneSite = (siteId) => async (dispatch) => {
    const response = await fetch(`/api/sites/${siteId}`);
    dispatch(
        setSite(response.data.site)
    )
}

const initialState = {}

function reducer(state = initialState, action){
    let newState;
    switch (action.type){
        case SET_ONE_SITE:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reducer;