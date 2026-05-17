let currentLanguage = "en";

// ——— LOAD LANGUAGE FROM JSON ———
async function loadLanguage(lang) {
  const response = await fetch(`assets/translations/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

// Language switch buttons
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
  currentLanguage = btn.dataset.lang;
  loadLanguage(currentLanguage);
});

  });
});

// Load English by default
loadLanguage("en");

// ——— MOBILE NAV ———
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// ——— HERO SLIDER ———
const slides = document.querySelectorAll(".hero-slide");
const prevBtn = document.querySelector(".hero-prev");
const nextBtn = document.querySelector(".hero-next");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlideFn() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

prevBtn.addEventListener("click", prevSlideFn);
nextBtn.addEventListener("click", nextSlide);
setInterval(nextSlide, 8000);

// Interactable LMHI Info Section
const menuItems = document.querySelectorAll(".info-menu li");
const infoTitle = document.getElementById("info-title");
const infoText = document.getElementById("info-text");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    // highlight active item
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // update content using translation keys
    const section = item.dataset.section;
    infoTitle.setAttribute("data-i18n", `info_${section}`);
    infoText.setAttribute("data-i18n", `info_${section}_text`);

    // reload language to update text
    loadLanguage(currentLanguage);
  });
});

// ——— COUNTERS ———
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {
  counters.forEach(counter => {
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
