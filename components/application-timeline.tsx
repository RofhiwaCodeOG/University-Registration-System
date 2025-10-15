"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, FileText, Eye } from "lucide-react"

interface TimelineEvent {
  id: string
  action: string
  status: string
  timestamp: string
  performedBy: string
  notes?: string
}

interface ApplicationTimelineProps {
  events: TimelineEvent[]
}

export function ApplicationTimeline({ events }: ApplicationTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <TimelineItem key={event.id} event={event} isLast={index === events.length - 1} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  const iconConfig = {
    created: { icon: FileText, color: "text-foreground-muted" },
    submitted: { icon: CheckCircle, color: "text-info" },
    under_review: { icon: Eye, color: "text-info" },
    approved: { icon: CheckCircle, color: "text-success" },
    rejected: { icon: XCircle, color: "text-error" },
    updated: { icon: Clock, color: "text-warning" },
  }

  const config = iconConfig[event.action as keyof typeof iconConfig] || iconConfig.created
  const Icon = config.icon

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full bg-surface border-2 flex items-center justify-center ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-foreground capitalize">{event.action.replace(/_/g, " ")}</p>
          <Badge variant="outline" className="text-xs">
            {event.status}
          </Badge>
        </div>
        <p className="text-sm text-foreground-muted mb-1">{event.timestamp}</p>
        <p className="text-sm text-foreground-muted">By: {event.performedBy}</p>
        {event.notes && <p className="text-sm text-foreground mt-2 p-3 bg-surface rounded-lg">{event.notes}</p>}
      </div>
    </div>
  )
}
