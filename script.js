let index = 2; // Starting point with buffer clones
const total = 7;
let autoSlide;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dots span");
const firstImg = document.getElementById("firstImage");

window.onload = () => {
  // Apply the one-time special zoom
  if(firstImg) firstImg.classList.add("initial-zoom-effect");
  
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

  updateUI(slideElements);
}

function updateUI(slideElements) {
  slideElements.forEach(s => s.classList.remove("active-slide"));
  if (slideElements[index]) slideElements[index].classList.add("active-slide");

  dots.forEach(d => d.classList.remove("active-dot"));
  let dotIndex = (index - 2 + total) % total;
  if (dots[dotIndex]) dots[dotIndex].classList.add("active-dot");
}

slides.addEventListener("transitionend", () => {
  // Infinite Loop logic
  if (index >= total + 2) {
    index = 2;
    updateCarousel(false);
  } else if (index <= 1) {
    index = total + 1;
    updateCarousel(false);
  }
});

function nextSlide() {
  // Once we move away from the first slide, remove the intro effect
  if(firstImg) firstImg.classList.remove("initial-zoom-effect");
  
  index++;
  updateCarousel(true);
}

function goToSlide(i) {
  if(firstImg) firstImg.classList.remove("initial-zoom-effect");
  index = i + 2;
  updateCarousel(true);
  startAuto(); 
}

function startAuto() {
  stopAuto();
  autoSlide = setInterval(nextSlide, 2000); // 2-second interval
}

function stopAuto() {
  clearInterval(autoSlide);
}

window.addEventListener('resize', () => updateCarousel(false));

/* NAV LOGIC */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
  document.getElementById("menuIcon").textContent = menu.classList.contains("show") ? "✖" : "☰";
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
