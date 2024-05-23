import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData } from "./components/store/slices/cartSlice";
import useDidMount from "./hooks/use-did-mount";
let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const isCartShow = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const didMount = useDidMount();
  console.log("didMount", didMount);
  // useEffect(() => {
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }
  //   dispatch(sendCartData(cart));
  // }, [cart, dispatch]);
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
