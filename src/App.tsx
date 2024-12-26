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
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/events" element={<PrivateRoute><EventsPage /></PrivateRoute>} />
        <Route path="/admin/announcements" element={<PrivateRoute><AnnouncementsPage /></PrivateRoute>} />
        <Route path="/admin/polls" element={<PrivateRoute><PollsPage /></PrivateRoute>} />
        <Route path="/admin/budget" element={<PrivateRoute><BudgetPage /></PrivateRoute>} />
        <Route path="/admin/suggestions" element={<PrivateRoute><SuggestionsPage /></PrivateRoute>} />
        <Route path="/admin/analytics" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
        <Route path="/admin/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;