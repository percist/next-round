// import { fetch } from './csrf.js';

// const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

// const setResults = (results) => {
//   return {
//     type: SET_SEARCH_RESULTS,
//     payload: results
//   }
// };

// export const createSearchResults = (query) => {
//   return async (dispatch) => {
//     const res = await fetch(`/api/users/${query}`);
//     dispatch(
//       setResults(res.data)
//     )
//   }
// }

// const initialState = {};

// function reducer(state = initialState, action) {
//   let newState;
//   switch (action.type) {
//     case SET_SEARCH_RESULTS:
//       newState = action.payload;
//       return newState;
//     default:
//       return state;
//   }
// }

// export default reducer;