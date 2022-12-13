import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { decrease, increase, removeItem } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import './cart.css';
import { toast } from 'react-toastify';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="container my-3 py-2 border-bottom mx-0 px-0">
        <div className="row mx-0 px-0">
          <div className="col-2 px-0">
            <img src={item.images[0]} alt={item.title} width="100%" />
          </div>
          <div className="d-inline col-4 px-1 cart-item-info">
            <h3>{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </div>
          <div className="col-3">
            <div className="cart-wheel border">
              <button className="btn p-0 m-0">
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => {
                    item.quantity < item.availableQuantity
                      ? dispatch(increase(item._id))
                      : toast.warning('Maximum Quantity');
                  }}
                />
              </button>
              <span>{item?.quantity} </span>
              <button
                className="btn p-0 m-0 "
                onClick={() => {
                  item.quantity === 1
                    ? dispatch(removeItem(item._id))
                    : dispatch(decrease(item._id));
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
          <div className="col-1 p-0">
            <div className="text-center mx-auto">
              <span className="px-1">${item.price}</span>
            </div>
          </div>
          <div className="col-2 p-0 btn borderless text-danger">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => dispatch(removeItem(item._id))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
