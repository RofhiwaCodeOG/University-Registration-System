import type React from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, Shield, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-b border-border bg-surface-elevated">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">VUT iEnabler</h1>
              <p className="text-xs text-foreground-muted">Registration System</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Help Center
            </Link>
            <Link href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              Contact Support
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-info-bg text-info rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            <span>2025 Registration Period Now Open</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Register for your courses in minutes, not hours
          </h2>

          <p className="text-lg md:text-xl text-foreground-muted mb-8 text-pretty max-w-2xl mx-auto">
            Experience a redesigned registration system built for students. Mobile-friendly, step-by-step guidance, and
            real-time feedback at every stage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base" asChild>
              <Link href="/register">
                Start Registration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <Link href="/documentation">View Documentation</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          <FeatureCard
            icon={<Smartphone className="w-6 h-6" />}
            title="Mobile-First Design"
            description="Register from any device with a responsive interface that works perfectly on your phone."
          />
          <FeatureCard
            icon={<Clock className="w-6 h-6" />}
            title="Real-Time Updates"
            description="See course availability and timetable conflicts instantly as you build your schedule."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Secure & Reliable"
            description="Your data is protected with enterprise-grade security and automatic session saving."
          />
          <FeatureCard
            icon={<CheckCircle className="w-6 h-6" />}
            title="Clear Feedback"
            description="Helpful error messages and confirmation at every step guide you through the process."
          />
        </div>

        {/* Process Overview */}
        <div className="max-w-4xl mx-auto bg-surface rounded-2xl p-8 md:p-12 border border-border">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Simple 4-Step Registration Process
          </h3>

          <div className="space-y-6">
            <ProcessStep
              number="1"
              title="Verify Your Information"
              description="Confirm your student details and registration eligibility"
            />
            <ProcessStep
              number="2"
              title="Select Your Courses"
              description="Browse available courses with real-time seat availability"
            />
            <ProcessStep
              number="3"
              title="Review Your Schedule"
              description="Check for conflicts and confirm your timetable"
            />
            <ProcessStep
              number="4"
              title="Complete Payment"
              description="Secure payment processing with instant confirmation"
            />
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-foreground-muted mb-4">
              Need help? Our support team is available 24/7 during registration periods.
            </p>
            <Button variant="outline" asChild>
              <Link href="/help">Get Help</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Academic Calendar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Course Catalog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Registration Dates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Financial Aid
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">
                    Accessibility Statement
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground-muted">
            <p>&copy; 2025 Vaal University of Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-surface-elevated border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground-muted leading-relaxed">{description}</p>
    </div>
  )
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-foreground-muted leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
