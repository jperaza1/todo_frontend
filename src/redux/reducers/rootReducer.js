import { combineReducers } from "redux";
import fetch from "./fetch/fetchReducers";

const rootReducer = combineReducers({
  fetch: fetch
});

export default rootReducer;
