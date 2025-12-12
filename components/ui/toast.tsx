"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface Toast {
  id: string
  message: string
  type?: "success" | "error" | "info"
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastItemProps {
  toast: Toast
  onClose: (id: string) => void
  isClosing: boolean
}

function ToastItem({ toast, onClose, isClosing }: ToastItemProps) {
  const iconColor = toast.type === "error" ? "text-red-500" : toast.type === "info" ? "text-gray-500" : "text-blue-500"
  
  return (
    <div className={`relative flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden ${isClosing ? 'animate-slide-up' : 'animate-slide-down'}`}>
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
      
      <div className="w-3 h-3 flex items-center justify-center">
        {toast.type === "error" ? (
          <svg className={`w-2.5 h-2.5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : toast.type === "info" ? (
          <svg className={`w-2.5 h-2.5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className={`w-2.5 h-2.5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path className="animate-draw-check" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-xs font-mono text-black dark:text-white">{toast.message}</span>
      <button 
        onClick={() => onClose(toast.id)}
        className="ml-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [closingIds, setClosingIds] = useState<Set<string>>(new Set())

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setClosingIds((prev) => new Set(prev).add(id))
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
        setClosingIds((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }, 300)
    }, 4000)
  }, [])

  const closeToast = useCallback((id: string) => {
    setClosingIds((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      setClosingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 300)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="fixed top-6 inset-x-0 z-50 flex flex-col items-center gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem 
                toast={toast} 
                onClose={closeToast} 
                isClosing={closingIds.has(toast.id)} 
              />
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}
