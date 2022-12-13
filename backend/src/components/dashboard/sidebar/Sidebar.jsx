import { NavLink } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <div className="iconContainer me-2">
          <i className="fa-brands fa-jedi-order" />
        </div>
        <h2 className="sidebarTitle">Art Station</h2>
      </div>
      <div className="center">
        <ul className="sidebarListContainer  gap-2 p-0 ">
          <li className="items">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `active linkItem  nav-link  fs-6 fw-bold  `
                  : ` nav-link  fs-6 fw-bold  linkItem    `
              }
            >
              <i className="fa-solid fa-left-long"></i>
              Home
            </NavLink>
          </li>

          <li className="items">
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? `active linkItem  nav-link  fs-6 fw-bold `
                  : ` nav-link  fs-6 fw-bold  linkItem `
              }
            >
              <i className="fa-solid fa-users" />
              Users
            </NavLink>
          </li>
          <li className="items">
            <NavLink
              to="categories"
              className={({ isActive }) =>
                isActive
                  ? `active linkItem  nav-link  fs-6 fw-bold `
                  : ` nav-link  fs-6 fw-bold  linkItem `
              }
            >
              <i className="fa-solid fa-ethernet" />
              Categories
            </NavLink>
          </li>
          <li className="items">
            <NavLink
              to="arts"
              className={({ isActive }) =>
                isActive
                  ? `active linkItem  nav-link  fs-6 fw-bold `
                  : ` nav-link  fs-6 fw-bold  linkItem `
              }
            >
              <i className="fa-solid fa-paintbrush" />
              Arts
            </NavLink>
          </li>
          {/* <li className="items">
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive
                  ? `active linkItem  nav-link  fs-6 fw-bold `
                  : ` nav-link  fs-6 fw-bold  linkItem `
              }
            >
              <i className="fa-brands fa-first-order-alt" />
              Orders
            </NavLink>
          </li> */}
          {/* <li className="items">
            <NavLink
              to="auctions"
              className={({ isActive }) =>
                isActive
                  ? `active linkItem  nav-link  fs-6 fw-bold `
                  : ` nav-link  fs-6 fw-bold  linkItem `
              }
            >
              <i className="fa-brands fa-galactic-senate" />
              Auctions
            </NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
