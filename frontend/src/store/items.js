import { fetch } from './csrf.js';

const SET_ALL_ITEMS = "SET_ALL_ITEMS"
const ADD_ONE_ITEM = "ADD_ONE_ITEM"

const setItems = (item) => ({
    type: SET_ALL_ITEMS,
    payload: item
});

const addOneItem = (item) => ({
    type: ADD_ONE_ITEM,
    payload: item
});

export const fetchAllSiteItems = (siteId) => async (dispatch) => {
    const response = await fetch(`/api/sites/${siteId}/items`);
    dispatch(
        setItems(response.data.site.Items)
    )
}

export const createNewItem = (siteId, item) => async (dispatch) => {
    console.log("ITEM: ", item)
    const { name, description, price, image } = item;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);
    const response = await fetch(`/api/sites/${siteId}/items`, {
        method: 'POST',
        body: formData,
    });

    dispatch(addOneItem(response.data.item));
    return response;
}

const initialState = {}

function reducer(state = initialState, action){
    let newState;
    switch (action.type){
        case ADD_ONE_ITEM:
            newState = [...state, ...action.payload]
            return newState;
        case SET_ALL_ITEMS:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reducer;