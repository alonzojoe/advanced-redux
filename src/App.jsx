import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./components/store/slices/uiSlice";

let isInitialized = true;

function App() {
  const dispatch = useDispatch();

  const isCartShow = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    console.log("cart updated");
    const saveToCart = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data to the server",
        })
      );
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

      const responseData = await response.json();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data saved successfully!",
        })
      );
    };

    if (isInitialized) {
      isInitialized = false;
      return;
    }

    saveToCart().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: `Saving cart data failed!, ${error}`,
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
