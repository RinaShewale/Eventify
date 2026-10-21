import { useState } from 'react';
import EventifyLoader from '../loding/EventifyLoader';
import LandingPage from '../../pages/LandingPage';

export default function Experience() {
  const [loaderMounted, setLoaderMounted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const handleLoaderComplete = () => {
    // 1. Tell LandingPage to kick off its intro animations
    setIsReady(true);
    // 2. Unmount loader after exit curtain animation ends
    setLoaderMounted(false);
  };

  return (
    <div className="relative w-full min-h-screen">
      {loaderMounted && (
        <EventifyLoader
          duration={3} // Set to 3 for 3 seconds, or 180 for 3 minutes
          onComplete={handleLoaderComplete}
        />
      )}
      <LandingPage isReady={isReady} />
    </div>
  );
}