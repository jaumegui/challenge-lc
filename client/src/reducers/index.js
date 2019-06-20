import { combineReducers } from "redux";
import operatorsReducer from "./operatorsReducer";
import postesReducer from "./postesReducer";

export default combineReducers({
  operatorsReducer,
  postesReducer
});
