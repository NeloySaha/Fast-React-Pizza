import { createSlice } from "@reduxjs/toolkit";
import {
  CartInfoStateType,
  CartItemType,
  StoreStateType,
} from "../../types/types";

const initialState: CartInfoStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = new Item
      const existingItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (existingItem === undefined) state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = id of Item
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = id of Item
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item !== undefined) {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity(state, action) {
      // payload = id of Item
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item !== undefined && item.quantity === 1) {
        cartSlice.caseReducers.deleteItem(state, action);
      }

      if (item !== undefined && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: StoreStateType) => state.cart.cart;

export const getTotalCartQuantity = (state: StoreStateType) =>
  state.cart.cart.reduce(
    (total: number, pizzaItem: CartItemType) => (total += pizzaItem.quantity),
    0,
  );

export const getTotalCartPrice = (state: StoreStateType) =>
  state.cart.cart.reduce(
    (total, pizzaItem) => (total += pizzaItem.totalPrice),
    0,
  );

export const getCurrentQuantityById = (id: number) => {
  return (state: StoreStateType) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
