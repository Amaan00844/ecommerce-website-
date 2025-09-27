// auth.js
document.addEventListener('DOMContentLoaded', () => {
  const current = window.location.pathname.split('/').pop().toLowerCase();
  // pages that should NOT be protected
  const publicPages = ['login.html', 'register.html', ''];

  // If current page is not public, require login
  if (!publicPages.includes(current)) {
    const logged = sessionStorage.getItem('loggedInUser');
    if (!logged) {
      // if users exist, redirect to login; otherwise to register
      if (localStorage.getItem('users')) {
        window.location.href = 'login.html';
      } else {
        window.location.href = 'register.html';
      }
      return;
    }
  }

  // update nav auth link (login / logout)
  const authLink = document.getElementById('authLink');
  if (authLink) {
    const loggedUser = sessionStorage.getItem('loggedInUser');
    // remove existing click handlers by cloning the node (simple deattach)
    const newAuth = authLink.cloneNode(true);
    authLink.parentNode.replaceChild(newAuth, authLink);

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      newAuth.textContent = `Logout (${user.fullName.split(' ')[0]})`;
      newAuth.href = '#';
      newAuth.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
      });
    } else {
      newAuth.textContent = 'Login';
      newAuth.href = 'login.html';
    }
  }
});
