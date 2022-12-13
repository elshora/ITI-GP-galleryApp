import Table from 'react-bootstrap/Table';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import { useEffect, useState } from 'react';
import Spinner from '../../spinner/Spinner';
import {
  deleteArt,
  getArts,
} from '../../../features/dashboard/artSlice/artSlice';
import '../dashboard.scss';
const Arts = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { arts, isLoading, isError } = useSelector((state) => state.arts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArts());
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(deleteArt(id));
  };
  if (isError) {
    return (
      <h1 className="alert alert-danger mt-5 mx-auto text-center">
        ERRORR....
      </h1>
    );
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="users-section py-5  bg-dark h-100 px-3">
          <div className="add-user  d-flex justify-content-between bg-dark p-3 mb-5 rounded text-white align-items-center">
            <h2 className="fs-6 mb-0"> Add New Art </h2>
            <NavLink
              to="new"
              className="btn btn-secondary d-flex align-items-center"
              onClick={handleShow}
            >
              Add New
            </NavLink>
          </div>
          {arts?.length ? (
            <Table striped hover variant="dark" responsive className="table">
              <thead className=" text-center  text-capitalize">
                <tr>
                  <th>Id</th>
                  <th> Author</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Images</th>
                  <th>Price</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center tbody">
                {arts?.map(
                  ({
                    _id,
                    author,
                    title,
                    images,
                    description,
                    price,
                    availableQuantity,
                    categories,
                  }) => {
                    return (
                      <tr key={_id}>
                        <td>{_id}</td>
                        <td>{author?.name}</td>
                        <td>{title}</td>
                        <td>{availableQuantity}</td>
                        {/* <td>{description}</td> */}
                        <td>
                          {images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt="img"
                              className="artImg rounded-circle"
                            />
                          ))}
                        </td>
                        <td>${price}</td>
                        <td className=" fs-6">
                          <NavLink
                            to={`${_id}`}
                            className="bg-warning text-white rounded border-0 fs-6 me-2  btn btn-sm"
                            onClick={handleShow}
                            state={{
                              _id,
                              author,
                              title,
                              images,
                              description,
                              price,
                              availableQuantity,
                              categories,
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square" />
                          </NavLink>
                          <button
                            className="bg-danger text-white rounded border-0 fs-6  btn btn-sm"
                            onClick={() => deleteUserHandler(_id)}
                          >
                            <i className="fa-solid fa-trash-can" />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          ) : (
            <h1 className="alert alert-warning"> Please insert Arts </h1>
          )}

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
              <Outlet context={handleClose} />
            </Modal.Body>
          </Modal>
        </section>
      )}
    </>
  );
};

export default Arts;
