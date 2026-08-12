import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './sections/Dashboard';
import CreateZonalPurohit from './sections/CreateZonalPurohit';
import ViewZonalPurohit from './sections/ViewZonalPurohit';
import PujaSection from './sections/PujaSection';
import ViewPurohits from './sections/ViewPurohits';
import ViewYajman from './sections/ViewYajman';
import Reviews from './sections/Reviews';
import AartiSection from './sections/AartiSection';
import StotraMantra from './sections/StotraMantra';
import UpcomingFestivals from './sections/UpcomingFestivals';
import DailyRashibhavishya from './sections/DailyRashibhavishya';
import AddQuizQuestions from './sections/AddQuizQuestions';
import QuizWinners from './sections/QuizWinners';
import AddGiftcard from './sections/AddGiftCard';
import ComingSoon from './sections/ComingSoon';
import PujaBooking from '../yajmanDashboard/PoojaServices';
import AdminBookings from './sections/AdminBookings';

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'create-zonal-purohit':
        return <CreateZonalPurohit />;
      case 'view-zonal-purohit':
        return <ViewZonalPurohit />;
      case 'puja-section':
        return <PujaSection />;
      case 'puja-booking':
        return <AdminBookings />;
      case 'view-purohits':
        return <ViewPurohits />;
      case 'view-yajman':
        return <ViewYajman />;
      case 'reviews':
 
        return <Reviews />;
      case 'aarti-section':
        return <AartiSection />;
      case 'stotra-mantra':
        return <StotraMantra />;
      case 'upcoming-festivals':
        return <UpcomingFestivals />;
      case 'daily-rashibhavishya':
        return <ComingSoon />;
        // return <DailyRashibhavishya />;
      case 'add-quiz-questions':
        return <ComingSoon />;
        // return <AddQuizQuestions />;
      case 'quiz-winners':
        return <ComingSoon />;
        // return <QuizWinners />;
      case 'add-giftcard':
        return <ComingSoon />;
        // return <AddGiftcard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
