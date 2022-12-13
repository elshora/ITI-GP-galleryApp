import React from 'react';
import NormalBtn from '../../utils/NormalBtn';
import MainHeading from './MainHeading';
import SubTitle from './SubTitle';
import Paragraph from './Pragrah';
import Slider from '../../components/slider/Slider';

export default function About() {
  let btns = [
    { link: '/shop', text: 'shop now' },
    { link: '/', text: 'home' },
  ];
  return (
    <>
      <div className="container">
        <div className="topsection ">
          <MainHeading title="Art station" />
          <SubTitle subTitle=" The largest art market in Egypt and soon it will be in the Middle East" />
          <Paragraph minParagraph="We've been helping artists sell wall art, home decor, apparel, and other products and are home to hundreds of thousands of artists, photographers, graphic designers, illustrators, and iconic brands." />
          <Paragraph minParagraph='With just a few clicks, artists and photographers can upload their images to KARMA ART.com, set their prices for hundreds of different print-on-demand products, and then instantly sell those products to a global audience of online, mobile, and real-world buyers. KARMA ART  fulfills each order on behalf of the artists - taking care of the printing, framing, matting, packaging, shipping, collecting payments from the buyers, and sending profits to the artists. Each product is manufactured at one of our 16 global production facilities and delivered "ready-to-hang" with a 30-day money-back guarantee.' />
          <Paragraph minParagraph="In addition to providing an online marketplace and fulfillment service, KARMA ART offers artists and photographers sales and marketing tools to help simplify and accelerate their careers. These tools allow artists to set up branded web stores, sell prints on Facebook, create e-newsletters, and much more." />
          <div className="container d-flex gap-3 justify-content-center">
            {btns.map((btn, index) => (
              <NormalBtn key={index} link={btn.link} text={btn.text} />
            ))}
          </div>
        </div>

        <div className="secandsection">
          <MainHeading title="More Than Static Company" />
          <SubTitle subTitle="Online (WebSite , Mobile Soon), Offline Store, and Streaming on Our YouTube channel" />
          <Paragraph minParagraph="We power sales everywhere that artwork is bought and sold. It doesn't matter if you want to hang your artwork... carry it... wear it... license it... or stream it. Hundreds of thousands of artists, photographers, and iconic global brands use our technology to power their businesses, and millions of buyers all over the world decorate their homes and accessorize their lives with KARMA ART products. We are where art lives and comes to life ™." />
        </div>
      </div>
    </>
  );
}
