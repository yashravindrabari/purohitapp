import { useState } from "react"
import { Download, Share2, Search, Filter, Heart } from "react-feather"
import { Link } from "react-router-dom"

const Wallpapers = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const categories = [
    { id: "all", name: "All Wallpapers" },
    // { id: "krishna", name: "Krishna" },
    // { id: "shiva", name: "Shiva" },
    // { id: "durga", name: "Durga" },
    // { id: "ganesh", name: "Ganesh" },
    // { id: "hanuman", name: "Hanuman" },
    // { id: "lakshmi", name: "Lakshmi" }
  ]
  
  const wallpapers = [
    {
      id: 1,
      title: "Lord Krishna with Flute",
      image: "/devotional/wallpapers/krishna.jpg",
      category: "krishna",
      downloads: 1245,
      resolution: "1920x1080",
      isFavorite: true
    },
    {
      id: 2,
      title: "Goddess Lakshmi",
      image: "/devotional/wallpapers/lakshmi.jpg",
      category: "lakshmi",
      downloads: 987,
      resolution: "1920x1080",
      isFavorite: false
    },
    {
      id: 3,
      title: "Lord Shiva Meditation",
      image: "/devotional/wallpapers/shiva.jpg",
      category: "shiva",
      downloads: 1567,
      resolution: "2560x1440",
      isFavorite: true
    },
    {
      id: 4,
      title: "Lord Ganesha",
      image: "/devotional/wallpapers/ganesha.jpg",
      category: "ganesh",
      downloads: 1123,
      resolution: "1920x1080",
      isFavorite: false
    },
    {
      id: 5,
      title: "Goddess Durga",
      image: "/devotional/wallpapers/durga.jpg",
      category: "durga",
      downloads: 876,
      resolution: "2560x1440",
      isFavorite: false
    },
    {
      id: 6,
      title: "Lord Hanuman",
      image: "/devotional/wallpapers/hanuman.jpg",
      category: "hanuman",
      downloads: 1032,
      resolution: "1920x1080",
      isFavorite: true
    },
    {
      id: 7,
      title: "Radha Krishna",
      image: "/devotional/wallpapers/radha-krishna.jpg",
      category: "krishna",
      downloads: 1432,
      resolution: "2560x1440",
      isFavorite: false
    },
    {
      id: 8,
      title: "Lord Shiva Tandav",
      image: "/devotional/wallpapers/shiva-tandav.jpg",
      category: "shiva",
      downloads: 1289,
      resolution: "1920x1080",
      isFavorite: false
    },
    {
      id: 9,
      title: "Goddess Saraswati",
      image: "/devotional/wallpapers/saraswati.jpg",
      category: "saraswati",
      downloads: 956,
      resolution: "1920x1080",
      isFavorite: false
    },
    {
      id: 10,
      title: "Lord Vishnu",
      image: "/devotional/wallpapers/vishnu.jpg",
      category: "vishnu",
      downloads: 1087,
      resolution: "2560x1440",
      isFavorite: true
    },
    {
      id: 11,
      title: "Lord Ganesha with Modak",
      image: "/devotional/wallpapers/ganesha-modak.jpg",
      category: "ganesh",
      downloads: 876,
      resolution: "1920x1080",
      isFavorite: false
    },
    {
      id: 12,
      title: "Maa Durga Navratri",
      image: "/devotional/wallpapers/durga-navratri.jpg",
      category: "durga",
      downloads: 1145,
      resolution: "2560x1440",
      isFavorite: false
    }
  ]

  const filteredWallpapers = activeCategory === "all" 
    ? wallpapers 
    : wallpapers.filter(wallpaper => wallpaper.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <h1 className="text-2xl font-bold">Divine Wallpapers</h1>
          <p className="opacity-90">Beautiful high-resolution wallpapers for your devices</p>
        </div>

        {/* Search and Filters */}
        <div className="border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
            <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-1 mb-4 md:mb-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-600 hover:bg-gray-100"
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
                  placeholder="Search wallpapers..."
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>All Resolutions</option>
                    <option>HD (1280x720)</option>
                    <option>Full HD (1920x1080)</option>
                    <option>2K (2560x1440)</option>
                    <option>4K (3840x2160)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>All Devices</option>
                    <option>Desktop</option>
                    <option>Mobile</option>
                    <option>Tablet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Most Popular</option>
                    <option>Recently Added</option>
                    <option>Most Downloaded</option>
                    <option>Alphabetical: A-Z</option>
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

        {/* Wallpapers Grid */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {activeCategory === "all" ? "All Wallpapers" : categories.find(c => c.id === activeCategory)?.name + " Wallpapers"}
          </h2>
          
          {filteredWallpapers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWallpapers.map((wallpaper) => (
                <div 
                  key={wallpaper.id} 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={wallpaper.image || "/placeholder.svg?height=192&width=384"} 
                      alt={wallpaper.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-3 text-white">
                        <h3 className="font-medium">{wallpaper.title}</h3>
                        <p className="text-xs text-white/80">{wallpaper.downloads} downloads</p>
                      </div>
                    </div>
                    {wallpaper.isFavorite && (
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                        <Heart size={16} className="text-orange-600 fill-orange-600" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{wallpaper.resolution}</span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors">
                        <Download size={16} />
                      </button>
                   
                      <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors">
                        <Heart size={16} className={wallpaper.isFavorite ? "fill-orange-600 text-orange-600" : ""} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Image size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No wallpapers found</h3>
              <p className="text-gray-500 mb-6">
                No wallpapers match your current filter criteria.
              </p>
              <button 
                onClick={() => setActiveCategory("all")}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-block"
              >
                View All Wallpapers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Wallpapers
