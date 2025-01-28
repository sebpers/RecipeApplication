import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const useRoleGuard = (
  allowedRoles: string[],
  redirectTo: string = "/"
) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !allowedRoles.some((role) => user.roles?.includes(role))) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, allowedRoles, navigate, redirectTo]);

  const hasAccess = user?.roles?.some((role) => allowedRoles.includes(role));

  return { hasAccess, user };
};
