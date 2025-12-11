"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Is this content written by AI?",
    answer:
      "No, all content is carefully written and researched by experienced engineers and technical writers with decades of combined experience in the field.",
  },
  {
    question: "Will there be a physical book?",
    answer:
      "Yes! Once the digital version is complete, we plan to release a beautifully designed physical edition. Early supporters will get priority access.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We offer a free tier with selected chapters, plus premium access starting at $19/month for full curriculum access.",
  },
  {
    question: "Do I need a technical background?",
    answer:
      "Not at all. We designed this for curious minds of all levels. Complex concepts are explained with illustrations and simple language.",
  },
  {
    question: "Can I download the content?",
    answer: "Premium subscribers can download chapters as PDFs for offline reading and reference.",
  },
  {
    question: "Is there a community?",
    answer:
      "Yes, we have an active Discord community where learners discuss concepts, share projects, and help each other.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions?</h2>
          <p className="text-muted-foreground">Find answers to common questions</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left"
            >
              <div className="border border-border rounded-lg p-4 md:p-6 hover:border-primary transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-sm md:text-base pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openIndex === index && (
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
