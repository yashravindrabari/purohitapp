"use client"

import { useEffect, useState } from "react"
import { contentService } from "../../../services/api"
import { Download, Search, FileText } from "react-feather"

const SacredTexts = () => {
  const [aartis, setAartis] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAartis()
  }, [])

  const fetchAartis = async () => {
    try {
      const data = await contentService.getAartis()
      setAartis(data.aartis || [])
    } catch (err) {
      console.error("Error fetching aartis", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredAartis = aartis.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase())
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sacred Aartis</h1>
        <p className="text-gray-600">Explore devotional aartis in PDF format</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search aarti..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* List */}
      {filteredAartis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAartis.map((aarti) => (
            <div
              key={aarti.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText size={20} className="text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800 truncate">
                  {aarti.name}
                </h3>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                Added on{" "}
                {aarti.createdAt ? new Date(aarti.createdAt).toLocaleDateString() : "—"}
              </div>

              {aarti.pdfUrl && (
                <div className="flex gap-2">
                  <a
                    href={aarti.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
                  >
                    View
                  </a>
                  <a
                    href={aarti.pdfUrl}
                    download
                    className="flex items-center justify-center px-3 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Download size={16} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          No aartis found
        </div>
      )}
    </div>
  )
}

export default SacredTexts
