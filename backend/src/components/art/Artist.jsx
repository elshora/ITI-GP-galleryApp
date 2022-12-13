import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import './artist.scss';

const Artist = ({ data }) => {
  const { email, name, _id } = data;

  const [arts, setArts] = useState([]);

  const authorArts = async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/arts/artist/${_id}`
      );
      setArts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authorArts(_id);
  }, []);
  return (
    <div className="mb-2 px-1">
      <div className="singleArtist   ">
        <div className="row align-items-center mb-3">
          <div className="imgContainer   col-3 col-sm-4 col-lg-3">
            <NavLink to={`/artist/${_id}`}>
              <img src="/images/user.png" alt="x" />
            </NavLink>
          </div>
          <div className="artistInfo   col-9 col-sm-8 col-lg-9 ">
            <NavLink to={`/artist/${_id}`}>
              <h4 className="fs-6 mb-1"> {name} </h4>
            </NavLink>
            <p> {email} </p>
          </div>
        </div>
        <div className="d-flex gallery gap-2">
          <div className="col-4 mb-2">
            <img
              src={arts[0]?.images[0]}
              alt="x"
              className="favImg"
              draggable="false"
            />
          </div>
          <div className="col-8   imgscontainer   justify-content-cente ">
            {arts.slice(1, 7).map((img) => (
              <img
                src={img?.images[0]}
                alt={img?.title}
                className="imgs"
                key={img._id}
                draggable="false"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
