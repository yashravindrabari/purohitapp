"use client"

import { useEffect, useState } from "react"
import { contentService } from "../../../services/api"
import { Search, Calendar, ChevronRight, X } from "react-feather"

const Festivals = () => {
  const [festivals, setFestivals] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedFestival, setSelectedFestival] = useState(null)

  useEffect(() => {
    fetchFestivals()
  }, [])

  const fetchFestivals = async () => {
    try {
      const today = new Date()
      const data = await contentService.getFestivals()

      const list = (data.festivals || [])
        .slice()
        .sort(
          (a, b) =>
            Math.abs(new Date(a.date) - today) -
            Math.abs(new Date(b.date) - today)
        )

      setFestivals(list)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredFestivals = festivals.filter(f =>
    f.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-b-2 border-orange-500 rounded-full" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Festivals</h1>
        <p className="text-gray-600 mt-1">
          Festivals sorted by nearest date
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-8">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search festivals..."
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* Cards */}
      {filteredFestivals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFestivals.map(festival => (
            <div
              key={festival.id}
              className="bg-white rounded-xl border hover:shadow-lg transition group overflow-hidden"
            >
              <div className="flex">
                {/* Image */}
                {festival.imageUrl && (
                  <div className="w-36 h-36 flex-shrink-0">
                    <img
                      src={festival.imageUrl}
                      alt={festival.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-2">
                      <Calendar size={12} className="mr-1" />
                      {festival.date}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                      {festival.name}
                    </h3>

                    {festival.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {festival.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedFestival(festival)}
                    className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center group-hover:translate-x-1 transition"
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          No festivals found
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selectedFestival && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-semibold">
                {selectedFestival.name}
              </h2>
              <button onClick={() => setSelectedFestival(null)}>
                <X className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {selectedFestival.imageUrl && (
                <img
                  src={selectedFestival.imageUrl}
                  alt={selectedFestival.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}

              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={14} className="mr-2" />
                <span className="font-medium">{selectedFestival.date}</span>
              </div>

              {selectedFestival.description && (
                <p className="text-gray-700 leading-relaxed">
                  {selectedFestival.description}
                </p>
              )}

              {selectedFestival.pdfUrl && (
                <a
                  href={selectedFestival.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  View Festival PDF
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Festivals
