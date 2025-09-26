/* ============================================================
   GLOBAL ELEMENTS
============================================================ */
const bgMusic = document.getElementById("bg-music");
const playBtn = document.getElementById("play-button");
const introText = document.getElementById("intro-text");
const startScreen = document.getElementById("start-screen");
const mainContent = document.getElementById("main-content");
const musicToggle = document.getElementById("music-toggle");

// intro messages
const introMessages = ["Welcome to my portfolio", "Enjoy", "🤘😎🖐️"];
const durations = [2000, 1000, 2000]; // durasi tiap pesan (ms)

let introIndex = 0;

/* ============================================================
   INTRO LOGIC
============================================================ */
if (playBtn) {
  playBtn.addEventListener("click", async () => {
    // play musik (harus setelah user klik agar lolos autoplay policy)
    try {
      await bgMusic.play();
    } catch (err) {
      console.log("Audio gagal diputar:", err);
    }

    // hilangkan tombol ▶
    playBtn.classList.add("hidden");

    // tampilkan intro text
    introText.style.display = "block";
    runIntroSequence();
  });
}

/**
 * jalankan teks intro bergantian
 */
function runIntroSequence() {
  if (introIndex < introMessages.length) {
    introText.textContent = introMessages[introIndex];
    introText.classList.remove("shake"); // reset dulu
    void introText.offsetWidth; // trik biar animasi bisa restart
    introText.classList.add("shake");

    setTimeout(() => {
      introIndex++;
      runIntroSequence();
    }, durations[introIndex]);
  } else {
    // setelah selesai, fade out overlay, fade in main content
    setTimeout(() => {
      startScreen.classList.add("hidden");
      mainContent.classList.add("visible");
    }, 500);
  }
}


/* ============================================================
   MUSIC TOGGLE
============================================================ */
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

/* ============================================================
   COUNTER ANIMATION (untuk angka Followers/Projects/Claps)
============================================================ */
const counters = document.querySelectorAll(".counter");

function animateCounters() {
  counters.forEach(counter => {
    counter.innerText = "0";
    const target = +counter.getAttribute("data-target");
    if (!target) return;

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / 200); // makin besar makin cepat
      if (current < target) {
        counter.innerText = `${current + increment}`;
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// jalankan animasi counter saat konten muncul
window.addEventListener("load", animateCounters);

/* ============================================================
   SCROLL ANIMATION (manual selain AOS)
============================================================ */
const scrollElements = document.querySelectorAll(".scroll-animate");

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 100)) {
      el.classList.add("show-up");
    } else {
      el.classList.remove("show-up");
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

handleScrollAnimation();

/* ============================================================
   TYPEWRITER EFFECT (optional kalau mau pakai di hero)
============================================================ */
const typewriter = document.getElementById("typewriter");
if (typewriter) {
  const text = "AI Engineer | Student | Dreamer";
  let i = 0;
  function typing() {
    if (i < text.length) {
      typewriter.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 100);
    }
  }
  typing();
}

/* ============================================================
   SMOOTH SCROLL (untuk klik navbar link)
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
