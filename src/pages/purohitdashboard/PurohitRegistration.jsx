"use client"

import { useState, useEffect } from "react"
import { authService, purohitService, contentService } from "../../services/api"
import Toast from "../admin/Toast"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"

const PurohitRegistration = () => {
  const [formData, setFormData] = useState({
    profileImage: null,
    name: "",
    email: "", // added email
    password: "", // added password
    confirmPassword: "", // added confirmPassword
    mobileNumber: "",
    aboutYou: "",
    country: "",
    state: "",
    city: "",
    yearsOfExperience: "",
    panditLanguages: "",
    ved: "",
    panditQualification: "",
    aadharCard: null,
    termsAccepted: false,
  })

  const [locations, setLocations] = useState({
    countries: [],
    states: [],
    cities: [],
  })

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [showTermsModal, setShowTermsModal] = useState(false)

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      // Use hardcoded country list for now - can be expanded with API
      setLocations((prev) => ({
        ...prev,
        countries: ["India", "Other"],
      }))
    } catch (error) {
      console.error("Error fetching countries:", error)
      setLocations((prev) => ({
        ...prev,
        countries: ["India", "Other"],
      }))
    }
  }

  const fetchStatesForCountry = async (countryName) => {
    try {
      // Fallback states data
      const statesMap = {
        "India": ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Madhya Pradesh", "Other"],
        "Other": ["Other"]
      }
      setLocations((prev) => ({
        ...prev,
        states: statesMap[countryName] || [],
        cities: [],
      }))
    } catch (error) {
      console.error("Error fetching states:", error)
      setLocations((prev) => ({
        ...prev,
        states: [],
        cities: [],
      }))
    }
  }

  const fetchCitiesForState = async (stateName) => {
    try {
      // Fallback cities data
      const citiesMap = {
        "Maharashtra": ["Mumbai", "Pune", "Sambhajinagar", "Nagpur", "Nashik"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
      }
      setLocations((prev) => ({
        ...prev,
        cities: citiesMap[stateName] || ["Other"],
      }))
    } catch (error) {
      console.error("Error fetching cities:", error)
      setLocations((prev) => ({
        ...prev,
        cities: [],
      }))
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }))
  }

  const handleCountryChange = async (e) => {
    const selectedCountry = e.target.value
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      state: "", // Reset state and city when country changes
      city: "",
    }))

    if (selectedCountry) {
      await fetchStatesForCountry(selectedCountry)
    } else {
      setLocations((prev) => ({
        ...prev,
        states: [],
        cities: [],
      }))
    }
  }

  const handleStateChange = async (e) => {
    const selectedState = e.target.value
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: "", // Reset city when state changes
    }))

    if (selectedState) {
      await fetchCitiesForState(selectedState)
    } else {
      setLocations((prev) => ({
        ...prev,
        cities: [],
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.termsAccepted) {
      showToast("Please accept the terms and conditions", "error")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error")
      return
    }

    setLoading(true)

    try {
      // Upload files first
      let profileImageUrl = ''
      let aadharCardUrl = ''

      if (formData.profileImage) {
        const profileResult = await purohitService.uploadFile(formData.profileImage)
        profileImageUrl = profileResult.url
      }

      if (formData.aadharCard) {
        const aadharResult = await purohitService.uploadFile(formData.aadharCard)
        aadharCardUrl = aadharResult.url
      }

      // Register purohit via API
      const result = await authService.getPurohitRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.mobileNumber,
        aboutYou: formData.aboutYou,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        yearsOfExperience: formData.yearsOfExperience,
        panditLanguages: formData.panditLanguages,
        ved: formData.ved,
        panditQualification: formData.panditQualification,
        profileImageUrl,
        aadharCardUrl,
      })

      // Store token and user data
      localStorage.setItem("authToken", result.token)
      localStorage.setItem("users", JSON.stringify(result.user))

      showToast("Registration successful! Your application is under review.", "success")

      // Reset form
      setFormData({
        profileImage: null,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        aboutYou: "",
        country: "",
        state: "",
        city: "",
        yearsOfExperience: "",
        panditLanguages: "",
        ved: "",
        panditQualification: "",
        aadharCard: null,
        termsAccepted: false,
      })

      document.getElementById("profileImage").value = ""
      document.getElementById("aadharCard").value = ""

      setLocations((prev) => ({
        ...prev,
        states: [],
        cities: [],
      }))
    } catch (error) {
      console.error("Error submitting registration:", error)
      showToast(error.message || "Error submitting registration. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto px-4 py-16"> 
          <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Purohit Registration</h1>
          <p className="text-gray-600">Join our platform as a verified purohit and connect with devotees</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="profileImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {formData.profileImage && <p className="mt-2 text-sm text-green-600">✓ {formData.profileImage.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter 10-digit mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* About You */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About You</label>
              <textarea
                name="aboutYou"
                value={formData.aboutYou}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Tell us about yourself, your experience, and specializations..."
              />
            </div>

            {/* Location Fields */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                  >
                    <option value="">Select Country</option>
                    {locations.countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                    disabled={!formData.country}
                  >
                    <option value="">{formData.country ? "Select State" : "Select Country First"}</option>
                    {locations.states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                    disabled={!formData.state}
                  >
                    <option value="">{formData.state ? "Select City" : "Select State First"}</option>
                    {locations.cities.map((city, index) => (
                      <option key={`${city}-${index}`} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter years of experience"
                    required
                  />
                </div>

                {/* Pandit Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages Known</label>
                  <input
                    type="text"
                    name="panditLanguages"
                    value={formData.panditLanguages}
                    onChange={handleInputChange}
                    placeholder="e.g., Hindi, Sanskrit, English"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Ved */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ved Specialization</label>
                  <input
                    type="text"
                    name="ved"
                    value={formData.ved}
                    onChange={handleInputChange}
                    placeholder="e.g., Rig Ved, Yajur Ved, Sama Ved, Atharva Ved"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Pandit Qualification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panditQualification"
                    value={formData.panditQualification}
                    onChange={handleInputChange}
                    placeholder="e.g., Shastri, Acharya, Graduate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Aadhar Card Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Card Upload <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-400 transition-colors">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M9 12h6l3-3h12l3 3h6a3 3 0 013 3v12a3 3 0 01-3 3H9a3 3 0 01-3-3V15a3 3 0 013-3z"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 19a4 4 0 100 8 4 4 0 000-8z"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="aadharCard"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                    >
                      <span>Upload Aadhar Card</span>
                      <input
                        id="aadharCard"
                        name="aadharCard"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
              {formData.aadharCard && <p className="mt-2 text-sm text-green-600">✓ {formData.aadharCard.name}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                  I accept the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-orange-600 hover:text-orange-700 underline font-medium"
                  >
                    Terms and Conditions
                  </button>{" "}
                  and confirm that all information provided is accurate and truthful.{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Terms and Conditions Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Terms and Conditions</h2>
                <button onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  <strong>1. Registration Agreement:</strong> By registering as a Purohit on our platform, you agree to
                  provide accurate and complete information about your qualifications and experience.
                </p>
                <p>
                  <strong>2. Verification Process:</strong> All submitted documents and information will be verified by
                  our team. False information may result in rejection of your application.
                </p>
                <p>
                  <strong>3. Service Standards:</strong> You agree to maintain high standards of service and conduct
                  yourself professionally during all interactions with clients.
                </p>
                <p>
                  <strong>4. Platform Policies:</strong> You must comply with all platform policies and guidelines as
                  updated from time to time.
                </p>
                <p>
                  <strong>5. Privacy:</strong> Your personal information will be handled according to our Privacy Policy
                  and will not be shared with third parties without your consent.
                </p>
                <p>
                  <strong>6. Termination:</strong> We reserve the right to terminate your registration if you violate
                  any terms or engage in inappropriate conduct.
                </p>
                <p>
                  <strong>7. Document Verification:</strong> You authorize us to verify the authenticity of all uploaded
                  documents including Aadhar card and educational certificates.
                </p>
                <p>
                  <strong>8. Service Fees:</strong> Platform service fees and commission structure will be communicated
                  upon approval of your registration.
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>

      </div>
      <Footer/>
    </div>
  )
}

export default PurohitRegistration
