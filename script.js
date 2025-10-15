// Initialize demo student data
function initializeDemoData() {
  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")

  if (students.length === 0) {
    const demoStudent = {
      studentNumber: "220012345",
      name: "John Doe",
      email: "john.doe@vut.ac.za",
      pin: "12345",
      photo: null,
      profile: {
        email: "john.doe@vut.ac.za",
        mobile: "0123456789",
        city: "Vanderbijlpark",
        province: "Gauteng",
        country: "South Africa",
      },
    }
    localStorage.setItem("vut_students", JSON.stringify([demoStudent]))
  }
}

// Call on page load
initializeDemoData()

// Login function
function handleLogin(event) {
  if (event) event.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")
  const student = students.find((s) => s.studentNumber === username && s.pin === password)

  if (student) {
    localStorage.setItem("vut_current_student", JSON.stringify(student))
    window.location.href = "dashboard.html"
  } else {
    alert("Invalid student number or PIN")
  }
}

// Logout function
function logout() {
  localStorage.removeItem("vut_current_student")
  window.location.href = "index.html"
}

// Check authentication
function checkAuth() {
  const currentStudent = JSON.parse(localStorage.getItem("vut_current_student"))
  if (
    !currentStudent &&
    !window.location.pathname.includes("index.html") &&
    !window.location.pathname.includes("forgot-password.html")
  ) {
    window.location.href = "index.html"
  }
  return currentStudent
}

// Load user profile in sidebar
function loadUserProfile() {
  const currentStudent = checkAuth()
  if (currentStudent) {
    const nameElements = document.querySelectorAll("#sidebarStudentName, #sidebarUserName, #photoStudentName")
    const numberElements = document.querySelectorAll("#sidebarStudentNumber, #photoStudentNumber")
    const photoElements = document.querySelectorAll("#sidebarProfilePhoto, #profilePhoto")

    nameElements.forEach((el) => {
      if (el) el.textContent = currentStudent.name
    })

    numberElements.forEach((el) => {
      if (el) el.textContent = currentStudent.studentNumber
    })

    photoElements.forEach((el) => {
      if (el && currentStudent.photo) {
        el.src = currentStudent.photo
      }
    })
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Handle login form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Load user profile if on authenticated page
  if (!window.location.pathname.includes("index.html") && !window.location.pathname.includes("forgot-password.html")) {
    loadUserProfile()
  }
})
