"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { flushSync } from "react-dom"
import Image from "next/image"

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    setIsNavigating(true)

    // Get button position for the circular animation origin
    const button = buttonRef.current
    const rect = button?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    // Create a light blue overlay for the transition
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgb(147, 197, 253);
      z-index: 99999;
      clip-path: circle(0px at ${x}px ${y}px);
      pointer-events: none;
    `
    document.body.appendChild(overlay)

    // Navigate immediately so page loads behind overlay
    router.push(`/results?url=${encodeURIComponent(searchQuery)}`)

    // Animate the overlay expanding
    const animation = overlay.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 600,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      }
    )

    // After expanding, fade out the overlay to reveal the page
    animation.onfinish = () => {
      overlay.animate(
        { opacity: [1, 0] },
        { duration: 300, easing: "ease-out", fill: "forwards" }
      ).onfinish = () => overlay.remove()
    }
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
            className="w-full px-4 py-3 pr-12 text-base md:text-sm font-mono border-2 border-gray-300 focus:border-blue-400 dark:border-gray-600 dark:focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 bg-opacity-80 focus:bg-opacity-100 focus:outline-none transition-all"
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
          ref={buttonRef}
          type="submit"
          disabled={isNavigating}
          className="px-6 py-3 text-sm font-mono border-2 border-gray-300 dark:border-gray-700 bg-white hover:bg-blue-50 hover:border-blue-400 dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:border-blue-500 text-black dark:text-white focus:outline-none transition-all select-none whitespace-nowrap disabled:opacity-50"
        >
          {isNavigating ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
          ) : (
            "tl;dr"
          )}
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono transition-colors duration-300">explore topics • learn concepts • discover patterns</p>
      </div>
    </div>
  )
}
