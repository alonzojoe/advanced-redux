import { uiActions } from "../slices/uiSlice";
import { cartActions } from "../slices/cartSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    console.log("return function");
    const fetchData = async () => {
      const response = await fetch(
        "https://adv-redux-2fe94-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("There was a problem fetching data on the cart.");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          totalQuantity: cartData.totalQuantity || 0,
          totalAmount: cartData.totalAmount || 0,
          items: cartData.items || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: `Failed to fetch cart data, ${error}`,
        })
      );
    }
  };
};

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount,
          }),
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
