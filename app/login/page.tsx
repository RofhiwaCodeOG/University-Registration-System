"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { authenticateStudent, authenticateAdmin } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"student" | "personnel" | "other" | "alumni">("student")
  const [studentNumber, setStudentNumber] = useState("")
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (userType === "student") {
        const result = await authenticateStudent(studentNumber, pin)
        if (result.success) {
          router.push("/dashboard")
        } else {
          setError(result.error || "Login failed")
        }
      } else {
        // For personnel/admin login
        const result = await authenticateAdmin(studentNumber, pin)
        if (result.success) {
          router.push("/admin")
        } else {
          setError(result.error || "Login failed")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("[v0] Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with VUT branding */}
      <header className="bg-white border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Vaal University of Technology"
              width={80}
              height={80}
              className="object-contain"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">VAAL UNIVERSITY OF TECHNOLOGY</h1>
              <p className="text-sm text-foreground-muted italic">Inspiring thought. Shaping talent.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Prospective Students Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Prospective Students</CardTitle>
              <CardDescription>
                If you are a prospective student, not registered at this institution, please select the following
                option:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/register")}>
                Click here to apply
              </Button>
            </CardContent>
          </Card>

          {/* Registered Users Login Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Registered Users: Login Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {/* User Type Selection */}
                <RadioGroup value={userType} onValueChange={(value: any) => setUserType(value)}>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="cursor-pointer">
                        Student
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personnel" id="personnel" />
                      <Label htmlFor="personnel" className="cursor-pointer">
                        Personnel
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">
                        Other
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="alumni" id="alumni" />
                      <Label htmlFor="alumni" className="cursor-pointer">
                        Alumni
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {/* Student Number Input */}
                <div className="space-y-2">
                  <Label htmlFor="studentNumber">{userType === "student" ? "Student Number:" : "Username:"}</Label>
                  <Input
                    id="studentNumber"
                    type="text"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    required
                    placeholder={userType === "student" ? "Enter your student number" : "Enter your username"}
                  />
                </div>

                {/* PIN Input */}
                <div className="space-y-2">
                  <Label htmlFor="pin">Pin:</Label>
                  <Input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                    placeholder="Enter your PIN"
                  />
                  <p className="text-xs text-foreground-muted">(5 numeric digits. Do not start with a 0.)</p>
                </div>

                {/* Error Message */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <Button type="button" variant="outline">
                    Forgot Pin
                  </Button>
                  <Button type="button" variant="outline">
                    Change Pin
                  </Button>
                  <Button type="button" variant="outline">
                    Request A Pin
                  </Button>
                </div>

                <Button type="button" variant="link" className="p-0 h-auto">
                  Forgot Student Number
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Date Display */}
        <div className="text-right mt-8 text-sm text-foreground-muted">Monday, 13th October 2025</div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground-muted">
            <a href="#" className="hover:text-foreground">
              Contact Us
            </a>
            <span>|</span>
            <a href="#" className="hover:text-foreground">
              About Us
            </a>
            <span>|</span>
            <a href="#" className="hover:text-foreground">
              Disclaimer
            </a>
            <span>|</span>
            <a href="#" className="hover:text-foreground">
              Terms & Conditions
            </a>
            <span>|</span>
            <a href="#" className="hover:text-foreground">
              Privacy & Security Statement
            </a>
            <span>|</span>
            <a href="#" className="hover:text-foreground">
              Powered By
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
