import { FETCH_POSTES } from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTES:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
};
