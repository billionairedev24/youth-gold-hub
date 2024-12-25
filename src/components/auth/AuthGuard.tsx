import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth, UserRole } from "@/lib/auth";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const AuthGuard = ({ children, allowedRoles = ["member", "admin"] }: AuthGuardProps) => {
  const currentUser = auth.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;