"use client"

import { useState } from "react"

const DailyRashibhavishya = () => {
  const [selectedDate, setSelectedDate] = useState("2024-01-20")
  const [selectedRashi, setSelectedRashi] = useState("")

  const rashis = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ]

  const predictions = [
    {
      id: 1,
      rashi: "Aries",
      date: "2024-01-20",
      prediction: "Today brings new opportunities in your career. Stay focused and positive.",
      luckyNumber: 7,
      luckyColor: "Red",
      status: "Published",
    },
    {
      id: 2,
      rashi: "Taurus",
      date: "2024-01-20",
      prediction: "Financial gains are indicated. Good day for investments and business decisions.",
      luckyNumber: 3,
      luckyColor: "Green",
      status: "Published",
    },
    {
      id: 3,
      rashi: "Gemini",
      date: "2024-01-20",
      prediction: "Communication will be key today. Express your ideas clearly.",
      luckyNumber: 9,
      luckyColor: "Yellow",
      status: "Draft",
    },
  ]

  const filteredPredictions = predictions.filter((prediction) => {
    const matchesDate = prediction.date === selectedDate
    const matchesRashi = selectedRashi === "" || prediction.rashi === selectedRashi
    return matchesDate && matchesRashi
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Daily Rashibhavishya</h1>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
            Add Predictions
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Predictions</h3>
            <p className="text-2xl font-bold text-gray-900">{predictions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Published Today</h3>
            <p className="text-2xl font-bold text-green-600">
              {predictions.filter((p) => p.status === "Published").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {predictions.filter((p) => p.status === "Draft").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Rashis Covered</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rashi</label>
              <select
                value={selectedRashi}
                onChange={(e) => setSelectedRashi(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Rashis</option>
                {rashis.map((rashi) => (
                  <option key={rashi} value={rashi}>
                    {rashi}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200">
                Bulk Update
              </button>
            </div>
          </div>
        </div>

        {/* Predictions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPredictions.map((prediction) => (
            <div key={prediction.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{prediction.rashi}</h3>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    prediction.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {prediction.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Date:</span>
                  <p className="text-sm font-medium text-gray-900">{prediction.date}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Prediction:</span>
                  <p className="text-sm text-gray-700">{prediction.prediction}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Lucky Number:</span>
                    <p className="text-sm font-medium text-gray-900">{prediction.luckyNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Lucky Color:</span>
                    <p className="text-sm font-medium text-gray-900">{prediction.luckyColor}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  {prediction.status === "Draft" ? "Publish" : "View"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DailyRashibhavishya
