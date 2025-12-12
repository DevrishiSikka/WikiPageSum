"use client"

interface RelatedTabProps {
  topics?: string[]
}

const defaultTopics = ["Technology", "Design", "Development", "AI"]

export default function RelatedTab({ topics = defaultTopics }: RelatedTabProps) {
  return (
    <div className="h-full">
      <div className="border-2 border-gray-200 dark:border-gray-800 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full">
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span key={topic} className="px-3 py-1 text-xs font-mono border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-colors">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
