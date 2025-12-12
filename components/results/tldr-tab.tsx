"use client"

interface TLDRTabProps {
  content?: string
}

export default function TLDRTab({ content }: TLDRTabProps) {
  return (
    <div className="h-full">
      <div className="border-2 border-gray-200 dark:border-gray-800 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-full">
        <p className="text-sm font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
          {content || "This is where the summarized content will appear. The AI will analyze the provided URL and generate a concise summary of the key points and information found on the page."}
        </p>
      </div>
    </div>
  )
}
