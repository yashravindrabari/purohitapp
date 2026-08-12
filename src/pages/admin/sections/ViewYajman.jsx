"use client"

import { useState, useEffect } from "react"
import { userService } from "../../../services/api"
import Toast from "../Toast"

const ViewYajman = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [yajmans, setYajmans] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [editModal, setEditModal] = useState(null)

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
  })

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchYajmans()
  }, [])

  const fetchYajmans = async () => {
    try {
      const data = await userService.getAll({ role: "Yajman" })
      setYajmans(data.users || [])
    } catch (error) {
      showToast("Error fetching yajmans", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedData = { ...editFormData }

      await userService.update(editModal.id, updatedData)

      setYajmans(yajmans.map((y) => (y.id === editModal.id ? { ...y, ...updatedData } : y)))

      showToast("Yajman updated successfully!", "success")
      setEditModal(null)
    } catch (error) {
      showToast("Error updating yajman", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this yajman?")) {
      try {
        await userService.delete(id)
        setYajmans(yajmans.filter((y) => y.id !== id))
        showToast("Yajman deleted successfully", "success")
      } catch (error) {
        showToast("Error deleting yajman", "error")
      }
    }
  }

  const openEditModal = (yajman) => {
    setEditFormData({
      name: yajman.name || "",
      email: yajman.email || "",
      mobile: yajman.mobile || "",
      address: yajman.address || "",
      city: yajman.city || "",
    })
    setEditModal(yajman)
  }

  const filteredYajmans = yajmans.filter((yajman) => {
    const matchesSearch =
      yajman.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yajman.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yajman.mobile?.includes(searchTerm)
    return matchesSearch
  })

  const getStats = () => {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    return {
      total: yajmans.length,
      active: yajmans.filter((y) => y.updatedAt && new Date(y.updatedAt) > thirtyDaysAgo).length,
      newThisMonth: yajmans.filter((y) => y.createdAt && new Date(y.createdAt) > thirtyDaysAgo).length,
      firstTimeUsers: yajmans.filter((y) => y.firstLogin === true).length,
    }
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">View Yajman</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Yajmans</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active (30 days)</h3>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">New This Month</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.newThisMonth}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">First Time Users</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.firstTimeUsers}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="w-full md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or mobile..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={fetchYajmans}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
              >
                Refresh Data
              </button>
              
            </div>
          </div>
        </div>

        {/* Yajmans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredYajmans.map((yajman) => (
            <div
              key={yajman.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-lg">{yajman.name?.charAt(0) || "Y"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{yajman.name || "N/A"}</h3>
                  <p className="text-sm text-gray-500 truncate">{yajman.email}</p>
                  <p className="text-sm text-gray-500">{yajman.mobile || "N/A"}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">City:</span>
                  <span className="text-gray-900 font-medium truncate ml-2">{yajman.city || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Address:</span>
                  <span className="text-gray-900 truncate ml-2" title={yajman.address}>
                    {yajman.address || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Joined:</span>
                  <span className="text-gray-900">
                    {yajman.createdAt ? new Date(yajman.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="text-gray-900">
                    {yajman.updatedAt ? new Date(yajman.updatedAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      yajman.firstLogin ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {yajman.firstLogin ? "New User" : "Active"}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setViewModal(yajman)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                >
                  View
                </button>
                <button
                  onClick={() => openEditModal(yajman)}
                  className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(yajman.id)}
                  className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredYajmans.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No yajmans found</div>
          </div>
        )}

        {/* View Modal */}
        {viewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Yajman Details</h2>
                <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{viewModal.name || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{viewModal.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Mobile</label>
                    <p className="text-gray-900">{viewModal.mobile || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">City</label>
                    <p className="text-gray-900">{viewModal.city || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Role</label>
                    <p className="text-gray-900">{viewModal.role || "Yajman"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">User ID</label>
                    <p className="text-gray-900 text-xs font-mono">{viewModal.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Created At</label>
                    <p className="text-gray-900">
                      {viewModal.createdAt ? new Date(viewModal.createdAt).toLocaleString() : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-gray-900">
                      {viewModal.updatedAt ? new Date(viewModal.updatedAt).toLocaleString() : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">First Login</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        viewModal.firstLogin ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {viewModal.firstLogin ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">FCM Token</label>
                    <p className="text-gray-900 text-xs">{viewModal.fcmToken ? "Available" : "Not available"}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">{viewModal.address || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Edit Yajman</h2>
                <button onClick={() => setEditModal(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={editFormData.mobile}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
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
                    {loading ? "Updating..." : "Update Yajman"}
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

export default ViewYajman
