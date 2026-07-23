import axios from "axios";
import { setIsSectionExpire } from "../redux/slices/authSlice";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: window.APP_CONFIG?.VITE_API_PORT,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (store) {
        store.dispatch(setIsSectionExpire(true));
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
