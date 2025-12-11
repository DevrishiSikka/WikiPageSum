"use client"

import type React from "react"

export default function GodBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Central Glowing Orb - Optimized with gradient instead of blur for mobile performance */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-pulse-glow opacity-40 dark:opacity-50"
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
          className="stroke-blue-600/40 dark:stroke-blue-400/50" 
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
          className="stroke-blue-500/40 dark:stroke-blue-300/40" 
          strokeWidth="1" 
          strokeDasharray="4 24" 
        />
      </svg>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-blue-600/30 dark:border-blue-400/30 rotate-45 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-blue-600/30 dark:border-blue-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-500/10 dark:bg-blue-400/20 rotate-12 animate-float" style={{ animationDelay: '4s' }}></div>
    </div>
  )
}
