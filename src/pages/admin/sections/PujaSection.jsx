"use client"

import { useState, useEffect } from "react"
import { contentService } from "../../../services/api"
import { X } from "react-feather"

const PujaSection = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [pujas, setPujas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")
  const [editingPuja, setEditingPuja] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    pujaName: "",
    description: "",
    imageUrl: "",
    withSamagriRate: "",
    withoutSamagriRate: "",
    rate: "",
    type: "",
  })

  useEffect(() => {
    fetchPujas()
  }, [])

  const fetchPujas = async () => {
    try {
      setLoading(true)
      const data = await contentService.getAllPujas()
      setPujas(data.pujas || [])
    } catch (error) {
      console.error("Error fetching pujas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const openModal = (type, puja = null) => {
    setModalType(type)
    setEditingPuja(puja)
    setImagePreview(puja?.imageUrl || null)
    if (puja) {
      setFormData({
        pujaName: puja.pujaName || "",
        description: puja.description || "",
        imageUrl: puja.imageUrl || "",
        withSamagriRate: puja.withSamagriRate || "",
        withoutSamagriRate: puja.withoutSamagriRate || "",
        rate: puja.rate || "",
        type: puja.type || type,
      })
    } else {
      setFormData({
        pujaName: "",
        description: "",
        imageUrl: "",
        withSamagriRate: "",
        withoutSamagriRate: "",
        rate: "",
        type: type,
      })
      setImagePreview(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingPuja(null)
    setImagePreview(null)
    setFormData({
      pujaName: "",
      description: "",
      imageUrl: "",
      withSamagriRate: "",
      withoutSamagriRate: "",
      rate: "",
      type: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = editingPuja?.imageUrl || ""

      // Upload image file if selected
      if (formData.imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append("file", formData.imageFile)
        const uploadRes = await contentService.uploadFile(formData.imageFile)
        imageUrl = uploadRes.url
      }

      const pujaData = {
        pujaName: formData.pujaName,
        description: formData.description,
        imageUrl: imageUrl,
        type: modalType,
        status: "Active",
      }

      if (modalType === "physical") {
        pujaData.withSamagriRate = Number(formData.withSamagriRate) || 0
        pujaData.withoutSamagriRate = Number(formData.withoutSamagriRate) || 0
      } else {
        pujaData.rate = Number(formData.rate) || 0
      }

      if (editingPuja) {
        await contentService.updatePuja(editingPuja.id, pujaData)
      } else {
        await contentService.createPuja(pujaData)
      }

      await fetchPujas()
      closeModal()
    } catch (error) {
      console.error("Error saving puja:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this puja?")) {
      try {
        await contentService.deletePuja(id)
        setPujas(pujas.filter((p) => p.id !== id))
      } catch (error) {
        console.error("Error deleting puja:", error)
      }
    }
  }

  const filteredPujas = pujas.filter((puja) => {
    const matchesSearch = puja.pujaName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "physical" && puja.type === "physical") ||
      (activeTab === "virtual" && puja.type === "online")
    return matchesSearch && matchesTab
  })

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Puja Section</h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => openModal("physical")}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
            >
              Add Physical Puja
            </button>
            <button
              onClick={() => openModal("online")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Add Virtual Puja
            </button>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Pujas" },
                { id: "physical", label: "Physical" },
                { id: "virtual", label: "Virtual" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pujas..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Puja Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredPujas.map((puja) => (
            <div
              key={puja.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <img src={puja.imageUrl || "/placeholder.svg"} alt={puja.pujaName} className="w-full h-48 object-cover" />
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">{puja.pujaName}</h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
                      puja.type === "physical" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {puja.type === "online" ? "virtual" : puja.type}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{puja.description}</p>

                <div className="space-y-2 mb-4 text-sm">
                  {puja.type === "physical" ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500">With Samagri:</span>
                        <span className="text-gray-900 font-medium">₹{puja.withSamagriRate}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rate:</span>
                      <span className="text-gray-900 font-medium">₹{puja.rate}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(puja.type, puja)}
                    className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(puja.id)}
                    className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPujas.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No pujas found</div>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPuja ? "Edit" : "Add"} {modalType === "physical" ? "Physical" : "Virtual"} Puja
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Puja Image *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, imageFile: null }))
                            setImagePreview(null)
                          }}
                          className="mt-2 text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                          required={!editingPuja}
                        />
                        <div className="text-gray-500">
                          <div className="text-2xl mb-2">📸</div>
                          <p className="text-sm">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Puja Name *</label>
                  <input
                    type="text"
                    name="pujaName"
                    value={formData.pujaName}
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

                {modalType === "physical" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">With Samagri Rate *</label>
                      <input
                        type="number"
                        name="withSamagriRate"
                        value={formData.withSamagriRate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Without Samagri Rate</label>
                      <input
                        type="number"
                        name="withoutSamagriRate"
                        value={formData.withoutSamagriRate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rate *</label>
                    <input
                      type="number"
                      name="rate"
                      value={formData.rate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                )}

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
                    {loading ? "Saving..." : "Save Puja"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PujaSection
