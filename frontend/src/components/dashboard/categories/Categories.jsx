import Table from 'react-bootstrap/Table';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import '../dashboard.scss';
import { useEffect, useState } from 'react';
import {
  deleteCategory,
  getCategories,
} from '../../../features/dashboard/categorySlice/categorySlice';
import Spinner from '../../spinner/Spinner';
const Categories = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    categories: { data },
    isLoading,
    isError,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const deleteCategoryandler = (id) => {
    dispatch(deleteCategory(id));
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
        <section className="users-section py-5  bg-dark   px-3">
          <div className="add-user  d-flex justify-content-between bg-dark p-3 mb-5 rounded text-white align-items-center">
            <h2 className="fs-6 mb-0"> Add New Category </h2>
            <NavLink
              to="new"
              className="btn btn-secondary d-flex align-items-center fs-6"
              onClick={handleShow}
            >
              Add Category
            </NavLink>
          </div>
          {data?.length ? (
            <Table striped hover variant="dark" responsive className="table">
              <thead className=" text-center  text-capitalize">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>createdAt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data?.map((data, i) => {
                  const { name, _id, createdAt } = data;

                  return (
                    <tr key={_id}>
                      <td> {_id} </td>
                      <td> {name} </td>
                      <td> {createdAt} </td>
                      <td className=" fs-6">
                        <NavLink
                          to={`${_id}`}
                          className="bg-warning text-white rounded border-0 fs-6 me-2  btn btn-sm"
                          onClick={handleShow}
                          state={data}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </NavLink>
                        <button
                          className="bg-danger text-white rounded border-0 fs-6  btn btn-sm"
                          onClick={() => deleteCategoryandler(_id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h1 className="alert alert-warning"> Please insert categories </h1>
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

export default Categories;
