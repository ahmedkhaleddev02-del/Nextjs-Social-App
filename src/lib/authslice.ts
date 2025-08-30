import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: {
  signupMessage: string;
  userToken: null | string;
  userData: null | any;
  isLoading: boolean;
  isError: boolean | string;
} = {
  signupMessage: "",
  userToken: null,
  userData: null,
  isLoading: false,
  isError: false,
};

// start function calling API for signUp
export const userRegister = createAsyncThunk(
  "authSlice/userRegister",
  async (formData: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }) => {
    return await axios
      .post(`https://linked-posts.routemisr.com/users/signup`, formData)
      .then((res) => {
        // console.log(res.data.message);
        return res.data.message;
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        return err.response.data.error;
      });
  }
);
// end function calling API for signUp
//-------------------------------------------------------------------------------------
// start function calling API for Login
export const userLogin = createAsyncThunk(
  "authSlice/userLogin",
  async (formData: { email: string; password: string }) => {
    return await axios
      .post(`https://linked-posts.routemisr.com/users/signin`, formData)
      .then((res) => {
        // console.log(res.data.token);
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data.error);
        return err.response.data.error;
      });
  }
);
// end function calling API for Login



const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loadUserFromStorage: (state, action) => {
      state.userToken = action.payload;
    },
    logout: (state) => {
      state.userToken = null;
      localStorage.removeItem("userToken");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      // console.log("fillfiled", action);
      state.signupMessage = action.payload;
      state.isLoading = false;
    });
    builder.addCase(userRegister.pending, (state) => {
      // console.log("pending", action);

      state.isLoading = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      // console.log("rejected", action);
      state.isError = action.payload;
      state.isLoading = false;
    });
    //-------------------------------------------------------------------------
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // console.log("fillfiled", action);
      // state.userToken = action.payload.token; //store token
      // state.isLoading = false;
      if (action.payload.token) {
        state.userToken = action.payload.token; 
      } else {
        state.isError = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      // console.log("pending", action);
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      // console.log("rejected", action);
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});

export const { loadUserFromStorage, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
