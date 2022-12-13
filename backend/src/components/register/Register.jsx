import React, { useEffect, useState } from 'react';
// import "../login/login.scss";
import styles from './register.module.scss';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verifiedPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    password: '',
    verifiedPassword: '',
    isError: true,
  });

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigator('/');
      toast.success('You Logged In');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigator, dispatch]);

  const onChangeHandler = (e) => {
    let validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.target.value.length > 0) {
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
      if (!e.target.value.match(validRegex)) {
        setErrorMessage({
          ...errorMessage,
          isError: true,
          email: 'Please Enter a valid email',
        });
      }
    }

    if (e.target.name === 'password') {
      if (e.target.value.length < 8) {
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
      if (e.target.value.length && !e.target.value.match(/^[a-zA-Z\s]*$/g)) {
        setErrorMessage({
          ...errorMessage,
          name: 'Please Enter a valid name',
          isError: true,
        });
      }
      if (e.target.value.length < 3) {
        setErrorMessage({
          ...errorMessage,
          name: 'Name is too short',
          isError: true,
        });
      }
    }
  };
  const onFinish = (e) => {
    e.preventDefault();
    if (
      errorMessage?.name?.length > 0 ||
      errorMessage?.password?.length > 0 ||
      errorMessage?.email?.length > 0 ||
      errorMessage?.verifiedPassword?.length > 0 ||
      formData?.name?.length === 0 ||
      formData?.password?.length === 0 ||
      formData?.verifiedPassword?.length === 0 ||
      formData?.email?.length === 0
    ) {
      toast.error('Invalid Form please fill your inputs');
    } else {
      dispatch(register(formData));
    }
  };
  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.screen}`}>
        <h1 className={`${styles.screen__h1} text-center`}>Sign Up</h1>

        <div className={`${styles.screen__content}`}>
          <Form
            className={`${styles.login}`}
            onSubmit={onFinish}
            onChange={onChangeHandler}
            noValidate
          >
            <Form.Group className={`${styles.login__field} mb-1`}>
              <Form.Control
                type="text"
                placeholder="Enter Your Name.."
                name="name"
                className={`${styles.login__input} `}
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.name}
              </Form.Text>
            </Form.Group>
            <br />
            <Form.Group className={`${styles.login__field} mb-1`}>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                name="email"
                className={`${styles.login__input} `}
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.email}
              </Form.Text>
            </Form.Group>
            <br />
            <Form.Group className={`${styles.login__field} mb-1`}>
              <Form.Control
                type="password"
                placeholder="Enter Your Password..."
                name="password"
                className={`${styles.login__input} `}
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.password}
              </Form.Text>
            </Form.Group>
            <br />
            <Form.Group className={`${styles.login__field} mb-1`}>
              <Form.Control
                type="password"
                placeholder="Enter Your Matched Password..."
                name="verifiedPassword"
                className={`${styles.login__input} `}
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.verifiedPassword}
              </Form.Text>
            </Form.Group>
            <br />
            <button
              variant="primary"
              disabled={isLoading}
              // className="btn btn-secondary"
              className={`${styles.login__submit} submitBtn`}
            >
              {isLoading ? 'Loading…' : 'Sign Up'}
              <i className={`${styles.button__icon}  fas fa-chevron-right`} />
            </button>
            <br />
            <NavLink
              to="/login"
              className={`${styles.login__submit} text-decoration-none`}
            >
              Log in
              <i className={`${styles.button__icon}  fas fa-chevron-right`} />
            </NavLink>
          </Form>
        </div>

        <div className={`${styles.screen__background}`}>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}
          ></span>
          <span
            className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}
          ></span>
        </div>
      </div>
    </section>
  );
};

export default Register;
