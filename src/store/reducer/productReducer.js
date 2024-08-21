import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";

const initialState = {
  products: [],
  productLoading: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload;
      })
      .addCase(handleGetProduct.pending, (state, action) => {
        state.productLoading = true;
      })
      .addCase(handleGetProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.products = null;
      });
  },
});
1;
const { actions, reducer: productReducer } = productSlice;
export const {} = actions;
export default productReducer;

export const handleGetProduct = createAsyncThunk(
  "product/handleGetProduct",
  async (payload, thunkApi) => {
    try {
      const res = await productService.getProduct(payload);
      if (res?.data?.data) {
        const products = res?.data?.data?.products || [];
        return products;
      }
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
