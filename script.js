// Initialize demo data
function initializeDemoData() {
  const students = JSON.parse(localStorage.getItem("vut_students") || "[]")

  if (students.length === 0) {
    const demoStudent = {
      studentNumber: "123456789",
      pin: "00000",
      name: "NGOHO ROFHIWA, THIFHULUFHELWI",
      gender: "Male",
      birthdate: "23-Sep-2002",
      idNumber: "0209236140080",
      maritalStatus: "Single",
      homeLanguage: "VENDA",
      citizenship: "SOUTH AFRICA",
      email: "123456789@edu.vut.ac.za",
      cellphone: "0761068394",
      postalAddress: "21 BEKKER STREET SWI VANDERBIJLPARK GAUTENG 1911",
      studyAddress: "PO BOX 8759 TSHISAULU THOHOYANDOU LIMPOPO 0945",
      balance: -968.0,
      photo: null,
    }

    students.push(demoStudent)
    localStorage.setItem("vut_students", JSON.stringify(students))
    console.log("[v0] Demo student created with number:", demoStudent.studentNumber)
  }
}

// Logout function
function logout() {
  localStorage.removeItem("vut_current_student")
  window.location.href = "index.html"
}

// Check authentication
function checkAuth() {
  const currentStudent = localStorage.getItem("vut_current_student")
  if (
    !currentStudent &&
    !window.location.pathname.includes("index.html") &&
    !window.location.pathname.includes("forgot-password.html")
  ) {
    window.location.href = "index.html"
  }
}

// Call checkAuth on page load
document.addEventListener("DOMContentLoaded", checkAuth)
