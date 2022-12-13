import React from 'react';
import NormalBtn from '../../utils/NormalBtn';
import './home.scss';

export default function Landing() {
  return (
    <section className="landing py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="flip-card ">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src="/assets/imgs/landing/the-starry-night.jpg" alt="" />
                </div>
                <div className="flip-card-back">
                  <img src="/assets/imgs/landing/anime.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center align-items-md-start justify-content-center flex-column">
            <h1 className="text-capitalize display-3 mx-0">art station</h1>
            <p className="text-muted">
              House of Arts. You can explore, buy, and sell arts.
            </p>
            <div className="navs d-flex gap-3">
              <NormalBtn link="/shop" text="explore arts" />
              <NormalBtn link="/shop/post" text="sell arts" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
