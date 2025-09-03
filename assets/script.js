// assets/script.js

// DOM Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Helper: get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Helper: save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Register Form
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = registerForm.querySelector('input[type="text"]').value.trim();
  const password = registerForm.querySelector('input[type="password"]').value.trim();

  if (!username || !password) {
    alert("Please fill all fields.");
    return;
  }

  let users = getUsers();

  // Check if user already exists
  if (users.find(user => user.username === username)) {
    alert("⚠️ Username already taken!");
    return;
  }

  // Save new user
  users.push({ username, password });
  saveUsers(users);

  alert("✅ Registration successful! Please login.");
  registerForm.reset();
});

// Login Form
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = loginForm.querySelector('input[type="text"]').value.trim();
  const password = loginForm.querySelector('input[type="password"]').value.trim();

  let users = getUsers();

  const validUser = users.find(user => user.username === username && user.password === password);

  if (validUser) {
    alert(`🎉 Welcome back, ${username}!`);
    // Redirect to upload.html
    window.location.href = "upload.html";
  } else {
    alert("❌ Invalid username or password!");
  }
});
