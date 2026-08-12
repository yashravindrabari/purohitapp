"use client"

import { useState, useEffect } from "react"
import { bookingService, contentService } from "../../services/api"
import { Calendar, Clock, MapPin, User, Phone, Mail, Award, Star } from "react-feather"

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("confirmed")
  const [ratingState, setRatingState] = useState({})
  const [submittingRating, setSubmittingRating] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

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

  const submitRating = async (bookingId, rating, pujaId) => {
    setSubmittingRating(bookingId)
    try {
      const user = JSON.parse(localStorage.getItem("users") || "{}")
      await contentService.createReview({
        userName: user.name || "Anonymous",
        userEmail: user.email || "",
        rating: rating,
        comment: `Rating for booking #${bookingId}`,
        purohitId: null,
        status: "Active",
      })

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, rating: rating, ratedAt: new Date().toISOString() } : b)),
      )
      setRatingState((prev) => {
        const newState = { ...prev }
        delete newState[bookingId]
        return newState
      })
    } catch (error) {
      console.error("Error submitting rating:", error)
    } finally {
      setSubmittingRating(null)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getFilteredBookings = () => {
    if (activeTab === "confirmed") {
      return bookings.filter((b) => b.status === "Confirmed")
    } else if (activeTab === "pending") {
      return bookings.filter((b) => b.status === "Pending")
    } else if (activeTab === "completed") {
      return bookings.filter((b) => b.status === "Completed")
    }
    return bookings
  }

  const filteredBookings = getFilteredBookings()

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your puja bookings</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("confirmed")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "confirmed"
                ? "bg-green-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "pending"
                ? "bg-amber-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "completed"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Calendar size={32} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {activeTab === "confirmed"
                ? "No confirmed bookings"
                : activeTab === "pending"
                  ? "No pending bookings"
                  : "No completed bookings"}
            </h3>
            <p className="text-gray-500">
              {activeTab === "confirmed"
                ? "Your confirmed bookings will appear here once purohits are assigned."
                : activeTab === "pending"
                  ? "No bookings awaiting purohit assignment."
                  : "Your completed bookings will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{booking.pujaName}</h3>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            booking.pujaType === "physical"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.pujaType}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                          <span>{formatDate(booking.preferredDate)}</span>
                        </div>
                        {booking.preferredTime && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={16} className="text-gray-400 flex-shrink-0" />
                            <span>{booking.preferredTime}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                          <span>{booking.address || booking.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={16} className="text-gray-400 flex-shrink-0" />
                          <span>{booking.userName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs text-gray-600 mb-1">Amount</p>
                      <p className="text-3xl font-bold text-green-600 mb-3">₹{booking.amount}</p>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          booking.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50">
                  <p className="text-xs font-bold uppercase text-gray-600 mb-3">Booking Details</p>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">Payment Status</p>
                        <p className="text-sm font-bold text-gray-900">{booking.paymentStatus}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-1">Booking Date</p>
                        <p className="text-sm font-bold text-gray-900">{formatDate(booking.createdAt)}</p>
                      </div>
                      {booking.razorpayPaymentId && (
                        <div>
                          <p className="text-xs text-gray-600 font-medium mb-1">Payment ID</p>
                          <p className="text-sm font-bold text-gray-900">{booking.razorpayPaymentId}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {booking.status === "Completed" && !booking.rating && (
                  <div className="p-5 bg-blue-50 border-t border-blue-100">
                    <p className="text-xs font-bold uppercase text-blue-900 mb-3">Rate Your Experience</p>
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRatingState({ ...ratingState, [booking.id]: star })}
                              className="focus:outline-none transition-transform hover:scale-125"
                            >
                              <Star
                                size={24}
                                className={
                                  star <= (ratingState[booking.id] || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            </button>
                          ))}
                        </div>
                        {ratingState[booking.id] && (
                          <button
                            onClick={() => submitRating(booking.id, ratingState[booking.id], booking.pujaId)}
                            disabled={submittingRating === booking.id}
                            className={`ml-auto px-4 py-2 rounded-lg font-medium text-sm text-white transition-all ${
                              submittingRating === booking.id
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {submittingRating === booking.id ? "Submitting..." : "Submit Rating"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings
