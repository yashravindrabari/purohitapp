"use client"

import { useState, useEffect } from "react"
import { bookingService, purohitService } from "../../services/api"
import { useNavigate } from "react-router-dom"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Loader,
  LogOut,
  TrendingUp,
} from "react-feather"

const PurohitDashboard = () => {
  const [purohitData, setPurohitData] = useState(null)
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState("active")
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [completingId, setCompletingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const storedUser = localStorage.getItem("users")
    if (!token || !storedUser) {
      navigate("/login")
      return
    }
    const user = JSON.parse(storedUser)
    setCurrentUser(user)
    fetchPurohitData(user.id)
    fetchBookings()
  }, [navigate])

  const fetchPurohitData = async (userId) => {
    try {
      const data = await purohitService.getByUserId(userId)
      if (data.purohit) {
        setPurohitData(data.purohit)
      }
    } catch (error) {
      console.error("Error fetching purohit data:", error)
    }
  }

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getAll()
      setBookings(data.bookings || [])
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsCompleted = async (bookingId) => {
    setCompletingId(bookingId)
    try {
      await bookingService.updateStatus(bookingId, "Completed")
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "Completed", updatedAt: new Date().toISOString() } : b)),
      )
    } catch (error) {
      console.error("Error marking as completed:", error)
    } finally {
      setCompletingId(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("users")
    navigate("/")
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getFilteredBookings = () => {
    if (activeTab === "active") {
      return bookings
        .filter((b) => b.status !== "Completed")
        .sort((a, b) => new Date(b.preferredDate || b.bookingDate) - new Date(a.preferredDate || a.bookingDate))
    } else {
      return bookings
        .filter((b) => b.status === "Completed")
        .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    }
  }

const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.amount || 0), 0)
const completedRevenue = bookings.filter((b) => b.status === "Completed").reduce((sum, b) => sum + Number(b.amount || 0), 0)
const pendingRevenue = bookings.filter((b) => b.status !== "Completed").reduce((sum, b) => sum + Number(b.amount || 0), 0)
  const avgRating = purohitData?.averageRating || 0

  const filteredBookings = getFilteredBookings()
  const activeCount = bookings.filter((b) => b.status !== "Completed").length
  const completedCount = bookings.filter((b) => b.status === "Completed").length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader size={32} className="mx-auto mb-4 text-orange-600 animate-spin" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Purohit Dashboard</h1>
            <p className="text-gray-600">Manage your puja bookings and revenue</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Profile Card with Photo */}
        {purohitData && (
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg p-6 mb-8 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden">
                  {purohitData.profileImageUrl ? (
                    <img
                      src={purohitData.profileImageUrl || "/placeholder.svg"}
                      alt={purohitData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-orange-500" />
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-1 text-center sm:text-left">{purohitData.name}</h2>
                <p className="text-orange-50 text-center sm:text-left">
                  {purohitData.aboutYou || "Professional Purohit"}
                </p>
              </div>

              {/* Contact & Details */}
              <div>
                <div className="space-y-2 text-sm">
                  <p className="text-orange-100 text-xs font-semibold uppercase mb-3">Contact Information</p>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{purohitData.mobileNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{purohitData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{purohitData.city}</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-orange-50 text-xs font-medium mb-1">Experience</p>
                  <p className="text-2xl font-bold">{purohitData.yearsOfExperience}</p>
                  <p className="text-orange-50 text-xs">Years</p>
                </div>
                {/* <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-orange-50 text-xs font-medium mb-1">Rating</p>
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                  <p className="text-orange-50 text-xs">/ 5.0</p>
                </div> */}
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-orange-50 text-xs font-medium mb-1">Total</p>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                  <p className="text-orange-50 text-xs">Bookings</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-orange-50 text-xs font-medium mb-1">Completed</p>
                  <p className="text-2xl font-bold">{completedCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Total Revenue</p>
                <div className="flex items-center gap-2">
                  {/* <IndianRupee size={24} className="text-blue-600" /> */}
                  <p className="text-3xl font-bold text-gray-900">{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">All bookings combined</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Completed Revenue</p>
                <div className="flex items-center gap-2">
                  {/* <IndianRupee size={24} className="text-green-600" /> */}
                  <p className="text-3xl font-bold text-gray-900">{completedRevenue.toLocaleString()}</p>
                </div>
              </div>
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <p className="text-xs text-gray-500">From {completedCount} completed bookings</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Pending Revenue</p>
                <div className="flex items-center gap-2">
                  {/* <IndianRupee size={24} className="text-amber-600" /> */}
                  <p className="text-3xl font-bold text-gray-900">{pendingRevenue.toLocaleString()}</p>
                </div>
              </div>
              <TrendingUp size={24} className="text-amber-600" />
            </div>
            <p className="text-xs text-gray-500">From {activeCount} active bookings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "active"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Active Bookings ({activeCount})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "completed"
                ? "bg-green-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FileText size={32} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {activeTab === "active" ? "No active bookings" : "No completed bookings"}
            </h3>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className={`bg-white rounded-lg border shadow-sm overflow-hidden ${booking.status === "Completed" ? "border-green-200" : "border-gray-200"}`}
              >
                {/* Puja Details Section */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{booking.pujaName}</h3>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-800 capitalize">
                          {booking.pujaType || "Puja"}
                        </span>
                        {booking.status === "Completed" && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                            <CheckCircle size={12} />
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2 text-gray-600">
                          <Calendar size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Booking Date</p>
                            <p className="font-semibold text-gray-900">{formatDate(booking.preferredDate)}</p>
                          </div>
                        </div>
                        {booking.preferredTime && (
                          <div className="flex items-start gap-2 text-gray-600">
                            <Clock size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Time</p>
                              <p className="font-semibold text-gray-900">{booking.preferredTime}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="sm:text-right sm:min-w-max">
                      <p className="text-xs text-gray-600 mb-1">Amount</p>
                      <div className="flex items-center justify-end gap-1 mb-3">
                        {/* <IndianRupee size={20} className="text-orange-600" /> */}
                        <p className="text-3xl font-bold text-orange-600">{booking.amount}</p>
                      </div>
                      {booking.status !== "Completed" && (
                        <button
                          onClick={() => markAsCompleted(booking.id)}
                          disabled={completingId === booking.id}
                          className={`w-full px-4 py-2 rounded-lg font-medium text-sm text-white transition-all ${
                            completingId === booking.id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {completingId === booking.id ? "Marking..." : "Mark Complete"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Location</p>
                      <p className="font-semibold text-gray-900">{booking.address || booking.location}</p>
                      <p className="text-xs text-gray-600 mt-1">City: {booking.city}</p>
                    </div>
                  </div>
                </div>

                {/* Yajman (Customer) Details */}
                <div className="p-5 bg-blue-50 border-b border-blue-100">
                  <p className="text-xs font-bold uppercase text-gray-600 mb-3 flex items-center gap-2">
                    <User size={14} />
                    Yajman (Customer) Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <p className="text-xs text-gray-600 font-medium mb-1">Full Name</p>
                      <p className="text-sm font-bold text-gray-900">{booking.userName}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                      <p className="text-xs text-gray-600 font-medium mb-1 flex items-center gap-1">
                        <Phone size={12} />
                        Phone
                      </p>
                      <p className="text-sm font-bold text-gray-900">{booking.userPhone}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200 sm:col-span-2">
                      <p className="text-xs text-gray-600 font-medium mb-1 flex items-center gap-1">
                        <Mail size={12} />
                        Email
                      </p>
                      <p className="text-sm font-bold text-gray-900">{booking.userEmail}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200 sm:col-span-2">
                      <p className="text-xs text-gray-600 font-medium mb-1 flex items-center gap-1">
                        <MapPin size={12} />
                        Detailed Address
                      </p>
                      <p className="text-sm font-bold text-gray-900">{booking.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PurohitDashboard
