import { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import EventifyLoader from './components/loding/EventifyLoader';
import { EventProvider } from './context/EventContext';
import useAuth from './hooks/useAuth';
import AppRouter from './AppRouter';
import { store } from './redux/store';

function AppContent() {
  const { restoreSession } = useAuth();
  const [showStartupLoader, setShowStartupLoader] = useState(true);
  const handleLoaderComplete = useCallback(() => setShowStartupLoader(false), []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <>
    
        <EventProvider>
          <AppRouter />
        </EventProvider>
    
      {showStartupLoader && <EventifyLoader onComplete={handleLoaderComplete} />}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
