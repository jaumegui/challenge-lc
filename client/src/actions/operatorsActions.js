import { axios } from "../utils";
import { FETCH_OPERATORS } from "./types";

export const fetchOperators = () => dispatch => {
  const apiCall = axios.get("/operators");
  apiCall.then(res => dispatch({ type: FETCH_OPERATORS, payload: res.data }));
  return apiCall;
};
