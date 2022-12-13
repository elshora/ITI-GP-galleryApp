import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet, useLocation, useNavigate } from 'react-router';
import './add.css';
import { faClose, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export default function AddPost() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { artId, isSuccess } = useSelector((state) => state.postArt);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (isSuccess) {
      if (pathname === '/shop/post') {
        toast.success('Your Art successfully added to the shop');
        navigate(`/shop/${artId}`);
      } else {
        navigate(-1);
      }
    }
  }, [artId, isSuccess, navigate, pathname]);
  return (
    <>
      <div className="border my-3 py-2 add-post-section d-flex align-items-center justify-content-around">
        <p className="display-6">
          Sell Your Art Now! <br /> Its Simple.
        </p>
        <div className="d-flex align-items-center justify-content-center">
          <NavLink
            to="/shop/post"
            className="py-0 text-secondary  display-4"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </NavLink>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="container">
            <div className="d-flex justify-content-end">
              <button onClick={handleClose} className="btn fs-4">
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          </div>
          <Outlet context={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
