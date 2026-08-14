// auth.js - Handles client-side authentication state for Stackly

document.addEventListener('DOMContentLoaded', () => {
    updateNavUI();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

function updateNavUI() {
    const user = localStorage.getItem('currentUser');
    
    const loginBtn = document.getElementById('navLoginBtn');
    const registerBtn = document.getElementById('navRegisterBtn');
    const dashboardBtn = document.getElementById('navDashboardBtn');
    const logoutBtn = document.getElementById('navLogoutBtn');
    const returnDashboardBtn = document.getElementById('returnDashboardBtn');
    
    if (user) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (dashboardBtn) dashboardBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (returnDashboardBtn) returnDashboardBtn.style.display = 'inline-block';
    } else {
        // User is logged out
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (dashboardBtn) dashboardBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return re.test(password);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const errorMsg = document.getElementById('errorMsg');
    
    errorMsg.style.display = 'none';
    
    if (!validateEmail(email)) {
        errorMsg.textContent = "Please enter a valid email address.";
        errorMsg.style.display = 'block';
        return;
    }
    
    if (!validatePassword(password)) {
        errorMsg.textContent = "Password must be at least 8 characters and contain uppercase, lowercase, numbers, and symbols.";
        errorMsg.style.display = 'block';
        return;
    }
    
    // Success: Mock login
    const userData = { email, role };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    window.location.href = 'dashboard.html';
}

function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm').value;
    const role = document.getElementById('reg-role').value;
    const errorMsg = document.getElementById('reg-errorMsg');
    
    errorMsg.style.display = 'none';
    
    if (!validateEmail(email)) {
        errorMsg.textContent = "Please enter a valid email address.";
        errorMsg.style.display = 'block';
        return;
    }
    
    if (!validatePassword(password)) {
        errorMsg.textContent = "Password must be at least 8 characters and contain uppercase, lowercase, numbers, and symbols.";
        errorMsg.style.display = 'block';
        return;
    }
    
    if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match.";
        errorMsg.style.display = 'block';
        return;
    }
    
    // Success: Mock registration
    alert('Account created successfully! You will now be redirected to the login page.');
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    }
}
