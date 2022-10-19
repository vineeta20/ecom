import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import productReducer from "./product";
import itemReducer from "./selectItem";
import loggedInReducer from "./loggedIn";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    item: itemReducer,
    loggedIn: loggedInReducer,
  },
});
export default store;
