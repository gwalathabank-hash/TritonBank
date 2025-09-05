// Example user database (replace with server authentication for real use)
const users = [
  {
    username: "user1",
    password: "password123",
    name: "Jane Doe",
    accountNumber: "0011223344",
    accountType: "Savings",
    currency: "USD",
    balance: 1500.75,
    lastLogin: "2025-09-04 11:22:33"
  },
  {
    username: "user2",
    password: "abc$456",
    name: "John Smith",
    accountNumber: "0055667788",
    accountType: "Checking",
    currency: "EUR",
    balance: 2980.45,
    lastLogin: "2025-09-05 09:01:00"
  }
];

// Handle login submission
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Store login state (for demo; use secure sessions in production!)
    localStorage.setItem('triton_loggedin', JSON.stringify(user));
    window.location.href = "Dashboard.html";
  } else {
    document.getElementById('loginError').innerText = "Invalid username or password.";
  }
  return false;
}

// Display dashboard info after login
function displayDashboard() {
  const user = JSON.parse(localStorage.getItem('triton_loggedin'));
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById('welcomeTitle').innerText = `Welcome, ${user.name}!`;
  document.getElementById('accountName').innerText = user.name;
  document.getElementById('accountNumber').innerText = user.accountNumber;
  document.getElementById('accountType').innerText = user.accountType;
  document.getElementById('currency').innerText = user.currency;
  document.getElementById('currentBalance').innerText = user.balance.toLocaleString(undefined, { style: "currency", currency: user.currency });
  document.getElementById('lastLogin').innerText = user.lastLogin;
}