/* -------------------------------------------------
   LANGUAGE LOADING
------------------------------------------------- */
let currentLanguage = "en";

async function loadLanguage(lang) {
  currentLanguage = lang;

  try {
    const response = await fetch(`assets/translations/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key] !== undefined) {
        el.textContent = translations[key];
      }
    });

    // Auto-hide paragraph 2 if empty
    const p2 = document.getElementById("info-text-2");
    if (p2 && p2.textContent.trim() === "") {
      p2.style.display = "none";
    } else if (p2) {
      p2.style.display = "block";
    }

  } catch (err) {
    console.error("Translation load error:", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadLanguage("en");
});

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    loadLanguage(btn.dataset.lang);
  });
});


/* -------------------------------------------------
   MOBILE NAV
------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});


/* -------------------------------------------------
   HERO SLIDER
------------------------------------------------- */
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


/* -------------------------------------------------
   COUNTERS
------------------------------------------------- */
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


/* -------------------------------------------------
   INTERACTABLE LMHI INFO SECTION
------------------------------------------------- */
const menuItems = document.querySelectorAll(".info-menu li");
const infoTitle = document.getElementById("info-title");
const infoText1 = document.getElementById("info-text-1");
const infoText2 = document.getElementById("info-text-2");
const infoImg = document.getElementById("info-img");

// Wrapper for height animation
const infoTextWrapper = infoText1.parentElement;

const infoImages = {
  history: "assets/images/info/history.jpg",
  education: "assets/images/info/education.jpg",
  legislation: "assets/images/info/legislation.jpg",
  practice: "assets/images/info/practice.jpg",
  research: "assets/images/info/research.jpg"
};

menuItems.forEach(item => {
  item.addEventListener("click", () => {

    /* Highlight active */
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const section = item.dataset.section;

    /* Update translation keys */
    infoTitle.setAttribute("data-i18n", `info_${section}`);
    infoText1.setAttribute("data-i18n", `info_${section}_text`);
    infoText2.setAttribute("data-i18n", `info_${section}_text2`);
    infoImg.src = infoImages[section];

    /* Reload language */
    loadLanguage(currentLanguage);

    /* ---------------------------
       FADE-IN ANIMATION
    ----------------------------*/
    infoTitle.classList.remove("fade");
    infoText1.classList.remove("fade");
    infoText2.classList.remove("fade");
    infoImg.classList.remove("fade");

    void infoTitle.offsetWidth;
    void infoText1.offsetWidth;
    void infoText2.offsetWidth;
    void infoImg.offsetWidth;

    infoTitle.classList.add("fade");
    infoText1.classList.add("fade");
    infoText2.classList.add("fade");
    infoImg.classList.add("fade");

    /* ---------------------------
       SMOOTH HEIGHT ANIMATION
    ----------------------------*/
    setTimeout(() => {
      const newHeight = infoTextWrapper.scrollHeight;
      infoTextWrapper.style.height = newHeight + "px";
    }, 10);
  });
});
