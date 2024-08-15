import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenMethod } from "../../utils/tokenMethod";
import { message } from "antd";
import { authService } from "../../services/authService";
import { handleGetCart } from "./cartReducer";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  showModal: "",
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleShowModal: (state, action) => {
      state.showModal = action.payload;
      document.body.classList.add("modal-open");
    },
    handleCloseModal: (state) => {
      state.showModal = "";
      document.body.classList.remove("modal-open");
    },
    handleLogout: (state) => {
      if (!!tokenMethod.get()) {
        message.success("Logout Successful");
      }
      tokenMethod.delete();
      state.profile = null;
      state.showModal = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.fulfilled, (state) => {
        state.loading.register = false;
        document.body.classList.remove("modal-open");
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(handleRegister.rejected, (state) => {
        state.loading.register = false;
      })

      .addCase(handleLogin.fulfilled, (state) => {
        state.loading.login = false;
        state.showModal = "";
        document.body.classList.remove("modal-open");
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(handleLogin.rejected, (state) => {
        state.loading.login = false;
      })

      .addCase(handleGetProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.pending, (state) => {
        state.loading.getProfile = true;
      })
      .addCase(handleGetProfile.rejected, (state) => {
        state.loading.getProfile = false;
      });
  },
});

const { actions, reducer: authReducer } = authSlice;
export const { handleShowModal, handleCloseModal, handleLogout } = actions;
export default authReducer;

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const data = {
        email: payload?.email,
        password: payload?.password,
      };
      const res = await authService.login(data);
      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};
        tokenMethod.set({ accessToken, refreshToken });
        dispatch(handleGetProfile());
        dispatch(handleGetCart());
        message.success("Login Successful");
        return res?.data?.data;
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    } finally {
      // callback?.();
    }
  }
);

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const data = {
        firstName: "",
        lastName: "",
        email: payload?.email,
        password: payload?.password,
      };
      if (payload?.isAgree) {
        const res = await authService.register(data);
        if (res?.data?.data) {
          dispatch(
            handleLogin({ email: data?.email, password: data?.password })
          );
          return true;
        } else {
          throw false;
        }
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      message.error(errorInfo.message);
      console.log("Register error", error);
      return rejectWithValue(errorInfo);
    } finally {
      // callback();
    }
  }
);

export const handleGetProfile = createAsyncThunk(
  "auth/handleGetProfile",
  async (_, thunkApi) => {
    try {
      if (tokenMethod.get()) {
        const res = await authService.getProfile();
        if (res?.data?.data) {
          return res?.data?.data;
        }
      }
    } catch (error) {
      console.log("Profile error", error);
      thunkApi.dispatch(handleLogout());
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);
