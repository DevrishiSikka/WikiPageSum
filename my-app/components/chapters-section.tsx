"use client"

import { ChevronRight } from "lucide-react"

const topics = [
  {
    name: "Pixels & Color",
    chapters: [
      "How does a screen work?",
      "What is a color space?",
      "Color contrast basics",
      "Blending modes explained",
    ],
  },
  {
    name: "Vectors & Fonts",
    chapters: [
      "Drawing curves with bezier",
      "How to make a font",
      "Rasterization and anti-aliasing",
      "Scalable vector graphics",
    ],
  },
  {
    name: "3D & Graphics",
    chapters: ["How does a GPU work?", "Shaders fundamentals", "Ray tracing and SDFs", "3D projection techniques"],
  },
  {
    name: "Web & Networks",
    chapters: ["How the internet works", "HTTP and protocols", "DNS and domain names", "Web browsers explained"],
  },
]

export default function ChaptersSection() {
  return (
    <section id="chapters" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All Topics</h2>
          <p className="text-muted-foreground">Explore our comprehensive collection of technical deep-dives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic) => (
            <div key={topic.name} className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                {topic.name}
                <ChevronRight className="w-4 h-4 text-primary" />
              </h3>

              <ul className="space-y-3">
                {topic.chapters.map((chapter) => (
                  <li key={chapter} className="flex items-start gap-3 group cursor-pointer">
                    <span className="text-primary font-semibold text-sm mt-0.5">→</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {chapter}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
