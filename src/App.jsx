import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
function App() {
  const isCartShow = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log("cart updated");
    fetch(
      `https://adv-redux-2fe94-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`,
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
  }, [cart]);
  return (
    <>
      <Layout>
        {isCartShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
