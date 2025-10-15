"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"

interface StepOneProps {
  formData: {
    studentNumber: string
    email: string
    phone: string
  }
  updateFormData: (data: Partial<StepOneProps["formData"]>) => void
}

export function StepOne({ formData, updateFormData }: StepOneProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verify Your Information</h2>
        <p className="text-foreground-muted leading-relaxed">
          Please confirm your student details are correct. This information will be used throughout the registration
          process.
        </p>
      </div>

      <div className="bg-success-bg border border-success/20 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Registration Eligibility Confirmed</p>
          <p className="text-sm text-foreground-muted">
            You are eligible to register for the 2025 academic year. Your account is in good standing.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studentNumber">
            Student Number <span className="text-error">*</span>
          </Label>
          <Input
            id="studentNumber"
            type="text"
            placeholder="e.g., 220012345"
            value={formData.studentNumber}
            onChange={(e) => updateFormData({ studentNumber: e.target.value })}
            required
            aria-required="true"
            aria-describedby="studentNumber-help"
          />
          <p id="studentNumber-help" className="text-sm text-foreground-muted">
            Your 9-digit student identification number
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-error">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="student@vut.ac.za"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
            aria-required="true"
            aria-describedby="email-help"
          />
          <p id="email-help" className="text-sm text-foreground-muted">
            We'll send registration confirmations to this email
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Mobile Number <span className="text-error">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+27 12 345 6789"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            required
            aria-required="true"
            aria-describedby="phone-help"
          />
          <p id="phone-help" className="text-sm text-foreground-muted">
            For SMS notifications about your registration status
          </p>
        </div>
      </div>

      <div className="bg-warning-bg border border-warning/20 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Important Notice</p>
          <p className="text-sm text-foreground-muted">
            Ensure your contact information is accurate. You will receive important updates about your registration via
            email and SMS.
          </p>
        </div>
      </div>
    </div>
  )
}
