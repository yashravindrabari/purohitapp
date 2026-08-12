"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Download, Search, Filter, Music } from "react-feather"
import { contentService } from "../../../services/api"

const AudioStotras = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [audioContent, setAudioContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState(null)
  const [progress, setProgress] = useState({})
  const [duration, setDuration] = useState({})

  const categories = [
    { id: "all", name: "All Stotras" },
    // { id: "mantra", name: "Mantras" },
    // { id: "chalisa", name: "Chalisas" },
    // { id: "aarti", name: "Aartis" },
    // { id: "bhajan", name: "Bhajans" },
    // { id: "stotram", name: "Stotrams" }
  ]

  useEffect(() => {
    fetchAudioContent()
  }, [])

  const fetchAudioContent = async () => {
    setLoading(true)
    try {
      const data = await contentService.getStotras()
      const contentList = (data.stotras || []).map((item) => ({
        id: item.id,
        title: item.name,
        artist: item.artist || "",
        duration: item.duration || "",
        category: item.category || "stotram",
        description: item.description || "",
        mp3Link: item.mp3Link,
      }))
      setAudioContent(contentList)
    } catch (error) {
      console.error("Error fetching audio:", error)
    } finally {
      setLoading(false)
    }
  }

  const togglePlay = id => {
    const audio = document.getElementById(`audio-${id}`)

    if (playingId === id) {
      audio.pause()
      setPlayingId(null)
    } else {
      if (playingId) {
        const prev = document.getElementById(`audio-${playingId}`)
        if (prev) prev.pause()
      }
      audio.play()
      setPlayingId(id)
    }
  }

  const handleTimeUpdate = id => {
    const audio = document.getElementById(`audio-${id}`)
    setProgress(prev => ({ ...prev, [id]: audio.currentTime }))
  }

  const handleLoadedMetadata = id => {
    const audio = document.getElementById(`audio-${id}`)
    setDuration(prev => ({ ...prev, [id]: audio.duration }))
  }

  const seekAudio = (id, e) => {
    const audio = document.getElementById(`audio-${id}`)
    const width = e.target.clientWidth
    const clickX = e.nativeEvent.offsetX
    const newTime = (clickX / width) * audio.duration
    audio.currentTime = newTime
  }

  const formatTime = sec => {
    if (!sec || isNaN(sec)) return "0:00"
    const minutes = Math.floor(sec / 60)
    const seconds = Math.floor(sec % 60).toString().padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  const filteredAudio = audioContent.filter(audio => {
    const matchesCategory = activeCategory === "all" || audio.category === activeCategory
    const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className=" mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <h1 className="text-2xl font-bold">Audio Stotras</h1>
          <p className="opacity-90">Listen to sacred mantras, stotras, and devotional songs</p>
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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search audio..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={18} />
                </div>
              </div>
            
            </div>
          </div>

       
        </div>

        {/* Audio Player Cards */}
        <div className="p-4 ">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading audio...</div>
          ) : filteredAudio.length > 0 ? (
            <div className="space-y-4 ">
              {filteredAudio.map(audio => {
                const currentTime = progress[audio.id] || 0
                const totalTime = duration[audio.id] || 0
                const progressPercent = totalTime ? (currentTime / totalTime) * 100 : 0

                return (
                  <div
                    key={audio.id}
                    className="border border-gray-200 rounded-lg p-4 flex  md:items-center md:justify-between hover:border-orange-200 hover:shadow-md transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{audio.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{audio.artist}</p>
                      <p className="text-sm text-gray-600 mb-3">{audio.description}</p>

                      {/* Progress Bar */}
                      <div
                        className="w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-2"
                        onClick={e => seekAudio(audio.id, e)}
                      >
                        <div
                          className="h-2 bg-orange-500 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      {/* Time Display */}
                      <div className="flex justify-between text-xs text-gray-500 mb-3">
                        <span>{formatTime(currentTime)}</span>
                        <span>-{formatTime(totalTime - currentTime)}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => togglePlay(audio.id)}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center space-x-2"
                        >
                          {playingId === audio.id ? <Pause size={16} /> : <Play size={16} />}
                          <span>{playingId === audio.id ? "Pause" : "Play"}</span>
                        </button>

                      </div>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio
                      id={`audio-${audio.id}`}
                      src={audio.mp3Link}
                      onEnded={() => setPlayingId(null)}
                      onTimeUpdate={() => handleTimeUpdate(audio.id)}
                      onLoadedMetadata={() => handleLoadedMetadata(audio.id)}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Music size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No audio found for this category or search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AudioStotras
