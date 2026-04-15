const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  messageElement.textContent = '';
  messageElement.classList.remove('success');

  if (!email || !password) {
    messageElement.textContent = 'Please enter both email and password.';
    return;
  }

  const validUser = {
    email: 'user@example.com',
    password: 'password123'
  };

  if (email === validUser.email && password === validUser.password) {
    messageElement.textContent = 'Login successful!';
    messageElement.classList.add('success');
  } else {
    messageElement.textContent = 'Invalid email or password.';
  }
});
