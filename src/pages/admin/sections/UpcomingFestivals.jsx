"use client"

import { useState, useEffect } from "react"
import { contentService } from "../../../services/api"
import Toast from "../Toast"

const UpcomingFestivals = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [festivals, setFestivals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFestival, setEditingFestival] = useState(null)
  const [toast, setToast] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [pdfPreview, setPdfPreview] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    imageFile: null,
    pdfFile: null,
    description: "",
  })

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchFestivals()
  }, [])

  const fetchFestivals = async () => {
    try {
      const data = await contentService.getFestivals()
      setFestivals(data.festivals || [])
    } catch (error) {
      showToast("Error fetching festivals", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }

  const uploadFile = async (file) => {
    if (!file) return null
    const data = await contentService.uploadFile(file)
    return data.url
  }

  const openModal = (festival = null) => {
    setEditingFestival(festival)
    if (festival) {
      setFormData({
        name: festival.name || "",
        date: festival.date || "",
        imageFile: null,
        pdfFile: null,
        description: festival.description || "",
      })
    } else {
      setFormData({
        name: "",
        date: "",
        imageFile: null,
        pdfFile: null,
        description: "",
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingFestival(null)
    setFormData({
      name: "",
      date: "",
      imageFile: null,
      pdfFile: null,
      description: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = editingFestival?.imageUrl || null
      let pdfUrl = editingFestival?.pdfUrl || null

      if (formData.imageFile) {
        imageUrl = await uploadFile(formData.imageFile)
      }

      if (formData.pdfFile) {
        pdfUrl = await uploadFile(formData.pdfFile)
      }

      const festivalData = {
        name: formData.name,
        date: formData.date,
        description: formData.description,
        imageUrl: imageUrl,
        pdfUrl: pdfUrl,
        status: "Active",
      }

      if (editingFestival) {
        await contentService.updateFestival(editingFestival.id, festivalData)
        showToast("Festival updated successfully!", "success")
      } else {
        await contentService.createFestival(festivalData)
        showToast("Festival added successfully!", "success")
      }

      fetchFestivals()
      closeModal()
    } catch (error) {
      showToast("Error saving festival", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this festival?")) {
      try {
        await contentService.deleteFestival(id)
        setFestivals(festivals.filter((f) => f.id !== id))
        showToast("Festival deleted successfully", "success")
      } catch (error) {
        showToast("Error deleting festival", "error")
      }
    }
  }

  const filteredFestivals = festivals.filter((festival) =>
    festival.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading && festivals.length === 0) {
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Upcoming Festivals</h1>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
          >
            Add Festival
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search festivals..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Festivals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredFestivals.map((festival) => (
            <div
              key={festival.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {festival.imageUrl && (
                <img
                  src={festival.imageUrl || "/placeholder.svg"}
                  alt={festival.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">{festival.name}</h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 ml-2">
                    Festival
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="text-gray-900 font-medium">{festival.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900">
                      {festival.createdAt ? new Date(festival.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="text-green-600 font-medium">{festival.status}</span>
                  </div>
                </div>

                {festival.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{festival.description}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setViewModal(festival)}
                    className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openModal(festival)}
                    className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                  >
                    Edit
                  </button>
                  {festival.pdfUrl && (
                    <button
                      onClick={() => setPdfPreview(festival)}
                      className="flex-1 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                    >
                      Preview PDF
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(festival.id)}
                    className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFestivals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No festivals found</div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {editingFestival ? "Edit Festival" : "Add New Festival"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Festival Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Festival Image</label>
                  <input
                    type="file"
                    name="imageFile"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {editingFestival && editingFestival.imageUrl && (
                    <p className="text-sm text-gray-500 mt-1">Current image uploaded</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PDF Upload</label>
                  <input
                    type="file"
                    name="pdfFile"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {editingFestival && editingFestival.pdfUrl && (
                    <p className="text-sm text-gray-500 mt-1">Current PDF uploaded</p>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 font-medium"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Festival Details</h2>
                <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {viewModal.imageUrl && (
                  <div>
                    <img
                      src={viewModal.imageUrl || "/placeholder.svg"}
                      alt={viewModal.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-500">Festival Name</label>
                  <p className="text-gray-900 text-lg font-semibold">{viewModal.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500">Date</label>
                  <p className="text-gray-900">{viewModal.date}</p>
                </div>

                {viewModal.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Description</label>
                    <p className="text-gray-900">{viewModal.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Created</label>
                    <p className="text-gray-900">{viewModal.createdAt ? new Date(viewModal.createdAt).toLocaleDateString() : "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <p className="text-green-600 font-medium">{viewModal.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PDF Preview Modal */}
        {pdfPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{pdfPreview.name} - PDF Preview</h2>
                <button onClick={() => setPdfPreview(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              <div className="h-[70vh]">
                <iframe src={pdfPreview.pdfUrl} className="w-full h-full border rounded-lg" title="PDF Preview" />
              </div>
            </div>
          </div>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}

export default UpcomingFestivals
