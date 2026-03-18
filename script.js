/* CASSEROLE FUNCTIONS */

let index = 1;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dots span");
const total = 7;

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[(index - 1 + total) % total].classList.add("active-dot");
}

function moveSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  index++;
  moveSlide();
  updateDots();
}

function goToSlide(i) {
  index = i + 1;
  moveSlide();
  updateDots();
}

slides.addEventListener("transitionend", () => {
  if (index === total + 1) {
    index = 1;
    slides.style.transition = "none";
    moveSlide();
  }

  if (index === 0) {
    index = total;
    slides.style.transition = "none";
    moveSlide();
  }

  setTimeout(() => {
    slides.style.transition = "transform 0.5s ease-in-out";
  }, 50);
});

/* AUTO SLIDE */
setInterval(nextSlide, 2000);

/* INIT */
window.onload = () => {
  moveSlide();
  updateDots();
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
