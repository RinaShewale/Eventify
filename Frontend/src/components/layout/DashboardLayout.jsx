import React, { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import Toast from '../ui/Toast';
import gsap from 'gsap';

export default function DashboardLayout() {
  const mainRef = useRef(null);
  const location = useLocation();

  // Smooth route page-transition animation
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-creme-100 font-sans text-burgundy relative selection:bg-burgundy selection:text-creme">
      {/* Editorial Luxury Ambient Gradient Spots */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-dustyPink/15 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="fixed bottom-0 left-1/3 w-[600px] h-[600px] bg-sand/30 rounded-full blur-[160px] pointer-events-none -z-0" />

      {/* Persistent Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-0 relative z-10">
        <Topbar />
        <main ref={mainRef} className="flex-1 p-5 md:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating Responsive Mobile Navigation */}
      <MobileNav />
      
      {/* Toast Layer */}
      <Toast />
    </div>
  );
}