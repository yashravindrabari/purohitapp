"use client"

import { useState } from "react"

const QuizWinners = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const winners = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 9876543216",
      score: 95,
      totalQuestions: 100,
      quizDate: "2024-01-15",
      prize: "Gift Card ₹500",
      status: "Awarded",
      rank: 1,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543217",
      score: 88,
      totalQuestions: 100,
      quizDate: "2024-01-15",
      prize: "Gift Card ₹300",
      status: "Pending",
      rank: 2,
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 9876543218",
      score: 82,
      totalQuestions: 100,
      quizDate: "2024-01-15",
      prize: "Gift Card ₹200",
      status: "Pending",
      rank: 3,
    },
  ]

  const filteredWinners = winners.filter((winner) => {
    const matchesSearch =
      winner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "" || winner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Quiz Winners</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Winners</h3>
            <p className="text-2xl font-bold text-gray-900">{winners.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Prizes Awarded</h3>
            <p className="text-2xl font-bold text-green-600">{winners.filter((w) => w.status === "Awarded").length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Awards</h3>
            <p className="text-2xl font-bold text-yellow-600">{winners.filter((w) => w.status === "Pending").length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Highest Score</h3>
            <p className="text-2xl font-bold text-blue-600">{Math.max(...winners.map((w) => w.score))}%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Status</option>
                <option value="Awarded">Awarded</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
                Export Winners
              </button>
            </div>
          </div>
        </div>

        {/* Winners Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Winner Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prize
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWinners.map((winner) => (
                  <tr key={winner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                            winner.rank === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : winner.rank === 2
                                ? "bg-gray-100 text-gray-800"
                                : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {winner.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{winner.name}</div>
                        <div className="text-sm text-gray-500">{winner.email}</div>
                        <div className="text-sm text-gray-500">{winner.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {winner.score}/{winner.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-500">
                        {((winner.score / winner.totalQuestions) * 100).toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{winner.quizDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{winner.prize}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          winner.status === "Awarded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {winner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {winner.status === "Pending" && (
                        <button className="text-orange-600 hover:text-orange-900 mr-3">Award Prize</button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizWinners
