import {
  addToCart,
  decreaseQuantity,
  deleteItemFromCart,
} from "../lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Counter = ({ productId }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const product = cartItems.find((item) => item.productId === productId);

  if (!product) {
    return null;
  }
  console.log("cartItems:  ", cartItems);

  console.log("Cart product: ", product);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ productId }));
  };

  const removeFromCartHandler = () => {
    dispatch(decreaseQuantity({ productId }));
  };

  return (
    <div className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600">
      <button onClick={removeFromCartHandler} className="p-1 select-none">
        -
      </button>
      <p className="p-1">{product.quantity || 0}</p>
      <button onClick={addToCartHandler} className="p-1 select-none">
        +
      </button>
    </div>
  );
};

export default Counter;
