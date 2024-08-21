import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";

const initialState = {
  categories: [],
  categoriesLoading: null,
  categoriesError: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(handleGetCategories.pending, (state, action) => {
        state.categoriesLoading = true;
      })
      .addCase(handleGetCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categories = null;
        state.categoriesError = action.payload;
      });
  },
});
1;
const { actions, reducer: categoriesReducer } = categoriesSlice;
export const {} = actions;
export default categoriesReducer;

export const handleGetCategories = createAsyncThunk(
  "categories/handleGetCategories",
  async (payload, thunkApi) => {
    try {
      const res = await productService.getProductCategories();
      if (res?.data?.data) {
        const categories = res?.data?.data?.products || [];
        return categories;
      }
    } catch (error) {
      thunkApi.rejectWithValue(error);
      return error;
    }
  }
);
