import * as types from "./actionTypes";
import * as businessApi from "../../api/businessApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadBusinessSuccess(businesses) {
  return { type: types.LOAD_BUSINESSES_SUCCESS, businesses };
}

export function loadBusinesses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return businessApi
      .getBusinesses()
      .then(businesses => {
        dispatch(loadBusinessSuccess(businesses));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
