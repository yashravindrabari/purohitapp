import { BookOpen, Music, Feather, ArrowRight } from "react-feather"

const Featured = () => {
  const features = [
    {
      icon: <Feather className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />,
      title: "Pujan Vidhi: Rituals Made Easy",
      description:
        "Follow precise, step-by-step instructions for various pujas with the Pujan Vidhi feature. Simplify your rituals with clear guidance and ensure traditional practices are performed correctly.",
        bgColor: "bg-amber-50",
        accentColor: "border-amber-600",
        learnMoreColor: "text-amber-600 hover:text-amber-700",
    },
    {
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />,
      title: "Granth: Sacred Texts at Your Fingertips",
      description:
        "Access a curated collection of Vedic granths with the Granth feature. Explore detailed descriptions, translations, and commentaries to enrich your spiritual practice.",
      bgColor: "bg-amber-50",
      accentColor: "border-amber-600",
      learnMoreColor: "text-amber-600 hover:text-amber-700",
    },
    {
      icon: <Music className="w-6 h-6 sm:w-8 sm:h-8 text-rose-600" />,
      title: "Audio Stotra & Arati: Devotional Sounds",
      description:
        "Immerse yourself in devotion with our Audio Stotra & Arati feature. Access a rich collection of sacred hymns and aratis, available for streaming or download.",
        bgColor: "bg-amber-50",
        accentColor: "border-amber-600",
        learnMoreColor: "text-amber-600 hover:text-amber-700",
    },
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-medium text-orange-600 tracking-wider uppercase">Key Features</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Why Choose <span className="text-orange-600">PurohitApp</span>?
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the perfect blend of ancient wisdom and modern technology with our carefully crafted features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${feature.bgColor} border-t-4 ${feature.accentColor}`}
            >
              <div className="p-6 sm:p-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                <a
                  href="#"
                  className={`inline-flex items-center font-medium ${feature.learnMoreColor} transition-colors`}
                >
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Feature Highlights */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Daily Reminders</h4>
                <p className="text-gray-600">Never miss important rituals with customizable notifications</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              Available on all subscription plans
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Expert Consultation</h4>
                <p className="text-gray-600">Connect with verified pandits for personalized guidance</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              Premium feature
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="#download"
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Download Now
          </a>
          <p className="mt-4 text-gray-600">Available on  Android</p>
        </div>
      </div>
    </section>
  )
}

export default Featured

