import { useSelector, useDispatch } from 'react-redux';
import { reset, login } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import Form from 'react-bootstrap/Form';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    isError: true,
  });

  const navigator = useNavigate();

  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
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
  };
  const onSubmit = (e) => {
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
      dispatch(login(formData));
    }
  };

  return (
    <section className={`${styles.formContainer}`}>
      <div className={`${styles.screen}`}>
        <section>
          <h1 className={`${styles.screen__content}`}>Login</h1>
          <p className={`${styles.screen__content}`}> Login and start </p>
        </section>

        <div className={`${styles.screen__content}`}>
          <Form
            className={`${styles.login}`}
            onSubmit={onSubmit}
            onChange={onChangeHandler}
          >
            <Form.Group className={`${styles.login__field} mb-3`}>
              <Form.Control
                type="text"
                placeholder="Enter Your Email"
                name="email"
                className={`${styles.login__input} `}
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.email}
              </Form.Text>
            </Form.Group>
            <br />

            <Form.Group className={`${styles.login__field} mb-3`}>
              <Form.Control
                className={`${styles.login__input} `}
                type="password"
                placeholder="Enter Your Password..."
                name="password"
              />
              <Form.Text className="error-msg text-danger">
                {errorMessage.password}
              </Form.Text>
            </Form.Group>
            <br />

            <button
              type="submit"
              className={`${styles.login__submit} submitBtn mb-3`}
              disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? 'Loading…' : 'Submit'}
              <i className={`${styles.button__icon}  fas fa-chevron-right`} />
            </button>
            <br />
            <NavLink
              to="/register"
              className={`${styles.login__submit} text-decoration-none`}
            >
              Sign up
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

export default Login;
