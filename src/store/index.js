import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/environments";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  devTools: ENV.ENV === "development",
});

export default store;
