"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, Routes, Route, Navigate } from "react-router-dom"
import { Menu, ChevronDown, LogOut, User } from "react-feather"
import Sidebar from "./Sidebar"
import DashboardHome from "./DashboardHome"
import ProfileSection from "./ProfileSection"
import MyBookings from "./MyBookings"
import PujaServices from "./PoojaServices"
import DevotionalContent from "./DevotionalContent"
import AudioStotras from "./devotional/AudioStotras"
import Wallpapers from "./devotional/Wallpapers"
import SacredTexts from "./devotional/SacredText"

import Festivals from "./religious/Festivals"
import Deities from "./religious/Deities"

const YajmanDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const navigate = useNavigate()

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Check authentication from localStorage (JWT-based)
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("users")

    if (token && userData) {
      const parsedUser = JSON.parse(userData)
      setUser({
        ...parsedUser,
        avatar: parsedUser.profileImageUrl || "/abstract-geometric-shapes.png",
      })
    } else {
      setUser(null)
      navigate("/login")
    }
    setLoading(false)
  }, [navigate])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("users")
    setUser(null)
    navigate("/login")
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} user={user} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "ml-0 md:ml-64" : "ml-0"
        }`}
      >
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-orange-100 overflow-hidden flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-orange-500 font-medium text-sm">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">{user.name}</span>
                  <ChevronDown size={16} className="hidden md:block text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                    <button
                      onClick={() => {
                        setDropdownOpen(false)
                        navigate("/yajman-dashboard/profile")
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-2 text-gray-500" />
                      Profile
                    </button>
             
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false)
                        handleLogout()
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/yajman-dashboard/home" />} />
            <Route path="/home" element={<DashboardHome user={user} />} />
            <Route path="/profile" element={<ProfileSection user={user} setUser={setUser} />} />
            <Route path="/bookings" element={<MyBookings user={user} />} />
            <Route path="/puja-services" element={<PujaServices />} />
            <Route path="/devotional-content" element={<DevotionalContent />} />
            <Route path="/devotional-content/audio" element={<AudioStotras />} />
            <Route path="/devotional-content/wallpapers" element={<Wallpapers />} />
            <Route path="/devotional-content/texts" element={<SacredTexts />} />
            <Route path="/religious/festivals" element={<Festivals />} />
            <Route path="/religious/deities" element={<Deities />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default YajmanDashboard
