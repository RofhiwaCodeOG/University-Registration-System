// Data Manager - Simulates CSV storage using localStorage
class DataManager {
  constructor() {
    this.initializeData()
  }

  initializeData() {
    // Initialize with sample student data if not exists
    if (!localStorage.getItem("students")) {
      const sampleStudents = [
        {
          studentNumber: "220012345",
          pin: "12345",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@vut.ac.za",
          mobile: "0821234567",
          profilePhoto: "/images/logo.png",
          program: "Bachelor of Computer Science",
          year: "3rd Year",
          status: "Active",
        },
        {
          studentNumber: "220054321",
          pin: "54321",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@vut.ac.za",
          mobile: "0827654321",
          profilePhoto: "/images/logo.png",
          program: "Bachelor of Information Technology",
          year: "2nd Year",
          status: "Active",
        },
      ]
      localStorage.setItem("students", JSON.stringify(sampleStudents))
    }

    // Initialize courses data
    if (!localStorage.getItem("courses")) {
      const sampleCourses = [
        { code: "CS301", name: "Data Structures", credits: 15, semester: "First Semester", status: "Enrolled" },
        { code: "CS302", name: "Database Systems", credits: 15, semester: "First Semester", status: "Enrolled" },
        { code: "CS303", name: "Web Development", credits: 15, semester: "First Semester", status: "Enrolled" },
        { code: "CS304", name: "Software Engineering", credits: 15, semester: "First Semester", status: "Enrolled" },
      ]
      localStorage.setItem("courses", JSON.stringify(sampleCourses))
    }

    // Initialize grades data
    if (!localStorage.getItem("grades")) {
      const sampleGrades = [
        {
          code: "CS201",
          name: "Programming Fundamentals",
          semester: "Second Semester 2024",
          grade: 75,
          status: "Pass",
        },
        { code: "CS202", name: "Computer Architecture", semester: "Second Semester 2024", grade: 68, status: "Pass" },
        { code: "CS203", name: "Discrete Mathematics", semester: "Second Semester 2024", grade: 82, status: "Pass" },
        { code: "CS204", name: "Operating Systems", semester: "Second Semester 2024", grade: 71, status: "Pass" },
      ]
      localStorage.setItem("grades", JSON.stringify(sampleGrades))
    }
  }

  // Student operations
  getStudent(studentNumber) {
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    return students.find((s) => s.studentNumber === studentNumber)
  }

  validateLogin(studentNumber, pin) {
    const student = this.getStudent(studentNumber)
    return student && student.pin === pin ? student : null
  }

  updateStudent(studentNumber, updates) {
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const index = students.findIndex((s) => s.studentNumber === studentNumber)
    if (index !== -1) {
      students[index] = { ...students[index], ...updates }
      localStorage.setItem("students", JSON.stringify(students))
      return true
    }
    return false
  }

  changePassword(studentNumber, oldPin, newPin) {
    const student = this.getStudent(studentNumber)
    if (student && student.pin === oldPin) {
      return this.updateStudent(studentNumber, { pin: newPin })
    }
    return false
  }

  resetPassword(studentNumber, email) {
    const student = this.getStudent(studentNumber)
    if (student && student.email === email) {
      // Generate random PIN
      const newPin = Math.floor(10000 + Math.random() * 90000).toString()
      this.updateStudent(studentNumber, { pin: newPin })
      return newPin
    }
    return null
  }

  updateProfilePhoto(studentNumber, photoDataUrl) {
    return this.updateStudent(studentNumber, { profilePhoto: photoDataUrl })
  }

  // Course operations
  getCourses() {
    return JSON.parse(localStorage.getItem("courses") || "[]")
  }

  enrollCourse(course) {
    const courses = this.getCourses()
    courses.push(course)
    localStorage.setItem("courses", JSON.stringify(courses))
  }

  // Grades operations
  getGrades() {
    return JSON.parse(localStorage.getItem("grades") || "[]")
  }

  // Session management
  setCurrentUser(student) {
    sessionStorage.setItem("currentUser", JSON.stringify(student))
  }

  getCurrentUser() {
    const user = sessionStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  }

  logout() {
    sessionStorage.removeItem("currentUser")
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null
  }
}

// Export for use in other files
const dataManager = new DataManager()
