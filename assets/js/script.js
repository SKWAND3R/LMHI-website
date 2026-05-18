/* ============================
   MOBILE NAVIGATION
============================ */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

/* ============================
   HERO SLIDER
============================ */
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const nextBtn = document.querySelector(".hero-next");
const prevBtn = document.querySelector(".hero-prev");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
}

/* ============================
   COUNTERS
============================ */
const counters = document.querySelectorAll(".counter");

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const speed = target / 80;

    const update = () => {
      count += speed;
      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}

animateCounters();

/* ============================
   LANGUAGE LOADER
============================ */
let currentLanguage = "en";

function loadLanguage(lang) {
  fetch(`assets/lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key] !== undefined) {
          el.innerHTML = data[key];
        }
      });
    })
    .catch(err => console.error("Language load error:", err));
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLanguage = btn.dataset.lang;
    loadLanguage(currentLanguage);
  });
});

loadLanguage(currentLanguage);

/* ============================
   INTERACTIVE LMHI INFO SECTION
============================ */
const infoMenuItems = document.querySelectorAll(".info-menu li");
const infoTitle = document.getElementById("info-title");
const infoText1 = document.getElementById("info-text-1");
const infoText2 = document.getElementById("info-text-2");
const infoImg = document.getElementById("info-img");

function updateInfoSection(section) {
  // Update translation keys
  infoTitle.setAttribute("data-i18n", `info_${section}`);
  infoText1.setAttribute("data-i18n", `info_${section}_text`);
  infoText2.setAttribute("data-i18n", `info_${section}_text2`);

  // Update image
  infoImg.src = `assets/images/info/${section}.jpg`;

  // Remove old fade classes
  infoTitle.classList.remove("fade-in");
  infoText1.classList.remove("fade-in");
  infoText2.classList.remove("fade-in");
  infoImg.classList.remove("fade-in");

  // Force reflow so animation restarts
  void infoTitle.offsetWidth;

  // Add fade classes
  infoTitle.classList.add("fade-in");
  infoText1.classList.add("fade-in");
  infoText2.classList.add("fade-in");
  infoImg.classList.add("fade-in");

  // Reload language
  loadLanguage(currentLanguage);
}

infoMenuItems.forEach(item => {
  item.addEventListener("click", () => {
    infoMenuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const section = item.dataset.section;
    updateInfoSection(section);
  });
});

/* Load default section */
updateInfoSection("history");
