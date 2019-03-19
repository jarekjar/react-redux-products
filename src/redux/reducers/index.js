import { combineReducers } from "redux";
import products from "./productReducer";
import businesses from "./businessReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  products,
  businesses,
  apiCallsInProgress
});

export default rootReducer;
