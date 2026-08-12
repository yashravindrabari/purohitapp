"use client"

import { useState } from "react"

const AddGiftcard = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    code: "",
    expiryDate: "",
    category: "",
    minScore: "",
    maxRedemptions: "",
    terms: "",
  })

  const [giftcards, setGiftcards] = useState([
    {
      id: 1,
      title: "Quiz Winner Special",
      value: 500,
      code: "QUIZ500",
      category: "Quiz Reward",
      minScore: 90,
      maxRedemptions: 10,
      used: 3,
      expiryDate: "2024-03-31",
      status: "Active",
    },
    {
      id: 2,
      title: "Top Performer",
      value: 300,
      code: "TOP300",
      category: "Quiz Reward",
      minScore: 80,
      maxRedemptions: 20,
      used: 8,
      expiryDate: "2024-04-30",
      status: "Active",
    },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateCode = () => {
    const code = "GIFT" + Math.random().toString(36).substr(2, 6).toUpperCase()
    setFormData((prev) => ({
      ...prev,
      code: code,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newGiftcard = {
      id: giftcards.length + 1,
      title: formData.title,
      value: Number.parseInt(formData.value),
      code: formData.code,
      category: formData.category,
      minScore: Number.parseInt(formData.minScore),
      maxRedemptions: Number.parseInt(formData.maxRedemptions),
      used: 0,
      expiryDate: formData.expiryDate,
      status: "Active",
    }
    setGiftcards([...giftcards, newGiftcard])
    setFormData({
      title: "",
      description: "",
      value: "",
      code: "",
      expiryDate: "",
      category: "",
      minScore: "",
      maxRedemptions: "",
      terms: "",
    })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Giftcard for Winners</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Giftcard Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Giftcard</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Giftcard Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value (₹) *</label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Giftcard Code *</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateCode}
                      className="px-3 py-2 bg-gray-500 text-white rounded-r-lg hover:bg-gray-600"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Quiz Reward">Quiz Reward</option>
                    <option value="Special Offer">Special Offer</option>
                    <option value="Festival Bonus">Festival Bonus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Score Required</label>
                  <input
                    type="number"
                    name="minScore"
                    value={formData.minScore}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Redemptions</label>
                  <input
                    type="number"
                    name="maxRedemptions"
                    value={formData.maxRedemptions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
                <textarea
                  name="terms"
                  value={formData.terms}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Create Giftcard
              </button>
            </form>
          </div>

          {/* Giftcards List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Giftcards</h2>

            <div className="space-y-4">
              {giftcards.map((giftcard) => (
                <div key={giftcard.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-gray-900">{giftcard.title}</h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        giftcard.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {giftcard.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Value:</span>
                      <span className="ml-2 font-medium">₹{giftcard.value}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Code:</span>
                      <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">{giftcard.code}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Min Score:</span>
                      <span className="ml-2 font-medium">{giftcard.minScore}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Used:</span>
                      <span className="ml-2 font-medium">
                        {giftcard.used}/{giftcard.maxRedemptions}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expires:</span>
                      <span className="ml-2 font-medium">{giftcard.expiryDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">{giftcard.category}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      Deactivate
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      View Usage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGiftcard
