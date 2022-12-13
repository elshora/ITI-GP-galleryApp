import Table from 'react-bootstrap/Table';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import '../dashboard.scss';
import { useEffect, useState } from 'react';
import {
  deleteUser,
  getUsers,
} from '../../../features/dashboard/userSlice/userSlice';
import Spinner from '../../spinner/Spinner';
const User = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { users, isLoading, isError } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
            <h2 className="fs-6 mb-0"> Add New User </h2>
            <NavLink
              to="new"
              className="btn btn-secondary d-flex align-items-center"
              onClick={handleShow}
            >
              Add User
            </NavLink>
          </div>
          {users?.length ? (
            <Table striped hover variant="dark" responsive className="table">
              <thead className=" text-center  text-capitalize">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users?.map(({ _id, name, email, role }, index) => {
                  return (
                    <tr key={index}>
                      <td>{_id}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{role}</td>
                      <td className=" fs-6">
                        <NavLink
                          to={`${_id}`}
                          className=" text-white rounded border-0 fs-6 me-2  btn btn-sm"
                          onClick={handleShow}
                          state={{ _id, name, email, role }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </NavLink>
                        <button
                          className="  text-white rounded border-0 fs-6  btn btn-sm"
                          onClick={() => deleteUserHandler(_id)}
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
            <h1 className="alert alert-warning"> Please insert users </h1>
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

export default User;
