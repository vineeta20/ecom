import { createSlice } from "@reduxjs/toolkit";
import { popularProducts } from "../data";

const initialProductState = {
  category: "All",
  items: popularProducts,
};

const filterUsingCategory = (state) => {
  state.items =
    state.category !== "All"
      ? popularProducts.filter((prod) =>
          prod.category.includes(state.category.toLowerCase())
        )
      : popularProducts;
};

const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    changeCategory(state, actions) {
      state.category = actions.payload;
      filterUsingCategory(state);
    },
    filterItems(state, actions) {
      filterUsingCategory(state);
      if (actions.payload.size.toLowerCase() === "size") {
        state.items = state.items.filter((item) =>
          item.color.includes(actions.payload.color)
        );
      } else if (actions.payload.color.toLowerCase() === "color") {
        state.items = state.items.filter((item) =>
          item.size.includes(actions.payload.size)
        );
      } else {
        state.items = state.items
          .filter((item) => item.color.includes(actions.payload.color))
          .filter((item) => item.size.includes(actions.payload.size));
      }
      if (
        actions.payload.size.toLowerCase() === "size" &&
        actions.payload.color.toLowerCase() === "color"
      ) {
        filterUsingCategory(state);
      }
    },
    resetFilters(state) {
      filterUsingCategory(state);
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
