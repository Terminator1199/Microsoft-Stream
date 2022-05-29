import { createSlice } from "@reduxjs/toolkit";

const initialModelState = { show_model: false, movieData: {} };

const modelSlice = createSlice({
  name: "showModelState",
  initialState: initialModelState,
  reducers: {
    setShowModelState(state, action) {
      state.show_model = true;
    },
    hideModelState(state, action) {
      state.show_model = false;
    },
    setModelMovieData(state, action) {
      state.movieData = action.payload;
    },
  },
});

export const modelActions = modelSlice.actions;
export default modelSlice;