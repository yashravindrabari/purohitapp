import { useState } from "react";
import { Calendar, Clock, Feather, BookOpen, Music, Image, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const [upcomingPujas, setUpcomingPujas] = useState([
    {
      id: 1,
      name: "Satyanarayan Puja",
      date: "2023-10-15",
      time: "10:00 AM",
      purohit: "Pandit Ramesh Sharma",
      status: "confirmed"
    },
    {
      id: 2,
      name: "Griha Pravesh",
      date: "2023-10-28",
      time: "09:30 AM",
      purohit: "Pandit Suresh Joshi",
      status: "pending"
    }
  ]);

  const services = [
    { 
      id: 1, 
      name: "My Bookings", 
      icon: <Feather className="w-8 h-8 text-orange-500" />,
      path: "/yajman-dashboard/bookings",
      bgColor: "bg-orange-50"
    },
    { 
      id: 2, 
      name: "Festivals", 
      icon: <Calendar className="w-8 h-8 text-amber-500" />,
      path: "/yajman-dashboard/religious/festivals",
      bgColor: "bg-amber-50"
    },
    { 
      id: 3, 
      name: "Aarti", 
      icon: <Image className="w-8 h-8 text-rose-500" />,
      path: "/yajman-dashboard/devotional-content/audio",
      bgColor: "bg-rose-50"
    },
    // { 
    //   id: 4, 
    //   name: "Dev-Devi", 
    //   icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    //   path: "/yajman-dashboard/religious/deities",
    //   bgColor: "bg-blue-50"
    // },
    // { 
    //   id: 5, 
    //   name: "Wallpaper", 
    //   icon: <Image className="w-8 h-8 text-purple-500" />,
    //   path: "/yajman-dashboard/devotional-content/wallpapers",
    //   bgColor: "bg-purple-50"
    // },
    { 
      id: 6, 
      name: "Audio Stotra", 
      icon: <Music className="w-8 h-8 text-green-500" />,
      path: "/yajman-dashboard/devotional-content/audio",
      bgColor: "bg-green-50"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome, Rahul!</h1>
        <p className="opacity-90">
          Explore spiritual services, book pujas, and access devotional content all in one place.
        </p>
        <div className="mt-4">
          <Link 
            to="/yajman-dashboard/puja-services" 
            className="inline-flex items-center px-4 py-2 bg-white text-orange-600 rounded-lg font-medium shadow-sm hover:bg-orange-50 transition-colors"
          >
            Book a Puja
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>

      {/* Featured Video */}
      {/* <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Featured Video</h2>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-gray-900">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Video player placeholder</p> */}
            {/* Actual video player would go here */}
          {/* </div>
        </div>
      </div> */}

      {/* Quick Access Services */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {services.map((service) => (
            <Link 
              key={service.id} 
              to={service.path}
              className="flex flex-col items-center p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-3`}>
                {service.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{service.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Pujas */}
      {/* <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Pujas</h2>
          <Link 
            to="/dashboard/bookings" 
            className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center"
          >
            View All
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {upcomingPujas.length > 0 ? (
          <div className="space-y-3">
            {upcomingPujas.map((puja) => (
              <div 
                key={puja.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-orange-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{puja.name}</h3>
                    <p className="text-sm text-gray-500">Purohit: {puja.purohit}</p>
                  </div>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      puja.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {puja.status.charAt(0).toUpperCase() + puja.status.slice(1)}
                  </span>
                </div>
                <div className="mt-3 flex items-center text-sm text-gray-600">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(puja.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{puja.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No upcoming pujas scheduled</p>
            <Link 
              to="/dashboard/puja-services" 
              className="mt-2 inline-block text-orange-600 hover:text-orange-700 font-medium"
            >
              Book a Puja
            </Link>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default DashboardHome;
