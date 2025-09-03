// assets/script.js
document.addEventListener('DOMContentLoaded', function() {
  // ------------------------------
  // Authentication (Login/Register)
  // ------------------------------
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
  if (registerForm) {
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
  }

  // Login Form
  if (loginForm) {
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
  }

  // ------------------------------
  // Image Preview (upload.html)
  // ------------------------------
  const photoInput = document.getElementById('photoInput');
  const preview = document.getElementById('preview');
  if (photoInput && preview) {
    photoInput.addEventListener('change', function(e) {
      const [file] = photoInput.files;
      if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          preview.innerHTML = `<img src="${ev.target.result}" alt="Preview">`;
        }
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = '';
      }
    });
  }

  // ------------------------------
  // Simple Form Submit Feedback
  // ------------------------------
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Skip here for login/register (they already have handlers above)
      if (form.id === "loginForm" || form.id === "registerForm") return;

      e.preventDefault();
      // For hackathon demo, show instant feedback
      form.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = "Submitted!";
        btn.style.background = "linear-gradient(90deg, #43cea2, #1976d2)";
      }
      setTimeout(() => {
        form.querySelectorAll('input, textarea').forEach(el => el.disabled = false);
        if (btn) btn.textContent = "Submit";
      }, 1500);
    });
  });

  // ------------------------------
  // Animate Cards on Load
  // ------------------------------
  const cards = document.querySelectorAll('.card.animated');
  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(40px)";
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
      card.style.transition = "opacity 0.8s, transform 0.8s";
    }, 200);
  });
});
