"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAdminSession, logout } from "@/lib/auth"
import { Search, LogOut, FileText, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const session = getAdminSession()
    if (!session) {
      router.push("/login")
      return
    }
    setAdmin(session)

    // Fetch applications (mock data for now)
    setApplications([
      {
        id: "1",
        student_number: "220123456",
        student_name: "John Doe",
        application_type: "undergraduate",
        first_choice_program: "Computer Science",
        status: "submitted",
        submitted_at: "2025-01-10",
      },
      {
        id: "2",
        student_number: "220123457",
        student_name: "Jane Smith",
        application_type: "undergraduate",
        first_choice_program: "Electrical Engineering",
        status: "under_review",
        submitted_at: "2025-01-09",
      },
      {
        id: "3",
        student_number: "220123458",
        student_name: "Mike Johnson",
        application_type: "postgraduate",
        first_choice_program: "Business Administration",
        status: "approved",
        submitted_at: "2025-01-08",
      },
    ])
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.student_number.includes(searchQuery) ||
      app.first_choice_program.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "submitted").length,
    under_review: applications.filter((a) => a.status === "under_review").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }

  if (!admin) {
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
                <h1 className="text-lg md:text-xl font-bold text-foreground">VUT iEnabler Admin</h1>
                <p className="text-sm text-foreground-muted">Application Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{admin.full_name}</p>
                <p className="text-xs text-foreground-muted capitalize">{admin.role}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard title="Total Applications" value={stats.total} icon={FileText} color="primary" />
          <StatCard title="Pending Review" value={stats.pending} icon={Clock} color="warning" />
          <StatCard title="Under Review" value={stats.under_review} icon={AlertCircle} color="info" />
          <StatCard title="Approved" value={stats.approved} icon={CheckCircle} color="success" />
          <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="error" />
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Application Management</CardTitle>
            <CardDescription>Review and manage student applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                <Input
                  placeholder="Search by student name, number, or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All ({filteredApplications.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="review">Under Review ({stats.under_review})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onReview={() => router.push(`/admin/review/${app.id}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-4">
              {filteredApplications
                .filter((app) => app.status === "submitted")
                .map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onReview={() => router.push(`/admin/review/${app.id}`)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="review">
            <div className="space-y-4">
              {filteredApplications
                .filter((app) => app.status === "under_review")
                .map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onReview={() => router.push(`/admin/review/${app.id}`)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <div className="space-y-4">
              {filteredApplications
                .filter((app) => app.status === "approved")
                .map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onReview={() => router.push(`/admin/review/${app.id}`)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-4">
              {filteredApplications
                .filter((app) => app.status === "rejected")
                .map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onReview={() => router.push(`/admin/review/${app.id}`)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string
  value: number
  icon: any
  color: string
}) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning-bg text-warning",
    info: "bg-info-bg text-info",
    success: "bg-success-bg text-success",
    error: "bg-error-bg text-error",
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-foreground-muted">{title}</p>
      </CardContent>
    </Card>
  )
}

function ApplicationCard({ application, onReview }: { application: any; onReview: () => void }) {
  const statusConfig = {
    submitted: { label: "Submitted", className: "bg-warning-bg text-warning border-warning" },
    under_review: { label: "Under Review", className: "bg-info-bg text-info border-info" },
    approved: { label: "Approved", className: "bg-success-bg text-success border-success" },
    rejected: { label: "Rejected", className: "bg-error-bg text-error border-error" },
  }

  const status = statusConfig[application.status as keyof typeof statusConfig]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{application.student_name}</CardTitle>
            <CardDescription>
              Student #: {application.student_number} | {application.first_choice_program}
            </CardDescription>
          </div>
          <Badge variant="outline" className={status.className}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-foreground-muted">
            <p>Type: {application.application_type}</p>
            <p>Submitted: {application.submitted_at}</p>
          </div>
          <Button onClick={onReview}>Review Application</Button>
        </div>
      </CardContent>
    </Card>
  )
}
