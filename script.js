function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.classList.remove("active"));

  document.getElementById(sectionId).classList.add("active");

  // Close menu on mobile after click
  document.getElementById("nav-links").classList.remove("show");
}

function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("show");
}