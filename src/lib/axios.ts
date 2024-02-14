import axios from "axios";
import { errorToast } from "components/shared/error-toast";
import { BASE_API } from "config/constants";

export const api = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});

api.interceptors.response.use(null, (error) => {
  setTimeout(() => errorToast(error.response.data), 0);
});
