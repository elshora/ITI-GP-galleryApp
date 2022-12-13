import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import './artist-info.css';
import { useSelector } from 'react-redux';
import './artist-info.css';
export default function ArtistInfo() {
  const { artist } = useSelector((state) => state.artist);
  return (
    <>
      <section className="row my-5">
        <div className="border py-3 artist-section text-center">
          <div className=" d-flex  justify-content-center">
            <div className="user-image-holder">
              <img src="../images/user.png" alt={artist.name} height="100%" />
            </div>
          </div>
          <h3 className="text-capitalize display-5 fw-bold mt-3 text-center">
            {artist.name}
          </h3>
          <p className="text-muted">{artist.email}</p>
          <p className="bio text-muted px-3  text-center w-100  w-lg-50 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            similique esse tenetur.
          </p>
          <div className="social-media d-flex gap-3 justify-content-center">
            <FontAwesomeIcon icon={faFacebookF} className="text-primary" />
            <FontAwesomeIcon icon={faTwitter} className="text-info" />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTiktok} />
          </div>
        </div>
      </section>
    </>
  );
}
