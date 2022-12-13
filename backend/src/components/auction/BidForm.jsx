import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addBid, getAuction } from '../../features/auction/auctionSlice';

function BidForm(props) {
  const dispatch = useDispatch();
  const { auction, show, onHide } = props;
  const navigate = useNavigate();
  const [formBid, setFormBid] = useState('');
  useEffect(() => {
    setFormBid(show ? auction?.bids[0]?.bid || auction?.openingPrice : '');
  }, [show]);
  console.log(auction);
  const bidder = JSON.parse(localStorage.getItem('userId'));
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(
      addBid({
        id: auction?._id,
        data: {
          bidder: bidder,
          bid: formBid,
        },
      })
    );
    onHide();
    useDispatch(getAuction);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {show ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {auction?.title}
            </Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={formBid}
                  onChange={(e) => {
                    setFormBid(e.target.value);
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={submitForm}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </>
      ) : null}
    </Modal>
  );
}
export default BidForm;
// const BidProduct = ({ socket }) => {
//   //  TODO: Get last price from the store
//   //  ?socketIO
//   const { id } = useParams();
//   console.log(id);
//   const [bid, setBid] = useState(price);
//   const navigate = useNavigate();
//   const [error, setError] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (price > Number(price)) {
//       socket.emit('bidProduct', { price, auctionId: 0 });
//       navigate('auction/products');
//     } else {
//       setError(true);
//     }
//   };

//   const handleBidInput = (e) => {
//     setBid(e.target.value);
//     //   if (){}
//   };
//   return (
// <div>
//   <div className="bidproduct__container">
//     <h2>Place a Bid</h2>
//     <form className="bidProduct__form" onSubmit={handleSubmit}>
//       <h3 className="bidProduct__name">{name}</h3>

//       <label htmlFor="bid">Bidding Amount</label>
//       {error && (
//         <p style={{ color: 'red' }}>
//           The bidding amount must be greater than {price}
//         </p>
//       )}
//       <input
//         type="number"
//         name="bid"
//         value={bid}
//         onChange={(handleBidInput = (e) => setBid(e.target.value))}
//         required
//       />

//       <button className="bidProduct__cta">SEND</button>
//     </form>
//   </div>
// </div>
//     <></>
//   );
// };

// export default BidProduct;
