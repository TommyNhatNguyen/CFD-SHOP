import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";
import { blogService } from "../../services/blogService";

const initialState = {
  blogs: [],
  blogTags: [],
  blogCategories: [],
  blogsLoading: null,
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogs = action.payload;
      })
      .addCase(handleGetBlogs.pending, (state, action) => {
        state.blogsLoading = true;
      })
      .addCase(handleGetBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogs = null;
      })
      .addCase(handleGetBlogTags.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogTags = action.payload;
      })
      .addCase(handleGetBlogTags.pending, (state, action) => {
        state.blogsLoading = true;
      })
      .addCase(handleGetBlogTags.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogTags = null;
      })
      .addCase(handleGetBlogCategories.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.blogCategories = action.payload;
      })
      .addCase(handleGetBlogCategories.pending, (state, action) => {
        state.blogsLoading = true;
      })
      .addCase(handleGetBlogCategories.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogCategories = null;
      });
  },
});
1;
const { actions, reducer: blogsReducer } = blogsSlice;
export const {} = actions;
export default blogsReducer;

export const handleGetBlogs = createAsyncThunk(
  "blogs/handleGetBlogs",
  async (payload, thunkApi) => {
    try {
      const res = await blogService.getBlogs(payload);
      if (res?.data?.data) {
        const blogs = res?.data?.data?.blogs || [];
        return blogs;
      }
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleGetBlogTags = createAsyncThunk(
  "blogs/handleGetBlogTags",
  async (payload, thunkApi) => {
    try {
      const res = await blogService.getBlogTags(payload);
      if (res?.data?.data) {
        const blogs = res?.data?.data?.blogs || [];
        return blogs;
      }
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export const handleGetBlogCategories = createAsyncThunk(
  "blogs/handleGetBlogCategories",
  async (payload, thunkApi) => {
    try {
      const res = await blogService.getBlogCategories(payload);
      if (res?.data?.data) {
        const blogs = res?.data?.data?.blogs || [];
        return blogs;
      }
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
