"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getStudentSession } from "@/lib/auth"
import { ApplicationTimeline } from "@/components/application-timeline"
import { StatusTracker } from "@/components/status-tracker"
import { ArrowLeft, Download, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function ApplicationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [student, setStudent] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)

  useEffect(() => {
    const session = getStudentSession()
    if (!session) {
      router.push("/login")
      return
    }
    setStudent(session)

    // Fetch application details (mock data)
    setApplication({
      id: params.id,
      application_type: "undergraduate",
      academic_year: 2025,
      semester: "first",
      first_choice_program: "Computer Science",
      second_choice_program: "Information Technology",
      status: "under_review",
      submitted_at: "2025-01-10T10:30:00",
      reviewed_at: "2025-01-12T14:20:00",
      admin_notes: "Application is being reviewed. All documents are in order.",
      timeline: [
        {
          id: "1",
          action: "created",
          status: "draft",
          timestamp: "2025-01-09 09:00 AM",
          performedBy: "Student",
        },
        {
          id: "2",
          action: "submitted",
          status: "submitted",
          timestamp: "2025-01-10 10:30 AM",
          performedBy: "Student",
          notes: "Application submitted successfully",
        },
        {
          id: "3",
          action: "under_review",
          status: "under_review",
          timestamp: "2025-01-12 02:20 PM",
          performedBy: "Admin: Dr. Smith",
          notes: "Application assigned for review. All documents verified.",
        },
      ],
    })
  }, [router, params.id])

  if (!student || !application) {
    return <div>Loading...</div>
  }

  const statusConfig = {
    draft: {
      alert: "warning",
      icon: AlertCircle,
      message: "Your application is in draft. Complete and submit it to begin the review process.",
    },
    submitted: {
      alert: "info",
      icon: AlertCircle,
      message: "Your application has been submitted and is waiting for review.",
    },
    under_review: {
      alert: "info",
      icon: AlertCircle,
      message: "Your application is currently being reviewed by our admissions team.",
    },
    approved: {
      alert: "success",
      icon: CheckCircle,
      message: "Congratulations! Your application has been approved.",
    },
    rejected: {
      alert: "error",
      icon: XCircle,
      message: "Unfortunately, your application was not approved at this time.",
    },
  }

  const currentStatusConfig = statusConfig[application.status as keyof typeof statusConfig]
  const StatusIcon = currentStatusConfig.icon

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <Image src="/images/logo.png" alt="VUT" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Application Details</h1>
              <p className="text-sm text-foreground-muted">Application ID: {application.id}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Status Alert */}
          <Alert className={`bg-${currentStatusConfig.alert}-bg border-${currentStatusConfig.alert}`}>
            <StatusIcon className={`h-4 w-4 text-${currentStatusConfig.alert}`} />
            <AlertDescription className={`text-${currentStatusConfig.alert}`}>
              {currentStatusConfig.message}
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Application Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Application Summary</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        application.status === "approved"
                          ? "bg-success-bg text-success border-success"
                          : application.status === "rejected"
                            ? "bg-error-bg text-error border-error"
                            : "bg-info-bg text-info border-info"
                      }
                    >
                      {application.status.replace(/_/g, " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground-muted">Application Type</p>
                      <p className="font-medium capitalize">{application.application_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Academic Year</p>
                      <p className="font-medium">{application.academic_year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Semester</p>
                      <p className="font-medium capitalize">{application.semester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-muted">Submitted</p>
                      <p className="font-medium">{new Date(application.submitted_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-foreground-muted mb-2">Program Choices</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-surface rounded-lg">
                        <p className="text-xs text-foreground-muted">First Choice</p>
                        <p className="font-medium">{application.first_choice_program}</p>
                      </div>
                      <div className="p-3 bg-surface rounded-lg">
                        <p className="text-xs text-foreground-muted">Second Choice</p>
                        <p className="font-medium">{application.second_choice_program}</p>
                      </div>
                    </div>
                  </div>

                  {application.admin_notes && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-foreground-muted mb-2">Admin Notes</p>
                        <div className="p-3 bg-info-bg border border-info rounded-lg">
                          <p className="text-sm text-info">{application.admin_notes}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <ApplicationTimeline events={application.timeline} />

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Application
                  </Button>
                  {application.status === "draft" && <Button className="flex-1">Continue Editing</Button>}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Status Tracker */}
              <StatusTracker currentStatus={application.status} />

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-foreground-muted">
                    If you have questions about your application status, please contact our admissions office.
                  </p>
                  <Separator />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-foreground-muted">admissions@vut.ac.za</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-foreground-muted">016 950 9000</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
