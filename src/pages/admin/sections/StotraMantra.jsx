"use client"

import { useState, useEffect } from "react"
import { contentService } from "../../../services/api"
import Toast from "../Toast"

const StotraMantra = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingContent, setEditingContent] = useState(null)
  const [toast, setToast] = useState(null)
  const [playingId, setPlayingId] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    mp3Link: "",
  })

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const data = await contentService.getStotras()
      setContent(data.stotras || [])
    } catch (error) {
      showToast("Error fetching content", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const openModal = (item = null) => {
    setEditingContent(item)
    if (item) {
      setFormData({
        name: item.name || "",
        mp3Link: item.mp3Link || "",
      })
    } else {
      setFormData({
        name: "",
        mp3Link: "",
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingContent(null)
    setFormData({
      name: "",
      mp3Link: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("mp3Link", formData.mp3Link)

      if (editingContent) {
        await contentService.updateStotra(editingContent.id, submitData)
        showToast("Stotra/Mantra updated successfully!", "success")
      } else {
        await contentService.createStotra(submitData)
        showToast("Stotra/Mantra added successfully!", "success")
      }

      fetchContent()
      closeModal()
    } catch (error) {
      showToast("Error saving content", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await contentService.deleteStotra(id)
        setContent(content.filter((c) => c.id !== id))
        showToast("Item deleted successfully", "success")
      } catch (error) {
        showToast("Error deleting item", "error")
      }
    }
  }

  const togglePlay = (id, mp3Link) => {
    if (playingId === id) {
      setPlayingId(null)
      // Pause audio
      const audio = document.getElementById(`audio-${id}`)
      if (audio) audio.pause()
    } else {
      setPlayingId(id)
      // Play audio
      const audio = document.getElementById(`audio-${id}`)
      if (audio) audio.play()
    }
  }

  const filteredContent = content.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading && content.length === 0) {
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Stotra & Mantra</h1>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
          >
            Add Stotra/Mantra
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search content..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">{item.name}</h3>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 ml-2">
                  Audio
                </span>
              </div>

              {/* Audio Player */}
              <div className="mb-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <button
                    onClick={() => togglePlay(item.id, item.mp3Link)}
                    className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    {playingId === item.id ? "⏸️" : "▶️"}
                  </button>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">Click to play</div>
                  </div>
                </div>
                <audio
                  id={`audio-${item.id}`}
                  src={item.mp3Link}
                  onEnded={() => setPlayingId(null)}
                  className="hidden"
                />
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span className="text-gray-900">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-green-600 font-medium">{item.status}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No content found</div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {editingContent ? "Edit Stotra/Mantra" : "Add New Stotra/Mantra"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name of Stotra/Mantra *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">MP3 Link *</label>
                  <input
                    type="url"
                    name="mp3Link"
                    value={formData.mp3Link}
                    onChange={handleInputChange}
                    placeholder="https://example.com/audio.mp3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                  />
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

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}

export default StotraMantra
