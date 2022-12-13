import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './notfound.css';

const NotFound = ({ setShowNavigators }) => {
  useEffect(() => {
    setShowNavigators(false);
  }, [setShowNavigators]);
  const navigator = useNavigate();
  return (
    <section className="error-section py-5  ">
      <Container>
        <h1 className="fw-semibold">404 Error Page Not Found </h1>

        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>
        <div className="link-container">
          <NavLink to="/">
            <button
              className="more-link btn   mb-4"
              onClick={() => navigator('/')}
            >
              Back To Home
            </button>
          </NavLink>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
