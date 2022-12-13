import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addTocart } from "../../features/cart/cartSlice";

export default function ArtistArts({ item }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="col-12 col-md-6 col-lg-4 py-3  my-3 bg-dark text-light rounded item border border-light">
        <div className="artImage">
          <NavLink to={`/shop/${item._id}`}>
            <img
              src={"../" + item.images[0]}
              alt={item.title}
              className="my-3 img-thumbnail hover-overlay ripple curser-pointer shop-img rounded"
            />
          </NavLink>
        </div>
        <div className="info">
          <h3>{item.title}</h3>
          <div className="d-flex flex-row justify-content-between">
            <p className="text-muted">{item.description}</p>
            <p>${item.price}</p>
          </div>
          <button
            className="btn btn-dark w-100 text-center border"
            onClick={() => {
              dispatch(addTocart(item));
            }}
          >
            Add to Cart
            <FontAwesomeIcon className="mx-1" icon={faCartPlus} />
          </button>
        </div>
      </div>
    </>
  );
}
