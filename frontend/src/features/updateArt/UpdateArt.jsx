import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addCategory,
  updatePost,
  removeCategory,
} from '../../features/updateArt/updateArtSlice';

export default function UpdateArt() {
  let key = 1;
  const { pathname } = useLocation();
  const { id } = useParams();
  const [artData, setArtData] = useState({
    title: '',
    description: '',
    price: 0,
    availableQuantity: 0,
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    description: '',
    price: '',
    availableQuantity: '',
    images: '',
    isError: true,
  });
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { art, isError, isLoading, isSuccess, message, categories } =
    useSelector((state) => state.updateArt);
  const onChangeRquired = (e) => {
    if (e.target.value.length > 0) {
      setArtData({
        ...artData,
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
    const regTitle = /^[a-zA-Z]/;
    // validation depend on cases
    switch (e.target.name) {
      case 'title':
        if (
          !e.target.value.match(regTitle) ||
          e.target.value.length < 8 ||
          e.target.value.length > 32
        ) {
          setErrorMessage({
            ...errorMessage,
            isError: true,
            title: 'Title length should be more than 8 and less than 32',
          });
        }
        break;
      case 'description':
        if (e.target.value.length < 8 || e.target.value.length > 100) {
          setErrorMessage({
            ...errorMessage,
            isError: true,
            description:
              'Description length should be more than 8 and less than 100',
          });
        }
        break;
      case 'price':
        if (e.target.value <= 0) {
          setErrorMessage({
            ...errorMessage,
            isError: true,
            price: 'should be more than 0',
          });
        }
        break;
      case 'availableQuantity':
        if (e.target.value <= 0) {
          setErrorMessage({
            ...errorMessage,
            isError: true,
            availableQuantity: 'should be more than 0',
          });
        }
        break;
      default:
        break;
    }
  };
  const onChangeArr = (e) => {
    setArtData({
      ...artData,
      [e.target.name]: [e.target.value],
    });
    if (e.target.name === 'images') {
      if (e.target.value.length === 0) {
        setErrorMessage({
          ...errorMessage,
          isError: true,
          images: 'Images Required',
        });
      } else {
        setErrorMessage({
          ...errorMessage,
          [e.target.name]: '',
          isError: false,
        });
      }
    }
  };
  const onFinish = (e) => {
    e.preventDefault();
    if (
      artData.title.length === 0 ||
      artData.description.length === 0 ||
      artData.price.length === 0 ||
      artData.images.length === 0 ||
      artData.availableQuantity.length === 0 ||
      errorMessage.title.length > 0 ||
      errorMessage.description.length > 0 ||
      errorMessage.price.length > 0 ||
      errorMessage.images.length > 0 ||
      errorMessage.availableQuantity.length > 0
    ) {
      toast.error('Invalid Form please fill your inputs');
    } else {
      dispatch(updatePost(id, { ...artData }));
    }
  };
  return (
    <>
      {isSuccess
        ? toast.success('Your Art successfully added to the shop')
        : ''}
      {isSuccess ? setTimeout(navigate(`/shop/${art.id}`), 500) : ''}
      {isSuccess ? setTimeout(window.location.reload(), 500) : ''}
      {isError && toast.error(message)}
      <section>
        <div className="container my-5">
          <h2 className="display-5 text-center">update your art</h2>
          <form
            className="form contianer d-flex flex-column gap-3"
            onSubmit={onFinish}
          >
            <input
              type="text"
              name="title"
              placeholder="Enter Suitable Title"
              className="form-control"
              onChange={onChangeRquired}
            />
            {errorMessage.title && (
              <span className="form-text text-danger">
                {errorMessage.title}
              </span>
            )}
            <textarea
              className="form-control"
              name="description"
              rows="5"
              onChange={onChangeRquired}
              placeholder="enter Art description"
            />
            {errorMessage.description && (
              <span className="form-text text-danger">
                {errorMessage.description}
              </span>
            )}
            <input
              type="number"
              name="availableQuantity"
              placeholder="Enter the quantity of your art"
              className=" form-control"
              min={1}
              onChange={onChangeRquired}
            />
            {errorMessage.availableQuantity && (
              <span className="form-text text-danger">
                {errorMessage.availableQuantity}
              </span>
            )}
            <input
              type="number"
              name="price"
              placeholder="Enter the price of your art"
              className=" form-control"
              min={1}
              onChange={onChangeRquired}
            />
            {errorMessage.price && (
              <span className="form-text text-danger">
                {errorMessage.price}
              </span>
            )}
            {/* <input className="form-control" name="image" type="file" multiple /> */}
            <input
              className="form-control"
              name="images"
              type="text"
              placeholder="Enter Images Name"
              onChange={onChangeArr}
            />
            {errorMessage.images && (
              <span className="form-text text-danger">
                {errorMessage.images}
              </span>
            )}
            <div className="d-flex flex-row">
              <input
                className="form-control "
                name="categories"
                type="text"
                placeholder="Enter the Art category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  category < 3
                    ? toast.error('length more than three')
                    : dispatch(addCategory(category));
                }}
              >
                add category
              </button>
            </div>
            {categories.length > 0 ? (
              <div className="d-flex flex-row gap-2 flex-wrap my-3">
                {categories.map((category) => (
                  <button
                    key={key + 1}
                    className="btn btn-primary"
                    onClick={() => dispatch(removeCategory(category))}
                  >
                    {category}
                    <FontAwesomeIcon icon={faX} className="text-danger mx-2" />
                  </button>
                ))}
              </div>
            ) : (
              ''
            )}
            {isLoading ? (
              <button>looding</button>
            ) : (
              <input
                type="submit"
                className="btn btn-outline-dark"
                value="update Art"
              />
            )}
          </form>
        </div>
      </section>
    </>
  );
}
