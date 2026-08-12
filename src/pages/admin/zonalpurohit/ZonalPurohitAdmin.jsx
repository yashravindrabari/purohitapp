"use client"

import { useState, useEffect } from "react"
import { purohitService } from "../../../services/api"
import { XCircle, Phone, Mail, LogOut, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ZonalPurohitAdmin = () => {
  const navigate = useNavigate()
  const [purohits, setPurohits] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPurohit, setSelectedPurohit] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ show: false, type: "", id: "" })

  const user = JSON.parse(localStorage.getItem("users"))
  const zonalCity = user?.city
  const zonalPurohitName = user?.name
  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken")
      localStorage.removeItem("users")
      navigate("/login")
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  useEffect(() => {
    if (!zonalCity) return
    const fetchPurohits = async () => {
      try {
        const data = await purohitService.getAll({ city: zonalCity })
        setPurohits(data.purohits || [])
      } catch (error) {
        console.error("[v0] Fetch error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPurohits()
  }, [zonalCity])

  const handleAction = async () => {
    const { type, id } = confirmDialog
    try {
      if (type === "approve") {
        await purohitService.updateStatus(id, "approved")
        setPurohits(purohits.map((p) => (p.id === id ? { ...p, status: "approved" } : p)))
      } else if (type === "remove") {
        await purohitService.delete(id)
        setPurohits(purohits.filter((p) => p.id !== id))
      }
      setConfirmDialog({ show: false, type: "", id: "" })
    } catch (error) {
      console.error("[v0] Action error:", error)
    }
  }

  if (loading) return <div className="flex justify-center p-10 text-orange-600">Loading...</div>

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
              <CheckCircle className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl text-gray-900">Zonal Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 hidden sm:block border rounded-md px-2">{zonalPurohitName}</span>
            <span className="text-sm font-medium text-gray-600 hidden sm:block border rounded-md px-2">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-semibold p-2 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Purohits in {zonalCity}</h1>
              <p className="text-sm text-gray-500">Manage and approve regional purohit registrations</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm min-w-[120px]">
                <p className="text-[10px] uppercase font-bold text-gray-400">Total</p>
                <p className="text-xl font-bold text-gray-900">{purohits.length}</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg shadow-sm min-w-[120px]">
                <p className="text-[10px] uppercase font-bold text-orange-400">Pending</p>
                <p className="text-xl font-bold text-orange-600">
                  {purohits.filter((p) => p.status === "pending").length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {purohits.map((purohit) => (
              <div
                key={purohit.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={purohit.profileImageUrl || "/placeholder.svg?height=48&width=48"}
                    alt=""
                    className="w-12 h-12 rounded-full border border-gray-100 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{purohit.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${purohit.status === "approved" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                    >
                      {purohit.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" /> {purohit.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" /> {purohit.mobileNumber}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedPurohit(purohit)}
                    className="flex-1 py-2 text-xs font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </button>
                  {purohit.status === "pending" && (
                    <button
                      onClick={() => setConfirmDialog({ show: true, type: "approve", id: purohit.id })}
                      className="flex-1 py-2 text-xs font-bold bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Approve
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setConfirmDialog({ show: true, type: "remove", id: purohit.id })}
                  className="w-full mt-2 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {selectedPurohit && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
              <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative">
                <button
                  onClick={() => setSelectedPurohit(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedPurohit.profileImageUrl || "/placeholder.svg"}
                    className="w-16 h-16 rounded-full border border-gray-100"
                    alt=""
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedPurohit.name}</h2>
                    <p className="text-xs text-gray-500">ID: {selectedPurohit.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Experience</p>
                    <p className="font-semibold">{selectedPurohit.yearsOfExperience} Years</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Ved</p>
                    <p className="font-semibold">{selectedPurohit.ved}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-bold uppercase">About</p>
                    <p className="text-gray-600 leading-tight italic">"{selectedPurohit.aboutYou}"</p>
                  </div>
                </div>
                <a
                  href={selectedPurohit.aadharCardUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-3 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                >
                  View Aadhar Card
                </a>
              </div>
            </div>
          )}

          {confirmDialog.show && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[110]">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure?</h3>
                <p className="text-sm text-gray-500 mb-6">Confirm {confirmDialog.type} for this applicant.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDialog({ show: false, type: "", id: "" })}
                    className="flex-1 py-2.5 font-bold border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAction}
                    className={`flex-1 py-2.5 font-bold text-white rounded-lg ${confirmDialog.type === "approve" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p className="font-semibold text-gray-500">© 2025 Purohit Management System • {zonalCity}</p>
          <div className="flex gap-4 font-medium">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ZonalPurohitAdmin
