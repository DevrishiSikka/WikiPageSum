"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { flushSync } from "react-dom"
import Link from "next/link"
import { useTheme } from "next-themes"
import GodBackground from "@/components/god-background"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log("Waitlist email:", waitlistEmail)
    setWaitlistEmail("")
    setIsSubmitting(false)
    setShowConfirmation(true)
    setIsClosing(false)
    
    // Auto-hide after 4 seconds with smooth exit
    setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => setShowConfirmation(false), 300)
    }, 4000)
  }

  const closeToast = () => {
    setIsClosing(true)
    setTimeout(() => setShowConfirmation(false), 300)
  }

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark")
      return
    }

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.add('no-transition')
      flushSync(() => {
        setTheme(theme === "dark" ? "light" : "dark")
      })
    })

    transition.finished.then(() => {
      document.documentElement.classList.remove('no-transition')
    })

    await transition.ready

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]

    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 700,
        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <main className="bg-white dark:bg-gray-950 text-black dark:text-white min-h-screen flex flex-col relative transition-colors duration-300" style={{
      backgroundImage: `radial-gradient(circle, var(--grid-color) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
      backgroundPosition: "0 0"
    }}>
      {/* Success Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed top-8 inset-x-0 z-50 flex justify-center">
          <div className={`relative flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden ${isClosing ? 'animate-slide-up' : 'animate-slide-down'}`}>
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
            
            <div className="w-5 h-5 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path className="animate-draw-check" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-lg font-mono text-black dark:text-white">You&apos;re on the list</span>
            <button 
              onClick={closeToast}
              className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* God Animation Background - Moved to root level */}
      <GodBackground />

      {/* Header */}
      <header className="py-12 px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="flex-1">
            <h1
              className="text-3xl font-black tracking-widest font-heading"
              style={{
                letterSpacing: "0.05em",
                lineHeight: "1",
                fontSize: "1.5rem"
              }}
            >
              gistify
            </h1>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              <Link href="/search">
                <button
                  className="px-3 py-2 text-xs font-mono border-2 border-gray-300 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all select-none"
                >
                  SEARCH
                </button>
              </Link>
              <button
                onClick={toggleTheme}
                className="px-3 py-2 text-xs font-mono border-2 border-gray-300 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all select-none"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? "☀️ LIGHT" : "🌙 DARK"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-8 py-20 relative transition-colors duration-300 overflow-hidden">
        {/* Decorative elements (Original) */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-300 dark:border-blue-500 rounded-full opacity-20 dark:opacity-10 transition-all duration-300"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 border border-blue-300 dark:border-blue-500 rounded-full opacity-15 dark:opacity-5 transition-all duration-300"></div>
        
        <div className="w-full max-w-2xl relative z-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-blue-50 text-blue-700 dark:bg-blue-900/10 dark:text-blue-300 text-xs font-mono transition-all hover:scale-105 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Join the waitlist</span>
            </div>
          </div>

          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-black dark:text-white font-heading mb-2 transition-colors duration-300">
              Turn any link into instant understanding
            </h2>
          </div>
          
          <form onSubmit={handleJoinWaitlist} className="flex gap-2 mb-8">
            <input
              type="email"
              required
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="name@example.com"
              className="flex-1 px-4 py-3 text-sm font-mono border-2 border-gray-300 focus:border-blue-400 dark:border-gray-600 dark:focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 bg-opacity-80 focus:bg-opacity-100 focus:outline-none transition-all disabled:opacity-50"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 text-sm font-bold font-mono border-2 border-black bg-black text-white hover:bg-gray-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>JOINING...</span>
                </span>
              ) : (
                "JOIN NOW"
              )}
            </button>
          </form>
          
          <div className="text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-mono transition-colors duration-300">Get early access to gistify and be the first to know when we launch.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 relative text-center text-xs text-gray-600 dark:text-gray-400 font-mono transition-colors duration-300">
        <p>gistify</p>
      </footer>
    </main>
  )
}
