"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail("")
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-8">
          Get notified when new chapters are released and receive exclusive insights from our team.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-secondary border-border"
          />
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
            {submitted ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">We respect your inbox. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
