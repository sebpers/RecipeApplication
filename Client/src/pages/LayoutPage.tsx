import { Outlet } from "react-router-dom";
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
    </div>
  );
};

export default LayoutPage;
