"use client"

import { useState, useEffect } from "react"

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅"
      case "error":
        return "❌"
      case "warning":
        return "⚠️"
      default:
        return "ℹ️"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center p-4 border rounded-lg shadow-lg max-w-sm ${getToastStyles()}`}>
        <span className="text-lg mr-3">{getIcon()}</span>
        <span className="text-sm font-medium flex-1">{message}</span>
        <button onClick={onClose} className="ml-3 text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
    </div>
  )
}

export default Toast
