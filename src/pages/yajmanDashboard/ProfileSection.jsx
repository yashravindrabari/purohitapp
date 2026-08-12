"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, Edit2, Camera, Save, AlertCircle } from "react-feather"
import { authService, contentService } from "../../services/api"

const ProfileSection = () => {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gotra: "",
    birthDate: "",
    language: "hindi",
    notificationPreferences: {
      pujaReminders: true,
      festivalNotifications: true,
      devotionalContent: true,
    },
  })

  // Load user data from localStorage on component mount
  useEffect(() => {
    try {
      setIsLoading(true)
      setError(null)

      const token = localStorage.getItem("authToken")
      const storedUser = localStorage.getItem("users")

      if (!token || !storedUser) {
        setError("No authenticated user found")
        setIsLoading(false)
        return
      }

      const userData = JSON.parse(storedUser)
      setUser(userData)
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        address: userData.address || "",
        gotra: userData.gotra || "",
        birthDate: userData.birthDate || "",
        language: userData.language || "hindi",
        notificationPreferences: userData.notificationPreferences || {
          pujaReminders: true,
          festivalNotifications: true,
          devotionalContent: true,
        },
      })

      if (userData.profileImageUrl) {
        setImagePreview(userData.profileImageUrl)
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
      setError("Failed to load user data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name.startsWith("notif-")) {
      const prefName = name.replace("notif-", "")
      setFormData({
        ...formData,
        notificationPreferences: {
          ...formData.notificationPreferences,
          [prefName]: checked,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)

      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    try {
      const data = await contentService.uploadFile(imageFile)
      return data.url
    } catch (err) {
      console.error("Error uploading image:", err)
      throw new Error("Failed to upload profile image")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      if (!localStorage.getItem("authToken")) {
        setError("No authenticated user found")
        return
      }

      // Upload image if a new one was selected
      let profileImageUrl = user?.profileImageUrl
      if (imageFile) {
        profileImageUrl = await uploadImage()
      }

      // Update user data via API
      const updatedUserData = {
        ...formData,
        profileImageUrl,
      }

      await authService.updateProfile({
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        profileImageUrl,
      })

      // Persist merged data (including local-only fields like gotra) to localStorage
      const mergedUser = { ...user, ...updatedUserData }
      localStorage.setItem("users", JSON.stringify(mergedUser))

      // Update local state
      setUser(mergedUser)

      setIsEditing(false)
      setImageFile(null)
    } catch (err) {
      console.error("Error saving profile:", err)
      setError("Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="opacity-90">Manage your personal and religious information</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Header */}
        <div className="relative p-6 border-b">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <div className="w-24 h-24 rounded-full bg-orange-100 border-4 border-white shadow-md overflow-hidden">
                <img
                  src={
                    imagePreview || user?.profileImageUrl || "/placeholder.svg?height=96&width=96&query=user profile"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-800">{user?.name || "User Name"}</h2>
              <p className="text-gray-500">Yajman</p>
              {/* <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Premium
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Verified</span>
              </div> */}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
            disabled={isSaving}
          >
            {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing || isSaving}
                      className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50" : "bg-white"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing || isSaving}
                      className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50" : "bg-white"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      disabled={!isEditing || isSaving}
                      className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50" : "bg-white"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing || isSaving}
                      rows="3"
                      className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        !isEditing ? "bg-gray-50" : "bg-white"
                      }`}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Religious Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Religious Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gotra</label>
                  <input
                    type="text"
                    name="gotra"
                    value={formData.gotra}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      !isEditing ? "bg-gray-50" : "bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      !isEditing ? "bg-gray-50" : "bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    disabled={!isEditing || isSaving}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      !isEditing ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="sanskrit">Sanskrit</option>
                    <option value="marathi">Marathi</option>
                    <option value="gujarati">Gujarati</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-pujaReminders"
                        name="notif-pujaReminders"
                        checked={formData.notificationPreferences.pujaReminders}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notif-pujaReminders" className="ml-2 block text-sm text-gray-700">
                        Puja reminders and updates
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-festivalNotifications"
                        name="notif-festivalNotifications"
                        checked={formData.notificationPreferences.festivalNotifications}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notif-festivalNotifications" className="ml-2 block text-sm text-gray-700">
                        Festival notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-devotionalContent"
                        name="notif-devotionalContent"
                        checked={formData.notificationPreferences.devotionalContent}
                        onChange={handleChange}
                        disabled={!isEditing || isSaving}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="notif-devotionalContent" className="ml-2 block text-sm text-gray-700">
                        New devotional content
                      </label>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setImageFile(null)
                  setImagePreview(user?.profileImageUrl || null)
                  // Reset form data to original user data
                  if (user) {
                    setFormData({
                      name: user.name || "",
                      email: user.email || "",
                      mobile: user.mobile || "",
                      address: user.address || "",
                      gotra: user.gotra || "",
                      birthDate: user.birthDate || "",
                      language: user.language || "hindi",
                      notificationPreferences: user.notificationPreferences || {
                        pujaReminders: true,
                        festivalNotifications: true,
                        devotionalContent: true,
                      },
                    })
                  }
                }}
                disabled={isSaving}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 flex items-center"
              >
                {isSaving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default ProfileSection
