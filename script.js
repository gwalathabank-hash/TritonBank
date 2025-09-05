// Helper: load and save users in localStorage
function getUsers() {
  let users = localStorage.getItem('triton_users');
  if (!users) {
    // Seed with King Brian and Kevin Costner if empty
    users = [{
      userid: "KBrian001",
      password: "PASS12345",
      name: "King Brian",
      accountNumber: "#TRITON0012345",
      accountType: "Premium Savings",
      currency: "USD",
      balance: 638832,
      lastLogin: "September 5, 2025 — 07:26 PDT"
    }, {
      userid: "KCostner01",
      password: "Waterworld2025",
      name: "Kevin Costner",
      accountNumber: "#TRITON0098765",
      accountType: "Offshore Savings",
      currency: "EUR",
      balance: 5200000,
      lastLogin: "Never"
    }];
    localStorage.setItem('triton_users', JSON.stringify(users));
  } else {
    users = JSON.parse(users);
  }
  return users;
}
function saveUsers(users) {
  localStorage.setItem('triton_users', JSON.stringify(users));
}

// Registration
function registerUser() {
  const users = getUsers();
  const userid = document.getElementById('reg_userid').value;
  const password = document.getElementById('reg_password').value;
  const name = document.getElementById('reg_name').value;
  const accountType = document.getElementById('reg_account_type').value;
  const currency = document.getElementById('reg_currency').value;
  const balance = parseFloat(document.getElementById('reg_balance').value);
  // Check unique
  if (users.some(u => u.userid === userid)) {
    alert("User ID already exists.");
    return false;
  }
  // Simple account number
  const accountNumber = "#TRITON" + String(Math.floor(Math.random()*9000000)+1000000);
  users.push({
    userid, password, name, accountNumber, accountType, currency,
    balance, lastLogin: "Never"
  });
  saveUsers(users);
  alert("Account created! Please login.");
  window.location.href = "index.html";
  return false;
}

// Login
function loginUser() {
  const user = document.getElementById('userid').value;
  const pass = document.getElementById('password').value;
  const users = getUsers();
  const found = users.find(u => u.userid === user && u.password === pass);
  if (found) {
    // Update lastLogin
    found.lastLogin = new Date().toLocaleString();
    saveUsers(users);
    // Save session
    localStorage.setItem('triton_loggedin', user);
    window.location.href = "Dashboard.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
  return false;
}

// Dashboard rendering
function displayDashboard() {
  const user = localStorage.getItem('triton_loggedin');
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  const users = getUsers();
  const found = users.find(u => u.userid === user);
  if (!found) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById('welcomeTitle').innerText = "👑 Welcome, " + found.name;
  document.getElementById('accountName').innerText = found.name;
  document.getElementById('accountNumber').innerText = found.accountNumber;
  document.getElementById('accountType').innerText = found.accountType;
  document.getElementById('currency').innerText = found.currency;
  document.getElementById('currentBalance').innerText = (found.currency === "USD" ? "$" : found.currency === "EUR" ? "€" : "") + found.balance.toLocaleString();
  document.getElementById('lastLogin').innerText = found.lastLogin;
}