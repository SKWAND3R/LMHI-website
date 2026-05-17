let currentLanguage = "en";

/* ——— LOAD LANGUAGE FROM JSON ——— */
async function loadLanguage(lang) {
  currentLanguage = lang;
  const response = await fetch(`assets/translations/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

/* ——— LANGUAGE SWITCH BUTTONS ——— */
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    loadLanguage(btn.dataset.lang);
  });
});

/* Load English by default */
loadLanguage("en");

/* ——— MOBILE NAV ——— */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

/* ——— HERO SLIDER ——— */
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

/* ——— COUNTERS ——— */
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

/* ——— INTERACTABLE LMHI INFO SECTION ——— */
const menuItems = document.querySelectorAll(".info-menu li");
const infoTitle = document.getElementById("info-title");
const infoText = document.getElementById("info-text");
const infoImg = document.getElementById("info-img");

const infoImages = {
  history: "assets/images/info/history.jpg",
  education: "assets/images/info/education.jpg",
  legislation: "assets/images/info/legislation.jpg",
  practice: "assets/images/info/practice.jpg",
  research: "assets/images/info/research.jpg"
};

menuItems.forEach(item => {
  item.addEventListener("click", () => {

    /* Highlight active item */
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const section = item.dataset.section;

    /* Update translation keys */
    infoTitle.setAttribute("data-i18n", `info_${section}`);
    infoText.setAttribute("data-i18n", `info_${section}_text`);
    infoImg.src = infoImages[section];

    /* Reload language */
    loadLanguage(currentLanguage);

    /* ——— FADE-IN ANIMATION ——— */
    infoTitle.classList.remove("fade");
    infoText.classList.remove("fade");
    infoImg.classList.remove("fade");

    void infoTitle.offsetWidth;
    void infoText.offsetWidth;
    void infoImg.offsetWidth;

    infoTitle.classList.add("fade");
    infoText.classList.add("fade");
    infoImg.classList.add("fade");
  });
});
