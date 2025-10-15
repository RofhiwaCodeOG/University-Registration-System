"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAdminSession } from "@/lib/auth"
import { ArrowLeft, CheckCircle, XCircle, FileText, User, GraduationCap, AlertCircle } from "lucide-react"

export default function ReviewApplicationPage() {
  const router = useRouter()
  const params = useParams()
  const [admin, setAdmin] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [notes, setNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const session = getAdminSession()
    if (!session) {
      router.push("/login")
      return
    }
    setAdmin(session)

    // Fetch application details (mock data)
    setApplication({
      id: params.id,
      student_number: "220123456",
      student_name: "John Doe",
      email: "john.doe@student.vut.ac.za",
      phone: "0123456789",
      id_number: "9501015800080",
      date_of_birth: "1995-01-01",
      guardian_name: "Jane Doe",
      guardian_phone: "0987654321",
      matric_year: 2023,
      matric_subjects: [
        { name: "Mathematics", mark: 85 },
        { name: "Physical Sciences", mark: 78 },
        { name: "English", mark: 72 },
      ],
      application_type: "undergraduate",
      first_choice_program: "Computer Science",
      second_choice_program: "Information Technology",
      status: "submitted",
      submitted_at: "2025-01-10",
      documents: {
        id_document: "https://example.com/id.pdf",
        matric_certificate: "https://example.com/matric.pdf",
      },
    })
  }, [router, params.id])

  const handleApprove = async () => {
    setProcessing(true)
    // In production, this would call an API to update the application status
    setTimeout(() => {
      alert("Application approved successfully!")
      router.push("/admin")
    }, 1000)
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }
    setProcessing(true)
    // In production, this would call an API to update the application status
    setTimeout(() => {
      alert("Application rejected")
      router.push("/admin")
    }, 1000)
  }

  if (!admin || !application) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Image src="/images/logo.png" alt="VUT" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Application Review</h1>
              <p className="text-sm text-foreground-muted">Student: {application.student_name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Status Alert */}
          <Alert className="bg-info-bg border-info">
            <AlertCircle className="h-4 w-4 text-info" />
            <AlertDescription className="text-info">
              This application is currently <strong>{application.status}</strong>. Review all information carefully
              before making a decision.
            </AlertDescription>
          </Alert>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <InfoField label="Full Name" value={application.student_name} />
              <InfoField label="Student Number" value={application.student_number} />
              <InfoField label="ID Number" value={application.id_number} />
              <InfoField label="Date of Birth" value={application.date_of_birth} />
              <InfoField label="Email" value={application.email} />
              <InfoField label="Phone" value={application.phone} />
            </CardContent>
          </Card>

          {/* Guardian Information */}
          <Card>
            <CardHeader>
              <CardTitle>Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <InfoField label="Guardian Name" value={application.guardian_name} />
              <InfoField label="Guardian Phone" value={application.guardian_phone} />
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <InfoField label="Matric Year" value={application.matric_year.toString()} />
              </div>
              <Separator className="my-4" />
              <h4 className="font-semibold mb-3">Matric Subjects & Results</h4>
              <div className="space-y-2">
                {application.matric_subjects.map((subject: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <span className="font-medium">{subject.name}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {subject.mark}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Program Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Program Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoField label="Application Type" value={application.application_type} />
              <InfoField label="First Choice" value={application.first_choice_program} />
              <InfoField label="Second Choice" value={application.second_choice_program} />
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(application.documents).map(([key, url]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <span className="capitalize">{key.replace(/_/g, " ")}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={url as string} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Notes</CardTitle>
              <CardDescription>Add any notes or comments about this application</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Decision Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Application Decision</CardTitle>
              <CardDescription>Review the application and make your decision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason (if rejecting)</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Provide a detailed reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-success hover:bg-success/90 text-white"
                  onClick={handleApprove}
                  disabled={processing}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Application
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleReject} disabled={processing}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-foreground-muted text-xs">{label}</Label>
      <p className="font-medium text-foreground mt-1">{value}</p>
    </div>
  )
}
