import React from 'react';
import { Outlet } from 'react-router-dom';
import './auction.scss';
function AuctionPage() {
  return (
    <>
      <h2>Auction</h2>
      <Outlet></Outlet>
    </>
  );
}

export default AuctionPage;
