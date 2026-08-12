"use client"

import { useState, useEffect } from "react"
import { bookingService, purohitService } from "../../../services/api"
import { Users, DollarSign, CheckCircle, Clock, Edit2, X } from "react-feather"

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [purohits, setPurohits] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedPurohit, setSelectedPurohit] = useState({})
  const [assigningId, setAssigningId] = useState(null)
  const [editingBookingId, setEditingBookingId] = useState(null)

  useEffect(() => {
    fetchBookingsAndPurohits()
  }, [])

  const fetchBookingsAndPurohits = async () => {
    try {
      setLoading(true)
      const bookingsData = await bookingService.getAll()
      const bookingsList = bookingsData.bookings || []

      const purohitsData = await purohitService.getAll({ status: "approved" })
      const purohitsByCity = {}
      ;(purohitsData.purohits || []).forEach((purohit) => {
        if (!purohitsByCity[purohit.city]) {
          purohitsByCity[purohit.city] = []
        }
        purohitsByCity[purohit.city].push(purohit)
      })

      setBookings(bookingsList)
      setPurohits(purohitsByCity)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePurohitSelect = (bookingId, purohitId) => {
    setSelectedPurohit((prev) => ({
      ...prev,
      [bookingId]: purohitId,
    }))
  }

  const handleAssignPurohit = async (bookingId, city) => {
    const purohitId = selectedPurohit[bookingId]
    if (!purohitId) return

    try {
      setAssigningId(bookingId)
      const cityPurohits = purohits[city] || []
      const selected = cityPurohits.find((p) => p.id === purohitId)

      if (!selected) return

      await bookingService.assignPurohit(bookingId, {
        purohitId: selected.id,
        purohitName: selected.name,
        purohitEmail: selected.email,
        purohitMobile: selected.mobileNumber,
        purohitCity: selected.city,
        purohitExperience: selected.yearsOfExperience,
      })

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? {
                ...b,
                purohitId: selected.id,
                purohitName: selected.name,
                purohitEmail: selected.email,
                purohitMobile: selected.mobileNumber,
                purohitCity: selected.city,
                purohitExperience: selected.yearsOfExperience,
              }
            : b,
        ),
      )

      setSelectedPurohit((prev) => ({
        ...prev,
        [bookingId]: null,
      }))
      setEditingBookingId(null)
    } catch (error) {
      console.error("Error assigning purohit:", error)
    } finally {
      setAssigningId(null)
    }
  }

  const stats = {
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, b) => sum + (Number.parseFloat(b.amount) || 0), 0),
    assignedBookings: bookings.filter((b) => b.purohitId).length,
    pendingBookings: bookings.filter((b) => !b.purohitId).length,
  }

  const assignedBookings = bookings
    .filter((b) => b.purohitId)
    .sort((a, b) => {
      const dateA = new Date(a.preferredDate || a.bookingDate || 0)
      const dateB = new Date(b.preferredDate || b.bookingDate || 0)
      return dateB - dateA
    })

  const unassignedBookings = bookings
    .filter((b) => !b.purohitId)
    .sort((a, b) => {
      const dateA = new Date(a.preferredDate || a.bookingDate || 0)
      const dateB = new Date(b.preferredDate || b.bookingDate || 0)
      return dateB - dateA
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-gray-600 text-lg font-medium">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-2">Manage puja bookings and assign purohits</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalBookings}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 mt-1">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Assigned</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.assignedBookings}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{stats.pendingBookings}</p>
              </div>
              <Clock className="w-10 h-10 text-amber-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Assigned Bookings Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Assigned Bookings</h2>
            <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
              {assignedBookings.length}
            </span>
          </div>
          <div className="space-y-4">
            {assignedBookings.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                <p className="text-gray-500">No assigned bookings</p>
              </div>
            ) : (
              assignedBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-gray-100">
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-600 mb-3">Yajman</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Name</p>
                          <p className="text-sm font-semibold text-gray-900">{booking.userName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-semibold text-gray-900">{booking.userPhone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">City</p>
                          <p className="text-sm font-semibold text-gray-900">{booking.city || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm font-semibold text-gray-900">{booking.address || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase text-gray-600 mb-3">Puja Details</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Puja Name</p>
                          <p className="text-sm font-semibold text-gray-900">{booking.pujaName || booking.poojaName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-semibold text-gray-900">{booking.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm font-semibold text-gray-900">{booking.address || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {booking.preferredDate || booking.bookingDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase text-gray-600 mb-3">Payment</p>
                      <div>
                        <p className="text-xs text-gray-500">Amount</p>
                        <p className="text-3xl font-bold text-green-600">
                          ₹{Number.parseFloat(booking.amount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-3">
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Purohit Display */}
                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold uppercase text-gray-600">Assigned Purohit</p>
                      <button
                        onClick={() => setEditingBookingId(booking.id)}
                        className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50"
                      >
                        <Edit2 size={14} />
                        Reassign
                      </button>
                    </div>
                    {editingBookingId === booking.id ? (
                      <div className="space-y-3">
                        <select
                          value={selectedPurohit[booking.id] || ""}
                          onChange={(e) => handlePurohitSelect(booking.id, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a Purohit</option>
                          {(purohits[booking.city] || []).map((purohit) => (
                            <option key={purohit.id} value={purohit.id}>
                              {purohit.name} - {purohit.yearsOfExperience} years
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAssignPurohit(booking.id, booking.city)}
                            disabled={assigningId === booking.id || !selectedPurohit[booking.id]}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg text-sm"
                          >
                            {assigningId === booking.id ? "Assigning..." : "Confirm"}
                          </button>
                          <button
                            onClick={() => {
                              setEditingBookingId(null)
                              setSelectedPurohit((prev) => ({ ...prev, [booking.id]: null }))
                            }}
                            className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg text-sm"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Name</p>
                            <p className="text-sm font-bold text-gray-900 mt-1">{booking.purohitName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Phone</p>
                            <p className="text-sm font-bold text-gray-900 mt-1">{booking.purohitMobile}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Email</p>
                            <p className="text-sm font-bold text-gray-900 mt-1">{booking.purohitEmail}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Experience</p>
                            <p className="text-sm font-bold text-gray-900 mt-1">{booking.purohitExperience} years</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Unassigned Bookings Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Pending - Awaiting Purohit</h2>
            <span className="bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1 rounded-full">
              {unassignedBookings.length}
            </span>
          </div>
          <div className="space-y-4">
            {unassignedBookings.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                <p className="text-gray-500">All bookings have purohits assigned!</p>
              </div>
            ) : (
              unassignedBookings.map((booking) => {
                const cityPurohits = purohits[booking.city] || []

                return (
                  <div key={booking.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-gray-100">
                      <div>
                        <p className="text-xs font-bold uppercase text-gray-600 mb-3">Yajman</p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-500">Name</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.userName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.userPhone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">City</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.city || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Address</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.address || "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-gray-600 mb-3">Puja Details</p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-500">Puja Name</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {booking.pujaName || booking.poojaName}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Address</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.address || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {booking.preferredDate || booking.bookingDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase text-gray-600 mb-3">Payment</p>
                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="text-3xl font-bold text-green-600">
                            ₹{Number.parseFloat(booking.amount || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="mt-3">
                          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <p className="text-xs font-bold uppercase text-gray-600 mb-4">Assign Purohit</p>
                      {cityPurohits.length > 0 ? (
                        <div className="space-y-3">
                          <select
                            value={selectedPurohit[booking.id] || ""}
                            onChange={(e) => handlePurohitSelect(booking.id, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select a Purohit</option>
                            {cityPurohits.map((purohit) => (
                              <option key={purohit.id} value={purohit.id}>
                                {purohit.name} - {purohit.yearsOfExperience} years
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssignPurohit(booking.id, booking.city)}
                            disabled={assigningId === booking.id || !selectedPurohit[booking.id]}
                            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg text-sm"
                          >
                            {assigningId === booking.id ? "Assigning..." : "Assign Purohit"}
                          </button>
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-sm text-red-600">No approved purohits available in {booking.city}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
