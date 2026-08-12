"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "react-feather"

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Pravin Joshi",
      location: "Mumbai, India",
      avatar: "/avatars/user1.png",
      rating: 5,
      text: "Purohit App is Very Useful for every Home. In that you easily can get all Vaidik Mantra and Daily Morning Stotra. Also lot of things are there. 👍 🙏 🙌.",
    },
    {
      id: 2,
      name: "Meera Sharma",
      location: "Delhi, India",
      avatar: "/avatars/user2.png",
      rating: 5,
      text: "This app has transformed my daily spiritual routine. The audio stotras are beautifully recited and the puja instructions are clear and authentic.",
    },
    {
      id: 3,
      name: "Rajesh Patel",
      location: "Ahmedabad, India",
      avatar: "/avatars/user3.png",
      rating: 4,
      text: "Great resource for learning about our traditions. The interface is user-friendly and the content is extensive. Would recommend to everyone.",
    },
    {
      id: 4,
      name: "Ananya Desai",
      location: "Pune, India",
      avatar: "/avatars/user4.png",
      rating: 5,
      text: "I've been using this app for six months now and it has become an essential part of my daily spiritual practice. The content is authentic and the app is very intuitive.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying])

  // Pause auto-play when user interacts with carousel
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    // Resume after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Handle touch events for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextTestimonial()
      pauseAutoPlay()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevTestimonial()
      pauseAutoPlay()
    }
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-orange-300/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-amber-300/10 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-blue-300/10 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-medium text-orange-600 tracking-wider uppercase">Testimonials</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            What Our Users Say
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg">
            Discover how PurohitApp is helping thousands of users connect with their spiritual heritage.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Testimonial cards */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                        <div className="mb-4 sm:mb-0 sm:mr-6">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-100 mx-auto sm:mx-0">
                            <img
                              src={testimonial.avatar || "/avatars/default.png"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                              <p className="text-gray-500 text-sm">{testimonial.location}</p>
                            </div>

                            <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="relative mt-4">
                            <svg
                              className="text-orange-100 w-10 h-10 absolute -top-4 -left-2"
                              fill="currentColor"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10.722 6.422C2.948 8.16 0 13.434 0 18.805c0 4.723 3.02 8.789 7.564 8.789 3.568 0 6.042-2.92 6.042-6.25 0-3.125-2.272-5.86-5.536-5.86-.752 0-1.504.195-1.864.39.196-3.516 3.372-7.227 7.368-8.594L10.722 6.42zm17.066 0C20.015 8.16 17.066 13.434 17.066 18.805c0 4.723 3.02 8.789 7.564 8.789 3.568 0 6.042-2.92 6.042-6.25 0-3.125-2.272-5.86-5.536-5.86-.752 0-1.504.195-1.864.39.196-3.516 3.372-7.227 7.368-8.594L27.788 6.42z" />
                            </svg>
                            <p className="text-gray-600 relative z-10 pl-6 sm:pl-8 leading-relaxed">
                              {testimonial.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={() => {
                prevTestimonial()
                pauseAutoPlay()
              }}
              className="absolute top-1/2 -left-3 sm:-left-5 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-orange-600 hover:bg-orange-50 transition-colors border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => {
                nextTestimonial()
                pauseAutoPlay()
              }}
              className="absolute top-1/2 -right-3 sm:-right-5 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-orange-600 hover:bg-orange-50 transition-colors border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  pauseAutoPlay()
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors focus:outline-none ${
                  index === currentIndex ? "bg-orange-600 w-6 sm:w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Additional trust indicators */}
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600">10,000+</div>
              <div className="text-gray-600 mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600">4.8</div>
              <div className="text-gray-600 mt-1">App Store Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600">500+</div>
              <div className="text-gray-600 mt-1">Mantras & Stotras</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

