import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/home/Home';
import ArtPage from './components/art/ArtPage';
import Register from './components/register/Register';
import Login from './components/login/Login';
import CartPage from './components/cart/CartPage';
import Shop from './components/shop.jsx/Shop';
import ArtistPage from './components/user/ArtistPage';
import { calulateTotals } from './features/cart/cartSlice';
import CheckoutSuccess from './components/Payment/CheckoutSuccess';
import Dashboard from './components/dashboard/Dashboard';
import User from './components/dashboard/userTable/User';
import Auctions from './components/dashboard/auctionTable/Auctions';
import Arts from './components/dashboard/arts/Arts';
import Orders from './components/dashboard/orders/Orders';
import Categories from './components/dashboard/categories/Categories';
import UserForm from './components/dashboard/userTable/UserForm';
import CategoryForm from './components/dashboard/categories/CategoryForm';
import About from './pages/About_Us/About';
import PostArt from './components/postArt/PostArt';
import Footer from './components/footer/Footer';
import AuctionPage from './pages/AuctionPage';
import Products from './components/auction/Products';
import AuctionAddForm from './components/auction/AuctionAddForm';
import UpdateArt from './components/UpdateArt/UpdateArt';
import Contactus from './pages/ContactUs/Contact_US';
// import NavbarSec from './components/navbar/NavbarSec';
import Allartistpage from './components/user/allartistpage';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import './App.scss';
import NAV3 from './components/navbar/NAV3';
import NotFound from './pages/notFound/NotFound';
import ArtistsComp from './components/art/ArtistsComp';

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calulateTotals());
  }, [dispatch, cartItems]);
  const [showNavigators, setShowNavigators] = useState(true);
  const { pathname } = useLocation();
  const { role } = useSelector((state) => state.auth);
  const navigator = useNavigate();
  useEffect(() => {
    if (pathname.includes('/admindashboard') && role === 'user') {
      navigator('/');
    }
  }, []);

  return (
    <>
      {pathname.includes('/admindashboard') ? '' : showNavigators && <NAV3 />}

      <Routes path="/">
        <Route path="cart" element={<CartPage />} />
        <Route path="auction" element={<AuctionPage />}>
          <Route path="products" element={<Products />} />
          <Route path="add" element={<AuctionAddForm />} />
          {/* <Route path="bid/:name/:price" element={<BidProduct />} /> */}
        </Route>
        <Route path="contact" element={<Contactus />} />
        <Route path="checkout-success" element={<CheckoutSuccess />} />
        <Route path="shop" element={<Shop />}>
          <Route path="post" element={<PostArt />} />
        </Route>
        <Route path="shop/:id" element={<ArtPage />} />
        <Route index element={<Home setShowNavigators={setShowNavigators} />} />
        <Route path="update/:id" element={<UpdateArt />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="Artist/:id" element={<ArtistPage />} />
        <Route path="admindashboard" element={<Dashboard />}>
          <Route path="users" element={<User />}>
            <Route path="new" element={<UserForm />} />
            <Route path=":id" element={<UserForm />} />
          </Route>
          <Route path="categories" element={<Categories />}>
            <Route path="new" element={<CategoryForm />} />
            <Route path=":id" element={<CategoryForm />} />
          </Route>
          <Route path="arts" element={<Arts />}>
            <Route path="new" element={<PostArt />} />
            <Route path=":id" element={<UpdateArt />} />
          </Route>
          <Route path="auctions" element={<Auctions />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="artists" element={<ArtistsComp />} />
        <Route
          path="*"
          element={<NotFound setShowNavigators={setShowNavigators} />}
        />
        <Route path="cart/checkout-success" element={<CheckoutSuccess />} />
      </Routes>
      {pathname.includes('/admindashboard') ? '' : showNavigators && <Footer />}

      <ToastContainer />
    </>
  );
}

export default App;
