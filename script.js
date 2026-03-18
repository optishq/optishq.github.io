/* CAROUSEL FUNCTIONS */

let index = 1;
const slides = document.getElementById("slides");
const total = 7;

let dots;
let autoSlide;

/* WAIT FOR DOM */
window.onload = () => {

  dots = document.querySelectorAll(".dots span");

  moveSlide(false);
  updateDots();
  updateActiveSlide();
  startAuto();
};

/* MOVE */
function moveSlide(animate = true) {

  const slideWidth = slides.children[0].offsetWidth;
  const containerWidth = document.querySelector(".carousel").offsetWidth;

  const offset = (containerWidth - slideWidth) / 2;

  if (!animate) {
    slides.style.transition = "none";
  } else {
    slides.style.transition = "transform 0.5s ease-in-out";
  }

  slides.style.transform =
    `translateX(${offset - index * slideWidth}px)`;

  /* ✅ FORCE ACTIVE UPDATE AFTER RENDER */
  setTimeout(updateActiveSlide, 50);
}

/* ACTIVE SLIDE (center effect) */
function updateActiveSlide() {
  const allSlides = document.querySelectorAll(".slide");

  allSlides.forEach(slide => slide.classList.remove("active-slide"));

  if (allSlides[index]) {
    allSlides[index].classList.add("active-slide");
  }
}

/* DOTS */
function updateDots() {
  if (!dots) return;

  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[(index - 1 + total) % total].classList.add("active-dot");
}

/* NEXT */
function nextSlide() {
  index++;
  moveSlide(true);
  updateDots();
}

/* PREV */
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

  const slideWidth = slides.children[0].offsetWidth;
  const containerWidth = document.querySelector(".carousel").offsetWidth;
  const offset = (containerWidth - slideWidth) / 2;

  if (index === total + 1) {
    index = 1;

    slides.style.transition = "none";
    slides.style.transform =
      `translateX(${offset - index * slideWidth}px)`;
  }

  if (index === 0) {
    index = total;

    slides.style.transition = "none";
    slides.style.transform =
      `translateX(${offset - index * slideWidth}px)`;
  }

});

/* AUTO SLIDE */
function startAuto() {
  stopAuto();
  autoSlide = setInterval(nextSlide, 2000);
}

function stopAuto() {
  if (autoSlide) clearInterval(autoSlide);
}

/* TOUCH (MOBILE) */
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

  /* FIX CAROUSEL WHEN RETURNING TO HOME */
  if (id === "home") {
    setTimeout(() => {
      moveSlide(false);
      updateDots();
      updateActiveSlide();
    }, 100); // small delay ensures layout is ready
  }

  document.querySelectorAll(".tab-bar button").forEach(btn => {
    btn.classList.remove("active-tab");
  });

  if (el) el.classList.add("active-tab");

  document.getElementById("mobileMenu").classList.remove("show");
  document.getElementById("menuIcon").textContent = "☰";
}

