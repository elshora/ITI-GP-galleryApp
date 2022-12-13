import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { addTocart } from '../../features/cart/cartSlice';
import './shopitem.css';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ShopItem({ item }) {
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    cartItems.forEach((element) => {
      if (element._id === item._id) setInCart(true);
    });
  }, [cartItems, item]);
  const { ref: shopItem, inView: myElementIsVisible } = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <div
        ref={shopItem}
        className=" col-12 col-md-4 col-lg-3 text-center overflow-hidden mb-3 text-capitalize art-item"
      >
        {myElementIsVisible ? (
          <div>
            <NavLink
              to={`/shop/${item?._id}`}
              className="curser-pointer  text-muted"
            >
              <div className="artImage overflow-hidden">
                <img
                  src={item?.images[0]}
                  alt={item?.title}
                  className="shop-img"
                />
              </div>
              <h4 className="mt-3 my-0 mx-auto art-title">{item.title}</h4>
            </NavLink>
            <NavLink to={`/artist/${item?.author?._id}`}>
              <p className="text-muted my-0 mx-auto artist-name">
                By: {item?.author?.name}
              </p>
            </NavLink>
            <div className="d-flex justify-content-around align-items-baseline">
              <div className="price">
                $<span className=" text-dark text-bold fs-3">{item.price}</span>
              </div>
              {inCart ? (
                <FontAwesomeIcon icon={faCheck} className="text-success" />
              ) : (
                <button
                  className="btn borderless text-primary curser-pointer d-block"
                  onClick={() => {
                    dispatch(addTocart(item));
                  }}
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
