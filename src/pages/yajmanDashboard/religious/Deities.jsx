"use client"

import { useState } from "react"
import { Search, Filter, ChevronRight, Heart } from "react-feather"
import { Link } from "react-router-dom"

const Deities = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = [
    // { id: "all", name: "All Deities" },
    // { id: "trimurti", name: "Trimurti" },
    // { id: "devi", name: "Goddesses" },
    // { id: "avatars", name: "Avatars" },
    // { id: "celestial", name: "Celestial Deities" },
    // { id: "regional", name: "Regional Deities" },
  ]

  const deities = [
    {
      id: 1,
      name: "Lord Ganesha",
      category: "celestial",
      description: "The elephant-headed god, known as the remover of obstacles and the god of beginnings.",
      significance:
        "Lord Ganesha is worshipped before beginning any new venture or ritual. He is the son of Lord Shiva and Goddess Parvati.",
      image: "/religious/deities/ganesha.jpg",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Lord Shiva",
      category: "trimurti",
      description:
        "The destroyer and transformer among the Trimurti, the Hindu trinity that includes Brahma and Vishnu.",
      significance:
        "Lord Shiva represents the aspect of the Supreme Being that continuously dissolves to recreate in the cyclic process of creation, preservation, and dissolution.",
      image: "/religious/deities/shiva.jpg",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Lord Vishnu",
      category: "trimurti",
      description: "The preserver and protector among the Trimurti, the Hindu trinity.",
      significance:
        "Lord Vishnu is responsible for the preservation of the universe and takes various avatars to restore dharma (righteousness) on Earth.",
      image: "/religious/deities/vishnu.jpg",
      isFavorite: true,
    },
    {
      id: 4,
      name: "Lord Brahma",
      category: "trimurti",
      description: "The creator among the Trimurti, the Hindu trinity.",
      significance:
        "Lord Brahma is responsible for the creation of the universe and all beings. He is depicted with four faces, representing the four Vedas.",
      image: "/religious/deities/brahma.jpg",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Goddess Lakshmi",
      category: "devi",
      description: "The goddess of wealth, fortune, and prosperity, both material and spiritual.",
      significance: "Goddess Lakshmi is the consort of Lord Vishnu and is worshipped for abundance and prosperity.",
      image: "/religious/deities/lakshmi.jpg",
      isFavorite: true,
    },
    {
      id: 6,
      name: "Goddess Saraswati",
      category: "devi",
      description: "The goddess of knowledge, music, arts, wisdom, and learning.",
      significance:
        "Goddess Saraswati is worshipped by students, teachers, and artists for knowledge and creative inspiration.",
      image: "/religious/deities/saraswati.jpg",
      isFavorite: false,
    },
    {
      id: 7,
      name: "Goddess Durga",
      category: "devi",
      description: "The warrior goddess who combats evil and demonic forces that threaten peace and prosperity.",
      significance:
        "Goddess Durga represents the power of the divine mother who protects the universe from negative forces.",
      image: "/religious/deities/durga.jpg",
      isFavorite: true,
    },
    {
      id: 8,
      name: "Lord Krishna",
      category: "avatars",
      description: "The eighth avatar of Lord Vishnu, known for his mischievous and playful nature.",
      significance: "Lord Krishna is revered for his teachings in the Bhagavad Gita and his role in the Mahabharata.",
      image: "/religious/deities/krishna.jpg",
      isFavorite: true,
    },
    {
      id: 9,
      name: "Lord Rama",
      category: "avatars",
      description: "The seventh avatar of Lord Vishnu, known for his perfect character and righteousness.",
      significance:
        "Lord Rama is the epitome of dharma (righteousness) and the ideal man. His life story is narrated in the epic Ramayana.",
      image: "/religious/deities/rama.jpg",
      isFavorite: false,
    },
    {
      id: 10,
      name: "Lord Hanuman",
      category: "celestial",
      description: "The monkey god known for his devotion to Lord Rama and his extraordinary strength.",
      significance:
        "Lord Hanuman symbolizes devotion, strength, and selfless service. He is worshipped for courage and protection.",
      image: "/religious/deities/hanuman.jpg",
      isFavorite: true,
    },
    {
      id: 11,
      name: "Goddess Kali",
      category: "devi",
      description: "The fierce form of Goddess Durga, representing time and change.",
      significance:
        "Goddess Kali destroys evil and protects her devotees. She is often misunderstood due to her fierce appearance.",
      image: "/religious/deities/kali.jpg",
      isFavorite: false,
    },
    {
      id: 12,
      name: "Lord Kartikeya",
      category: "celestial",
      description: "Also known as Murugan, he is the god of war and the son of Lord Shiva and Goddess Parvati.",
      significance:
        "Lord Kartikeya is worshipped for victory in battles, both external and internal. He is especially popular in South India.",
      image: "/religious/deities/kartikeya.jpg",
      isFavorite: false,
    },
  ]

  const filteredDeities =
    activeCategory === "all" ? deities : deities.filter((deity) => deity.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <h1 className="text-2xl font-bold">Dev-Devi (Hindu Deities)</h1>
          <p className="opacity-90">Explore the divine pantheon of Hindu gods and goddesses</p>
        </div>

        {/* Search and Filters */}
        <div className="border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
            <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-1 mb-4 md:mb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeCategory === category.id ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search deities..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={18} />
                </div>
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="p-4 bg-gray-50 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Associated With</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>All Associations</option>
                    <option>Wealth & Prosperity</option>
                    <option>Knowledge & Wisdom</option>
                    <option>Strength & Protection</option>
                    <option>Creation & Life</option>
                    <option>Destruction & Transformation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>All Regions</option>
                    <option>North India</option>
                    <option>South India</option>
                    <option>East India</option>
                    <option>West India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Popularity</option>
                    <option>Alphabetical: A-Z</option>
                    <option>Favorites First</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                  Reset
                </button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Deities Grid */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {activeCategory === "all" ? "All Deities" : categories.find((c) => c.id === activeCategory)?.name}
          </h2>

          {filteredDeities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDeities.map((deity) => (
                <div
                  key={deity.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={deity.image || "/placeholder.svg?height=192&width=384"}
                      alt={deity.name}
                      className="w-full h-full object-cover"
                    />
                    {deity.isFavorite && (
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Heart size={16} className="text-orange-600 fill-orange-600" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 text-lg mb-1">{deity.name}</h3>
                    <p className="text-sm text-gray-500 mb-2 capitalize">{deity.category}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{deity.description}</p>
                    <Link
                      to={`/dashboard/religious/deities/${deity.id}`}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center"
                    >
                      View Details
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No deities found</h3>
              <p className="text-gray-500 mb-6">No deities match your current filter criteria.</p>
              <button
                onClick={() => setActiveCategory("all")}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-block"
              >
                View All Deities
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Deities

