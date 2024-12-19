import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CardLinkWrapperProps {
  path: string;
  children: ReactNode;
}

const CardLinkWrapperComponent = ({ path, children }: CardLinkWrapperProps) => {
  return (
    <Link to={path} className="relative w-80 shadow-lg my-6">
      {children}
    </Link>
  );
};

export default CardLinkWrapperComponent;
