import { fetch } from './csrf.js';

const SET_ONE_SITE = "SET_ONE_SITE"
const SET_ALL_SITES = "SET_ALL_SITES"

const setSite = (site) => ({
  type: SET_ONE_SITE,
  payload: site
});

const setSites = (sites) => ({
  type: SET_ALL_SITES,
  payload: sites
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
  const response = await fetch('/api/sites/', {
    method: 'POST',
    body: formData,
  });
  dispatch(setSite(response.data));
  return response.data;
};

export const fetchOneSite = (siteId) => async (dispatch) => {
  const response = await fetch(`/api/sites/${siteId}`);
  dispatch(
    setSite(response.data.site)
  )
}

export const fetchAllSites = () => async (dispatch) => {
  const response = await fetch(`/api/sites`);
  dispatch(
    setSites(response.data.sites)
  )
}

const initialState = {}

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ONE_SITE:
      newState = action.payload;
      return newState;
    case SET_ALL_SITES:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export default reducer;