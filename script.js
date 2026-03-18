function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}

function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.classList.remove("active"));

  document.getElementById(sectionId).classList.add("active");

  // Close menu after click (mobile)
  document.getElementById("mobileMenu").classList.remove("show");
}
