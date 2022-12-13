import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getArtist } from '../../features/artist/artistSlice';
import { getArts } from '../../features/shop/shopSlice';
import ShopItem from '../shop.jsx/ShopItem';
import ArtistInfo from './ArtistInfo';

export default function ArtistPage() {
  const { artist } = useSelector((state) => state.artist);
  const { arts } = useSelector((state) => state.shop);
  const { id } = useParams();
  const artistArts = arts.filter((ele) => ele.author._id === id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArtist(id));
    dispatch(getArts());
  }, [dispatch, artist, id]);
  return (
    <div className="container">
      <ArtistInfo artist={artist} />
      <div className="row  my-5">
        {artistArts.map((item) => (
          <ShopItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
