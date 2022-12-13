import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearPostState } from '../../features/addArtPost/addArtSlice';
import { getArt } from '../../features/shop/shopSlice';
import ArtDetails from './ArtDetails';
import ImageSection from './ImageSection';

export default function ArtPage() {
  const { art } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getArt(id));
    dispatch(clearPostState());
  }, [dispatch, id]);
  return (
    <div className="container my-5">
      <div className="row my-5">
        <ImageSection art={art} />
        <ArtDetails art={art} />
      </div>
    </div>
  );
}
