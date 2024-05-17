import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/slices/uiSlice";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(uiActions.toggle());
  };

  const badgeCount = useSelector((state) => state.cart.totalQuantity);

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{badgeCount}</span>
    </button>
  );
};

export default CartButton;
