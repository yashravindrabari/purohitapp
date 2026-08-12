"use client"

import { useState, useEffect } from "react"
import { contentService } from "../../../services/api"
import Toast from "../Toast"

const Reviews = () => {
  const [filterRating, setFilterRating] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [viewModal, setViewModal] = useState(null)

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const data = await contentService.getReviews()
      const reviewsList = (data.reviews || []).map((r) => ({
        ...r,
        purohitName: r.purohitName || r.userName,
        description: r.description || r.comment,
        timestamp: r.timestamp || r.createdAt,
      }))
      setReviews(reviewsList)
    } catch (error) {
      showToast("Error fetching reviews", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await contentService.hideReview(id)
        setReviews(reviews.filter((r) => r.id !== id))
        showToast("Review deleted successfully", "success")
      } catch (error) {
        showToast("Error deleting review", "error")
      }
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.purohitName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.pujaName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = filterRating === "" || review.rating?.toString() === filterRating
    return matchesSearch && matchesRating
  })

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg ${index < rating ? "text-yellow-400" : "text-gray-300"}`}>
        ⭐
      </span>
    ))
  }

  const getStats = () => {
    const totalReviews = reviews.length
    const averageRating =
      reviews.length > 0 ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1) : 0
    const fiveStarReviews = reviews.filter((r) => r.rating === 5).length
    const recentReviews = reviews.filter((r) => {
      if (!r.timestamp) return false
      const reviewDate = new Date(r.timestamp)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return reviewDate > sevenDaysAgo
    }).length

    return { totalReviews, averageRating, fiveStarReviews, recentReviews }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Reviews Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Reviews</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Average Rating</h3>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-yellow-600 mr-2">{stats.averageRating}</p>
              <span className="text-yellow-400">⭐</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">5 Star Reviews</h3>
            <p className="text-2xl font-bold text-green-600">{stats.fiveStarReviews}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Recent (7 days)</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.recentReviews}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by purohit, puja, or review..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchReviews}
                className="w-full md:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
              >
                Refresh Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 md:space-y-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{review.purohitName || "Unknown Purohit"}</h3>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {review.pujaName || "Unknown Puja"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">{renderStars(review.rating || 0)}</div>
                    <span className="text-sm text-gray-500">({review.rating || 0}/5)</span>
                  </div>
                  <p className="text-gray-700 mb-3">{review.description || "No description provided"}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>Booking ID: {review.bookingId || "N/A"}</span>
                    <span>•</span>
                    <span>Review ID: {review.reviewId || "N/A"}</span>
                    <span>•</span>
                    <span>
                      {review.timestamp
                        ? new Date(review.timestamp).toLocaleDateString() +
                          " " +
                          new Date(review.timestamp).toLocaleTimeString()
                        : "Date not available"}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 md:ml-4">
                  <button
                    onClick={() => setViewModal(review)}
                    className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No reviews found</div>
            <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
          </div>
        )}

        {/* View Details Modal */}
        {viewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Review Details</h2>
                <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Purohit Name</label>
                    <p className="text-gray-900 font-semibold">{viewModal.purohitName || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Puja Name</label>
                    <p className="text-gray-900">{viewModal.pujaName || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Rating</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(viewModal.rating || 0)}</div>
                      <span className="text-gray-600">({viewModal.rating || 0}/5)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Date & Time</label>
                    <p className="text-gray-900">
                      {viewModal.timestamp ? new Date(viewModal.timestamp).toLocaleString() : "Not available"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Booking ID</label>
                    <p className="text-gray-900 font-mono text-sm">{viewModal.bookingId || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Review ID</label>
                    <p className="text-gray-900 font-mono text-sm">{viewModal.reviewId || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">User ID</label>
                    <p className="text-gray-900 font-mono text-sm">{viewModal.userId || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Purohit ID</label>
                    <p className="text-gray-900 font-mono text-sm">{viewModal.purohitId || "N/A"}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Review Description</label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">{viewModal.description || "No description provided"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setViewModal(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}

export default Reviews
