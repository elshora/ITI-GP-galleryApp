import React from 'react';
import { NavLink } from 'react-router-dom';
import './cart.css';
export default function CartEmpty() {
  return (
    <div className="text-center my-5 container">
      <img src="./images/empty.png" alt="" className=" cartImg" width="300px" />
      <h4 className="mt-4">Your cart is Empty</h4>
      <p className="text-muted">
        Looks like you have noy added anything to your cart. Go ahead & explore
        our shop.
      </p>
      <NavLink to="/shop">
        <button className="btn btn-outline-dark my-4 mx-3">Take Me shop</button>
      </NavLink>
    </div>
  );
}
