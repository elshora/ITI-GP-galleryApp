import { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from 'react-bootstrap/esm/Container';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './Swiper.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NormalBtn from '../../utils/NormalBtn';
import axios from 'axios';
const shopServer = 'http://localhost:5000/api/arts';

export default function CategorySlider({ categoryName }) {
  const dispatch = useDispatch();
  const [arts, setArts] = useState([]);
  const getArtsByCategory = async (category) => {
    try {
      const response = await axios.get(shopServer + `?category=${category}`);
      setArts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getArtsByCategory(categoryName);
  }, [dispatch, categoryName]);
  return (
    <section className="swiper">
      <Container className="my-5">
        {categoryName ? (
          <div className="heading">
            <h2 className="h4"> {categoryName} </h2>
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
          {arts.map((art) => {
            return (
              <SwiperSlide className="swiperContainer" key={art._id}>
                <div className="imgContainer">
                  <img src={art.images[0]} alt="person" width="100%" />
                </div>
                <div className="swiperInfo py-2 d-flex justify-content-between flex-column">
                  <h4 className="title overflow-hidden"> {art.title} </h4>
                  <p className="desc overflow-hidden">{art.description} </p>
                  <NormalBtn link={`/shop/${art._id}`} text="show details" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </section>
  );
}
