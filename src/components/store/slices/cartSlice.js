import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    cartChanged: false,
  },
  reducers: {
    replaceCart(state, actions) {
      state.totalQuantity = actions.payload.totalQuantity;
      state.totalAmount = actions.payload.totalAmount;
      state.items = actions.payload.items;
    },
    addToCart(state, actions) {
      const newItem = actions.payload.item;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }

      state.totalAmount = state.items.reduce((total, value) => {
        return total + value.totalPrice;
      }, 0);
      state.cartChanged = true;
    },
    removeToCart(state, actions) {
      const selectedItem = state.items.find(
        (item) => item.itemId === actions.payload.id
      );
      state.totalQuantity--;
      if (selectedItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.itemId !== actions.payload.id
        );
      } else {
        selectedItem.quantity--;
        selectedItem.totalPrice = selectedItem.totalPrice - selectedItem.price;
      }

      state.totalAmount = state.totalAmount - selectedItem.price;
      state.cartChanged = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
