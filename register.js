// register.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordError = document.getElementById('passwordError');

    passwordError.textContent = '';

    if (password.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters.';
      return;
    }
    if (password !== confirmPassword) {
      passwordError.textContent = 'Passwords do not match.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      passwordError.textContent = 'Email already registered. Please log in.';
      return;
    }

    users.push({ fullName, email, phone, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
  });
});
