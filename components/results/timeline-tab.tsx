"use client"

interface TimelineItem {
  id: number
  title: string
  description: string
  date?: string
}

interface TimelineTabProps {
  items?: TimelineItem[]
}

const defaultItems: TimelineItem[] = [
  { id: 1, title: "Key point 1", description: "Key point 1 extracted from the content will be displayed here." },
  { id: 2, title: "Key point 2", description: "Key point 2 extracted from the content will be displayed here." },
  { id: 3, title: "Key point 3", description: "Key point 3 extracted from the content will be displayed here." },
]

export default function TimelineTab({ items = defaultItems }: TimelineTabProps) {
  return (
    <div className="h-full">
      <div className="border-2 border-gray-200 dark:border-gray-800 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3 text-sm font-mono text-gray-600 dark:text-gray-400">
              <span className="text-blue-500 mt-0.5">→</span>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
