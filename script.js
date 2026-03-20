let index = 2; 
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

  // Kill transitions on container AND images during the "jump"
  if (!animate) {
    slides.style.transition = "none";
    slides.classList.add("no-transition");
  } else {
    slides.style.transition = "transform 0.5s ease-in-out";
    slides.classList.remove("no-transition");
  }

  const translateX = offset - (index * (slideWidth + gap));
  slides.style.transform = `translateX(${translateX}px)`;

  updateUI(slideElements);

  if (!animate) {
    // Force reflow to ensure the "none" transition is applied instantly
    void slides.offsetWidth; 
    setTimeout(() => slides.classList.remove("no-transition"), 50);
  }
}

function updateUI(slideElements) {
  slideElements.forEach(s => s.classList.remove("active-slide"));
  if (slideElements[index]) slideElements[index].classList.add("active-slide");

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

function prevSlide() {
    index--;
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

/* NAVIGATION & MENU */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");
  
  menu.classList.toggle("show");
  
  if (menu.classList.contains("show")) {
    icon.textContent = "✖";
    icon.classList.add("active"); // Adds the active style
  } else {
    icon.textContent = "☰";
    icon.classList.remove("active");
  }
}

function showSection(id, el = null) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  
  if (el) {
    document.querySelectorAll(".tab-bar button").forEach(b => b.classList.remove("active-tab"));
    el.classList.add("active-tab");
  }
  
  if (id === "home") setTimeout(() => updateCarousel(false), 50);
  
  // Close mobile menu after selection
  document.getElementById("mobileMenu").classList.remove("show");
  document.getElementById("menuIcon").textContent = "☰";

// Reset the icon and menu
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");
  
  menu.classList.remove("show");
  icon.textContent = "☰";
  icon.classList.remove("active");
}

// --- SWIPE FUNCTIONALITY ---

let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

const carousel = document.querySelector(".carousel");

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAuto(); // Stop auto-sliding while dragging
    carousel.style.transition = 'none'; // Disable transition for instant tracking
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Move the carousel based on the distance moved by the finger
    const moveBy = -index * 100 + (diff / window.innerWidth) * 100;
    carousel.style.transform = `translateX(${moveBy}%)`;
});

carousel.addEventListener('touchend', (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    carousel.style.transition = 'transform 0.5s ease-out'; // Re-enable smoothness

    // If swipe was more than 20% of the screen width, change slide
    if (Math.abs(diff) > window.innerWidth * 0.2) {
        if (diff > 0) prevSlide(); // Swiped Right -> Go Left
        else nextSlide();          // Swiped Left -> Go Right
    } else {
        updateCarousel(true); // Snap back to current slide if swipe wasn't far enough
    }
    startAuto();
});

/*
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector(".carousel");

carouselContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stopAuto(); // Stop the 2s timer while user is interacting
}, {passive: true});

carouselContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
    startAuto(); // Restart the 2s timer after swipe
}, {passive: true});

function handleGesture() {
    const threshold = 50; // Minimum distance to count as a swipe
    if (touchEndX < touchStartX - threshold) {
        // Swiped Left -> Go Right
        nextSlide();
    }
    if (touchEndX > touchStartX + threshold) {
        // Swiped Right -> Go Left
        prevSlide();
    }
} */
