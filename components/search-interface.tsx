"use client"

import type React from "react"
import { useState } from "react"

import Image from "next/image"

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search query:", searchQuery)
  }

  return (
    <div className="w-full max-w-2xl relative z-10">
      <div className="mb-8 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono tracking-widest mb-6 transition-colors duration-300">SEARCH THE MANUAL</p>
      </div>
      
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-3 pr-12 text-sm font-mono border-2 border-gray-300 focus:border-blue-400 dark:border-gray-600 dark:focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 bg-opacity-80 focus:bg-opacity-100 focus:outline-none transition-all"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
            title="Upload file"
          >
            <Image 
              src="/icons/paperclip-pixel.svg" 
              alt="Upload" 
              width={20} 
              height={20}
              className="dark:invert"
            />
          </button>
        </div>
        <button
          type="submit"
          className="px-6 py-3 text-sm font-mono border-2 border-gray-300 dark:border-gray-700 bg-white hover:bg-blue-50 hover:border-blue-400 dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:border-blue-500 text-black dark:text-white focus:outline-none transition-all select-none whitespace-nowrap"
        >
          tl;dr
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono transition-colors duration-300">explore topics • learn concepts • discover patterns</p>
      </div>
    </div>
  )
}
