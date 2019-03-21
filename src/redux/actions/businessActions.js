import * as types from "./actionTypes";
//import * as businessApi from "../../api/businessApi";
//import { beginApiCall, apiCallError } from "./apiStatusActions";

export const loadBusinessSuccess = businesses => ({
  type: types.LOAD_BUSINESSES_SUCCESS,
  businesses
});

// export const loadBusinesses = () => dispatch => {
//   dispatch(beginApiCall());
//   return businessApi
//     .getBusinesses()
//     .then(businesses => {
//       dispatch(loadBusinessSuccess(businesses));
//     })
//     .catch(error => {
//       dispatch(apiCallError(error));
//       throw error;
//     });
// };

//  ** ABOVE IS THUNK, BELOW IS AN ACTION FOR THE EPIC ** \\

export const loadBusinesses = () => ({ type: types.LOAD_BUSINESSES });
