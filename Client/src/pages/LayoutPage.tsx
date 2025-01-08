import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavbarComponent from "../components/NavbarComponent";

const LayoutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarComponent />

      <div className="flex-grow">
        <div className="flex justify-center">
          <Outlet />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LayoutPage;
