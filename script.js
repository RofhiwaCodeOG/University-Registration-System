// Initialize demo data
function initializeDemoData() {
  console.log("[v0] Checking for existing students...")
  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")
  console.log("[v0] Found", students.length, "students in localStorage")

  if (students.length === 0) {
    console.log("[v0] Creating demo student...")
    const demoStudent = {
      studentNumber: "222377941",
      pin: "12345",
      name: "NGOHO ROFHIWA, THIFHULUFHELWI",
      gender: "Male",
      birthdate: "23-Sep-2002",
      idNumber: "0209236140080",
      maritalStatus: "Single",
      homeLanguage: "VENDA",
      citizenship: "SOUTH AFRICA",
      email: "222377941@edu.vut.ac.za",
      cellphone: "0761068394",
      postalAddress: "21 BEKKER STREET SWI VANDERBIJLPARK GAUTENG 1911",
      studyAddress: "PO BOX 8759 TSHISAULU THOHOYANDOU LIMPOPO 0945",
      balance: -968.0,
      photo: null,
    }

    students.push(demoStudent)
    localStorage.setItem("vut_students", JSON.stringify(students))
    console.log("[v0] Demo student created successfully!")
    console.log("[v0] Student Number:", demoStudent.studentNumber)
    console.log("[v0] PIN:", demoStudent.pin)
  } else {
    console.log("[v0] Demo student already exists")
  }
}

// Logout function
function logout() {
  console.log("[v0] Logging out...")
  localStorage.removeItem("vut_current_student")
  window.location.href = "index.html"
}

// Check authentication
function checkAuth() {
  const currentStudent = localStorage.getItem("vut_current_student")
  const path = window.location.pathname

  console.log("[v0] Checking auth - Current path:", path)
  console.log("[v0] Current student:", currentStudent ? "Logged in" : "Not logged in")

  // Check if we're on a public page (login or forgot password)
  const isPublicPage =
    path.endsWith("index.html") || path.endsWith("forgot-password.html") || path === "/" || path.endsWith("/")

  if (!currentStudent && !isPublicPage) {
    console.log("[v0] Not authenticated, redirecting to login...")
    window.location.href = "index.html"
  }
}

// Call checkAuth on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM loaded, running checkAuth...")
  checkAuth()
})
