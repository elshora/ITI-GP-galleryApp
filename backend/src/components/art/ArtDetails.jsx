import { faEdit, faEllipsis, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addTocart } from '../../features/cart/cartSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Artist from './Artist';
import ArtistsComp from './ArtistsComp';
import { deleteArt } from '../../features/dashboard/artSlice/artSlice';

export default function ArtDetails({ art }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const authorId = art?.author?._id;
  const navigator = useNavigate();

  return (
    <>
      <div className="col-12 col-md-6 artInfo d-fle mt-5 align-items-center">
        <div className="infoContainer ">
          <div className="top d-flex  justify-content-between ">
            <div>
              <h2 className="h3 mb-0">{art.title}</h2>
              <NavLink
                to={`/artist/${authorId}`}
                className="text-black-50 mb-2 ms-1 d-block"
              >
                {art?.author?.name}
              </NavLink>
            </div>
            {userId === authorId ? (
              <DropdownButton
                id="dropdown-menu-align-end"
                align="end"
                title={<FontAwesomeIcon icon={faEllipsis} />}
                className="border-0 outline-0 "
                variant="none"
              >
                <Dropdown.Item as="button">
                  <NavLink
                    to={`/update/${art._id}`}
                    className="d-flex justify-content-between  align-items-center text-dark"
                  >
                    Edit
                    <FontAwesomeIcon icon={faEdit} />
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  className="d-flex justify-content-between  align-items-center text-dark w-100"
                  onClick={() => {
                    dispatch(deleteArt(art?._id));
                    navigator(-1);
                  }}
                >
                  Delete
                  <FontAwesomeIcon icon={faTrash} />
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              ''
            )}
          </div>

          <p className="text-black-50 fs-6 desc mb-2 ">{art.description}</p>
          <div className="d-flex  align-items-center     mb-2">
            <p className="text-dark-50 mb-0  fs-5  fw-semibold ">
              ${art.price}
            </p>
            {art.availableQuantity < 7 ? (
              <p className="text-danger ms-2 mb-0">
                {art.availableQuantity} Left
              </p>
            ) : (
              <p className="text-dark-50 quantityText text-secondary ms-2 mb-0 ">
                quantity:
                <span className="text-success"> {art.availableQuantity} </span>
              </p>
            )}
          </div>
          {art.categories && (
            <div className="categoties d-flex gap-3 my-3">
              {art?.categories?.map((category) => (
                <button
                  className="btn btn-dark border-0 rounded-0"
                  key={category?._id}
                  onClick={() => navigator(`/shop?category=${category?.name}`)}
                >
                  {category?.name}
                </button>
              ))}
            </div>
          )}
          <button
            className="btn btn-outline-dark   rounded-0  px-3 py-2 btn-sm"
            onClick={() => {
              dispatch(addTocart(art));
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
