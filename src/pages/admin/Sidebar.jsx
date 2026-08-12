import React, { useState } from 'react';

const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  const [expandedSections, setExpandedSections] = useState({
    'zonal-purohit': false,
    'puja': false,
    'purohit': false,
    'yajman': false,
    'reviews': false,
    'spiritual-gallery': false,
    'rashibhavishya': false,
    'quiz': false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Close mobile sidebar
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      page: 'dashboard'
    },
    {
      id: 'zonal-purohit',
      label: 'Zonal Purohit',
      icon: '👤',
      expandable: true,
      children: [
        { id: 'create-zonal-purohit', label: 'Create Zonal Purohit', page: 'create-zonal-purohit' },
        { id: 'view-zonal-purohit', label: 'View Zonal Purohit', page: 'view-zonal-purohit' }
      ]
    },
    {
      id: 'puja',
      label: 'Puja',
      icon: '🕉️',
      expandable: true,
      children: [
        { id: 'puja-section', label: 'Puja Section', page: 'puja-section' },
        { id: 'puja-booking', label: 'Puja Booking', page: 'puja-booking' }
      ]
    },
    {
      id: 'purohit',
      label: 'Purohit',
      icon: '🧘',
      expandable: true,
      children: [
        { id: 'view-purohits', label: 'View Purohits', page: 'view-purohits' }
      ]
    },
    {
      id: 'yajman',
      label: 'Yajman',
      icon: '👥',
      expandable: true,
      children: [
        { id: 'view-yajman', label: 'View Yajman', page: 'view-yajman' }
      ]
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: '⭐',
      expandable: true,
      children: [
        { id: 'reviews', label: 'Reviews', page: 'reviews' }
      ]
    },
    {
      id: 'spiritual-gallery',
      label: 'Spiritual Gallery',
      icon: '🖼️',
      expandable: true,
      children: [
        { id: 'aarti-section', label: 'Aarti Section', page: 'aarti-section' },
        { id: 'stotra-mantra', label: 'Stotra & Mantra', page: 'stotra-mantra' },
        { id: 'upcoming-festivals', label: 'Upcoming Festivals', page: 'upcoming-festivals' }
      ]
    },
    // {
    //   id: 'rashibhavishya',
    //   label: 'Rashibhavishya',
    //   icon: '🔮',
    //   expandable: true,
    //   children: [
    //     { id: 'daily-rashibhavishya', label: 'Daily Rashibhavishya', page: 'daily-rashibhavishya' }
    //   ]
    // },
    // {
    //   id: 'quiz',
    //   label: 'Quiz',
    //   icon: '❓',
    //   expandable: true,
    //   children: [
    //     { id: 'add-quiz-questions', label: 'Add Quiz Questions', page: 'add-quiz-questions' },
    //     { id: 'quiz-winners', label: 'Quiz Winners', page: 'quiz-winners' },
    //     { id: 'add-giftcard', label: 'Add Giftcard for Winners', page: 'add-giftcard' }
    //   ]
    // }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-orange-500 font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-lg">SuperAdmin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.expandable ? (
              <div>
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSections[item.id] ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {expandedSections[item.id] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handlePageChange(child.page)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                          currentPage === child.page
                            ? 'bg-orange-100 text-orange-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handlePageChange(item.page)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )}
          </div>
        ))}
        
        {/* Logout */}
        <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-200 mt-4">
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
