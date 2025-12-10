"use client"

import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">TC</span>
          </div>
          <span className="font-semibold text-lg">TechCore</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#courses" className="text-sm hover:text-primary transition-colors">
            Courses
          </a>
          <a href="#chapters" className="text-sm hover:text-primary transition-colors">
            Learn
          </a>
          <a href="#faq" className="text-sm hover:text-primary transition-colors">
            FAQ
          </a>
        </nav>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
      </div>
    </header>
  )
}
