function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  menu.classList.toggle("show");

  // ✅ Toggle icon
  if (menu.classList.contains("show")) {
    icon.textContent = "✖";
  } else {
    icon.textContent = "☰";
  }
}

function showSection(id, el = null) {
  // show section
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  // ✅ highlight active tab (desktop only)
  if (el) {
    document.querySelectorAll(".tab-bar button").forEach(btn => {
      btn.classList.remove("active-tab");
    });
    el.classList.add("active-tab");
  }

  // close mobile menu
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  menu.classList.remove("show");
  icon.textContent = "☰";
}
