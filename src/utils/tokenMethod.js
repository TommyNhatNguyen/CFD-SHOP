import Cookies from "js-cookie";
import { TOKEN } from "../constants/token";

export const tokenMethod = {
  get() {
    if (!!Cookies.get(TOKEN.token)) {
      return JSON.parse(Cookies.get(TOKEN.token));
    }
  },
  set(token) {
    Cookies.set(TOKEN.token, JSON.stringify(token));
  },
  delete() {
    Cookies.remove(TOKEN.token);
  },
};
