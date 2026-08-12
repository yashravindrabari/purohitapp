import { Link } from "react-router-dom"

const About = () => {
  return (
    <section id="abc" className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-orange-600">PurohitApp</span>
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg">
            Bridging ancient wisdom with modern technology to make spiritual practices accessible to all.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-orange-400/20 blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-400/10 blur-lg"></div>
          <div className="relative flex items-center justify-center">
          <img
                    src="https://purohitapp.netlify.app/assets/img/about/about-app.png"
                    alt="PurohitApp Features"
                    className="w-64  sm:w-72 md:w-80"
                  />
          </div>
            {/* Phone mockup */}
            
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Bridging Tradition and Modernity
            </h2>

            <div className="w-20 h-1 bg-orange-500 mb-6 rounded-full"></div>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              At PurohitApp, we seamlessly integrate ancient Vedic traditions with modern technology. Our mission is to
              preserve and promote the rich cultural heritage of Sanatan Dharma while making it accessible to the next
              generation.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              Our app provides easy access to expert puja services, sacred texts, and devotional audio. Experience
              spirituality with convenience and authenticity, anytime and anywhere.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/download"
                className="px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-orange-700 to-orange-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Get The App
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
     
      {/* Team Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600">
            Meet the dedicated team behind PurohitApp, combining expertise in technology and traditional knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Rahul Sharma</h3>
              <p className="text-orange-600 mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience in technology and a deep understanding of Vedic traditions.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Priya Patel</h3>
              <p className="text-orange-600 mb-3">Head of Content</p>
              <p className="text-gray-600 text-sm">
                A scholar in Sanskrit and ancient texts, ensuring authenticity in all our content.
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Vikram Singh</h3>
              <p className="text-orange-600 mb-3">Technical Lead</p>
              <p className="text-gray-600 text-sm">
                An experienced developer passionate about creating technology that serves spiritual needs.
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default About

