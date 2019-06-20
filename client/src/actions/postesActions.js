import { axios } from "../utils";
import { FETCH_POSTES } from "./types";

export const fetchPostes = () => dispatch => {
  const apiCall = axios.get("/postes");
  apiCall.then(res => dispatch({ type: FETCH_POSTES, payload: res.data }));
  return apiCall;
};
