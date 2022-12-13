import React from 'react';
import { useSelector } from 'react-redux';
import './art.scss';
export default function ImageSection({ art }) {
  const { imgSrc } = useSelector((state) => state.shop);

  return (
    <div className="col-12 col-md-6 mb-3">
      <div className="hoverContainer">
        <div className="imgContainer">
          <img src={`${imgSrc}`} alt={art.title} draggable="false" />
        </div>
      </div>
    </div>
  );
}
