"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-medium text-primary mb-4">Learn the fundamentals</p>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
          Understanding how technology really works
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Deep dive into the concepts behind the tools you use every day. From graphics to networking, from AI to
          cryptography.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Start Learning
          </Button>
          <Button size="lg" variant="outline">
            View Curriculum
          </Button>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Chapters</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">12</div>
            <div className="text-sm text-muted-foreground">Topics</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">150k</div>
            <div className="text-sm text-muted-foreground">Learners</div>
          </div>
        </div>
      </div>
    </section>
  )
}
