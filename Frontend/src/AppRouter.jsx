import { Suspense, useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import useAuth from './hooks/useAuth';
import AiPlannerPage from './pages/AiPlannerPage';
import BudgetPage from './pages/BudgetPage';
import ChecklistPage from './pages/ChecklistPage';
import CreateEventPage from './pages/CreateEventPage';
import DashboardPage from './pages/DashboardPage';
import EventDetailsPage from './pages/EventDetailsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MyEventsPage from './pages/MyEventsPage';
import ProfilePage from './pages/ProfilePage';
import VendorsPage from './pages/VendorsPage';

function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-creme-100 text-burgundy">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-sand border-t-burgundy" />
        <p className="text-xs uppercase tracking-luxury">Preparing your atelier</p>
      </div>
    </div>
  );
}

function ProtectedApp() {
  const { status } = useAuth();
  if (status === 'checking') return <RouteLoader />;
  if (status !== 'authenticated') return <Navigate to="/login" replace />;
  return <DashboardLayout />;
}

function GoogleAuthCallback() {
  const { completeGoogleLogin } = useAuth();
  const navigate = useNavigate();
  const [token] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get('token'));
  const [error, setError] = useState(() => (
    token ? '' : 'Google sign-in did not return an access token. Please try again.'
  ));
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    if (!token) return;

    completeGoogleLogin(token)
      .unwrap()
      .then(() => navigate('/app', { replace: true }))
      .catch((message) => setError(message || 'Unable to complete Google sign-in.'));
  }, [completeGoogleLogin, navigate, token]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-creme-100 px-6">
        <div role="alert" className="glass-card max-w-md rounded-2xl p-8 text-center text-sm text-burgundy">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => navigate('/login', { replace: true })}
            className="mt-5 rounded-full bg-burgundy px-5 py-2 text-xs text-creme"
          >
            Return to sign in
          </button>
        </div>
      </div>
    );
  }

  return <RouteLoader />;
}

function NotFound() {
  return <Navigate to="/" replace />;
}

export default function AppRouter({ isLandingReady = false, onLandingTimelineReady }) {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isReady={isLandingReady}
              onIntroTimelineReady={onLandingTimelineReady}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        <Route path="/app" element={<ProtectedApp />}>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
