// Check admin authentication
if (!localStorage.getItem("vut_admin_logged_in")) {
  window.location.href = "admin-login.html"
}

// Update current date
document.getElementById("currentDate").textContent = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})

// Load dashboard stats
function loadDashboardStats() {
  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")
  const logs = JSON.parse(localStorage.getItem("vut_login_logs") || "[]")

  document.getElementById("totalStudents").textContent = students.length
  document.getElementById("totalLogins").textContent = logs.length
  document.getElementById("successfulLogins").textContent = logs.filter((l) => l.success).length
  document.getElementById("failedLogins").textContent = logs.filter((l) => !l.success).length
}

// Show section
function showSection(section) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((s) => (s.style.display = "none"))

  // Remove active class from all nav links
  document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))

  // Show selected section
  if (section === "dashboard") {
    document.getElementById("dashboardSection").style.display = "block"
    loadDashboardStats()
  } else if (section === "students") {
    document.getElementById("studentsSection").style.display = "block"
    loadStudentsTable()
  } else if (section === "logs") {
    document.getElementById("logsSection").style.display = "block"
    loadLogsTable()
  } else if (section === "import") {
    document.getElementById("importSection").style.display = "block"
  } else if (section === "settings") {
    document.getElementById("settingsSection").style.display = "block"
  }

  // Add active class to clicked nav link
  event.target.closest(".nav-link").classList.add("active")
}

// Load students table
function loadStudentsTable() {
  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")
  const tbody = document.getElementById("studentsTableBody")

  tbody.innerHTML = ""
  students.forEach((student, index) => {
    const row = tbody.insertRow()
    row.innerHTML = `
            <td>${student.studentNumber}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.cellphone}</td>
            <td>
                <button onclick="deleteStudent(${index})" class="btn-danger btn-sm">Delete</button>
            </td>
        `
  })
}

// Load logs table
function loadLogsTable() {
  const logs = JSON.parse(localStorage.getItem("vut_login_logs") || "[]")
  const tbody = document.getElementById("logsTableBody")

  tbody.innerHTML = ""
  logs.reverse().forEach((log) => {
    const row = tbody.insertRow()
    row.innerHTML = `
            <td>${log.studentNumber}</td>
            <td>${log.name}</td>
            <td>${log.dateTime}</td>
            <td><span class="badge ${log.success ? "badge-success" : "badge-danger"}">${log.success ? "Success" : "Failed"}</span></td>
        `
  })
}

// Show add student form
function showAddStudentForm() {
  document.getElementById("addStudentForm").style.display = "block"
}

// Hide add student form
function hideAddStudentForm() {
  document.getElementById("addStudentForm").style.display = "none"
  document.getElementById("newStudentForm").reset()
}

// Add new student
document.getElementById("newStudentForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")

  const newStudent = {
    studentNumber: document.getElementById("newStudentNumber").value.trim(),
    pin: document.getElementById("newPin").value.trim(),
    name: document.getElementById("newName").value.trim(),
    email: document.getElementById("newEmail").value.trim(),
    cellphone: document.getElementById("newCellphone").value.trim(),
    gender: "Not Specified",
    birthdate: "",
    idNumber: "",
    maritalStatus: "Single",
    homeLanguage: "",
    citizenship: "SOUTH AFRICA",
    postalAddress: "",
    studyAddress: "",
    balance: 0,
    photo: null,
  }

  students.push(newStudent)
  localStorage.setItem("vut_students", JSON.stringify(students))

  hideAddStudentForm()
  loadStudentsTable()
  alert("Student added successfully!")
})

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    const students = JSON.parse(localStorage.getItem("vut_students") || "[]")
    students.splice(index, 1)
    localStorage.setItem("vut_students", JSON.stringify(students))
    loadStudentsTable()
  }
}

// Handle CSV import
async function handleCSVImport() {
  const fileInput = document.getElementById("csvFileInput")
  const messageDiv = document.getElementById("importMessage")

  if (!fileInput.files.length) {
    messageDiv.className = "message error"
    messageDiv.textContent = "Please select a CSV file first."
    messageDiv.style.display = "block"
    return
  }

  try {
    const count = await window.importStudentsFromCSV(fileInput.files[0]) // Declare or import the function here
    messageDiv.className = "message success"
    messageDiv.textContent = `Successfully imported/updated ${count} students!`
    messageDiv.style.display = "block"
    fileInput.value = ""
  } catch (error) {
    messageDiv.className = "message error"
    messageDiv.textContent = `Error importing CSV: ${error.message}`
    messageDiv.style.display = "block"
  }
}

// Change admin password
document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const currentPassword = document.getElementById("currentPassword").value
  const newPassword = document.getElementById("newPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const storedPassword = localStorage.getItem("vut_admin_password")
  const messageDiv = document.getElementById("passwordMessage")

  if (currentPassword !== storedPassword) {
    messageDiv.className = "message error"
    messageDiv.textContent = "Current password is incorrect."
    messageDiv.style.display = "block"
    return
  }

  if (newPassword !== confirmPassword) {
    messageDiv.className = "message error"
    messageDiv.textContent = "New passwords do not match."
    messageDiv.style.display = "block"
    return
  }

  if (newPassword.length < 6) {
    messageDiv.className = "message error"
    messageDiv.textContent = "Password must be at least 6 characters long."
    messageDiv.style.display = "block"
    return
  }

  localStorage.setItem("vut_admin_password", newPassword)
  messageDiv.className = "message success"
  messageDiv.textContent = "Password changed successfully!"
  messageDiv.style.display = "block"

  this.reset()
})

// Admin logout
function adminLogout() {
  localStorage.removeItem("vut_admin_logged_in")
  window.location.href = "admin-login.html"
}

// Load initial stats
loadDashboardStats()
