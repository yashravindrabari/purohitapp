import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Smooth scroll handler
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.img
                src="https://purohitapp.netlify.app/assets/img/drawable/applogo1.png"
                alt="PurohitApp Logo"
                className="h-10 sm:h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.span
                className="ml-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                PurohitApp
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-8">
              <NavLink to="#xyz" onScroll={handleSmoothScroll}>
                Home
              </NavLink>
              <NavLink to="#features" onScroll={handleSmoothScroll}>
                Features
              </NavLink>
              <NavLink to="#abc" onScroll={handleSmoothScroll}>
                About
              </NavLink>
              <NavLink to="#testimonials" onScroll={handleSmoothScroll}>
                Testimonial
              </NavLink>
              <NavLink to="#faq" onScroll={handleSmoothScroll}>
                FAQ
              </NavLink>
              <NavLink to="#download" onScroll={handleSmoothScroll}>
                Download
              </NavLink>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium hover:shadow-lg transition-all duration-300 ml-2"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/purohitregistration"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium hover:shadow-lg transition-all duration-300 ml-2"
                >
                  Purohit Registration
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  className="w-6 h-6 relative"
                >
                  <motion.span
                    className="absolute h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ease-in-out"
                    variants={{
                      closed: { rotate: 0, translateY: -4 },
                      open: { rotate: 45, translateY: 0 },
                    }}
                  />
                  <motion.span
                    className="absolute h-0.5 bg-gray-700 transform transition-all duration-300 ease-in-out"
                    variants={{
                      closed: { opacity: 1, width: 6, x: 0 },
                      open: { opacity: 0, width: 0, x: 8 },
                    }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ease-in-out"
                    variants={{
                      closed: { rotate: 0, translateY: 4 },
                      open: { rotate: -45, translateY: 0 },
                    }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-xl z-[70] md:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <img
                    src="https://purohitapp.netlify.app/assets/img/drawable/applogo1.png"
                    alt="PurohitApp Logo"
                    className="h-8 w-auto"
                  />
                  <span className="ml-2 text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    PurohitApp
                  </span>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Menu Content */}
              <div className="py-4 px-4">
                <motion.div
                  className="flex flex-col"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  <MobileNavLink to="#xyz" onScroll={handleSmoothScroll}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink to="#features" onScroll={handleSmoothScroll}>
                    Features
                  </MobileNavLink>
                  <MobileNavLink to="#abc" onScroll={handleSmoothScroll}>
                    About
                  </MobileNavLink>
                  <MobileNavLink
                    to="#testimonials"
                    onScroll={handleSmoothScroll}
                  >
                    Testimonial
                  </MobileNavLink>
                  <MobileNavLink to="#faq" onScroll={handleSmoothScroll}>
                    FAQ
                  </MobileNavLink>
                  <MobileNavLink to="#download" onScroll={handleSmoothScroll}>
                    Download
                  </MobileNavLink>
                </motion.div>

                <motion.div
                  className="mt-6 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to="/login"
                    className="w-full block px-5 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium text-center shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Desktop NavLink ---
const NavLink = ({ to, children, onScroll }) => {
  const isHashLink = to.startsWith("#");

  return (
    <button
      onClick={(e) => {
        if (isHashLink) {
          onScroll(e, to);
        }
      }}
      className={`text-gray-700 font-medium hover:text-orange-500 transition-colors relative group`}
    >
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 w-0 group-hover:w-full"></span>
    </button>
  );
};

// --- Mobile NavLink ---
const MobileNavLink = ({ to, children, onScroll }) => {
  const isHashLink = to.startsWith("#");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
      }}
    >
      <button
        onClick={(e) => {
          if (isHashLink) {
            onScroll(e, to);
          }
        }}
        className="flex items-center py-4 px-2 border-b border-gray-100 w-full text-left text-gray-700"
      >
        <motion.span
          className="w-1 h-6 rounded-full mr-3 bg-transparent"
          layoutId="activeIndicator"
        />
        <span className="font-medium">{children}</span>
        <motion.div
          className="ml-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </button>
    </motion.div>
  );
};

export default Navbar;
