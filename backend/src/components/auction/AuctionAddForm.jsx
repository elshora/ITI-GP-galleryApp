import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row } from 'react-bootstrap';
import { useState } from 'react';

const AuctionAddForm = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [endDate, setEndDate] = useState();
  const [openingPrice, setOpeningPrice] = useState();
  console.log(endDate);
  const author = JSON.parse(localStorage.getItem('userId'));
  const handleSubmit = () => {};
  return (
    <Container>
      <Row>
        <Form>
          {/* Title */}
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="Text"
              placeholder="Enter the post title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Image */}
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Picture of product</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Open Price</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setOpeningPrice(e.target.value)}
            />
          </Form.Group>

          {/* Date */}
          <Form.Group className="mb-3" controlId="endDate">
            <Form.Label>Auction End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="Password"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit} type="submit" min>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default AuctionAddForm;
