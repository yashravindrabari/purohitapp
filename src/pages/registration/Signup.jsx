"use client"

/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import myContext from "../../context/myContext"
import toast from "react-hot-toast"
import Loader from "../../components/loader/Loader"
import Layout from "../../components/layout/Layout"
import { authService } from "../../services/api"

const Signup = () => {
  const context = useContext(myContext)
  const { loading, setLoading } = context

  // navigate
  const navigate = useNavigate()

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    role: "Yajman", // Default role as requested
  })

  // Form validation state
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  // Validate form on input change
  useEffect(() => {
    validateForm()
  }, [userSignup])

  // Form validation function
  const validateForm = () => {
    const newErrors = {}

    if (!userSignup.name.trim()) newErrors.name = "Required"

    if (!userSignup.email.trim()) {
      newErrors.email = "Required"
    } else if (!/\S+@\S+\.\S+/.test(userSignup.email)) {
      newErrors.email = "Invalid email"
    }

    if (!userSignup.mobile.trim()) {
      newErrors.mobile = "Required"
    } else if (!/^\d{10}$/.test(userSignup.mobile)) {
      newErrors.mobile = "10 digits required"
    }

    if (!userSignup.address.trim()) newErrors.address = "Required"
    if (!userSignup.city.trim()) newErrors.city = "Required"

    if (!userSignup.password) {
      newErrors.password = "Required"
    } else if (userSignup.password.length < 6) {
      newErrors.password = "Min 6 characters"
    }

    if (!userSignup.confirmPassword) {
      newErrors.confirmPassword = "Required"
    } else if (userSignup.password !== userSignup.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserSignup({
      ...userSignup,
      [name]: value,
    })
  }

  /**========================================================================
   *                          User Signup Function
   *========================================================================**/
  const userSignupFunction = async () => {
    if (!isFormValid) {
      toast.error("Please fix all errors before submitting")
      return
    }

    setLoading(true)
    try {
      const data = await authService.register({
        name: userSignup.name,
        email: userSignup.email,
        password: userSignup.password,
        mobile: userSignup.mobile,
        address: userSignup.address,
        city: userSignup.city,
        role: userSignup.role,
      })

      // Store token and user data
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("users", JSON.stringify(data.user))

      setUserSignup({
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        password: "",
        confirmPassword: "",
        role: "Yajman",
      })

      toast.success("Signup Successful")
      setLoading(false)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Signup failed")
      setLoading(false)
    }
  }

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    setLoading(true)
    try {
      // Note: Google OAuth requires Google SDK integration
      // For now, use email/password signup
      toast.error("Google sign-up requires Google SDK integration. Use email/password for now.")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
   <Layout>
    <div className="py-14">
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20 overflow-hidden">
      {loading && <Loader />}

      <div className="w-full max-w-6xl h-[85vh] flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-orange-500 to-amber-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-4xl font-bold mb-6 text-center">Begin Your Spiritual Journey</h2>
            <p className="text-lg text-center mb-8 text-white/90">
              Join thousands of devotees who have enhanced their spiritual practice with PurohitApp
            </p>
            <div className="w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Access Sacred Texts</h3>
                    <p className="text-sm text-white/80">Authentic Vedic literature at your fingertips</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Book Pujas Online</h3>
                    <p className="text-sm text-white/80">Connect with verified pandits for rituals</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Daily Spiritual Content</h3>
                    <p className="text-sm text-white/80">Mantras, stotras, and devotional audio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-white hover:underline">
              Login here
            </Link>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto flex flex-col">
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Create Your Account</h2>
              <p className="text-gray-600 mt-2">Fill in your details to get started</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userSignup.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userSignup.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Mobile Input */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={userSignup.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.mobile ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="9876543210"
                />
                {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
              </div>

              {/* Address Input */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={userSignup.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="123 Main St"
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>

              {/* City Input */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={userSignup.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.city ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="Mumbai"
                />
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userSignup.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="••••••"
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userSignup.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
                  placeholder="••••••"
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500 mr-2" />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-orange-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-600 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Signup Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={userSignupFunction}
                className="w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Create Account
              </button>
            </div>

            {/* Or continue with */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.198-2.707-6.735-2.707-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10.249-7.85 9.449-11.748l-9.449 0.087z"
                      fill="#4285F4"
                    />
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>

          {/* Mobile login link */}
          <div className="mt-6 text-center md:hidden">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
   </Layout>
  )
}

export default Signup