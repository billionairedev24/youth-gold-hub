import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import AuthGuard from "@/components/auth/AuthGuard";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import { auth } from "@/lib/auth";

const App = () => {
  const currentUser = auth.getCurrentUser();
  
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              {currentUser?.role === 'admin' ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )}
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard allowedRoles={["admin"]}>
              <AdminDashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthGuard allowedRoles={["member"]}>
              <UserDashboard />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;