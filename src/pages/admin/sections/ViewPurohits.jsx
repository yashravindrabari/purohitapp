"use client"

import { useState, useEffect } from "react"
import { purohitService } from "../../../services/api"
import Toast from "../Toast"

const ViewPurohits = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [purohits, setPurohits] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [editModal, setEditModal] = useState(null)

  const [editFormData, setEditFormData] = useState({
    name: "",
    mobileNumber: "",
    aboutYou: "",
    country: "",
    state: "",
    city: "",
    yearsOfExperience: "",
    panditLanguages: "",
    ved: "",
    panditQualification: "",
  })

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchPurohits()
  }, [])

  const fetchPurohits = async () => {
    try {
      const data = await purohitService.getAll()
      setPurohits(data.purohits || [])
    } catch (error) {
      showToast("Error fetching purohits", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await purohitService.updateStatus(id, newStatus)
      setPurohits(purohits.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
      showToast(`Purohit ${newStatus} successfully!`, "success")
    } catch (error) {
      showToast("Error updating status", "error")
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this purohit?")) {
      try {
        await purohitService.delete(id)
        setPurohits(purohits.filter((p) => p.id !== id))
        showToast("Purohit deleted successfully", "success")
      } catch (error) {
        showToast("Error deleting purohit", "error")
      }
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
      const updatedData = {
        ...editFormData,
        yearsOfExperience: Number.parseInt(editFormData.yearsOfExperience),
      }

      await purohitService.update(editModal.id, updatedData)

      setPurohits(purohits.map((p) => (p.id === editModal.id ? { ...p, ...updatedData } : p)))

      showToast("Purohit updated successfully!", "success")
      setEditModal(null)
    } catch (error) {
      showToast("Error updating purohit", "error")
    } finally {
      setLoading(false)
    }
  }

  const openEditModal = (purohit) => {
    setEditFormData({
      name: purohit.name || "",
      mobileNumber: purohit.mobileNumber || "",
      aboutYou: purohit.aboutYou || "",
      country: purohit.country || "",
      state: purohit.state || "",
      city: purohit.city || "",
      yearsOfExperience: purohit.yearsOfExperience || "",
      panditLanguages: purohit.panditLanguages || "",
      ved: purohit.ved || "",
      panditQualification: purohit.panditQualification || "",
    })
    setEditModal(purohit)
  }

  const filteredPurohits = purohits.filter((purohit) => {
    const matchesSearch =
      purohit.name?.toLowerCase().includes(searchTerm.toLowerCase()) || purohit.mobileNumber?.includes(searchTerm)
    const matchesStatus = statusFilter === "" || purohit.status === statusFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && purohit.status === "pending") ||
      (activeTab === "approved" && purohit.status === "approved") ||
      (activeTab === "rejected" && purohit.status === "rejected")
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusCounts = () => {
    return {
      total: purohits.length,
      pending: purohits.filter((p) => p.status === "pending").length,
      approved: purohits.filter((p) => p.status === "approved").length,
      rejected: purohits.filter((p) => p.status === "rejected").length,
    }
  }

  const statusCounts = getStatusCounts()

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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">View Purohits</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Purohits</h3>
            <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Rejected</h3>
            <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "pending", label: "Pending Requests", count: statusCounts.pending },
                { id: "approved", label: "Approved", count: statusCounts.approved },
                { id: "rejected", label: "Rejected", count: statusCounts.rejected },
                { id: "all", label: "All", count: statusCounts.total },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or mobile..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
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
                    alt={purohit.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-orange-100"
                  />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-lg">{purohit.name?.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{purohit.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{purohit.mobileNumber}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      purohit.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : purohit.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {purohit.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience:</span>
                  <span className="text-gray-900 font-medium">{purohit.yearsOfExperience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-900 truncate ml-2">
                    {purohit.city}, {purohit.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Qualification:</span>
                  <span className="text-gray-900 truncate ml-2">{purohit.panditQualification}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
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
                {purohit.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(purohit.id, "approved")}
                      className="flex-1 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(purohit.id, "rejected")}
                      className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(purohit.id)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
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

              <div className="space-y-4">
                {viewModal.profileImageUrl && (
                  <div className="flex justify-center">
                    <img
                      src={viewModal.profileImageUrl || "/placeholder.svg"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{viewModal.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Mobile</label>
                    <p className="text-gray-900">{viewModal.mobileNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Experience</label>
                    <p className="text-gray-900">{viewModal.yearsOfExperience} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Qualification</label>
                    <p className="text-gray-900">{viewModal.panditQualification}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Languages</label>
                    <p className="text-gray-900">{viewModal.panditLanguages || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Ved</label>
                    <p className="text-gray-900">{viewModal.ved || "N/A"}</p>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        viewModal.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : viewModal.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {viewModal.status}
                    </span>
                  </div>
                </div>

                {viewModal.aboutYou && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">About</label>
                    <p className="text-gray-900">{viewModal.aboutYou}</p>
                  </div>
                )}

                {viewModal.aadharCardUrl && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Aadhar Card</label>
                    <a
                      href={viewModal.aadharCardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      View Aadhar Card
                    </a>
                  </div>
                )}
              </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={editFormData.yearsOfExperience}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                    <input
                      type="text"
                      name="panditQualification"
                      value={editFormData.panditQualification}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                    <input
                      type="text"
                      name="panditLanguages"
                      value={editFormData.panditLanguages}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={editFormData.country}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                  <textarea
                    name="aboutYou"
                    value={editFormData.aboutYou}
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

export default ViewPurohits
