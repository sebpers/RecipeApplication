import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <div className="flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
