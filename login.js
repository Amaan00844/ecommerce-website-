// login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      sessionStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, fullName: user.fullName }));
      // redirect to main page after login
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });
});
