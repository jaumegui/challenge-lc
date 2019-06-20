import axios from "axios";
import { baseURL } from "../config";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    common: {
      Accept: "application/json"
    }
  }
});

export default axiosInstance;
