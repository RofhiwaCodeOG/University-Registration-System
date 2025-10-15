"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Check, AlertTriangle, Users } from "lucide-react"

interface StepTwoProps {
  formData: {
    selectedCourses: string[]
  }
  updateFormData: (data: Partial<StepTwoProps["formData"]>) => void
}

const AVAILABLE_COURSES = [
  { id: "CS101", name: "Introduction to Computer Science", credits: 15, seats: 45, total: 50, prerequisites: [] },
  { id: "CS201", name: "Data Structures and Algorithms", credits: 15, seats: 12, total: 40, prerequisites: ["CS101"] },
  { id: "CS301", name: "Database Management Systems", credits: 15, seats: 28, total: 35, prerequisites: ["CS101"] },
  { id: "MTH101", name: "Calculus I", credits: 15, seats: 60, total: 80, prerequisites: [] },
  { id: "MTH201", name: "Linear Algebra", credits: 15, seats: 5, total: 40, prerequisites: ["MTH101"] },
  { id: "ENG101", name: "Academic English", credits: 10, seats: 0, total: 50, prerequisites: [] },
]

export function StepTwo({ formData, updateFormData }: StepTwoProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = AVAILABLE_COURSES.filter(
    (course) =>
      course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleCourse = (courseId: string) => {
    const isSelected = formData.selectedCourses.includes(courseId)
    const newSelection = isSelected
      ? formData.selectedCourses.filter((id) => id !== courseId)
      : [...formData.selectedCourses, courseId]
    updateFormData({ selectedCourses: newSelection })
  }

  const totalCredits = formData.selectedCourses.reduce((sum, courseId) => {
    const course = AVAILABLE_COURSES.find((c) => c.id === courseId)
    return sum + (course?.credits || 0)
  }, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Courses</h2>
        <p className="text-foreground-muted leading-relaxed">
          Choose the modules you want to register for. You can select up to 75 credits per semester.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted">Selected Courses</p>
            <p className="text-2xl font-bold text-foreground">{formData.selectedCourses.length}</p>
          </div>
          <div>
            <p className="text-sm text-foreground-muted">Total Credits</p>
            <p className="text-2xl font-bold text-foreground">{totalCredits} / 75</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
        <Input
          type="search"
          placeholder="Search courses by code or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          aria-label="Search courses"
        />
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {filteredCourses.map((course) => {
          const isSelected = formData.selectedCourses.includes(course.id)
          const isFull = course.seats === 0
          const isLowSeats = course.seats > 0 && course.seats <= 10
          const availability = (course.seats / course.total) * 100

          return (
            <div
              key={course.id}
              className={`border rounded-lg p-4 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : isFull
                    ? "border-border bg-surface opacity-60"
                    : "border-border bg-surface-elevated hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{course.id}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {course.credits} Credits
                    </Badge>
                    {isFull && (
                      <Badge variant="destructive" className="text-xs">
                        Full
                      </Badge>
                    )}
                    {isLowSeats && (
                      <Badge variant="outline" className="text-xs border-warning text-warning">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Limited Seats
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground mb-2">{course.name}</p>
                  <div className="flex items-center gap-4 text-xs text-foreground-muted">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>
                        {course.seats} of {course.total} seats available
                      </span>
                    </div>
                    {course.prerequisites.length > 0 && <span>Prerequisites: {course.prerequisites.join(", ")}</span>}
                  </div>
                  {/* Availability bar */}
                  <div className="mt-2 h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        availability > 50 ? "bg-success" : availability > 20 ? "bg-warning" : "bg-error"
                      }`}
                      style={{ width: `${availability}%` }}
                    />
                  </div>
                </div>
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCourse(course.id)}
                  disabled={isFull && !isSelected}
                  aria-label={isSelected ? `Remove ${course.id}` : `Add ${course.id}`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-foreground-muted">No courses found matching your search.</p>
        </div>
      )}
    </div>
  )
}
