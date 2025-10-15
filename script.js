// Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // PIN validation (5 digits)
            if (!/^\d{5}$/.test(password)) {
                alert('PIN must be exactly 5 digits');
                return;
            }
            
            // Simulate login
            console.log('Login attempt:', { username, password });
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Profile Form Handling
    const profileForm = document.querySelector('.profile-form');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Profile information saved successfully!');
        });
    }
    
    // Mobile menu toggle (for responsive design)
    const menuToggle = document.querySelector('.menu-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', function() {
            headerNav.classList.toggle('active');
        });
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('input, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Schedule grid interactions
    const classBlocks = document.querySelectorAll('.class-block');
    
    classBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const courseName = this.querySelector('strong').textContent;
            const courseDetails = Array.from(this.querySelectorAll('span'))
                .map(span => span.textContent)
                .join('\n');
            
            alert(`${courseName}\n\n${courseDetails}`);
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-save functionality for forms
let autoSaveTimer;

function autoSave() {
    const formData = {};
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.name) {
            formData[input.name] = input.value;
        }
    });
    
    localStorage.setItem('vut_form_data', JSON.stringify(formData));
    console.log('Form data auto-saved');
}

// Load saved form data
function loadSavedData() {
    const savedData = localStorage.getItem('vut_form_data');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        Object.keys(formData).forEach(name => {
            const input = document.querySelector(`[name="${name}"]`);
            if (input) {
                input.value = formData[name];
            }
        });
    }
}

// Auto-save on input change
document.addEventListener('input', function(e) {
    if (e.target.matches('input, select, textarea')) {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(autoSave, 2000);
    }
});

// Load saved data on page load
window.addEventListener('load', loadSavedData);
