const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  messageElement.textContent = '';
  messageElement.classList.remove('success');

  if (!email || !password) {
    messageElement.textContent = 'Please enter both email and password.';
    return;
  }

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      messageElement.textContent = data.message || 'Login successful!';
      messageElement.classList.add('success');
    } else {
      messageElement.textContent = data.message || 'Invalid email or password.';
    }
  } catch (error) {
    console.error('Login error:', error);
    messageElement.textContent = 'Unable to reach the login server.';
  }
});
