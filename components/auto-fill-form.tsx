"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles } from "lucide-react"

interface AutoFillFormProps {
  title: string
  fields: {
    name: string
    label: string
    type?: string
    placeholder?: string
  }[]
  extractedData?: Record<string, any>
  onChange?: (data: Record<string, any>) => void
}

export function AutoFillForm({ title, fields, extractedData, onChange }: AutoFillFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [autoFilled, setAutoFilled] = useState(false)

  useEffect(() => {
    if (extractedData && Object.keys(extractedData).length > 0) {
      setFormData((prev) => ({ ...prev, ...extractedData }))
      setAutoFilled(true)

      // Clear auto-fill notification after 3 seconds
      setTimeout(() => setAutoFilled(false), 3000)
    }
  }, [extractedData])

  const handleChange = (name: string, value: string) => {
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    onChange?.(newData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Upload documents to auto-fill these fields, or enter manually</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {autoFilled && (
          <Alert className="bg-info-bg border-info">
            <Sparkles className="h-4 w-4 text-info" />
            <AlertDescription className="text-info">Fields auto-filled from uploaded document!</AlertDescription>
          </Alert>
        )}

        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={extractedData?.[field.name] ? "border-success focus:border-success" : ""}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
