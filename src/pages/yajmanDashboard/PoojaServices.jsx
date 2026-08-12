"use client"

import { useState, useEffect } from "react"
import { contentService, bookingService } from "../../services/api"
import { X, Check } from "react-feather"

const PujaBooking = () => {
  const [pujas, setPujas] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPuja, setSelectedPuja] = useState(null)
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const cities = ["Pune", "Sambhajinagar", "Mumbai"]
  const RAZORPAY_KEY_ID = "rzp_test_6IWxQFdACAFXIs"

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
  })

  useEffect(() => {
    fetchPujas()
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    document.body.appendChild(script)
  }, [])

  const fetchPujas = async () => {
    try {
      const data = await contentService.getPujas()
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

  const handleRazorpayPayment = async () => {
    const price = selectedPuja.type === "physical" ? selectedPuja.withSamagriRate : selectedPuja.rate
    const amountInPaise = Math.round(price * 100)

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "Puja Booking",
      description: `Booking for ${selectedPuja.pujaName}`,
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      handler: async (response) => {
        try {
          console.log("Payment successful, saving booking to API")
          const bookingData = {
            pujaId: selectedPuja.id,
            pujaName: selectedPuja.pujaName,
            pujaType: selectedPuja.type,
            amount: price,
            userName: formData.fullName,
            userEmail: formData.email,
            userPhone: formData.phone,
            city: formData.city,
            address: formData.address,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime || "",
            status: "Confirmed",
            paymentStatus: "Completed",
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || "",
            razorpaySignature: response.razorpay_signature || "",
          }
          await bookingService.create(bookingData)
          console.log("Booking saved successfully")

          setBookingSuccess(true)
          setTimeout(() => {
            setShowBookingDialog(false)
            setBookingSuccess(false)
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              city: "",
              address: "",
              preferredDate: "",
              preferredTime: "",
            })
            setSelectedPuja(null)
          }, 2000)
        } catch (error) {
          console.error("[v0] Error saving booking:", error)
          alert("Payment successful but booking confirmation failed. Please contact support.")
        }
      },
      modal: {
        ondismiss: () => {
          console.log("[v0] Payment cancelled by user")
          alert("Payment cancelled. Please try again.")
        },
      },
    }

    try {
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("[v0] Razorpay error:", error)
      alert("Payment gateway error. Please try again.")
    }
  }

  const handleBooking = async (e) => {
    e.preventDefault()

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.address ||
      !formData.preferredDate
    ) {
      alert("Please fill all required fields")
      return
    }

    setBookingLoading(true)
    await handleRazorpayPayment()
    setBookingLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Book a Puja</h1>
          <p className="text-gray-600">Choose from our selection of authentic puja services</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading pujas...</p>
          </div>
        ) : pujas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No pujas available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pujas.map((puja) => (
              <div
                key={puja.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={puja.imageUrl || "/placeholder.svg?height=160&width=384&query=puja"}
                  alt={puja.pujaName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{puja.pujaName}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${puja.type === "physical" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}
                    >
                      {puja.type}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{puja.description}</p>

                  <div className="mb-3 space-y-1 text-sm">
                    {puja.type === "physical" ? (
                      <>
                        <div className="flex justify-between text-gray-600">
                          <span>With Samagri:</span>
                          <span className="font-semibold text-gray-900">₹{puja.withSamagriRate}</span>
                        </div>
                        {/* <div className="flex justify-between text-gray-600">
                          <span>Without Samagri:</span>
                          <span className="font-semibold text-gray-900">₹{puja.withoutSamagriRate}</span>
                        </div> */}
                      </>
                    ) : (
                      <div className="flex justify-between text-gray-600">
                        <span>Rate:</span>
                        <span className="font-semibold text-gray-900">₹{puja.rate}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPuja(puja)
                        setShowDetailsDialog(true)
                      }}
                      className="flex-1 px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors font-medium"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPuja(puja)
                        setShowBookingDialog(true)
                      }}
                      className="flex-1 px-3 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Details Dialog */}
        {showDetailsDialog && selectedPuja && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Puja Details</h2>
                <button onClick={() => setShowDetailsDialog(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <img
                  src={selectedPuja.imageUrl || "/placeholder.svg?height=192&width=384&query=puja"}
                  alt={selectedPuja.pujaName}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedPuja.pujaName}</h3>
                  <p className="text-gray-600 text-sm mb-3">{selectedPuja.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-gray-900 capitalize">{selectedPuja.type}</span>
                    </div>
                    {selectedPuja.type === "physical" ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">With Samagri:</span>
                          <span className="font-semibold text-gray-900">₹{selectedPuja.withSamagriRate}</span>
                        </div>
                        {/* <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Without Samagri:</span>
                          <span className="font-semibold text-gray-900">₹{selectedPuja.withoutSamagriRate}</span>
                        </div> */}
                      </>
                    ) : (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rate:</span>
                        <span className="font-semibold text-gray-900">₹{selectedPuja.rate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowDetailsDialog(false)
                    setShowBookingDialog(true)
                  }}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Book This Puja
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Dialog */}
        {showBookingDialog && selectedPuja && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              {bookingSuccess ? (
                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-4">
                    Your puja has been booked successfully. Check your bookings to view details.
                  </p>
                </div>
              ) : (
                <>
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Book {selectedPuja.pujaName}</h2>
                    <button onClick={() => setShowBookingDialog(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleBooking} className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        required
                      >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your detailed address (street, building, landmark, etc.)"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                      <input
                        type="time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                      />
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-gray-900">
                          ₹{selectedPuja.type === "physical" ? selectedPuja.withSamagriRate : selectedPuja.rate}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBookingDialog(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 font-medium text-sm"
                      >
                        {bookingLoading ? "Processing..." : "Pay & Confirm"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PujaBooking
