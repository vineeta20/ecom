import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalQuantity: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    add(state, actions) {
      const newItem = actions.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          productName: newItem.productName,
          price: newItem.price,
          quantity: newItem.quantity,
          color: newItem.color,
          size: newItem.size,
          image: newItem.image,
          totalPrice: newItem.price * newItem.quantity,
        });
        state.totalPrice = state.totalPrice + newItem.price * newItem.quantity;
        state.totalQuantity = state.totalQuantity + newItem.quantity;
      } else {
        state.totalPrice = state.totalPrice - existingItem.totalPrice;
        state.totalQuantity =
          state.totalQuantity - existingItem.quantity + newItem.quantity;
        existingItem.quantity = newItem.quantity;
        existingItem.totalPrice = newItem.price * newItem.quantity;
        state.totalPrice = state.totalPrice + existingItem.totalPrice;
      }
    },
    remove(state, actions) {
      const id = actions.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
