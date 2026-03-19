let index = 2; 
const total = 7;
let autoSlide;
const slides = document.getElementById("slides");
const firstImg = document.getElementById("firstImage");

window.onload = () => {
  // 1. Apply the one-time intro effect
  if (firstImg) firstImg.classList.add("intro-zoom");
  
  updateCarousel(false);
  startAuto();
};

function updateCarousel(animate = true) {
  const slideElements = document.querySelectorAll(".slide");
  const slideWidth = slideElements[0].offsetWidth;
  const containerWidth = document.querySelector(".carousel").offsetWidth;
  const gap = 20; 
  const offset = (containerWidth - slideWidth) / 2;

  slides.style.transition = animate ? "transform 0.6s ease-in-out" : "none";
  const translateX = offset - (index * (slideWidth + gap));
  slides.style.transform = `translateX(${translateX}px)`;

  // 2. Once the first move happens, remove intro-zoom forever
  if (animate && firstImg) {
    firstImg.classList.remove("intro-zoom");
  }

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
    index = 2;
    updateCarousel(false);
  } else if (index <= 1) {
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
  autoSlide = setInterval(nextSlide, 2000);
}

function stopAuto() {
  clearInterval(autoSlide);
}

window.addEventListener('resize', () => updateCarousel(false));

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}

function showSection(id, el = null) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (el) {
    document.querySelectorAll(".nav-links button").forEach(b => b.classList.remove("active-tab"));
    el.classList.add("active-tab");
  }
  if (id === "home") setTimeout(() => updateCarousel(false), 50);
  document.getElementById("mobileMenu").classList.remove("show");
}
