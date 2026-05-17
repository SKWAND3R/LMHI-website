// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

// Hero slider
const slides = document.querySelectorAll(".hero-slide");
const prevBtn = document.querySelector(".hero-prev");
const nextBtn = document.querySelector(".hero-next");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlideFn() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

if (prevBtn && nextBtn && slides.length > 0) {
  prevBtn.addEventListener("click", prevSlideFn);
  nextBtn.addEventListener("click", nextSlide);
  setInterval(nextSlide, 8000); // auto-slide
}

// Animated counters
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    const step = Math.max(1, Math.floor(target / 200));

    function update() {
      let current = +counter.innerText.replace(/,/g, "") || 0;
      if (current < target) {
        current += step;
        if (current > target) current = target;
        counter.innerText = current.toLocaleString();
        requestAnimationFrame(update);
      }
    }

    update();
  });
}

function onScroll() {
  const statsSection = document.querySelector(".stats");
  if (!statsSection || countersStarted) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    countersStarted = true;
    animateCounters();
    window.removeEventListener("scroll", onScroll);
  }
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);
