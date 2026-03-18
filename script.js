function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("show");
}

function showSection(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  // close mobile menu
  document.getElementById("mobileMenu").classList.remove("show");
}
