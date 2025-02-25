import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";

const DashboardLayout = () => {
  return (
    <div className="drawer  container mx-auto p-3">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex gap-8">
        {/* Page content here */}
        
        <label htmlFor="my-drawer" className="bg-primaryColor btn btn-sm text-white">
        <RxHamburgerMenu /> <span className="hidden lg:flex">Open Sidebar</span>
        </label>
        <Outlet/>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Sidebar/>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
