/* ===========================
   Scroll Reveal
=========================== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  for (let i = 0; i < reveals.length; i++) {
    const revealTop = reveals[i].getBoundingClientRect().top;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);

/* ===========================
   Animated Counters
=========================== */
const counters = document.querySelectorAll(".counter");

function runCounters() {
  counters.forEach(counter => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = target / 200; // adjust speed here

      if (current < target) {
        counter.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCounter, 15);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

window.addEventListener("load", runCounters);

/* ===========================
   Parallax Effect
=========================== */
window.addEventListener("scroll", function() {
  const scrolled = window.scrollY;
  const hero = document.querySelector(".hero");
  hero.style.backgroundPositionY = -(scrolled * 0.3) + "px";
});

/* ===========================
   Active Nav Highlight
=========================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
/* ===========================
   Typewriter Effect
=========================== */
const typewriter = document.getElementById("typewriter");
const texts = [
  "AI Engineer",
  "Informatics Student at Brawijaya University",
  "Building Healthier AI Environments"
];

let i = 0; // index of texts
let j = 0; // index of character
let currentText = "";
let isDeleting = false;

function type() {
  currentText = texts[i];

  if (!isDeleting) {
    typewriter.innerHTML = currentText.substring(0, j + 1);
    j++;
    if (j === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500); // wait before deleting
      return;
    }
  } else {
    typewriter.innerHTML = currentText.substring(0, j - 1);
    j--;
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
    }
  }

  const speed = isDeleting ? 60 : 100; // typing & deleting speed
  setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", type);

/* ===========================
   Scroll Animations Fade Up & Down
=========================== */
const scrollElements = document.querySelectorAll(".scroll-animate");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;

  scrollElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100 && rect.bottom > 100;

    if (inView) {
      if (scrollTop > lastScrollTop) {
        // scrolling down → fade up
        el.classList.add("show-up");
        el.classList.remove("show-down");
      } else {
        // scrolling up → fade down
        el.classList.add("show-down");
        el.classList.remove("show-up");
      }
    } else {
      // Reset kalau keluar layar
      el.classList.remove("show-up");
      el.classList.remove("show-down");
    }
  });

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
/* === Start Screen Logic === */
const startScreen = document.getElementById("start-screen");
const playBtn = document.getElementById("play-button");
const introText = document.getElementById("intro-text");
const bgMusic = document.getElementById("bg-music");

playBtn.addEventListener("click", () => {
  // Play musik
  bgMusic.play();

  // Sembunyikan tombol Play
  playBtn.style.display = "none";
  introText.style.display = "block";

  // Step 1: Welcome
  introText.textContent = "Welcome to my portfolio";

  setTimeout(() => {
    // Step 2: Enjoy
    introText.textContent = "Enjoy";
  }, 2000); // 2 detik

  setTimeout(() => {
    // Step 3: 😎 + shake
    introText.textContent = "😎";
    introText.classList.add("shake");
  }, 3000); // 2 + 1 detik

  setTimeout(() => {
    // Step 4: Hilangkan overlay
    startScreen.classList.add("hidden");
    setTimeout(() => {
      startScreen.style.display = "none";
    }, 1000);
  }, 5000); // total 2 + 1 + 2 detik
});
