import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, UserRole } from "@/lib/auth";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const AuthGuard = ({ children, allowedRoles = ["member", "admin"] }: AuthGuardProps) => {
  const navigate = useNavigate();
  const currentUser = auth.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      if (currentUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      return;
    }
  }, [currentUser, allowedRoles, navigate]);

  if (!currentUser) {
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;