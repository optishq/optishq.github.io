/* CASSEROLE FUNCTIONS */

let index = 0;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dots span");
const totalSlides = dots.length;

function showSlide(i) {
  index = i;
  slides.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[index].classList.add("active-dot");
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  showSlide(index);
}

setInterval(nextSlide, 2000);

function goToSlide(i) {
  showSlide(i);
}

window.onload = () => {
  showSlide(0);
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
