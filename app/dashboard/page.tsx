"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getStudentSession, logout } from "@/lib/auth"
import { FileText, User, LogOut, Plus, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])

  useEffect(() => {
    const session = getStudentSession()
    if (!session) {
      router.push("/login")
      return
    }
    setStudent(session)

    // Fetch student applications (mock data for now)
    setApplications([
      {
        id: "1",
        application_type: "undergraduate",
        academic_year: 2025,
        semester: "first",
        status: "submitted",
        submitted_at: "2025-01-10",
        first_choice_program: "Computer Science",
      },
    ])
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/images/logo.png" alt="VUT" width={60} height={60} className="object-contain" />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-foreground">VUT iEnabler</h1>
                <p className="text-sm text-foreground-muted">Student Dashboard</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome back, {student.first_name} {student.last_name}
          </h2>
          <p className="text-foreground-muted">Student Number: {student.student_number}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push("/dashboard/new-application")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="w-5 h-5 text-primary" />
                New Application
              </CardTitle>
              <CardDescription>Start a new course registration</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push("/dashboard/profile")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                My Profile
              </CardTitle>
              <CardDescription>View and update your information</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-primary" />
                Documents
              </CardTitle>
              <CardDescription>Manage your uploaded documents</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Applications Section */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {applications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-foreground-muted" />
                    <p className="text-foreground-muted mb-4">No applications yet</p>
                    <Button onClick={() => router.push("/dashboard/new-application")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Application
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                applications.map((app) => (
                  <Card key={app.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{app.first_choice_program}</CardTitle>
                          <CardDescription>
                            {app.application_type} - {app.academic_year} ({app.semester} semester)
                          </CardDescription>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-foreground-muted">Submitted: {app.submitted_at}</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/application/${app.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-foreground-muted">No draft applications</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submitted">
            <div className="space-y-4">
              {applications
                .filter((app) => app.status === "submitted")
                .map((app) => (
                  <Card key={app.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{app.first_choice_program}</CardTitle>
                      <CardDescription>Submitted: {app.submitted_at}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-foreground-muted">No approved applications</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    draft: { label: "Draft", icon: Clock, className: "bg-warning-bg text-warning border-warning" },
    submitted: { label: "Submitted", icon: Clock, className: "bg-info-bg text-info border-info" },
    under_review: { label: "Under Review", icon: Clock, className: "bg-info-bg text-info border-info" },
    approved: { label: "Approved", icon: CheckCircle, className: "bg-success-bg text-success border-success" },
    rejected: { label: "Rejected", icon: XCircle, className: "bg-error-bg text-error border-error" },
  }

  const { label, icon: Icon, className } = config[status as keyof typeof config] || config.draft

  return (
    <Badge variant="outline" className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  )
}
