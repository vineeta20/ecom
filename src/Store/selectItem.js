import { createSlice } from "@reduxjs/toolkit";
import { popularProducts } from "../data";

const initialItemState = { item: popularProducts[0] };

const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    selectItem(state, actions) {
      state.item = actions.payload;
    },
  },
});
export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
