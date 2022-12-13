import React from 'react';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  addCategory,
  removeCategory,
  updateAllData,
} from '../../features/updateArt/updateArtSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
export default function UpdateForm({
  _id,
  title,
  description,
  price,
  availableQuantity,
}) {
  const { categories, isSuccess } = useSelector((state) => state.updateArt);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const navigator = useNavigate();
  const closeModel = useOutletContext();

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
    images: '',
    isError: true,
  });
  const [images, setImages] = useState([]);
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'galleryApp');
    data.append('cloud_name', 'dnbx27xwk');
    try {
      const data_1 = await axios.put(
        'https://api.cloudinary.com/v1_1/dnbx27xwk/image/upload',
        data
      );

      setImages([`${data_1.data['secure_url']}`]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(
    () =>
      setArtData({
        title: title || '',
        description: description || '',
        price: price || '',
        availableQuantity: availableQuantity || '',
        // images: images || '',
      }),
    []
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

  const onFinish = (e) => {
    e.preventDefault();
    if (
      artData.title.length === 0 ||
      artData.description.length === 0 ||
      artData.price.length === 0 ||
      artData.availableQuantity.length === 0 ||
      errorMessage.title.length > 0 ||
      errorMessage.description.length > 0 ||
      errorMessage.price.length > 0 ||
      errorMessage.images.length > 0 ||
      errorMessage.availableQuantity.length > 0
    ) {
      toast.error('Invalid Form please fill your inputs');
    } else {
      let params = { id: _id, art: { ...artData, categories, images } };
      dispatch(updateAllData(params));
      if (isSuccess) toast.success('done');
      navigator(-1);
      if (closeModel) {
        closeModel();
      }
    }
  };
  return (
    <>
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
          value={artData?.title}
        />
        {errorMessage.title && (
          <span className="form-text text-danger">{errorMessage.title}</span>
        )}
        <textarea
          className="form-control"
          name="description"
          rows="5"
          onChange={onChangeRquired}
          placeholder="enter Art description"
          value={artData?.description}
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
          value={artData?.availableQuantity}
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
          value={artData?.price}
        />
        {errorMessage.price && (
          <span className="form-text text-danger">{errorMessage.price}</span>
        )}
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
          <span className="form-text text-danger">{errorMessage.images}</span>
        )}
        <div className="d-flex flex-row">
          <input
            className="form-control "
            name="categories"
            type="text"
            placeholder="Enter the Art category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value.toLowerCase());
            }}
          />
          <button
            className="btn btn-outline-primary"
            onClick={(e) => {
              category < 3
                ? toast.error('length more than three')
                : dispatch(addCategory(category));
              e.preventDefault();
              setCategory('');
            }}
          >
            add category
          </button>
        </div>
        {categories.length > 0 ? (
          <div className="d-flex flex-row gap-2 flex-wrap my-3">
            {categories?.map((category) => {
              return (
                <button
                  key={category}
                  className="btn btn-primary"
                  onClick={() => dispatch(removeCategory(category))}
                >
                  {category}
                  <FontAwesomeIcon icon={faX} className="text-danger mx-2" />
                </button>
              );
            })}
          </div>
        ) : (
          ''
        )}

        <input
          type="submit"
          className="btn btn-outline-dark"
          value="update Art"
        />
      </form>
    </>
  );
}
