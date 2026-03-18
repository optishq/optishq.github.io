/* CASSEROLE FUNCTIONS */

let index = 1;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dots span");
const total = 7;

/* PRELOAD IMAGES (fix blank flash) */
const images = document.querySelectorAll(".slide img");
images.forEach(img => {
  const i = new Image();
  i.src = img.src;
});

/* MOVE */
function moveSlide(animate = true) {
  const slideWidth = slides.children[0].offsetWidth;

  if (!animate) {
    slides.style.transition = "none";
  }

  slides.style.transform = `translateX(-${index * slideWidth}px)`;

  if (!animate) {
    setTimeout(() => {
      slides.style.transition = "transform 0.5s ease-in-out";
    }, 50);
  }
}

/* DOTS */
function updateDots() {
  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[(index - 1 + total) % total].classList.add("active-dot");
}

/* NEXT */
function nextSlide() {
  index++;
  moveSlide();
  updateDots();
}

/* DOT CLICK */
function goToSlide(i) {
  index = i + 1;
  moveSlide();
  updateDots();
}

/* LOOP FIX */
slides.addEventListener("transitionend", () => {

  if (index === total + 1) {
    index = 1;
    moveSlide(false); /* ✅ no animation jump */
  }

  if (index === 0) {
    index = total;
    moveSlide(false);
  }

});

/* AUTO */
setInterval(nextSlide, 2000);

/* INIT (FIX initial jump) */
window.onload = () => {
  moveSlide(false);  /* ✅ no animation on load */
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
