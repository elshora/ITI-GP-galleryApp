import { useState } from "react";
import { Container, NavLink } from "react-bootstrap";
import styles from "./profile.module.scss";

const Profile = () => {
  const [showText, setShowText] = useState(false);

  return (
    <>
      <Container className={styles.container}>
        <div className="row py-3 ">
          <div className="col-xl-6 col-md-7 d-flex gap-3 mb-3 ">
            <div className="col-3 col-md-4 col-lg-3">
              <img
                src="/assets/imgs/3.jpg"
                alt="userImg"
                width="100%"
                className="rounded"
              />
            </div>
            <div className=" text-myPrimary ">
              <h6 className="mb-1 "> Mary Helmreich Favorite Images </h6>
              <p className={`${styles.text}`}>
                Browse through all of the images favorited by Mary Helmreich.
              </p>
              <div className="d-flex gap-2">
                <button className={`btn btn-sm  ${styles.btn}`}>Follow</button>
                <button className={`btn btn-sm  ${styles.btn}`}>Connect</button>
              </div>
            </div>
          </div>
          <div className=" col-xl-6 col-md-5 d-none d-md-block ">
            <p className={` ${styles.text} d-inline-block mb-0 `}>
              {showText
                ? " Mary Helmreich was born in 1945 near Boston, Massachusetts.Her talent was recognized early, when at age nine she won a prize for portraiture competing against high school students. At twelve she attended a summer art program at the Museum of Fine Arts Boston.In the eleventh grade"
                : `${"Mary Helmreich was born in 1945 near Boston, Massachusetts.Her talent was recognized early, when at age nine she won a prize for portraiture competing against high school students. At twelve she attended a summer art program at the Museum of Fine Arts Boston.In the eleventh grade".slice(
                    0,
                    170
                  )}...`}

              <NavLink
                className={` ${styles.link} fw-semibold d-inline-block text-capitalize ms-2`}
                onClick={() => setShowText(!showText)}
              >
                {showText ? "less" : "more"}
              </NavLink>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
