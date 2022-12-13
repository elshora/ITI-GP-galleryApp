import { Outlet } from 'react-router-dom';

import Sidebar from './sidebar/Sidebar';
const Dashboard = () => {
  return (
    <div className="d-flex flex-column flex-lg-row position-relative dashboard">
      <div className="col-lg-3 col-xl-2 p-0 ">
        <Sidebar />
      </div>
      <main className=" col-lg-9 col-xl-10 p-0 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
