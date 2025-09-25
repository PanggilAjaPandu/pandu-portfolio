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
