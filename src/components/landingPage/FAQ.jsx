"use client"

import { useState } from "react"
import { ChevronDown, Search, MessageCircle, HelpCircle } from "react-feather"

const FAQ = () => {
  const faqs = [
    {
      question: "What is the Purohit app?",
      answer:
        "Purohit App is India's first comprehensive spiritual application that provides access to traditional Hindu religious texts, rituals, and devotional content. It includes features like Pujan Vidhi, Granth, and Audio Stotra, all designed to enhance your spiritual journey.",
      category: "general",
    },
    {
      question: "How do I create an account on the Purohit app?",
      answer:
        "Creating an account is simple. Download the app from Google Play Store or Apple App Store, open it, and click on the 'Register' button. Fill in your details, verify your email or phone number, and you're ready to explore the app's features.",
      category: "account",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through the 'Help' section in the app, or by emailing us at contactus@purohitapp.com. We also have a dedicated support phone line at 02269710360 for immediate assistance.",
      category: "support",
    },
    {
      question: "Is the app available in multiple languages?",
      answer:
        "Yes, Purohit App is available in multiple Indian languages including Hindi, Sanskrit, Gujarati, Marathi, Tamil, and English to cater to users across different regions of India and globally.",
      category: "general",
    },
    {
      question: "Are the mantras and stotras authentic?",
      answer:
        "Absolutely. All mantras, stotras, and religious content in the app are sourced from authentic Vedic texts and are verified by qualified pandits and scholars to ensure accuracy and authenticity.",
      category: "content",
    },
    {
      question: "Can I download content for offline use?",
      answer:
        "Yes, you can download audio stotras, mantras, and texts for offline use. This feature is available to all users and allows you to access your spiritual content even without an internet connection.",
      category: "features",
    },
  ]

  const [openIndex, setOpenIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "account", name: "Account" },
    { id: "features", name: "Features" },
    { id: "content", name: "Content" },
    { id: "support", name: "Support" },
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-medium text-orange-600 tracking-wider uppercase">Support</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg">Find answers to common questions about PurohitApp and its features.</p>
        </div>

        {/* Search and filter */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-shrink-0">
              <select
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category pills - visible only on larger screens */}
          <div className="hidden md:flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                    <span
                      className={`ml-4 flex-shrink-0 p-2 rounded-full ${openIndex === index ? "bg-orange-100" : "bg-gray-100"} transition-colors duration-200`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 ${openIndex === index ? "text-orange-600 transform rotate-180" : "text-gray-500"} transition-transform duration-200`}
                      />
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      <div className="mt-4 flex items-center">
                        <span className="text-sm text-gray-500">Was this helpful?</span>
                        <button className="ml-4 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors">
                          Yes
                        </button>
                        <button className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No matching questions found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                onClick={() => {
                  setSearchTerm("")
                  setActiveCategory("all")
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Contact support */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-orange-100">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4 md:mb-0">
                Our support team is here to help. Contact us for personalized assistance.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="mailto:contactus@purohitapp.com"
                className="inline-block px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-sm hover:shadow"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ

