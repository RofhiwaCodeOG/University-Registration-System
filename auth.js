// Initialize demo data on first load
function initializeDemoData() {
  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")

  if (students.length === 0) {
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
  }
}

// Log login activity
function logLoginActivity(studentNumber, name, success) {
  const loginLogs = JSON.parse(localStorage.getItem("vut_login_logs") || "[]")

  loginLogs.push({
    studentNumber: studentNumber,
    name: name,
    timestamp: new Date().toISOString(),
    dateTime: new Date().toLocaleString(),
    success: success,
    ipAddress: "N/A", // Browser doesn't have access to IP
  })

  localStorage.setItem("vut_login_logs", JSON.stringify(loginLogs))
}

// Export students to CSV
function exportStudentsToCSV() {
  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")

  let csv = "Student Number,PIN,Name,Gender,Birthdate,ID Number,Email,Cellphone\n"
  students.forEach((student) => {
    csv += `${student.studentNumber},${student.pin},${student.name},${student.gender},${student.birthdate},${student.idNumber},${student.email},${student.cellphone}\n`
  })

  const blob = new Blob([csv], { type: "text/csv" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `vut_students_${new Date().toISOString().split("T")[0]}.csv`
  link.click()
}

// Export login logs to CSV
function exportLoginLogsToCSV() {
  const logs = JSON.parse(localStorage.getItem("vut_login_logs") || "[]")

  let csv = "Student Number,Name,Date & Time,Success,IP Address\n"
  logs.forEach((log) => {
    csv += `${log.studentNumber},${log.name},${log.dateTime},${log.success ? "Yes" : "No"},${log.ipAddress}\n`
  })

  const blob = new Blob([csv], { type: "text/csv" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `vut_login_logs_${new Date().toISOString().split("T")[0]}.csv`
  link.click()
}

// Import students from CSV
function importStudentsFromCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target.result
        const lines = text.split("\n")
        const students = JSON.parse(localStorage.getItem("vut_students") || "[]")

        // Skip header row
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue

          const [studentNumber, pin, name, gender, birthdate, idNumber, email, cellphone] = line.split(",")

          // Check if student already exists
          const existingIndex = students.findIndex((s) => s.studentNumber === studentNumber)

          const studentData = {
            studentNumber: studentNumber.trim(),
            pin: pin.trim(),
            name: name.trim(),
            gender: gender.trim(),
            birthdate: birthdate.trim(),
            idNumber: idNumber.trim(),
            email: email.trim(),
            cellphone: cellphone.trim(),
            maritalStatus: "Single",
            homeLanguage: "",
            citizenship: "SOUTH AFRICA",
            postalAddress: "",
            studyAddress: "",
            balance: 0,
            photo: null,
          }

          if (existingIndex >= 0) {
            students[existingIndex] = studentData
          } else {
            students.push(studentData)
          }
        }

        localStorage.setItem("vut_students", JSON.stringify(students))
        resolve(students.length)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.readAsText(file)
  })
}

// Check authentication
function checkAuth() {
  const currentStudent = localStorage.getItem("vut_current_student")
  const path = window.location.pathname

  const isPublicPage =
    path.endsWith("index.html") ||
    path.endsWith("forgot-password.html") ||
    path.endsWith("admin-login.html") ||
    path === "/" ||
    path.endsWith("/")

  if (!currentStudent && !isPublicPage) {
    window.location.href = "index.html"
  }
}

// Logout function
function logout() {
  localStorage.removeItem("vut_current_student")
  window.location.href = "index.html"
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDemoData)
} else {
  initializeDemoData()
}

// Handle login form if on login page
if (
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname.endsWith("/")
) {
  window.addEventListener("load", () => {
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const studentNumber = document.getElementById("studentNumber").value.trim()
        const pin = document.getElementById("pin").value.trim()
        const rememberMe = document.getElementById("rememberMe").checked

        const students = JSON.parse(localStorage.getItem("vut_students") || "[]")
        const student = students.find((s) => s.studentNumber === studentNumber && s.pin === pin)

        const messageDiv = document.getElementById("loginMessage")

        if (student) {
          // Log successful login
          logLoginActivity(studentNumber, student.name, true)

          localStorage.setItem("vut_current_student", JSON.stringify(student))
          if (rememberMe) {
            localStorage.setItem("vut_remember", studentNumber)
          }
          window.location.href = "dashboard.html"
        } else {
          // Log failed login attempt
          logLoginActivity(studentNumber, "Unknown", false)

          messageDiv.className = "message error"
          messageDiv.textContent = "Invalid student number or PIN. Please try again."
          messageDiv.style.display = "block"
        }
      })

      // Auto-fill if remembered
      const remembered = localStorage.getItem("vut_remember")
      if (remembered) {
        document.getElementById("studentNumber").value = remembered
        document.getElementById("rememberMe").checked = true
      }
    }
  })
}
