'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function AddData() {
  const [data, setData] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Submitting data:', data)
    toast({
      title: "Data submitted successfully",
      description: "Your training data has been added to the AI assistant.",
    })
    setData('')
  }

  return (
    <section id="add-data" className="py-20">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8">Add Training Data</h2>
        <p className="text-center mb-6 text-muted-foreground">
          Help improve our AI by adding your database-related queries, problems, or scenarios.
        </p>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter your database-related scenarios, queries, or problems here..."
            className="mb-4"
            rows={6}
          />
          <Button type="submit" className="w-full">Submit Training Data</Button>
        </form>
      </div>
    </section>
  )
}

