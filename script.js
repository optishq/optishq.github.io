let index = 1;
const total = 7;
let autoSlide;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dots span");

/* INITIALIZE */
window.onload = () => {
  updateCarousel(false);
  startAuto();
};

/* MAIN UPDATE FUNCTION */
function updateCarousel(animate = true) {
  const slideElements = document.querySelectorAll(".slide");
  const slideWidth = slideElements[0].offsetWidth;
  const containerWidth = document.querySelector(".carousel").offsetWidth;
  
  // The magic gap is 20px from CSS
  const gap = 20; 
  const offset = (containerWidth - slideWidth) / 2;

  slides.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
  // Calculation accounts for the width of slides plus the gaps between them
  const translateX = offset - (index * (slideWidth + gap));
  slides.style.transform = `translateX(${translateX}px)`;

  updateUI(slideElements);
}

function updateUI(slideElements) {
  // Update Active Class
  slideElements.forEach(s => s.classList.remove("active-slide"));
  if (slideElements[index]) slideElements[index].classList.add("active-slide");

  // Update Dots
  dots.forEach(d => d.classList.remove("active-dot"));
  let dotIndex = (index - 1 + total) % total;
  if (dots[dotIndex]) dots[dotIndex].classList.add("active-dot");
}

/* INFINITE LOOP LOGIC */
slides.addEventListener("transitionend", () => {
  if (index === total + 1) {
    index = 1;
    updateCarousel(false);
  } else if (index === 0) {
    index = total;
    updateCarousel(false);
  }
});

/* NAVIGATION */
function nextSlide() {
  index++;
  updateCarousel(true);
}

function goToSlide(i) {
  index = i + 1;
  updateCarousel(true);
  startAuto(); // Reset timer on manual click
}

/* AUTO PLAY */
function startAuto() {
  stopAuto();
  autoSlide = setInterval(nextSlide, 3000);
}

function stopAuto() {
  clearInterval(autoSlide);
}

/* RE-CENTER ON RESIZE */
window.addEventListener('resize', () => updateCarousel(false));

/* MENU & SECTION LOGIC */
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

  if (id === "home") {
    setTimeout(() => updateCarousel(false), 50);
  }

  document.getElementById("mobileMenu").classList.remove("show");
  document.getElementById("menuIcon").textContent = "☰";
}
