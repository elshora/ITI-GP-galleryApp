import React, { useEffect } from 'react';
import MainHeading from '../../pages/About_Us/MainHeading';
import Paragraph from '../../pages/About_Us/Pragrah';
import SubTitle from '../../pages/About_Us/SubTitle';
import CategoriesHolder from './CategoriesHolder';

import Landing from './Landing';
const Home = ({ setShowNavigators }) => {
  useEffect(() => {
    setShowNavigators(true);
  }, []);
  return (
    <>
      <Landing />
      <CategoriesHolder />
      <MainHeading title="Art station" />
      <SubTitle subTitle=" The largest art market in Egypt and soon it will be in the Middle East" />
      <Paragraph minParagraph="We've been helping artists sell wall art, home decor, apparel, and other products and are home to hundreds of thousands of artists, photographers, graphic designers, illustrators, and iconic brands." />
    </>
  );
};

export default Home;
