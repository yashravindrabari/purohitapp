"use client"

import { useState, useEffect } from "react"
import { zonalPurohitService } from "../../../services/api"
import Toast from "../Toast"

const ViewZonalPurohit = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [purohits, setPurohits] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [editModal, setEditModal] = useState(null)

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    ved: "",
    language: "",
    country: "",
    state: "",
    city: "",
  })

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await zonalPurohitService.update(editModal.id, editFormData)

      // Update local state
      setPurohits(purohits.map((p) => (p.id === editModal.id ? { ...p, ...editFormData } : p)))

      showToast("Purohit updated successfully!", "success")
      setEditModal(null)
    } catch (error) {
      showToast("Error updating purohit", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPurohits()
  }, [])

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const fetchPurohits = async () => {
    try {
      const data = await zonalPurohitService.getAll()
      setPurohits(data.zonalPurohits || [])
    } catch (error) {
      showToast("Error fetching data", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this purohit?")) {
      try {
        await zonalPurohitService.delete(id)
        setPurohits(purohits.filter((p) => p.id !== id))
        showToast("Purohit deleted successfully", "success")
      } catch (error) {
        showToast("Error deleting purohit", "error")
      }
    }
  }

  const filteredPurohits = purohits.filter((purohit) => {
    const matchesSearch =
      purohit.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purohit.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCountry = selectedCountry === "" || purohit.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  if (loading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  const openEditModal = (purohit) => {
    setEditFormData({
      fullName: purohit.fullName || "",
      email: purohit.email || "",
      mobileNumber: purohit.mobileNumber || "",
      ved: purohit.ved || "",
      language: purohit.language || "",
      country: purohit.country || "",
      state: purohit.state || "",
      city: purohit.city || "",
    })
    setEditModal(purohit)
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">View Zonal Purohits</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">All Countries</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchPurohits}
                className="w-full md:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Purohits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredPurohits.map((purohit) => (
            <div
              key={purohit.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                {purohit.profileImageUrl ? (
                  <img
                    src={purohit.profileImageUrl || "/placeholder.svg"}
                    alt={purohit.fullName}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-orange-100"
                  />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-lg">{purohit.fullName?.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{purohit.fullName}</h3>
                  <p className="text-sm text-gray-500 truncate">{purohit.email}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile:</span>
                  <span className="text-gray-900 font-medium">{purohit.mobileNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-900 truncate ml-2">
                    {purohit.city}, {purohit.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-medium ${purohit.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {purohit.status}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setViewModal(purohit)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                  View
                </button>
                <button
                  onClick={() => openEditModal(purohit)}
                  className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(purohit.id)}
                  className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPurohits.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No purohits found</div>
          </div>
        )}

        {/* View Modal */}
        {viewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Purohit Details</h2>
                <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900">{viewModal.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{viewModal.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Mobile</label>
                    <p className="text-gray-900">{viewModal.mobileNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Ved</label>
                    <p className="text-gray-900">{viewModal.ved || "N/A"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Language</label>
                    <p className="text-gray-900">{viewModal.language || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Country</label>
                    <p className="text-gray-900">{viewModal.country}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">State</label>
                    <p className="text-gray-900">{viewModal.state}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">City</label>
                    <p className="text-gray-900">{viewModal.city}</p>
                  </div>
                </div>
              </div>

              {viewModal.profileImageUrl && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500 mb-2">Profile Image</label>
                  <img
                    src={viewModal.profileImageUrl || "/placeholder.svg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Edit Purohit</h2>
                <button onClick={() => setEditModal(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={editFormData.mobileNumber}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ved</label>
                    <input
                      type="text"
                      name="ved"
                      value={editFormData.ved}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <input
                      type="text"
                      name="language"
                      value={editFormData.language}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      name="country"
                      value={editFormData.country}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={editFormData.state}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={editFormData.city}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 font-medium"
                  >
                    {loading ? "Updating..." : "Update Purohit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}

export default ViewZonalPurohit
