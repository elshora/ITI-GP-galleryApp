import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import PayButton from '../Payment/PayButton';

export default function CartSummary({ total }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <>
      <div className=" col-12 col-md-3 text-center">
        <div className="border p-1 w-100 mx-auto">
          <h3 className="my-3 display-7 fw-bold py-1">Cart Total</h3>
          <div className="d-flex justify-content-around fs-5">
            <span>Total</span>
            <span className="fw-bold price">${total || 0}</span>
          </div>
          <div className="d-flex flex-row gap-3 flex-md-column my-3 fs-5 justify-content-around">
            <div className="">
              <button
                className="btn btn-outline-danger border text-capitalize"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                clear Cart
              </button>
            </div>
            <PayButton cartItems={cart.cartItems} />
          </div>
        </div>
      </div>
    </>
  );
}
