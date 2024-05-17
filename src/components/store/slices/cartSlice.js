import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, actions) {
      const newItem = actions.payload.item;
      console.log(newItem);
      const existingItem = state.items.find(
        (item) => item.itemId == newItem.id
      );
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
      state.totalQuantity++;
      state.totalAmount = state.items.reduce((total, value) => {
        return total + value.totalPrice;
      }, 0);
    },
    removeToCart(state, actions) {
      // const existingItem = state.items.find(
      //   (item) => item.itemId === actions.payload.id
      // );

      console.log(state);

      // console.log(existingItem);
      // if (existingItem.quantity === 1) {
      //   state.items = state.items.filter(
      //     (item) => item.id !== actions.payload.id
      //   );
      // } else {
      //   existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      // }
      // state.totalQuantity--;
      // state.totalAmount = state.totalAmount - existingItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
