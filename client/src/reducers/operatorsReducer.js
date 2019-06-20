import { FETCH_OPERATORS } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_OPERATORS:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
};
