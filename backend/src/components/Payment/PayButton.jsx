import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { url } from '../../slice/api';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const STKey =
  'pk_test_51M4NZpHo4YVrdC5dODyZlSCEgwEHbsoE9oyr6dn9XWWoKEkbTYf9eBkuNXrXTPY89NNXqZ2fYNxLOuJvUpUyNOrQ00Ld1wkzWr';
const PayButton = ({ cartItems }) => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
    console.log(token);
    console.log(cartItems);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        history('checkout-success');
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, history]);
  return (
    <>
      {stripeToken ? (
        <span> PROCESSING PLEASE WAIT.....</span>
      ) : (
        <StripeCheckout
          name="Art_Station"
          billingAddress
          shippingAddress
            description={cartItems.description}
            image="https://logovectordl.com/wp-content/uploads/2020/08/artstation-logo-vector.png"
          title={cartItems.title}
          price={cartItems.price}
          amount={cartItems.quantity}
          token={onToken}
          stripeKey={STKey}
        >
          <button className="btn border btn-outline-success"> Check Out</button>

          {/* <button onClick={() => handleCheckout(cartItems)}> Check Out</button> */}
        </StripeCheckout>
      )}
    </>
  );
};

export default PayButton;

////////////////////////////////////////////////
// const {cartItems} = useSelector((state) => state.cart);
// const { user } = useSelector((state) => state.auth);
// console.log('====================================');
// console.log({user});
// console.log('====================================');
// const handleCheckout = () => {
//   console.log(cartItems)
//   axios
//     .post(`${url}/stripe/create-checkout-session`, {
//       cartItems,
//       userId: user._id,
//     })
//     .then((res) => {
//       if (res.data.url) {
//         window.location.href = res.data.url;
//       }
//       console.log({res})
//     })
//     .catch((err) => console.log(err.message));
// };
