import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addCategory,
  addPost,
  removeCategory,
} from '../../features/addArtPost/addArtSlice';

export default function PostArt() {
  const userID = JSON.parse(localStorage.getItem('userId'));
  const [images, setImages] = useState([]);
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'galleryApp');
    data.append('cloud_name', 'dnbx27xwk');
    try {
      const data_1 = await axios.post(
        'https://api.cloudinary.com/v1_1/dnbx27xwk/image/upload',
        data
      );

      setImages([`${data_1.data['secure_url']}`]);
    } catch (err) {
      console.log(err);
    }
  };
  const closeModel = useOutletContext();
  const { pathname } = useLocation();
  const [artData, setArtData] = useState({
    title: '',
    description: '',
    price: 0,
    availableQuantity: 0,
  });
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    description: '',
    price: '',
    availableQuantity: '',
    file: '',
    isError: true,
  });
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, message, categories } = useSelector(
    (state) => state.postArt
  );
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

  const onFinish = async (e) => {
    e.preventDefault();
    if (
      artData.title.length === 0 ||
      artData.description.length === 0 ||
      artData.price.length === 0 ||
      artData.availableQuantity.length === 0 ||
      errorMessage.title.length > 0 ||
      errorMessage.description.length > 0 ||
      errorMessage.price.length > 0 ||
      errorMessage.price.file > 0 ||
      errorMessage.availableQuantity.length > 0
    ) {
      toast.error('Invalid Form please fill your inputs');
    } else {
      dispatch(addPost({ ...artData, images, categories, author: userID }));
      if (isSuccess) {
        setArtData({
          title: '',
          description: '',
          price: 0,
          availableQuantity: 0,
        });
      }
      console.log(images);

      closeModel();
    }
  };
  useEffect(() => {
    if (isSuccess && pathname !== '/shop/post') {
      navigate(-1);
    }
  }, [isSuccess, navigate, pathname]);
  return (
    <>
      {isError && toast.error(message)}
      <section>
        <div className="container my-3">
          <form
            className="form"
            encType="multipart/form-data"
            onSubmit={onFinish}
          >
            <div className="row p-0">
              <div className="title pl-0 col-6 d-flex mb-3 flex-column gap-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="form-control d-block"
                  onChange={onChangeRquired}
                />
                {errorMessage.title && (
                  <span className="form-text text-danger">
                    {errorMessage.title}
                  </span>
                )}
                <input
                  type="number"
                  name="availableQuantity"
                  placeholder="quantity"
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
                  placeholder="Price"
                  className=" form-control"
                  min={1}
                  onChange={onChangeRquired}
                />
                {errorMessage.price && (
                  <span className="form-text text-danger">
                    {errorMessage.price}
                  </span>
                )}
              </div>
              <div className="description col-6 p-0">
                <textarea
                  className="form-control"
                  name="description"
                  rows="6"
                  onChange={onChangeRquired}
                  placeholder="Description"
                />
                {errorMessage.description && (
                  <span className="form-text text-danger">
                    {errorMessage.description}
                  </span>
                )}
              </div>
            </div>
            <div className="row p-0 my-1">
              <div className="col-12">
                <input
                  type="file"
                  accept={['.jpg', '.png']}
                  onChange={(e) => {
                    uploadImage(e.target.files[0]);
                  }}
                  className="form-control"
                  name="file"
                />
                {errorMessage.images && (
                  <span className="form-text text-danger">
                    {errorMessage.images}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className=" col-12 d-flex gap-2 my-2 justify-content-between">
                <input
                  className="form-control"
                  name="categories"
                  type="text"
                  placeholder="Enter the Art category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value.toLowerCase());
                  }}
                />
                <button
                  className=" btn px-2 py-1 btn-outline-dark border"
                  onClick={(e) => {
                    e.preventDefault();
                    category.length < 3
                      ? toast.error('length more than three')
                      : dispatch(addCategory(category));
                    setCategory('');
                  }}
                >
                  Add
                </button>
              </div>
              {categories.length > 0 ? (
                <div className="d-flex flex-row gap-2 flex-wrap my-3 col-12 rounded">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="border bg-primary text-light py-1 px-2 d-inline-block"
                      onClick={() => dispatch(removeCategory(category))}
                    >
                      {category}
                      <button className="btn p-0 mx-1 text-danger d-inline-block">
                        <FontAwesomeIcon icon={faX} />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                ''
              )}
              <div className="col-12">
                {isLoading ? (
                  <button className="btn">loading</button>
                ) : (
                  <input
                    type="submit"
                    className="btn border bg-dark text-light col-12"
                    value="Post Art"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
