function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  menu.classList.toggle("show");

  if (menu.classList.contains("show")) {
    icon.textContent = "✖";
  } else {
    icon.textContent = "☰";
  }
}

function showSection(id, el = null) {

  // Show section
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  // ✅ Update active tab (desktop)
  document.querySelectorAll(".tab-bar button").forEach(btn => {
    btn.classList.remove("active-tab");
  });

  if (el) {
    el.classList.add("active-tab");
  }

  // Close mobile menu
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  menu.classList.remove("show");
  icon.textContent = "☰";
}
