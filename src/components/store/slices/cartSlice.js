import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

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
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data to the server",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `https://adv-redux-2fe94-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Saving Cart Failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data saved successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: `Saving cart data failed!, ${error}`,
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
