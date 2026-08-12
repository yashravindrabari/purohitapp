"use client"

import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import myContext from "../../context/myContext"
import toast from "react-hot-toast"
import Loader from "../../components/loader/Loader"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "../../components/layout/Layout"
import { authService } from "../../services/api"

const Login = () => {
  const context = useContext(myContext)
  const { loading, setLoading } = context

  // navigate
  const navigate = useNavigate()

  // User Login State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  })

  // Forgot password modal state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetEmailError, setResetEmailError] = useState("")

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false)

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserLogin({
      ...userLogin,
      [name]: value,
    })
  }

  /**========================================================================
   *                          User Login Function
   *========================================================================**/
  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Email and password are required")
      return
    }

    setLoading(true)
    try {
      const data = await authService.login(userLogin.email, userLogin.password)

      // Store token and user data
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("users", JSON.stringify(data.user))

      setUserLogin({ email: "", password: "" })
      toast.success("Login Successful")
      setLoading(false)

      // Navigate based on role
      if (data.user.role === "Yajman") {
        navigate("/yajman-dashboard")
      } else if (data.user.role === "zonalpurohit") {
        navigate("/zonalpurohit")
      } else if (data.user.role === "purohit") {
        navigate("/purohitdashboard")
      } else {
        navigate("/admin-dashboard")
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.message || "Invalid email or password")
    }
  }

  /**========================================================================
   *                          Google Sign In Function
   *========================================================================**/
  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      // Note: For Google OAuth, you'll need to integrate Google Sign-In SDK
      // This sends the Google user data to your backend for token exchange
      toast.error("Google sign-in requires Google SDK integration. Use email/password for now.")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Google sign-in failed")
    }
  }

  /**========================================================================
   *                          Forgot Password Function
   *========================================================================**/
  const handleForgotPassword = async () => {
    if (!resetEmail.trim()) {
      setResetEmailError("Email is required")
      return
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError("Please enter a valid email")
      return
    }

    setResetEmailError("")
    setLoading(true)

    try {
      await authService.forgotPassword(resetEmail)
      toast.success("Password reset link sent to your email")
      setForgotPasswordOpen(false)
      setResetEmail("")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Failed to send reset email")
      setLoading(false)
    }
  }

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setForgotPasswordOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20 px-4 py-16 sm:py-24">
        {loading && <Loader />}

        <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white">
          {/* Left side - Image */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-orange-500 to-amber-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-center">Welcome Back</h2>
              <p className="text-base lg:text-lg text-center mb-6 lg:mb-8 text-white/90">
                Continue your spiritual journey with PurohitApp
              </p>

              <div className="w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm lg:text-base">Daily Spiritual Content</h3>
                      <p className="text-xs lg:text-sm text-white/80">New mantras and stotras updated daily</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm lg:text-base">Upcoming Festivals</h3>
                      <p className="text-xs lg:text-sm text-white/80">Stay updated with important dates and events</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                      <svg
                        className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm lg:text-base">Personalized Dashboard</h3>
                      <p className="text-xs lg:text-sm text-white/80">Track your spiritual journey and progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-white hover:underline">
                Sign up here
              </Link>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-6 sm:mb-8 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Login to Your Account</h2>
                <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userLogin.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Input with Eye Icon */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={userLogin.password}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.81-2.88 3.69-4.75-2.06-4.41-6.4-7.5-11.25-7.5-1.3 0-2.57.19-3.79.52l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 11.5c2.05 4.41 6.4 7.5 11.25 7.5 1.3 0 2.57-.19 3.79-.52l.48.48L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm7.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3-.05 0-.11.003-.16.01z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-sm font-medium text-orange-600 hover:text-orange-500"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <div>
                  <button
                    type="button"
                    onClick={userLoginFunction}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-lg text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Login
                  </button>
                </div>

                {/* Social Login Options */}
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                      </svg>
                      <span className="ml-2">Google</span>
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="ml-2">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile signup link */}
              <div className="mt-8 text-center md:hidden">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        <AnimatePresence>
          {forgotPasswordOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
                onClick={(e) => {
                  // Only close if clicking the backdrop itself, not the modal
                  if (e.target === e.currentTarget) {
                    setForgotPasswordOpen(false)
                  }
                }}
              >
                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-white rounded-xl shadow-2xl z-50 w-[90%] max-w-md overflow-hidden mx-4"
                  onClick={(e) => e.stopPropagation()} // Prevent clicks from propagating to backdrop
                >
                  <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-4 px-6">
                    <h3 className="text-xl font-bold text-white">Reset Your Password</h3>
                    <p className="text-orange-100 text-sm mt-1">Enter your email to receive a password reset link</p>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className={`w-full px-4 py-3 border ${
                          resetEmailError ? "border-red-300" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors`}
                        placeholder="Enter your email"
                      />
                      {resetEmailError && <p className="mt-1 text-xs text-red-500">{resetEmailError}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setForgotPasswordOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors order-2 sm:order-1"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors order-1 sm:order-2"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  )
}

export default Login
