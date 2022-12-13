import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { reset, logout } from '../../features/auth/authSlice';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import styles from './navbar.module.scss';
import { getDropdownMenuPlacement } from 'react-bootstrap/esm/DropdownMenu';
function NAV3() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { user, userId, role } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const onLogoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigator('/login');
  };

  return (
    <>
      <Navbar
        sticky="top"
        key="lg"
        expand="lg"
        className={` ${styles.navbar}
       ${active ? styles.active : ''} ${styles.navborderbtbalck}  bg-white `}
      >
        <Container>
          <NavLink to="/">
            {
              <img
                src="/assets/imgs/ArtStation-logo-horizontal-white.svg"
                alt="logo"
                width="120"
                draggable="false"
              />
            }
          </NavLink>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            className={`${styles.menubar} border-0 p-0 shadow-none`}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
            className="bg-white"
          >
            <Offcanvas.Header closeButton className="text-dark">
              <Offcanvas.Title
                id="offcanvasNavbarLabel-expand-md"
                className="text-dark"
              >
                <NavLink to="/" className="text-dark">
                  <img
                    src="/assets/imgs/ArtStation-logo-horizontal-white.svg"
                    alt="Art Station Logo"
                    width="120"
                    draggable="false"
                  />
                </NavLink>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <NavLink
                  className="nav-link flex-center fs-6 text-dark "
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={`nav-link flex-center fs-6  text-dark `}
                  to="/about"
                >
                  About
                </NavLink>
                <NavLink
                  className={`nav-link flex-center fs-6 text-dark  `}
                  to="/shop"
                >
                  Shop
                </NavLink>
                <NavLink
                  className={`nav-link flex-center fs-6 text-dark  `}
                  to="/Auction/products"
                >
                  Auction
                </NavLink>

                <NavLink
                  className="nav-link flex-center fs-6  text-dark"
                  to="/artists"
                >
                  Artists
                </NavLink>
                <NavLink
                  className="nav-link flex-center fs-6  text-dark"
                  to="/contact"
                >
                  Contact us
                </NavLink>
                {role == 'admin' ? (
                  <NavLink
                    className="nav-link flex-center fs-6  text-dark"
                    to="/admindashboard"
                  >
                    Admindashboard
                  </NavLink>
                ) : (
                  ''
                )}
              </Nav>
              <Nav>
                <Nav.Item
                  className={`nav-link ${styles.navlink} ${styles.cart} position-relative `}
                >
                  <NavLink to={'/cart'} className="btn border-0 p-0">
                    <FontAwesomeIcon icon={faCartPlus} />
                    <span className="ms-1">{totalQuantity}</span>
                  </NavLink>
                </Nav.Item>
                <DropdownButton
                  as={ButtonGroup}
                  title={<FontAwesomeIcon icon={faUser} />}
                  align="end"
                  className={`${styles.navdrop} bg-white  p-0  border-0 outline-0 d-block`}
                  variant="none"
                >
                  <Dropdown.Item as="button" variant="none">
                    <NavLink
                      to={`artist/${userId}`}
                      className="my-1 text-decoration-none d-block text-black"
                    >
                      user profile
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={`${styles.navdrop} `}
                    eventKey="1"
                    as="button"
                  >
                    {user ? (
                      <li
                        onClick={() => onLogoutHandler()}
                        className={`${styles.navdrop} `}
                      >
                        Logout
                      </li>
                    ) : (
                      <li>
                        <NavLink
                          to="login"
                          className="my-1 text-decoration-none d-block text-black"
                        >
                          Login
                        </NavLink>

                        <NavLink
                          to="register"
                          className="my-1 text-decoration-none d-block text-black "
                        >
                          register
                        </NavLink>
                      </li>
                    )}
                  </Dropdown.Item>
                </DropdownButton>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NAV3;
