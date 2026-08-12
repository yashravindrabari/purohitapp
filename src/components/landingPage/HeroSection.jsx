"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const HeroSection = () => {
  const phoneRef = useRef(null)

  // Subtle floating animation for the phone
  useEffect(() => {
    if (!phoneRef.current) return

    const handleMouseMove = (e) => {
      if (!phoneRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate movement based on mouse position (subtle effect)
      const moveX = ((clientX - innerWidth / 2) / innerWidth) * 10
      const moveY = ((clientY - innerHeight / 2) / innerHeight) * 10

      phoneRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20  z-0">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-orange-300/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-amber-300/10 blur-2xl"></div>
      </div>

      {/* Content container */}
      <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="order-1 lg:order-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent block mb-2">
                Transforming
              </span>
              <span className="text-gray-800">Sanatan Hindu Culture</span>
              <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl text-gray-600 font-medium">
                for the Next Generation
              </span>
            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-relaxed max-w-xl">
              Access a comprehensive library of authentic religious texts, mantras, and devotional content to enhance
              your spiritual journey and daily practice.
            </p>

            <div className="mt-10 flex flex-wrap md:gap-5 gap-3 ">
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-700 to-orange-500 text-white font-medium shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-200/60 transition-all duration-300 transform hover:-translate-y-1"
              >
                Book Puja
              </Link>
              <Link
                to="/download"
                className="px-8 py-4 rounded-lg border-2 border-orange-500 text-orange-600 font-medium hover:bg-orange-50/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Download App
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">10,000+</span> active users
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">4.9</span>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="order-2 lg:order-2 flex justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="relative" ref={phoneRef}>
            <div className="relative w-72 md:w-80 h-auto rounded-[40px] overflow-hidden">
                  <img src="https://purohitapp.netlify.app/assets/img/header/header-app.png" alt="PurohitApp Screenshot" className="w-full h-full object-cover" />
                </div>
          
            

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-orange-400/20 blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-2xl -z-10"></div>

              {/* Floating elements */}
              <div
                className="absolute -right-16 top-20 bg-white rounded-xl shadow-lg p-3 z-20 animate-fade-in hidden md:block"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-gray-800">Daily Mantras</p>
                    <p className="text-gray-500">Updated daily</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -left-16 bottom-40 bg-white rounded-xl shadow-lg p-3 z-20 animate-fade-in hidden md:block"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-gray-800">Puja Calendar</p>
                    <p className="text-gray-500">Upcoming events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s forwards;
        }
      `}</style>
    </section>
  )
}

export default HeroSection

