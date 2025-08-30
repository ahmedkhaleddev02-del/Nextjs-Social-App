import axios from "axios";
import { PostType } from "./../app/_interfaces/home";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

const initialState: { allPosts: PostType[] | []; singlePost: PostType | null } =
  {
    allPosts: [],
    singlePost: null,
  };

// start get all posts in Home Page
export const getAllPosts = createAsyncThunk(
  "postSlice/getAllPosts",
  async (_, thunkAPI) => {
    const token = (thunkAPI.getState() as any).auth.userToken;
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
      
    }

    try {
      const res = await axios.get(
        `https://linked-posts.routemisr.com/posts?limit=50`,
        { headers: { token } }
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch posts"
      );
    }
  }
);
// end get all posts in Home Page

/******************************************************************************** */
// start get single posts in Post/id Page
export const getSinglePosts = createAsyncThunk(
  "postSlice/getSinglePosts",
  async (id: string, thunkAPI) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const res = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        { headers: { token } }
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch post"
      );
    }
  }
);
// end get all posts in Post/id Page

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      //   console.log("action is ", action.payload.posts);
      state.allPosts = action.payload.posts;
    });
    builder.addCase(getAllPosts.pending, (state, action) => {
      // console.log("action is ", action);
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      // console.log("getAllPosts rejected:", action.payload);
    });
    /************************************************************************************ */
    builder.addCase(getSinglePosts.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.singlePost = action.payload.post;
    });
    builder.addCase(getSinglePosts.pending, (state, action) => {});
    builder.addCase(getSinglePosts.rejected, (state, action) => {});
  },
});
export const postReducer = postSlice.reducer;
