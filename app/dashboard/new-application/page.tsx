"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getStudentSession } from "@/lib/auth"
import { DocumentUpload } from "@/components/document-upload"
import { AutoFillForm } from "@/components/auto-fill-form"

const STEPS = [
  { id: 1, title: "Personal Information", description: "Upload ID and verify details" },
  { id: 2, title: "Guardian Information", description: "Upload guardian ID and contact details" },
  { id: 3, title: "Academic Records", description: "Upload matric certificate and results" },
  { id: 4, title: "Course Selection", description: "Choose your programs" },
  { id: 5, title: "Review & Submit", description: "Review and submit your application" },
]

export default function NewApplicationPage() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [personalData, setPersonalData] = useState({})
  const [guardianData, setGuardianData] = useState({})
  const [academicData, setAcademicData] = useState({})

  useEffect(() => {
    const session = getStudentSession()
    if (!session) {
      router.push("/login")
      return
    }
    setStudent(session)
  }, [router])

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Image src="/images/logo.png" alt="VUT" width={60} height={60} className="object-contain" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground">New Application</h1>
              <p className="text-sm text-foreground-muted">Complete all steps to submit your application</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-surface border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-foreground-muted">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-2">
            <p className="font-medium text-foreground">{STEPS[currentStep - 1].title}</p>
            <p className="text-sm text-foreground-muted">{STEPS[currentStep - 1].description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <DocumentUpload
                documentType="id_document"
                title="Upload ID Document"
                description="Upload a clear copy of your South African ID document"
                studentNumber={student.student_number}
                onUploadComplete={(data) => setPersonalData((prev) => ({ ...prev, ...data }))}
                acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
              />

              <AutoFillForm
                title="Personal Information"
                fields={[
                  { name: "id_number", label: "ID Number", placeholder: "Enter your ID number" },
                  { name: "first_name", label: "First Name", placeholder: "Enter your first name" },
                  { name: "last_name", label: "Last Name", placeholder: "Enter your last name" },
                  { name: "date_of_birth", label: "Date of Birth", type: "date" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "your.email@example.com" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "0XX XXX XXXX" },
                ]}
                extractedData={personalData}
                onChange={setPersonalData}
              />
            </div>
          )}

          {/* Step 2: Guardian Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <DocumentUpload
                documentType="guardian_id"
                title="Upload Guardian ID Document"
                description="Upload a clear copy of your guardian's ID document"
                studentNumber={student.student_number}
                onUploadComplete={(data) => setGuardianData((prev) => ({ ...prev, ...data }))}
                acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
              />

              <AutoFillForm
                title="Guardian Information"
                fields={[
                  { name: "guardian_name", label: "Guardian Full Name", placeholder: "Enter guardian's full name" },
                  {
                    name: "guardian_id_number",
                    label: "Guardian ID Number",
                    placeholder: "Enter guardian's ID number",
                  },
                  { name: "guardian_phone", label: "Guardian Phone Number", type: "tel", placeholder: "0XX XXX XXXX" },
                  { name: "relationship", label: "Relationship", placeholder: "e.g., Mother, Father, Guardian" },
                ]}
                extractedData={guardianData}
                onChange={setGuardianData}
              />
            </div>
          )}

          {/* Step 3: Academic Records */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <DocumentUpload
                documentType="matric_certificate"
                title="Upload Matric Certificate"
                description="Upload your National Senior Certificate (NSC) or equivalent"
                studentNumber={student.student_number}
                onUploadComplete={(data) => setAcademicData((prev) => ({ ...prev, ...data }))}
                acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
              />

              <AutoFillForm
                title="Academic Information"
                fields={[
                  { name: "matric_year", label: "Matric Year", type: "number", placeholder: "e.g., 2023" },
                  { name: "school_name", label: "School Name", placeholder: "Enter your school name" },
                  { name: "average_mark", label: "Average Mark (%)", type: "number", placeholder: "e.g., 75" },
                ]}
                extractedData={academicData}
                onChange={setAcademicData}
              />
            </div>
          )}

          {/* Step 4: Course Selection */}
          {currentStep === 4 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Select Your Programs</h3>
              <p className="text-foreground-muted mb-6">Choose up to 3 program choices in order of preference</p>
              {/* Course selection form would go here */}
              <p className="text-sm text-foreground-muted">Course selection interface coming soon...</p>
            </Card>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Review Your Application</h3>
              <p className="text-foreground-muted mb-6">Please review all information before submitting</p>
              {/* Review summary would go here */}
              <p className="text-sm text-foreground-muted">Application review interface coming soon...</p>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < STEPS.length ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => alert("Application submitted!")}>Submit Application</Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
