import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, ArrowRight } from "react-feather"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-8 relative">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-orange-100/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-orange-100/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <img src="https://purohitapp.netlify.app/assets/img/drawable/applogo1.png" alt="PurohitApp Logo" className="h-10 sm:h-12 w-auto" />
              <h3 className="ml-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                PurohitApp
              </h3>
            </div>

            <p className="text-gray-600 text-sm sm:text-base">
              India's first app featuring all traditional Granths, sacred stories, Aarti Sangrah, Panchang, and audio
              Stotras in one place. Plus, book experienced Purohits for your pujas seamlessly.
            </p>

            <div className="flex space-x-3">
              <SocialLink
                href="https://facebook.com/purohitapp"
                icon={<Facebook className="w-4 h-4" />}
                label="Facebook"
              />
              <SocialLink
                href="https://twitter.com/purohitapp"
                icon={<Twitter className="w-4 h-4" />}
                label="Twitter"
              />
              <SocialLink
                href="https://instagram.com/purohitapp"
                icon={<Instagram className="w-4 h-4" />}
                label="Instagram"
              />
              <SocialLink
                href="https://linkedin.com/company/purohitapp"
                icon={<Linkedin className="w-4 h-4" />}
                label="LinkedIn"
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="ml-2 text-sm text-gray-600">
                  <span className="font-semibold">4.8/5</span> on App Store
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/features">Features</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/testimonial">Testimonials</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/download">Download</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100">
              Support
            </h4>
            <ul className="space-y-2">
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/refund-policy">Refund Policy</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/help">Help Center</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-100">
              Contact Us
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="tel:02269710360"
                  className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2 text-orange-500" />
                  <span>02269710360</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contactus@purohitapp.com"
                  className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2 text-orange-500" />
                  <span>contactus@purohitapp.com</span>
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Spiritual Avenue, Mumbai, Maharashtra 400001, India</span>
              </li>
            </ul>

            <div>
              <h5 className="font-medium text-gray-800 mb-3">Subscribe to our newsletter</h5>
              <form className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-md transition-all flex items-center justify-center whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
              <p className="mt-2 text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>

        {/* Download buttons */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.purohitapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all"
            >
              <div className="mr-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-medium">Google Play</div>
              </div>
            </a>

          </div>

          <div className="flex items-center gap-4">
            <img src="/payment-methods/visa.svg" alt="Visa" className="h-6" />
            <img src="/payment-methods/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/payment-methods/paypal.svg" alt="PayPal" className="h-6" />
            <img src="/payment-methods/upi.svg" alt="UPI" className="h-6" />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; {currentYear} Purohit App. All rights reserved.</p>

            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
                <li>
                  <a href="/terms" className="text-xs sm:text-sm text-gray-500 hover:text-orange-600 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-xs sm:text-sm text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
            
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper components
const SocialLink = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all"
    >
      {icon}
    </a>
  )
}

const FooterLink = ({ to, children }) => {
  return (
    <li>
      <Link to={to} className="text-gray-600 hover:text-orange-600 transition-colors text-sm sm:text-base">
        {children}
      </Link>
    </li>
  )
}

export default Footer

