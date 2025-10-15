"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StepOne } from "@/components/steps/step-one"
import { StepTwo } from "@/components/steps/step-two"
import { StepThree } from "@/components/steps/step-three"
import { StepFour } from "@/components/steps/step-four"

const STEPS = [
  { id: 1, title: "Verify Information", description: "Confirm your details" },
  { id: 2, title: "Select Courses", description: "Choose your modules" },
  { id: 3, title: "Review Schedule", description: "Check for conflicts" },
  { id: 4, title: "Complete Payment", description: "Finalize registration" },
]

export function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    studentNumber: "",
    email: "",
    phone: "",
    selectedCourses: [] as string[],
    paymentMethod: "",
  })

  const progress = (currentStep / STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="font-semibold text-foreground">VUT iEnabler</span>
            </div>
            <Button variant="ghost" size="sm">
              Save & Exit
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">
                Step {currentStep} of {STEPS.length}
              </span>
              <span className="text-foreground-muted">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step Indicator - Desktop */}
        <div className="hidden md:flex items-center justify-between mb-12">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${
                    currentStep > step.id
                      ? "bg-success text-white"
                      : currentStep === step.id
                        ? "bg-primary text-white"
                        : "bg-surface border-2 border-border text-foreground-muted"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                </div>
                <div className="text-center">
                  <p
                    className={`text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-foreground-muted"}`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-foreground-subtle">{step.description}</p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-4 transition-colors ${
                    currentStep > step.id ? "bg-success" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Indicator - Mobile */}
        <div className="md:hidden mb-8">
          <div className="bg-surface-elevated rounded-lg p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {currentStep}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground">{STEPS[currentStep - 1].title}</h2>
                <p className="text-sm text-foreground-muted">{STEPS[currentStep - 1].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-surface-elevated rounded-xl border border-border p-6 md:p-8 mb-8">
          {currentStep === 1 && <StepOne formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <StepTwo formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <StepThree formData={formData} />}
          {currentStep === 4 && <StepFour formData={formData} updateFormData={updateFormData} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex-1 sm:flex-none bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button onClick={handleNext} disabled={currentStep === STEPS.length} className="flex-1 sm:flex-none">
            {currentStep === STEPS.length ? "Complete Registration" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-info-bg border border-info/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Need assistance?</p>
            <p className="text-sm text-foreground-muted">
              Contact our support team at{" "}
              <a href="tel:+27123456789" className="text-primary hover:underline">
                012 345 6789
              </a>{" "}
              or{" "}
              <a href="mailto:support@vut.ac.za" className="text-primary hover:underline">
                support@vut.ac.za
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
