import { createSlice } from "@reduxjs/toolkit";

const initialLoggedInState = { loggedin: false };

const loggedInSlice = createSlice({
  name: "cart",
  initialState: initialLoggedInState,
  reducers: {
    changeLoginStatus(state) {
      state.loggedin = !state.loggedin;
    },
  },
});

export const loggedInAction = loggedInSlice.actions;

export default loggedInSlice.reducer;
