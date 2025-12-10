"use client"

import type React from "react"

import { useState } from "react"
import { flushSync } from "react-dom"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDark, setIsDark] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Search query:", searchQuery)
  }

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    // @ts-ignore
    if (!document.startViewTransition) {
      setIsDark(!isDark)
      return
    }

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.add('no-transition')
      flushSync(() => {
        setIsDark(!isDark)
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

  const bgColor = isDark ? "bg-gray-950" : "bg-white"
  const textColor = isDark ? "text-white" : "text-black"
  const borderColor = isDark ? "border-gray-700" : "border-gray-300"
  const secondaryText = isDark ? "text-gray-300" : "text-gray-700"
  const gridColor = isDark ? "rgba(91, 127, 255, 0.15)" : "rgba(91, 127, 255, 0.25)"
  const circleColor = isDark ? "border-blue-500" : "border-blue-300"
  const circleBg = isDark ? "opacity-10" : "opacity-20"
  const inputBg = isDark ? "bg-gray-900 text-white placeholder-gray-500" : "bg-white text-gray-900 placeholder-gray-500"
  const inputBorder = isDark ? "border-gray-600 focus:border-blue-500" : "border-gray-300 focus:border-blue-400"
  const hoverBg = isDark ? "hover:bg-gray-800 hover:border-blue-500" : "hover:bg-blue-50 hover:border-blue-400"

  return (
    <main className={`${bgColor} ${textColor} min-h-screen flex flex-col relative transition-colors duration-300`} style={{
      backgroundImage: `radial-gradient(circle, ${gridColor} 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
      backgroundPosition: "0 0"
    }}>
      {/* God Animation Background - Moved to root level */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Central Glowing Orb - Optimized with gradient instead of blur for mobile performance */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-pulse-glow ${isDark ? 'opacity-30' : 'opacity-40'}`}
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
            willChange: 'transform, opacity'
          }}
        ></div>
        
        {/* Rotating Rings */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-spin-slow" viewBox="0 0 600 600">
          <circle 
            cx="300" 
            cy="300" 
            r="299" 
            fill="none" 
            className={isDark ? 'stroke-blue-500/20' : 'stroke-blue-600/40'} 
            strokeWidth="1" 
            strokeDasharray="15 45" 
          />
        </svg>
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] animate-spin-reverse-slow" viewBox="0 0 400 400">
          <circle 
            cx="200" 
            cy="200" 
            r="199" 
            fill="none" 
            className={isDark ? 'stroke-blue-400/20' : 'stroke-blue-500/40'} 
            strokeWidth="1" 
            strokeDasharray="4 24" 
          />
        </svg>
        
        {/* Floating Geometric Shapes */}
        <div className={`absolute top-1/4 left-1/4 w-16 h-16 border ${isDark ? 'border-blue-500/10' : 'border-blue-600/30'} rotate-45 animate-float`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-24 h-24 border ${isDark ? 'border-blue-500/10' : 'border-blue-600/30'} rounded-full animate-float`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/3 right-1/3 w-8 h-8 bg-blue-500/10 rotate-12 animate-float`} style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className={`py-12 px-8 relative z-10 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="flex-1">
            <h1
              className="text-6xl font-black tracking-widest"
              style={{
                fontFamily: "'Departure Mono', 'Courier New', monospace",
                letterSpacing: "0.15em",
                lineHeight: "1",
                fontSize: "2.5rem"
              }}
            >
              gistify
            </h1>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button
              onClick={toggleTheme}
              className={`px-3 py-2 text-xs font-mono border-2 ${borderColor} ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-all select-none`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️ LIGHT" : "🌙 DARK"}
            </button>
          </div>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-8 py-20 relative transition-colors duration-300 overflow-hidden">
        {/* Decorative elements (Original) */}
        <div className={`absolute top-20 left-10 w-32 h-32 border ${circleColor} rounded-full ${circleBg} transition-all duration-300`}></div>
        <div className={`absolute bottom-32 right-20 w-48 h-48 border ${circleColor} rounded-full ${isDark ? 'opacity-5' : 'opacity-15'} transition-all duration-300`}></div>
        
        <div className="w-full max-w-2xl relative z-10">
          <div className="mb-8 text-center">
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-mono tracking-widest mb-6 transition-colors duration-300`}>SEARCH THE MANUAL</p>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="https://..."
              className={`flex-1 px-4 py-3 text-sm font-mono border-2 ${inputBorder} ${inputBg} bg-opacity-80 focus:bg-opacity-100 focus:outline-none transition-all`}
            />
            <button
              type="submit"
              className={`px-6 py-3 text-sm font-mono border-2 ${borderColor} ${isDark ? 'bg-gray-900 hover:bg-gray-800 hover:border-blue-500' : 'bg-white hover:bg-blue-50 hover:border-blue-400'} ${textColor} focus:outline-none transition-all select-none`}
            >
              tl;dr
            </button>
          </form>
          
          <div className="text-center">
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} font-mono transition-colors duration-300`}>explore topics • learn concepts • discover patterns</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-8 relative text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} font-mono transition-colors duration-300`}>
        <p>gistify</p>
      </footer>
    </main>
  )
}
