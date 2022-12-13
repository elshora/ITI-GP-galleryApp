import { Navigation, Scrollbar } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'react-bootstrap/esm/Container';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './Swiper.scss';

const Slider = ({ data, button, title }) => {
  return (
    <section id="swiper">
      <Container className="my-5">
        {title ? (
          <div className="heading">
            <h2 className="h4"> {title} </h2>
          </div>
        ) : (
          ''
        )}
        <Swiper
          spaceBetween={15}
          modules={[Navigation, Scrollbar]}
          navigation
          pagination={{ clickable: true }}
          className="py-4"
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {data.map((swiper) => {
            return (
              <SwiperSlide className="swiperContainer" key={swiper.id}>
                <div className="imgContainer">
                  <img src={swiper.imgSrc} alt="person" width="100%" />
                </div>
                <div className="swiperInfo py-2 d-flex justify-content-between flex-column">
                  <h4 className="title"> {swiper.title} </h4>
                  <p className="desc">{swiper.desc} </p>
                  {button ? (
                    <button
                      className="btn btn-outline-dark w-50 btn-sm"
                      onClick={button.handler}
                    >
                      {button.text}
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </section>
  );
};

export default Slider;
