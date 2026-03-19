let index = 2; // Start at the first "real" slide (skipping 2 clones)
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
  
  const gap = 20; 
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
  // Logic to map current index back to the 0-6 dot range
  let dotIndex = (index - 2 + total) % total;
  if (dots[dotIndex]) dots[dotIndex].classList.add("active-dot");
}

/* LOOP JUMP LOGIC */
slides.addEventListener("transitionend", () => {
  // If we reach the first clone of Image 1 (at the end)
  if (index >= total + 2) {
    index = 2;
    updateCarousel(false);
  } 
  // If we reach the last clone of Image 7 (at the beginning)
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
  index = i + 2; // Offset for the two clones
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

/* ... toggleMenu and showSection functions remain the same ... */
