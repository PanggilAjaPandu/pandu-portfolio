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

const bgMusic = document.getElementById("bg-music");
const playBtn = document.getElementById("play-button");
const introText = document.getElementById("intro-text");
const startScreen = document.getElementById("start-screen");
const musicToggle = document.getElementById("music-toggle");

// Start screen logic
if (playBtn) {
  playBtn.addEventListener("click", async () => {
    try {
      // Pastikan musik dimulai langsung saat klik (biar lolos policy browser)
      await bgMusic.play();

      // Jalankan animasi intro text
      introText.style.display = "block";
      introText.innerText = "Welcome to my portfolio";
      introText.classList.add("shake");

      setTimeout(() => {
        introText.innerText = "Enjoy";
      }, 2000);

      setTimeout(() => {
        introText.innerText = "🤘😎🖐️";
      }, 3100);

      setTimeout(() => {
        startScreen.classList.add("hidden");
      }, 5000);

    } catch (err) {
      console.log("Audio gagal diputar:", err);
    }
  });
}

// Toggle mute/unmute musik
if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (bgMusic.muted) {
      bgMusic.muted = false;
      musicToggle.textContent = "🔊";
    } else {
      bgMusic.muted = true;
      musicToggle.textContent = "🔇";
    }
  });
}


// Toggle music mute/unmute
musicToggle.addEventListener("click", () => {
  if (bgMusic.muted) {
    bgMusic.muted = false;
    musicToggle.textContent = "🔊";
  } else {
    bgMusic.muted = true;
    musicToggle.textContent = "🔇";
  }
});
