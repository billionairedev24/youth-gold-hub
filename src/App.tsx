import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import EventsPage from "./pages/admin/EventsPage";
import AnnouncementsPage from "./pages/admin/AnnouncementsPage";
import PollsPage from "./pages/admin/PollsPage";
import BudgetPage from "./pages/admin/BudgetPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import SuggestionsPage from "./pages/admin/SuggestionsPage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { Toaster } from "./components/ui/toaster";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/events" element={
          <PrivateRoute>
            <DashboardLayout>
              <EventsPage />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/announcements" element={
          <PrivateRoute>
            <DashboardLayout>
              <AnnouncementsPage />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/polls" element={
          <PrivateRoute>
            <DashboardLayout>
              <PollsPage />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/budget" element={
          <PrivateRoute>
            <DashboardLayout>
              <BudgetPage />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/suggestions" element={
          <PrivateRoute>
            <DashboardLayout>
              <SuggestionsPage />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/analytics" element={
          <PrivateRoute>
            <DashboardLayout>
              <AnalyticsPage />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="/admin/settings" element={
          <PrivateRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </PrivateRoute>
        } />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;