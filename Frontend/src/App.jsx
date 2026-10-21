import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import EventifyLoader from './components/loding/EventifyLoader';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import MyEventsPage from './pages/MyEventsPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AiPlannerPage from './pages/AIPlannerPage';
import BudgetPage from './pages/BudgetPage';
import VendorsPage from './pages/VendorsPage';
import ChecklistPage from './pages/ChecklistPage';
import ProfilePage from './pages/ProfilePage';



export default function App() {
  const [showStartupLoader, setShowStartupLoader] = useState(true);
  const handleLoaderComplete = useCallback(() => {
    setShowStartupLoader(false);
  }, []);

  return (
    <>
      <EventProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Authenticated Dashboard App */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="events" element={<MyEventsPage />} />
              <Route path="create-event" element={<CreateEventPage />} />
              <Route path="events/:id" element={<EventDetailsPage />} />
              <Route path="ai-planner" element={<AiPlannerPage />} />
              <Route path="budget" element={<BudgetPage />} />
              <Route path="vendors" element={<VendorsPage />} />
              <Route path="checklist" element={<ChecklistPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </EventProvider>
      {showStartupLoader && <EventifyLoader onLoaded={handleLoaderComplete} />}
    </>
  );
}