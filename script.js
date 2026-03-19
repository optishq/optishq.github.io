let index = 2; // Start at the first real image (after 2 clones)
const total = 7;
let autoSlide;
const slides = document.getElementById("slides");
const startImg = document.getElementById("main-start-img");

window.onload = () => {
  // Trigger initial zoom only once
  if (startImg) startImg.classList.add("first-load-zoom");
  
  updateCarousel(false);
  startAuto();
};

function updateCarousel(animate = true) {
  const slideElements = document.querySelectorAll(".slide");
  const slideWidth = slideElements[0].offsetWidth;
  const containerWidth = document.querySelector(".carousel").offsetWidth;
  const gap = 20; 
  const offset = (containerWidth - slideWidth) / 2;

  slides.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
  const translateX = offset - (index * (slideWidth + gap));
  slides.style.transform = `translateX(${translateX}px)`;

  // Remove the special zoom class as soon as we move or after first load
  if (animate && startImg) startImg.classList.remove("first-load-zoom");

  updateUI(slideElements);
}

function updateUI(slideElements) {
  slideElements.forEach(s => s.classList.remove("active-slide"));
  if (slideElements[index]) slideElements[index].classList.add("active-slide");

  const dots = document.querySelectorAll(".dots span");
  dots.forEach(d => d.classList.remove("active-dot"));
  let dotIndex = (index - 2 + total) % total;
  if (dots[dotIndex]) dots[dotIndex].classList.add("active-dot");
}

slides.addEventListener("transitionend", () => {
  if (index >= total + 2) {
    index = 2; // Jump back to start clone
    updateCarousel(false);
  } else if (index <= 1) {
    index = total + 1; // Jump to end clone
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
  autoSlide = setInterval(nextSlide, 2000);
}

function stopAuto() {
  clearInterval(autoSlide);
}

// Menu Logic
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

function showSection(id, el = null) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (el) {
    document.querySelectorAll(".tab-bar button").forEach(b => b.classList.remove("active-tab"));
    el.classList.add("active-tab");
  }
}
