"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle } from "lucide-react"

interface StatusStep {
  id: string
  label: string
  completed: boolean
  current: boolean
}

interface StatusTrackerProps {
  currentStatus: string
}

export function StatusTracker({ currentStatus }: StatusTrackerProps) {
  const steps: StatusStep[] = [
    {
      id: "draft",
      label: "Draft Created",
      completed: true,
      current: false,
    },
    {
      id: "submitted",
      label: "Submitted",
      completed: ["submitted", "under_review", "approved", "rejected"].includes(currentStatus),
      current: currentStatus === "submitted",
    },
    {
      id: "under_review",
      label: "Under Review",
      completed: ["under_review", "approved", "rejected"].includes(currentStatus),
      current: currentStatus === "under_review",
    },
    {
      id: "decision",
      label: "Decision Made",
      completed: ["approved", "rejected"].includes(currentStatus),
      current: ["approved", "rejected"].includes(currentStatus),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                {step.completed ? (
                  <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      step.current ? "border-primary bg-primary/10" : "border-border bg-surface"
                    }`}
                  >
                    <Circle className={`w-4 h-4 ${step.current ? "text-primary" : "text-foreground-muted"}`} />
                  </div>
                )}
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-12 ${step.completed ? "bg-success" : "bg-border"}`} />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className={`font-medium ${step.current ? "text-primary" : "text-foreground"}`}>{step.label}</p>
                {step.current && <p className="text-sm text-foreground-muted mt-1">Current stage</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
