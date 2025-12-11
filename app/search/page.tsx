"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { flushSync } from "react-dom"
import Link from "next/link"
import { useTheme } from "next-themes"
import SearchInterface from "@/components/search-interface"
import GodBackground from "@/components/god-background"

export default function SearchPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      {/* God Animation Background */}
      <GodBackground />

      {/* Header */}
      <header className="py-12 px-8 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="flex-1">
            <Link href="/">
              <h1
                className="text-3xl font-black tracking-widest cursor-pointer font-heading"
                style={{
                  letterSpacing: "0.05em",
                  lineHeight: "1",
                  fontSize: "1.5rem"
                }}
              >
                gistify
              </h1>
            </Link>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              <Link href="/">
                <button
                  className="px-3 py-2 text-xs font-mono border-2 border-gray-300 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all select-none"
                >
                  WAITLIST
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
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-300 dark:border-blue-500 rounded-full opacity-20 dark:opacity-10 transition-all duration-300"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 border border-blue-300 dark:border-blue-500 rounded-full opacity-15 dark:opacity-5 transition-all duration-300"></div>
        
        <SearchInterface />
      </section>

      <footer className="py-8 px-8 relative text-center text-xs text-gray-600 dark:text-gray-400 font-mono transition-colors duration-300">
        <p>gistify</p>
      </footer>
    </main>
  )
}
