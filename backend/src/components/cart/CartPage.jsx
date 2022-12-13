import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/cart/cartSlice";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const { cartUser, cartItems, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <div className="container my-5">
      {totalQuantity === 0 ? (
        <CartEmpty />
      ) : (
        <div className="row">
          <div className="items  col-12 col-md-9 ">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <CartSummary total={totalPrice} />
        </div>
      )}
    </div>
  );
}
