"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Calendar, Clock } from "lucide-react"

interface StepThreeProps {
  formData: {
    selectedCourses: string[]
  }
}

const COURSE_DETAILS = {
  CS101: { name: "Introduction to Computer Science", credits: 15, schedule: "Mon/Wed 09:00-11:00" },
  CS201: { name: "Data Structures and Algorithms", credits: 15, schedule: "Tue/Thu 14:00-16:00" },
  CS301: { name: "Database Management Systems", credits: 15, schedule: "Mon/Wed 14:00-16:00" },
  MTH101: { name: "Calculus I", credits: 15, schedule: "Tue/Thu 09:00-11:00" },
  MTH201: { name: "Linear Algebra", credits: 15, schedule: "Wed/Fri 11:00-13:00" },
  ENG101: { name: "Academic English", credits: 10, schedule: "Fri 09:00-11:00" },
}

export function StepThree({ formData }: StepThreeProps) {
  const selectedCourseDetails = formData.selectedCourses.map((id) => ({
    id,
    ...COURSE_DETAILS[id as keyof typeof COURSE_DETAILS],
  }))

  const totalCredits = selectedCourseDetails.reduce((sum, course) => sum + course.credits, 0)

  // Simple conflict detection (checking if same day/time)
  const hasConflicts = false // Simplified for demo

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Schedule</h2>
        <p className="text-foreground-muted leading-relaxed">
          Check your course selection and timetable for any conflicts before proceeding to payment.
        </p>
      </div>

      {/* Status Alert */}
      {hasConflicts ? (
        <div className="bg-error-bg border border-error/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Timetable Conflict Detected</p>
            <p className="text-sm text-foreground-muted">
              Some of your selected courses have overlapping schedules. Please review and adjust your selection.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-success-bg border border-success/20 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">No Conflicts Found</p>
            <p className="text-sm text-foreground-muted">
              Your timetable looks good! All courses fit without overlapping schedules.
            </p>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-sm text-foreground-muted mb-1">Total Courses</p>
          <p className="text-3xl font-bold text-foreground">{formData.selectedCourses.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <p className="text-sm text-foreground-muted mb-1">Total Credits</p>
          <p className="text-3xl font-bold text-foreground">{totalCredits}</p>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Selected Courses</h3>
        {selectedCourseDetails.map((course) => (
          <div key={course.id} className="bg-surface-elevated border border-border rounded-lg p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{course.id}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {course.credits} Credits
                  </Badge>
                </div>
                <p className="text-sm text-foreground-muted">{course.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-foreground-muted">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{course.schedule.split(" ")[0]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.schedule.split(" ")[1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {formData.selectedCourses.length === 0 && (
        <div className="text-center py-12 bg-surface rounded-lg border border-border">
          <p className="text-foreground-muted">No courses selected yet. Go back to select your courses.</p>
        </div>
      )}

      {/* Fee Breakdown */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Fee Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground-muted">Tuition Fees ({totalCredits} credits)</span>
            <span className="text-foreground font-medium">R {(totalCredits * 850).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground-muted">Registration Fee</span>
            <span className="text-foreground font-medium">R 1,500</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground-muted">Student Services</span>
            <span className="text-foreground font-medium">R 850</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total Amount Due</span>
              <span className="font-bold text-lg text-foreground">
                R {(totalCredits * 850 + 1500 + 850).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
