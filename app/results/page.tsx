"use client"

import type React from "react"
import { useState, useEffect, useRef, Suspense } from "react"
import { flushSync } from "react-dom"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import TLDRTab from "@/components/results/tldr-tab"
import TimelineTab from "@/components/results/timeline-tab"
import RelatedTab from "@/components/results/related-tab"

// Mock past chats data
const pastChats = [
  { id: 1, title: "React Documentation", url: "https://react.dev", date: "Today" },
  { id: 2, title: "Next.js App Router", url: "https://nextjs.org/docs", date: "Today" },
  { id: 3, title: "Tailwind CSS Guide", url: "https://tailwindcss.com", date: "Yesterday" },
  { id: 4, title: "TypeScript Handbook", url: "https://typescriptlang.org", date: "Yesterday" },
  { id: 5, title: "MDN Web Docs", url: "https://developer.mozilla.org", date: "Dec 10" },
]

function ResultsContent() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"TL;DR" | "Timeline">("TL;DR")
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const searchParams = useSearchParams()
  const url = searchParams.get("url") || ""

  useEffect(() => {
    setMounted(true)
    // Simulate loading content
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Update indicator position when active tab changes
  useEffect(() => {
    const tabs = ["TL;DR", "Timeline"] as const
    const activeIndex = tabs.indexOf(activeTab)
    const activeTabEl = tabsRef.current[activeIndex]
    if (activeTabEl) {
      setIndicatorStyle({
        width: activeTabEl.offsetWidth,
        left: activeTabEl.offsetLeft,
      })
    }
  }, [activeTab, mounted])

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

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <main className="bg-white dark:bg-gray-950 text-black dark:text-white h-screen flex flex-col relative transition-colors duration-300 overflow-hidden" style={{
      backgroundImage: `radial-gradient(circle, var(--grid-color) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
      backgroundPosition: "0 0"
    }}>

      {/* Header */}
      <header className="py-2 px-4 md:px-6 relative z-10 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1
              className="text-sm font-black tracking-widest font-heading hover:opacity-70 transition-opacity cursor-pointer"
              style={{
                letterSpacing: "0.05em",
                lineHeight: "1",
              }}
            >
              gistify
            </h1>
          </Link>
          <div className="flex gap-2">
            <Link href="/search">
              <button
                className="px-2 py-1 text-[10px] font-mono border border-gray-300 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all select-none"
              >
                ← BACK
              </button>
            </Link>
            <button
              onClick={toggleTheme}
              className="px-2 py-1 text-[10px] font-mono border border-gray-300 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all select-none"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 px-4 md:px-6 py-3 relative z-10 overflow-hidden">
        <div className="h-full flex gap-4">
          
          {/* Left Sidebar - Past Chats */}
          <aside className="w-64 flex-shrink-0 hidden md:block h-full">
            <div className="border-2 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full flex flex-col">
              <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 tracking-widest">HISTORY</p>
              </div>
              <div className="overflow-y-auto flex-1">
                {pastChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full text-left p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative ${
                      selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    {selectedChat === chat.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    )}
                    <p className="text-sm font-mono text-black dark:text-white truncate">{chat.title}</p>
                    <p className="text-xs font-mono text-gray-400 dark:text-gray-500 truncate mt-1">{chat.url}</p>
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 mt-1">{chat.date}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
            {/* URL being processed */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-1">PROCESSING</p>
              <p className="text-sm font-mono text-blue-500 dark:text-blue-400 break-all truncate">{url}</p>
            </div>

            {/* Related Articles - Always visible horizontal row */}
            <div className="mb-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono whitespace-nowrap">SEE ALSO →</span>
              <div className="flex gap-3">
                {[
                  { title: "Getting Started Guide", url: "#" },
                  { title: "API Reference", url: "#" },
                  { title: "Best Practices", url: "#" },
                  { title: "Tutorials", url: "#" },
                ].map((article) => (
                  <a
                    key={article.title}
                    href={article.url}
                    className="text-xs font-mono text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-blue-400 transition-all whitespace-nowrap"
                  >
                    {article.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="relative flex gap-0 mb-4 border-b-2 border-gray-200 dark:border-gray-800">
              {(["TL;DR", "Timeline"] as const).map((tab, index) => (
                <button
                  key={tab}
                  ref={(el) => { tabsRef.current[index] = el }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-sm font-mono transition-colors duration-300 relative z-10 ${
                    activeTab === tab
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
              {/* Sliding underline indicator */}
              <span 
                className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{
                  width: `${indicatorStyle.width}px`,
                  left: `${indicatorStyle.left}px`,
                }}
              />
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                /* Loading Animation */
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-ping absolute inset-0" />
                    <div className="w-16 h-16 rounded-full bg-blue-500/30 animate-pulse relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/50" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-2">
                      Analyzing content...
                    </p>
                    <div className="flex gap-1 justify-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab Content */
                <div className="animate-slide-in h-full">
                  {activeTab === "TL;DR" && <TLDRTab />}
                  {activeTab === "Timeline" && <TimelineTab />}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
