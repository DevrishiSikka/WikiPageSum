"use client"

import { Card } from "@/components/ui/card"

const courses = [
  {
    id: 1,
    title: "Graphics & Rendering",
    description: "Learn how screens display images, color spaces, and the magic behind GPUs",
    chapters: 8,
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Web Fundamentals",
    description: "Understand networking, protocols, browsers, and how the internet works",
    chapters: 7,
    level: "Beginner",
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    description: "Explore neural networks, transformers, embeddings, and how AI learns",
    chapters: 6,
    level: "Advanced",
  },
  {
    id: 4,
    title: "Data & Security",
    description: "Dive into cryptography, compression, binary, and data storage",
    chapters: 9,
    level: "Intermediate",
  },
]

export default function Courses() {
  return (
    <section id="courses" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Curriculum</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master the concepts that power modern software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="p-6 border border-border hover:border-primary transition-colors cursor-pointer"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm">{course.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{course.chapters} chapters</span>
                  <span>•</span>
                  <span>{course.level}</span>
                </div>
                <span className="text-primary text-sm font-medium">→</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
