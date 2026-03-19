let index = 2; // Start at the first "real" image (after 2 clones)
const total = 7;
let autoSlide;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dots span");

window.onload = () => {
  updateCarousel(false);
  startAuto();
};

function updateCarousel(animate = true) {
  const slideElements = document.querySelectorAll(".slide");
  const slideWidth = slideElements[0].offsetWidth;
  const containerWidth = document.querySelector(".carousel").offsetWidth;
  
  const gap = 20; // Matches CSS gap
  const offset = (containerWidth - slideWidth) / 2;

  slides.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
  const translateX = offset - (index * (slideWidth + gap));
  slides.style.transform = `translateX(${translateX}px)`;

  updateUI(slideElements);
}

function updateUI(slideElements) {
  slideElements.forEach(s => s.classList.remove("active-slide"));
  if (slideElements[index]) slideElements[index].classList.add("active-slide");

  dots.forEach(d => d.classList.remove("active-dot"));
  // Math to map index 2-8 back to dots 0-6
  let dotIndex = (index - 2 + total) % total;
  if (dots[dotIndex]) dots[dotIndex].classList.add("active-dot");
}

slides.addEventListener("transitionend", () => {
  // If we reach the clones at the end, jump back to real start
  if (index >= total + 2) {
    index = 2;
    updateCarousel(false);
  } 
  // If we reach the clones at the beginning, jump to real end
  else if (index <= 1) {
    index = total + 1;
    updateCarousel(false);
  }
});

function nextSlide() {
  index++;
  updateCarousel(true);
}

function goToSlide(i) {
  index = i + 2;
  updateCarousel(true);
  startAuto(); 
}

function startAuto() {
  stopAuto();
  autoSlide = setInterval(nextSlide, 2000); // Updated to 2 seconds
}

function stopAuto() {
  clearInterval(autoSlide);
}

window.addEventListener('resize', () => updateCarousel(false));

/* NAVIGATION & MENU */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");
  menu.classList.toggle("show");
  icon.textContent = menu.classList.contains("show") ? "✖" : "☰";
}

function showSection(id, el = null) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (el) {
    document.querySelectorAll(".tab-bar button").forEach(b => b.classList.remove("active-tab"));
    el.classList.add("active-tab");
  }
  if (id === "home") setTimeout(() => updateCarousel(false), 50);
  document.getElementById("mobileMenu").classList.remove("show");
  document.getElementById("menuIcon").textContent = "☰";
}
