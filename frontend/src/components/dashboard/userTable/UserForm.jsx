import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import {
  addUser,
  updateUser,
} from '../../../features/dashboard/userSlice/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const UserForm = () => {
  const navigator = useNavigate();
  const closeModel = useOutletContext();
  const dispatch = useDispatch();
  const state = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verifiedPassword: '',
    _id: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    verifiedPassword: '',
    isError: true,
  });
  useEffect(() => {
    if (state?.state) {
      const { _id, name, email, role } = state.state;
      setFormData({
        _id,
        name,
        email,
        role,
      });
    }
  }, [state.state]);

  const onChangeHandler = (e) => {
    let validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (e.target.value.trim().length > 0) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
      setErrorMessage({
        ...errorMessage,
        [e.target.name]: '',
        isError: false,
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        [e.target.name]: 'Input field is required',
        isError: true,
      });
    }

    if (e.target.name === 'email') {
      if (!e.target.value.trim().match(validRegex)) {
        setErrorMessage({
          ...errorMessage,
          isError: true,
          email: 'Please Enter a valid email',
        });
      }
    }
    if (e.target.name === 'role') {
      if (e.target.checked === false) {
        setErrorMessage({
          ...errorMessage,
          isError: true,
          role: 'Please select your role',
        });
      }
    }

    if (e.target.name === 'password') {
      if (e.target.value.trim().length < 8) {
        setErrorMessage({
          ...errorMessage,
          isError: true,
          password: 'password must be at least 8 characters',
        });
      }
    }
    if (e.target.name === 'verifiedPassword') {
      if (e.target.value !== formData.password) {
        setErrorMessage({
          ...errorMessage,
          isError: true,
          verifiedPassword: 'password does not match',
        });
      }
    }

    if (e.target.name === 'name') {
      if (
        e.target.value.trim().length &&
        !e.target.value.trim().match(/^[a-zA-Z\s]*$/g)
      ) {
        setErrorMessage({
          ...errorMessage,
          name: 'Please Enter a valid name',
          isError: true,
        });
      }
      if (e.target.value.trim().length < 3) {
        setErrorMessage({
          ...errorMessage,
          name: 'Name is too short',
          isError: true,
        });
      }
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      errorMessage?.name?.length > 0 ||
      errorMessage?.password?.length > 0 ||
      errorMessage?.email?.length > 0 ||
      errorMessage?.verifiedPassword?.length > 0 ||
      formData?.name?.length === 0 ||
      formData?.password?.length === 0 ||
      formData?.verifiedPassword?.length === 0 ||
      formData?.email?.length === 0 ||
      formData?.role?.length === 0
    ) {
      toast.error('Invalid Form please fill your inputs');
    } else {
      if (id) {
        dispatch(updateUser({ userId: id, userData: formData }));
      } else {
        dispatch(addUser(formData));
      }

      closeModel();
      navigator('..');
    }
  };

  return (
    <section className="py-3">
      <h2 className="fs-6 text-center mb-5 pb-3  border-bottom">
        {id ? 'Edit User ' : '   Add a new user'}
      </h2>
      <Form onSubmit={submitHandler} noValidate>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name.."
            name="name"
            onChange={onChangeHandler}
            value={state?.state ? formData.name : formData.name}
          />
          <Form.Text className="error-msg text-danger">
            {errorMessage.name}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={onChangeHandler}
            value={state?.state ? formData.email : formData.email}
          />
          <Form.Text className="error-msg text-danger">
            {errorMessage.email}
          </Form.Text>
        </Form.Group>
        {id ? (
          ''
        ) : (
          <>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter Your Password..."
                name="password"
                onChange={onChangeHandler}
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.password}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter Your Matched Password..."
                name="verifiedPassword"
                onChange={onChangeHandler}
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.verifiedPassword}
              </Form.Text>
            </Form.Group>
          </>
        )}
        <Form.Group className="mb-3">
          <Form.Check
            inline
            label="user"
            name="role"
            type="radio"
            onChange={onChangeHandler}
            value="user"
            id="user"
            checked={formData.role === 'user' ? true : false}
          />
          <Form.Check
            inline
            label="admin"
            name="role"
            type="radio"
            id="admin"
            value="admin"
            onChange={onChangeHandler}
            checked={formData.role === 'admin' ? true : false}
          />
          <Form.Text className="error-msg text-danger">
            {errorMessage.role}
          </Form.Text>
        </Form.Group>
        <button variant="primary" className="btn btn-secondary">
          {id ? 'Edit  ' : ' Add  user'}
        </button>
      </Form>
    </section>
  );
};

export default UserForm;
