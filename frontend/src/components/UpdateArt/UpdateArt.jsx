import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getArt } from '../../features/shop/shopSlice';
import { setCategories } from '../../features/updateArt/updateArtSlice';
import UpdateForm from './UpdateForm';

export default function UpdateArt() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { art, isArtLoading, isSuccess } = useSelector((state) => state.shop);
  useEffect(() => {
    dispatch(getArt(id));

    if (isSuccess)
      dispatch(setCategories(art.categories.map((category) => category.name)));
  }, [dispatch, id]);
  return (
    <>
      <section>
        <div className="container my-5">
          <h2 className="display-5 text-center my-3 text-capitalize">
            update {art.title}
          </h2>
          {isArtLoading ? <span>loading</span> : <UpdateForm {...art} />}
        </div>
      </section>
    </>
  );
}
