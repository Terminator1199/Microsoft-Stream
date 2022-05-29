import { configureStore } from "@reduxjs/toolkit";

// import authSlice from "./auth-slice";
import loggedInSlice from "./loginAuth-slice";
import userInfoSlice from "./userInfo-slice";
import searchInfoSlice from "./movieSearch-slice";
import modelSlice from "./movieModel-slice";
const store = configureStore({
  reducer: {
    // auth: authSlice.reducer,
    auth: loggedInSlice.reducer,
    userInfo: userInfoSlice.reducer,
    searchInfo: searchInfoSlice.reducer,
    showModel: modelSlice.reducer,
  },
});

export default store;
