import { fetch } from './csrf.js';

const SET_ALL_ITEMS = "SET_ALL_ITEMS"
const ADD_ONE_ITEM = "ADD_ONE_ITEM"
const REMOVE_ONE_ITEM = "REMOVE_ONE_ITEM"
const UPDATE_ONE_ITEM = "UPDATE_ONE_ITEM"

const setItems = (item) => ({
  type: SET_ALL_ITEMS,
  payload: item
});

const addOneItem = (item) => ({
  type: ADD_ONE_ITEM,
  payload: item
});

const removeOneItem = (item) => ({
  type: REMOVE_ONE_ITEM,
  payload: item
})

const updateOneItem = (item) => ({
  type: UPDATE_ONE_ITEM,
  payload: item
})

export const fetchAllSiteItems = (siteId) => async (dispatch) => {
  const response = await fetch(`/api/sites/${siteId}/items`);
  dispatch(
    setItems(response.data.site.Items.sort((a,b) => a.order < b.order))
  )
}

export const deleteMenuItem = (siteId, itemId) => async (dispatch) => {
  const response = await fetch(`/api/sites/${siteId}/items/${itemId}`, {
    method: 'DELETE',
  })
  dispatch(
    removeOneItem(response.data.site.item)
  )
}

export const createNewItem = (siteId, item) => async (dispatch) => {
  const { name, description, price, image, isActive } = item;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("isActive", isActive)
  if (image) formData.append("image", image);
  const response = await fetch(`/api/sites/${siteId}/items`, {
    method: 'POST',
    body: formData,
  });
  dispatch(addOneItem(response.data));
  return response.data;
}

export const editMenuItem = (siteId, item) => async (dispatch) => {
  const { name, description, price, image, isActive, id } = item;
  const formData = new FormData();
  if (name) formData.append("name", name);
  if (description) formData.append("description", description);
  if (price) formData.append("price", price);
  if (isActive) formData.append("isActive", isActive);
  if (image) formData.append("image", image)
  const response = await fetch(`/api/sites/${siteId}/items/${id}`, {
    method: 'PATCH',
    body: formData,
  });
  dispatch(updateOneItem(response.data));
  return response.data;
}

const initialState = {}

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_ONE_ITEM:
      newState = [...state, action.payload]
      return newState;
    case REMOVE_ONE_ITEM:
      // eslint-disable-next-line
      newState = [...state.filter(item => item.id != action.payload.id)];
      return newState;
    case SET_ALL_ITEMS:
      newState = action.payload;
      return newState;
    case UPDATE_ONE_ITEM:
      // eslint-disable-next-line
      newState = [...state.filter(item => item.id != action.payload.id), action.payload];
      return newState;
    default:
      return state;
  }
}

export default reducer;