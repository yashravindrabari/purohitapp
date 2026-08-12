const Download = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-orange-50/30 to-amber-50/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-amber-300/10 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-rose-300/10 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-medium text-orange-600 tracking-wider uppercase">Get Started</span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Download PurohitApp Today
          </h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg">
            Access authentic spiritual content and connect with your traditions anytime, anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="flex items-center justify-center lg:order-2">
            <div className="relative  rounded-b-2xl">
            <div className="flex items-center justify-center">
            <img
                    src="https://purohitapp.netlify.app/assets/img/download/download-app.png"
                    alt="PurohitApp Home Screen"
                    className="w-64 sm:w-72 md:w-80 md:-mt-44 -mt-24 h-full object-cover flex items-center justify-center "
              />

            </div>
              

              {/* Feature badges */}
              <div className="absolute -right-12 top-40 bg-white rounded-xl shadow-lg p-3 z-20 hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-gray-800">Daily Mantras</p>
                    <p className="text-gray-500">Updated daily</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-12 bottom-40 bg-white rounded-xl shadow-lg p-3 z-20 hidden md:block">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-gray-800">Offline Access</p>
                    <p className="text-gray-500">Save for later</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Enhance Your Spiritual Journey
            </h2>

            <div className="w-20 h-1 bg-orange-500 mb-6 rounded-full"></div>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              PurohitApp brings ancient wisdom to your fingertips. Access a comprehensive library of religious texts,
              mantras, and devotional content to deepen your spiritual practice and connect with your cultural heritage.
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">
                    Complete collection of Vedic mantras and stotras with authentic pronunciations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">
                    Step-by-step puja instructions with visual guides and explanations
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">
                    High-quality audio recordings of stotras and mantras for perfect recitation
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Book experienced purohits for home ceremonies and consultations</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.purohitapp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                <div className="mr-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </a>

             
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center">
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
                  <div className="ml-3 text-sm text-gray-600">
                    <span className="font-semibold">10,000+</span> active users
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="ml-2 text-sm text-gray-600">
                    <span className="font-semibold">4.8/5</span> rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional features section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Reminders</h3>
              <p className="text-gray-600">
                Set reminders for daily prayers, important festivals, and auspicious dates.
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Consultation</h3>
              <p className="text-gray-600">Connect with verified pandits for personalized guidance and services.</p>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Authentic Content</h3>
              <p className="text-gray-600">All content is verified by scholars to ensure authenticity and accuracy.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download

