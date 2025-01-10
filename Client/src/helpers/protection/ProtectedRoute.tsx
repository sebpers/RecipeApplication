import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingComponent from "../../components/common/Loading/LoadingComponent";

type ProtectedRouteProps = {
  isAuthenticated: () => Promise<boolean>;
};

const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null); // null means loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await isAuthenticated();
        setAuthStatus(isAuth);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthStatus(false);
      }
    };
    checkAuth();
  }, [isAuthenticated]);

  if (authStatus === null) {
    return <LoadingComponent />;
  }

  if (!authStatus) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
