/* ===========================
   Typewriter Effect
=========================== */
const typewriter = document.getElementById("typewriter");
const texts = [
  "AI Engineer",
  "Informatics Student at Brawijaya University",
  "Building Healthier AI Environments"
];

let i = 0; 
let j = 0; 
let currentText = "";
let isDeleting = false;

function type() {
  currentText = texts[i];

  if (!isDeleting) {
    typewriter.innerHTML = currentText.substring(0, j + 1);
    j++;
    if (j === currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500);
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

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}
document.addEventListener("DOMContentLoaded", type);

/* ===========================
   Counter Animation
=========================== */
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  counter.innerText = "0";
  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const c = +counter.innerText;
    const increment = target / 200;
    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});

/* ===========================
   Navbar Active Link
=========================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ===========================
   Scroll Animations (Fade Up & Down)
=========================== */
const scrollElements = document.querySelectorAll(".scroll-animate");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;

  scrollElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100 && elementTop > 50) {
      if (scrollTop > lastScrollTop) {
        // scrolling down
        el.classList.add("show-up");
        el.classList.remove("show-down");
      } else {
        // scrolling up
        el.classList.add("show-down");
        el.classList.remove("show-up");
      }
    }
  });

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);
