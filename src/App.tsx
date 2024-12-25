import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import AuthGuard from "@/components/auth/AuthGuard";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import CreateEvent from "@/pages/admin/CreateEvent";
import CreatePoll from "@/pages/admin/CreatePoll";
import CreateAnnouncement from "@/pages/admin/CreateAnnouncement";
import CreateBudget from "@/pages/admin/CreateBudget";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <UserDashboard />
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
          path="/admin/events/create"
          element={
            <AuthGuard allowedRoles={["admin"]}>
              <CreateEvent />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/polls/create"
          element={
            <AuthGuard allowedRoles={["admin"]}>
              <CreatePoll />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/announcements/create"
          element={
            <AuthGuard allowedRoles={["admin"]}>
              <CreateAnnouncement />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/budget/create"
          element={
            <AuthGuard allowedRoles={["admin"]}>
              <CreateBudget />
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