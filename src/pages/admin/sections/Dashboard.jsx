"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { bookingService, purohitService } from "../../../services/api"
import {  Users, TrendingUp, MapPin, DollarSign, Loader, LogOut } from "react-feather"

const Dashboard = () => {
  const [bookings, setBookings] = useState([])
  const [purohits, setPurohits] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const bookingsData = await bookingService.getAll()
      const purohitsData = await purohitService.getAll()

      setBookings(bookingsData.bookings || [])
      setPurohits(purohitsData.purohits || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number.parseFloat(b.amount) || 0), 0)
  const totalBookings = bookings.length
  const assignedBookings = bookings.filter((b) => b.purohitId).length
  const completedBookings = bookings.filter((b) => b.status === "Completed").length
  const totalPurohits = purohits.filter((p) => p.status === "approved").length
  const totalYajmans = new Set(bookings.map((b) => b.userPhone)).size

  const pujaTypeStats = {}
  bookings.forEach((b) => {
    const type = b.pujaType || "Unknown"
    pujaTypeStats[type] = (pujaTypeStats[type] || 0) + 1
  })

  const locationStats = {}
  bookings.forEach((b) => {
    const city = b.city || "Unknown"
    locationStats[city] = (locationStats[city] || 0) + 1
  })

  const revenueByType = {}
  bookings.forEach((b) => {
    const type = b.pujaType || "Unknown"
    revenueByType[type] = (revenueByType[type] || 0) + (Number.parseFloat(b.amount) || 0)
  })

  const revenueByLocation = {}
  bookings.forEach((b) => {
    const city = b.city || "Unknown"
    revenueByLocation[city] = (revenueByLocation[city] || 0) + (Number.parseFloat(b.amount) || 0)
  })

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("users")
    navigate("/")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <Loader size={32} className="mx-auto mb-4 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Complete overview of bookings, revenue, and platform metrics</p>
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalRevenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-blue-600">{totalBookings}</p>
              </div>
              {/* <BarChart3 className="w-10 h-10 text-blue-500 opacity-20" /> */}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Active Purohits</p>
                <p className="text-3xl font-bold text-orange-600">{totalPurohits}</p>
              </div>
              <Users className="w-10 h-10 text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Yajmans</p>
                <p className="text-3xl font-bold text-purple-600">{totalYajmans}</p>
              </div>
              <Users className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Assigned Bookings</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-blue-600">{assignedBookings}</p>
              <p className="text-sm text-gray-500">of {totalBookings} total</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totalBookings > 0 ? `${((assignedBookings / totalBookings) * 100).toFixed(0)}% assigned` : "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Completed Bookings</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-green-600">{completedBookings}</p>
              <p className="text-sm text-gray-500">of {totalBookings} total</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totalBookings > 0 ? `${((completedBookings / totalBookings) * 100).toFixed(0)}% completed` : "N/A"}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-600 text-sm font-medium mb-2">Avg Booking Value</p>
            <p className="text-2xl font-bold text-amber-600">
              ₹
              {totalBookings > 0
                ? (totalRevenue / totalBookings).toLocaleString("en-IN", { maximumFractionDigits: 0 })
                : 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">Per booking average</p>
          </div>
        </div>

        {/* Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Puja Type Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              {/* <BarChart3 size={20} className="text-blue-600" /> */}
              Bookings by Puja Type
            </h2>
            <div className="space-y-3">
              {Object.entries(pujaTypeStats).length > 0 ? (
                Object.entries(pujaTypeStats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, count]) => (
                    <div key={type} className="flex items-end justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 capitalize mb-1">{type}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(count / totalBookings) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm font-bold text-gray-900">{count}</p>
                        <p className="text-xs text-gray-500">{((count / totalBookings) * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </div>
          </div>

          {/* Revenue by Puja Type */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-green-600" />
              Revenue by Puja Type
            </h2>
            <div className="space-y-3">
              {Object.entries(revenueByType).length > 0 ? (
                Object.entries(revenueByType)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, revenue]) => (
                    <div key={type} className="flex items-end justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 capitalize mb-1">{type}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(revenue / totalRevenue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm font-bold text-gray-900">
                          ₹{revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-500">{((revenue / totalRevenue) * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Location Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bookings by Location */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-orange-600" />
              Bookings by Location
            </h2>
            <div className="space-y-3">
              {Object.entries(locationStats).length > 0 ? (
                Object.entries(locationStats)
                  .sort(([, a], [, b]) => b - a)
                  .map(([location, count]) => (
                    <div key={location} className="flex items-end justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">{location}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(count / totalBookings) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm font-bold text-gray-900">{count}</p>
                        <p className="text-xs text-gray-500">{((count / totalBookings) * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </div>
          </div>

          {/* Revenue by Location */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-purple-600" />
              Revenue by Location
            </h2>
            <div className="space-y-3">
              {Object.entries(revenueByLocation).length > 0 ? (
                Object.entries(revenueByLocation)
                  .sort(([, a], [, b]) => b - a)
                  .map(([location, revenue]) => (
                    <div key={location} className="flex items-end justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 mb-1">{location}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(revenue / totalRevenue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm font-bold text-gray-900">
                          ₹{revenue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-gray-500">{((revenue / totalRevenue) * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
