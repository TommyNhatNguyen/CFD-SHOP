import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/environments";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";
import productReducer from "./reducer/productReducer";
import categoriesReducer from "./reducer/categoriesReducer";
import blogsReducer from "./reducer/blogReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    categories: categoriesReducer,
    blogs: blogsReducer,
  },
  devTools: ENV.ENV === "development",
});

export default store;
