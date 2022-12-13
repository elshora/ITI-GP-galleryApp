import React from 'react';
import styles from '../../styles/_contactUs.module.scss';
export default function Contactus() {
  return (
    <>
      <div className="container">
        <div className=" justify-content-center align-items-center my-5 row">
          <div className="col-12 col-md-6   ">
            <img
              src="/images/shop/giphy.gif"
              alt=""
              draggable="false"
              width="100%"
            />
          </div>
          <div className="col-12 col-md-6">
            <form>
              <h1 className={`${styles.title} fs-4 text-center mb-4`}>
                KEEP IN TOUCH WITH US
              </h1>

              <div className="form-group position-relative mb-3">
                <label htmlFor="formName" className="d-block">
                  <i className={`${styles.icon}`} data-feather="user"></i>
                </label>
                <input
                  type="text"
                  id="formName"
                  className="form-control form-control-lg thick"
                  placeholder="Name"
                />
              </div>

              <div className="form-group position-relative mb-3">
                <label htmlFor="formEmail" className="d-block">
                  <i className="icon" data-feather="mail"></i>
                </label>
                <input
                  type="email"
                  id="formEmail"
                  className="form-control form-control-lg thick"
                  placeholder="E-mail"
                />
              </div>

              <div className="form-group message mb-3">
                <textarea
                  id="formMessage"
                  className="form-control form-control-lg"
                  rows="6"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="text-center mb-4">
                <button
                  type="submit"
                  className={`${styles.bgimportart} btn btn-primary `}
                  tabIndex="-1"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
