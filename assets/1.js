// JS: Image preview, animated scroll, simple form feedback
document.addEventListener('DOMContentLoaded', function() {
  // Image preview for upload.html
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

  // Simple form submit feedback (demo only)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
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

  // Optional: Animate card on scroll (for future or longer pages)
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