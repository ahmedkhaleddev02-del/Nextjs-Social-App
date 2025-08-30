import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from "./authslice";
import { postReducer } from './postslice';

export const store = configureStore({
  reducer: {
    // all reducers to cover app
    auth: authReducer,
    posts:postReducer,
  },
});
