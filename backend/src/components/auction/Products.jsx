import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuction } from '../../features/auction/auctionSlice';
import '../../pages/auction.scss';
import { Button, Card, Container, Row } from 'react-bootstrap';
import BidForm from './BidForm';

const Products = () => {
  const { auctionArts, isLoading, isError } = useSelector(
    (state) => state.auction
  );
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const bidForm = (e) => {};
  useEffect(() => {
    dispatch(getAuction());
  }, [dispatch]);
  return (
    <Container>
      {/** TODO: Add Button */}
      <Row sm={1} md={3}>
        {isLoading ? (
          <>Loading....</>
        ) : (
          auctionArts?.map((auction, i) => {
            return (
              <Card key={i} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={auction?.images[0]} />
                <Card.Body>
                  <Card.Title>{auction?.title}</Card.Title>
                  <Card.Text>{auction?.description}</Card.Text>

                  {auction?.bids.length !== 0 ? (
                    <>
                      <Card.Text>Last bid:{auction?.bids[0]?.bid}</Card.Text>
                      <Card.Text>
                        Bidder: {auction?.bids[0]?.bidder?.name}
                      </Card.Text>
                    </>
                  ) : (
                    <>
                      <Card.Text>Open price: {auction?.openingPrice}</Card.Text>
                    </>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModalData(auction);
                      setModalShow(true);
                    }}
                  >
                    Place Bid
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        )}
      </Row>
      <BidForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        auction={modalData}
      />
    </Container>
  );
};

export default Products;
