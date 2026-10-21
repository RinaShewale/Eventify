import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar />
      <MobileNavigation />
      <main className="lg:ml-[260px] min-h-screen pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
