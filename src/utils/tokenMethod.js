import Cookies from "js-cookie";
import { STORAGE } from "../constants/token";

export const tokenMethod = {
  get() {
    if (!!Cookies.get(STORAGE.token)) {
      return JSON.parse(Cookies.get(STORAGE.token));
    }
  },
  set(token) {
    Cookies.set(STORAGE.token, JSON.stringify(token));
  },
  delete() {
    Cookies.remove(STORAGE.token);
  },
};
