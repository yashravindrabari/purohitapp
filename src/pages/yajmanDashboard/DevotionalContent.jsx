"use client"

import { useState } from "react"
import { Music, FileText, Image, Play, Download, Heart, Share2 } from "react-feather"
import { Link } from "react-router-dom"

const DevotionalContent = () => {
  const [activeTab, setActiveTab] = useState("audio")

  const audioContent = [
    {
      id: 1,
      title: "Gayatri Mantra",
      artist: "Pandit Jasraj",
      duration: "4:32",
      image: "/devotional/gayatri.jpg",
      category: "Mantra",
      isFavorite: true,
    },
    {
      id: 2,
      title: "Hanuman Chalisa",
      artist: "Hari Om Sharan",
      duration: "9:47",
      image: "/devotional/hanuman.jpg",
      category: "Chalisa",
      isFavorite: false,
    },
    {
      id: 3,
      title: "Shiv Tandav Stotram",
      artist: "Shankar Mahadevan",
      duration: "5:18",
      image: "/devotional/shiva.jpg",
      category: "Stotram",
      isFavorite: true,
    },
    {
      id: 4,
      title: "Ganesh Aarti",
      artist: "Anuradha Paudwal",
      duration: "3:56",
      image: "/devotional/ganesh.jpg",
      category: "Aarti",
      isFavorite: false,
    },
  ]

  const wallpapers = [
    {
      id: 1,
      title: "Lord Krishna",
      image: "/devotional/wallpapers/krishna.jpg",
      category: "Krishna",
      downloads: 1245,
    },
    {
      id: 2,
      title: "Goddess Lakshmi",
      image: "/devotional/wallpapers/lakshmi.jpg",
      category: "Lakshmi",
      downloads: 987,
    },
    {
      id: 3,
      title: "Lord Shiva",
      image: "/devotional/wallpapers/shiva.jpg",
      category: "Shiva",
      downloads: 1567,
    },
    {
      id: 4,
      title: "Lord Ganesha",
      image: "/devotional/wallpapers/ganesha.jpg",
      category: "Ganesha",
      downloads: 1123,
    },
    {
      id: 5,
      title: "Goddess Durga",
      image: "/devotional/wallpapers/durga.jpg",
      category: "Durga",
      downloads: 876,
    },
    {
      id: 6,
      title: "Lord Hanuman",
      image: "/devotional/wallpapers/hanuman.jpg",
      category: "Hanuman",
      downloads: 1032,
    },
  ]

  const sacredTexts = [
    {
      id: 1,
      title: "Bhagavad Gita",
      description: "The sacred Hindu scripture that is part of the epic Mahabharata.",
      chapters: 18,
      language: "Sanskrit with Hindi & English translations",
      image: "/devotional/texts/gita.jpg",
    },
    {
      id: 2,
      title: "Ramayana",
      description:
        "An ancient Indian epic poem which narrates the struggle of Prince Rama to rescue his wife Sita from the demon king Ravana.",
      chapters: 7,
      language: "Sanskrit with Hindi & English translations",
      image: "/devotional/texts/ramayana.jpg",
    },
    {
      id: 3,
      title: "Durga Saptashati",
      description:
        "Also known as Devi Mahatmya, it is a Hindu religious text describing the victory of the goddess Durga over the demon Mahishasura.",
      chapters: 13,
      language: "Sanskrit with Hindi & English translations",
      image: "/devotional/texts/durga.jpg",
    },
  ]

  // Custom tab component
  const TabButton = ({ value, icon, label }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center justify-center px-4 py-2.5 rounded-lg transition-colors ${
        activeTab === value ? "bg-orange-100 text-orange-700 font-medium" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <h1 className="text-2xl font-bold">Devotional Content</h1>
          <p className="opacity-90">Access sacred audio, texts, and wallpapers for your spiritual journey</p>
        </div>

        {/* Custom Tabs */}
        <div className="px-4 pt-4 border-b">
          <div className="flex space-x-2 max-w-md mx-auto">
            <TabButton value="audio" icon={<Music size={16} className="mr-2" />} label="Audio Stotras" />
            <TabButton value="wallpapers" icon={<Image size={16} className="mr-2" />} label="Wallpapers" />
            <TabButton value="texts" icon={<FileText size={16} className="mr-2" />} label="Sacred Texts" />
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {/* Audio Content */}
          {activeTab === "audio" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured Audio</h2>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 md:p-6 border border-orange-100">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
                      <div className="rounded-lg overflow-hidden shadow-md">
                        <img src="/devotional/om-namah-shivaya.jpg" alt="Om Namah Shivaya" className="w-full h-auto" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Om Namah Shivaya</h3>
                      <p className="text-gray-600 mb-4">
                        A powerful mantra dedicated to Lord Shiva, chanted for peace, protection, and spiritual growth.
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="mr-4">Artist: Shankar Mahadevan</span>
                        <span>Duration: 7:15</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                          <Play size={16} className="mr-2" />
                          Play Now
                        </button>
                        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Download size={16} className="mr-2" />
                          Download
                        </button>
                        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Heart size={16} className="mr-2" />
                          Add to Favorites
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Audio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {audioContent.map((audio) => (
                  <div
                    key={audio.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-200 hover:shadow-md transition-all"
                  >
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        src={audio.image || "/placeholder.svg?height=160&width=320"}
                        alt={audio.title}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <Play size={20} className="text-orange-600 ml-1" />
                        </div>
                      </button>
                      {audio.isFavorite && (
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                          <Heart size={16} className="text-orange-600 fill-orange-600" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800">{audio.title}</h3>
                      <p className="text-sm text-gray-500">{audio.artist}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{audio.category}</span>
                        <span>{audio.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wallpapers Content */}
          {activeTab === "wallpapers" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Divine Wallpapers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {wallpapers.map((wallpaper) => (
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
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{wallpaper.category}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sacred Texts Content */}
          {activeTab === "texts" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Sacred Texts</h2>
              <div className="space-y-4">
                {sacredTexts.map((text) => (
                  <div
                    key={text.id}
                    className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden hover:border-orange-200 hover:shadow-md transition-all"
                  >
                    <div className="w-full md:w-1/4 h-48 md:h-auto bg-gray-200">
                      <img
                        src={text.image || "/placeholder.svg?height=192&width=192"}
                        alt={text.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{text.title}</h3>
                      <p className="text-gray-600 mb-4">{text.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
                        <div>
                          <span className="font-medium">Chapters:</span> {text.chapters}
                        </div>
                        <div>
                          <span className="font-medium">Language:</span> {text.language}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/dashboard/devotional-content/texts/${text.id}`}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Read Now
                        </Link>
                        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Download size={16} className="mr-2" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DevotionalContent

