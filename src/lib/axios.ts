import axios from "axios";
import { BASE_API } from "config/constants";

export const api = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
});
