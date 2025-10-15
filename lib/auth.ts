import { createClient as createBrowserClient } from "@/lib/supabase/client"
import bcrypt from "bcryptjs"

// Student authentication with student number + PIN
export async function authenticateStudent(studentNumber: string, pin: string) {
  const supabase = createBrowserClient()

  try {
    // Query students table for matching student number
    const { data: student, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_number", studentNumber)
      .single()

    if (error || !student) {
      return { success: false, error: "Invalid student number or PIN" }
    }

    // Verify PIN
    const pinMatch = await bcrypt.compare(pin, student.pin_hash)
    if (!pinMatch) {
      return { success: false, error: "Invalid student number or PIN" }
    }

    // Create a session by storing student info in localStorage
    // Note: In production, you'd want to use proper JWT tokens
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "student_session",
        JSON.stringify({
          student_number: student.student_number,
          id: student.id,
          first_name: student.first_name,
          last_name: student.last_name,
        }),
      )
    }

    return { success: true, student }
  } catch (error) {
    console.error("[v0] Authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

// Admin authentication
export async function authenticateAdmin(username: string, password: string) {
  const supabase = createBrowserClient()

  try {
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .eq("is_active", true)
      .single()

    if (error || !admin) {
      return { success: false, error: "Invalid username or password" }
    }

    const passwordMatch = await bcrypt.compare(password, admin.password_hash)
    if (!passwordMatch) {
      return { success: false, error: "Invalid username or password" }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "admin_session",
        JSON.stringify({
          username: admin.username,
          id: admin.id,
          full_name: admin.full_name,
          role: admin.role,
        }),
      )
    }

    return { success: true, admin }
  } catch (error) {
    console.error("[v0] Admin authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

// Register new student
export async function registerStudent(data: {
  studentNumber: string
  pin: string
  firstName: string
  lastName: string
  email: string
  phone: string
}) {
  const supabase = createBrowserClient()

  try {
    // Hash the PIN
    const pinHash = await bcrypt.hash(data.pin, 10)

    const { data: student, error } = await supabase
      .from("students")
      .insert({
        student_number: data.studentNumber,
        pin_hash: pinHash,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, student }
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return { success: false, error: "Registration failed" }
  }
}

// Get current student session
export function getStudentSession() {
  if (typeof window === "undefined") return null
  const session = localStorage.getItem("student_session")
  return session ? JSON.parse(session) : null
}

// Get current admin session
export function getAdminSession() {
  if (typeof window === "undefined") return null
  const session = localStorage.getItem("admin_session")
  return session ? JSON.parse(session) : null
}

// Logout
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("student_session")
    localStorage.removeItem("admin_session")
  }
}
