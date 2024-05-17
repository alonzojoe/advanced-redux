import { useDispatch } from "react-redux";
import { cartActions } from "../store/slices/cartSlice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();

  const incrementQty = () => {
    dispatch(cartActions.addToCart({ item: props.item }));
  };

  const decrementQty = () => {
    dispatch(cartActions.removeToCart({ id: id }));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementQty}>-</button>
          <button onClick={incrementQty}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
