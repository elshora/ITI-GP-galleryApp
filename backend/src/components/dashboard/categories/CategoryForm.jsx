import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import {
  addCategory,
  updateCategory,
} from '../../../features/dashboard/categorySlice/categorySlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const CategoryForm = () => {
  const navigator = useNavigate();
  const closeModel = useOutletContext();
  const dispatch = useDispatch();
  const state = useLocation();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    isError: true,
  });
  useEffect(() => {
    if (state?.state) {
      const { name } = state.state;
      setFormData({
        name,
      });
    }
  }, []);
  const onChangeHandler = (e) => {
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

    if (errorMessage?.name?.length > 0 || formData?.name?.length === 0) {
      toast.error('Invalid Form please fill your inputs');
    } else {
      if (id) {
        dispatch(updateCategory({ categoryId: id, categoryData: formData }));
      } else {
        dispatch(addCategory(formData));
      }

      closeModel();
      navigator('..');
    }
  };

  return (
    <section className="py-3">
      <h2 className="fs-6 text-center mb-5 pb-3  border-bottom">
        {id ? 'Edit Category ' : '   Add a new category'}
      </h2>
      <Form onSubmit={submitHandler} noValidate>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Category Name.."
            name="name"
            onChange={onChangeHandler}
            value={state?.state ? formData.name : formData.name}
          />
          <Form.Text className="error-msg text-danger">
            {errorMessage.name}
          </Form.Text>
        </Form.Group>

        <button variant="primary" className="btn btn-secondary">
          {id ? 'Edit  ' : ' Add  category'}
        </button>
      </Form>
    </section>
  );
};

export default CategoryForm;
