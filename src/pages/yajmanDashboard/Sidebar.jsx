"use client"

import { Link, NavLink, useNavigate } from "react-router-dom"
import {
  Home,
  User,
  Calendar,
  BookOpen,
  Music,
  Image,
  FileText,
  Settings,
  LogOut,
  X,
  Feather,
  Star,
} from "react-feather"
import toast from "react-hot-toast"
import { useContext } from "react"
import myContext from "../../context/myContext"

const Sidebar = ({ isOpen, isMobile, toggleSidebar }) => {
  const navigate = useNavigate()
  const context = useContext(myContext)
  const { setLoading } = context

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/yajman-dashboard/home" },
    { name: "My Profile", icon: <User size={20} />, path: "/yajman-dashboard/profile" },
    { name: "My Bookings", icon: <Calendar size={20} />, path: "/yajman-dashboard/bookings" },
    { name: "Puja Services", icon: <Feather size={20} />, path: "/yajman-dashboard/puja-services" },
    {
      name: "Devotional Content",
      icon: <BookOpen size={20} />,
      path: "/yajman-dashboard/devotional-content",
      subItems: [
        { name: "Audio Stotras", icon: <Music size={16} />, path: "/yajman-dashboard/devotional-content/audio" },
        // { name: "Wallpapers", icon: <Image size={16} />, path: "/yajman-dashboard/devotional-content/wallpapers" },
        { name: "Sacred Texts", icon: <FileText size={16} />, path: "/yajman-dashboard/devotional-content/texts" },
        { name: "Festivals", icon: <Calendar size={16} />, path: "/yajman-dashboard/religious/festivals" },
        // { name: "Dev-Devi", icon: <Star size={16} />, path: "/yajman-dashboard/religious/deities" },
      ],
    },
  ]

  /**========================================================================
   *                          Logout Function
   *========================================================================**/
  const handleLogout = () => {
    try {
      setLoading && setLoading(true)

      // Clear auth data from localStorage
      localStorage.removeItem("authToken")
      localStorage.removeItem("users")

      // Show success message
      toast.success("Logged out successfully")

      // Redirect to home page
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to logout. Please try again.")
    } finally {
      setLoading && setLoading(false)
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} ${
          isMobile ? "fixed inset-y-0 left-0 z-30" : "fixed inset-y-0 left-0 z-30"
        } w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out flex flex-col h-screen`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <img src="https://purohitapp.netlify.app/assets/img/drawable/applogo1.png" alt="PurohitApp Logo" className="h-8 w-auto" />
            <h2 className="ml-2 text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              PurohitApp
            </h2>
          </div>
          {isMobile && (
            <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
              <X size={20} />
            </button>
          )}
        </div>

        {/* User Info */}
        

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.subItems ? true : undefined}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                      isActive ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>

                {item.subItems && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-100"
                            }`
                          }
                        >
                          <span className="mr-2">{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            className="flex items-center w-full px-3 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar