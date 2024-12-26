import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "@/lib/auth";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = auth.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};