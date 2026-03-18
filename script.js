/* CAROUSEL FUNCTIONS */

let index = 1;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dots span");
const total = 7;

let autoSlide;

/* PRELOAD IMAGES (fix blank flash) */
document.querySelectorAll(".slide img").forEach(img => {
  const i = new Image();
  i.src = img.src;
});

/* UPDATE ACTIVE (center effect) */
function updateActiveSlide() {
  const allSlides = document.querySelectorAll(".slide");

  allSlides.forEach(slide => slide.classList.remove("active-slide"));

  if (allSlides[index]) {
    allSlides[index].classList.add("active-slide");
  }
}

/* MOVE */
function moveSlide(animate = true) {
  const slideWidth = slides.children[0].offsetWidth;

  if (!animate) {
    slides.style.transition = "none";
  } else {
    slides.style.transition = "transform 0.5s ease-in-out";
  }

  slides.style.transform = `translateX(-${index * slideWidth}px)`;

  updateActiveSlide();
}

/* DOTS */
function updateDots() {
  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[(index - 1 + total) % total].classList.add("active-dot");
}

/* NEXT */
function nextSlide() {
  index++;
  moveSlide(true);
  updateDots();
}

/* PREV (for swipe) */
function prevSlide() {
  index--;
  moveSlide(true);
  updateDots();
}

/* DOT CLICK */
function goToSlide(i) {
  index = i + 1;
  moveSlide(true);
  updateDots();
}

/* LOOP FIX */
slides.addEventListener("transitionend", () => {

  if (index === total + 1) {
    index = 1;
    moveSlide(false);
  }

  if (index === 0) {
    index = total;
    moveSlide(false);
  }

});

/* AUTO SLIDE */
function startAuto() {
  stopAuto(); // prevent duplicates
  autoSlide = setInterval(() => {
    nextSlide();
  }, 2000);
}

function stopAuto() {
  if (autoSlide) clearInterval(autoSlide);
}

/* TOUCH SUPPORT (SAFE VERSION) */
let startX = 0;

slides.addEventListener("touchstart", (e) => {
  stopAuto();
  startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextSlide();
  } else if (endX - startX > 50) {
    prevSlide();
  }

  startAuto();
});

/* INIT */
window.onload = () => {
  moveSlide(false);
  updateDots();
  updateActiveSlide();
  startAuto();  // ✅ THIS was likely broken earlier
};


/* EXISTING FUNCTIONS */

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  menu.classList.toggle("show");

  if (menu.classList.contains("show")) {
    icon.textContent = "✖";
  } else {
    icon.textContent = "☰";
  }
}

function showSection(id, el = null) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".tab-bar button").forEach(btn => {
    btn.classList.remove("active-tab");
  });

  if (el) el.classList.add("active-tab");

  document.getElementById("mobileMenu").classList.remove("show");
  document.getElementById("menuIcon").textContent = "☰";
}


/* SWIPE SUPPORT (mobile) */

let startX = 0;

slides.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextSlide();
  } else if (endX - startX > 50) {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
  }
});
