import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";
import { message } from "antd";
import { tokenMethod } from "../../utils/tokenMethod";
import { useDispatch } from "react-redux";
import { handleLogin, handleShowModal } from "./authReducer";
import { MODAL } from "../../constants/modal";

const initialState = {
  cart: null,
  cartLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleResetCart: (state, action) => {
      state.cart = {};
    },
    handleUpdateCacheCart: (state, action) => {
      state.cart = action.payload || state.cart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cart = action.payload;
      })
      .addCase(handleGetCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(handleGetCart.rejected, (state) => {
        state.cartLoading = false;
        state.cart = null;
      })
      .addCase(handleAddCart.fulfilled, (state) => {
        state.cartLoading = false;
      })
      .addCase(handleAddCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(handleAddCart.rejected, (state) => {
        state.cartLoading = false;
      })
      .addCase(handleRemoveFromCart.fulfilled, (state) => {
        state.cartLoading = false;
      })
      .addCase(handleRemoveFromCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(handleRemoveFromCart.rejected, (state) => {
        state.cartLoading = false;
      })
      .addCase(handleUpdateCart.fulfilled, (state) => {
        state.cartLoading = false;
      })
      .addCase(handleUpdateCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(handleUpdateCart.rejected, (state) => {
        state.cartLoading = false;
      });
  },
});

const { actions, reducer: cartReducer } = cartSlice;
export const { handleResetCart, handleUpdateCacheCart } = actions;
export default cartReducer;

export const handleGetCart = createAsyncThunk(
  "cart/handleGetCart",
  async (payload, thunkApi) => {
    try {
      const res = await cartService.getCart();
      if (res?.data?.data) {
        return res?.data?.data;
      }
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleAddCart = createAsyncThunk(
  "cart/handleAddCart",
  async (payload, thunkApi) => {
    if (!!!tokenMethod.get()) {
      thunkApi.dispatch(handleShowModal(MODAL.login));
      message.warning("Login before purchase");
      return;
    }
    try {
      const { addedId, addedColor, addedQuantity, addedPrice } = payload;
      const { cart } = thunkApi.getState().cart || {};
      let addPayload = {};
      if (cart?.id) {
        const matchIndex = cart.product.findIndex(
          (product, index) =>
            product?.id === addedId && cart?.variant?.[index] === addedColor
        );
        const newProduct = cart.product?.map((product) => product.id);
        const newQuantity = [...(cart.quantity ?? [])];
        const newVariant = [...(cart.variant ?? [])];
        const newTotalProduct = [...(cart.totalProduct ?? [])];
        if (matchIndex > -1) {
          newQuantity[matchIndex] =
            Number(newQuantity[matchIndex]) + Number(addedQuantity);
          newTotalProduct[matchIndex] =
            Number(newTotalProduct[matchIndex]) + addedPrice * addedQuantity;
        } else {
          newProduct.push(addedId);
          newQuantity.push(addedQuantity);
          newVariant.push(addedColor);
          newTotalProduct.push(addedPrice * addedQuantity);
        }

        const newSubTotal =
          newTotalProduct.reduce(
            (prev, currentVal) => Number(prev) + Number(currentVal),
            0
          ) || 0;
        const newTotal =
          newSubTotal -
          Number(cart?.discount ?? 0) +
          Number(cart?.shipping?.price ?? 0);
        addPayload = {
          ...cart,
          product: newProduct,
          quantity: newQuantity,
          variant: newVariant,
          subTotal: newSubTotal,
          total: newTotal,
          totalProduct: newTotalProduct,
        };
      } else {
        addPayload = {
          product: [addedId],
          quantity: [addedQuantity],
          variant: [addedColor],
          totalProduct: [addedPrice * addedQuantity],
          subTotal: addedPrice * addedQuantity,
          total: addedPrice * addedQuantity,
          discount: 0,
          paymentMethod: "",
        };
      }
      const res = await cartService.updateCart(addPayload);
      thunkApi.dispatch(handleGetCart());
      message.success("Add to cart successfully");
      return res?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleRemoveFromCart = createAsyncThunk(
  "cart/removeProduct",
  async (payload, thunkApi) => {
    const { itemId } = payload;
    const { getState, dispatch, rejectWithValue } = thunkApi;
    const { cart } = getState().cart;
    try {
      const newProduct =
        cart?.product
          ?.map((product) => product.id)
          ?.filter((_, index) => index !== itemId) || [];
      const newQuantity = cart?.quantity?.filter(
        (_, index) => index !== itemId
      );
      const newVariant = cart?.variant?.filter((_, index) => index !== itemId);
      const newTotalProduct = cart?.totalProduct?.filter(
        (_, index) => index !== itemId
      );
      const newSubTotal =
        newTotalProduct?.reduce(
          (prev, current) => Number(prev) + Number(current),
          0
        ) || 0;
      const newTotal =
        newSubTotal -
        Number(cart?.discount ?? 0) +
        Number(cart?.shipping?.price ?? 0);
      const updatePayload = {
        ...cart,
        product: newProduct,
        quantity: newQuantity,
        variant: newVariant,
        subTotal: newSubTotal,
        total: newTotal,
        totalProduct: newTotalProduct,
        shipping: newProduct?.length > 0 ? cart?.shipping : {},
        discount: newProduct?.length > 0 ? cart?.discount : 0,
      };
      const res = await cartService.updateCart(updatePayload);
      if (res?.data?.data) {
        dispatch(handleGetCart());
        message.success("Remove from cart successfully");
        return res?.data?.data;
      }
    } catch (error) {
      rejectWithValue(error);
      message.error("Remove from cart failed");
      console.log("error", error);
    }
  }
);

export const handleUpdateCart = createAsyncThunk(
  "cart/update",
  async (payload, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    try {
      const res = await cartService.updateCart(payload);
      dispatch(handleGetCart());
      message.success("Update cart successful");
      return res?.data?.data;
    } catch (error) {
      rejectWithValue(error);
      console.log("error", error);
      message.error("Update cart failed");
      throw error;
    }
  }
);
