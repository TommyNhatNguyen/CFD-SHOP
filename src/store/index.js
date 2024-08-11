import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/environments";
import authReducer from "./reducer/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: ENV.ENV === "development",
});

export default store;
