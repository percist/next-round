import { fetch } from './csrf.js';

const SET_ALL_USERS = 'SET_ALL_USERS';
const SET_ONE_USER = 'SET_ONE_USER';

const setUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    payload: users,
  }
}

const setUser = (user) => {
  return {
    type: SET_ONE_USER,
    payload: user,
  }
}

export const fetchAllBuddies = (userId) => {
  return async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/buddies`);
    dispatch(
      setUsers(response.data)
    );
  };
}

export const fetchOneUser = (userId) => {
  return async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)
    dispatch(
      setUser(response.data)
    )
  }
}

const initialState = {}

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_ONE_USER:
      newState = action.payload;
      return newState;
    case SET_ALL_USERS:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export default reducer;