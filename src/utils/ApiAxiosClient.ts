import { notifyError } from "@/component/ErrorToast";
import axios from "axios";

const api = axios.create({});

api.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data.data.errors);
    }

    if (err.request) {
      notifyError(err.request);
      return Promise.reject(err.request);
    }
    notifyError(new Error("Something went wrong. Try again!"));

    return Promise.reject(err.message);
  }
);

export { api };
