
const bgMusic = document.getElementById("bg-music");
const playBtn = document.getElementById("play-button");
const introText = document.getElementById("intro-text");
const startScreen = document.getElementById("start-screen");
const mainContent = document.getElementById("main-content");
const musicToggle = document.getElementById("music-toggle");

const introMessages = ["Welcome to my portfolio", "Enjoy", "🤘😎🖐️"];
const durations = [2000, 1000, 2000]; 

let introIndex = 0;


if (playBtn) {
  playBtn.addEventListener("click", async () => {
    // Try to play background music if available (user gesture required by browsers)
    try {
      if (bgMusic && typeof bgMusic.play === 'function') {
        await bgMusic.play();
      } else {
        console.warn('bgMusic element not found or play() unavailable.');
      }
    } catch (err) {
      console.warn("Audio failed to play:", err);
    }

    // hide play button
    playBtn.classList.add("hidden");

    // show intro text if present
    if (introText) {
      introText.style.display = "block";
    }

    runIntroSequence();
  });
}

function runIntroSequence() {
  // Defensive: ensure required elements exist
  if (!introText || !startScreen || !mainContent) {
    startScreen?.classList?.add?.("hidden");
    mainContent?.classList?.add?.("visible");
    return;
  }

  if (introIndex < introMessages.length) {
    introText.textContent = introMessages[introIndex];
    introText.classList.remove("shake");
    void introText.offsetWidth;
    introText.classList.add("shake");

    const wait = durations[introIndex] ?? 1000;
    setTimeout(() => {
      introIndex++;
      runIntroSequence();
    }, wait);
  } else {
    setTimeout(() => {
      startScreen.classList.add("hidden");
      mainContent.classList.add("visible");
    }, 500);
  }
}



if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (!bgMusic) {
      console.warn('No bgMusic element to toggle.');
      return;
    }

    if (bgMusic.muted) {
      bgMusic.muted = false;
      musicToggle.textContent = "🔊";
    } else {
      bgMusic.muted = true;
      musicToggle.textContent = "🔇";
    }
  });
}


const counters = document.querySelectorAll(".counter");

function animateCounters() {
  counters.forEach(counter => {
    counter.innerText = "0";
    const target = +counter.getAttribute("data-target");
    if (!target) return;

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / 200); 
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


window.addEventListener("load", animateCounters);


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


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // If href is missing or just '#', scroll to top
    if (!href || href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      // Target not found; warn and let default behavior occur
      console.warn(`Anchor target not found for selector: ${href}`);
    }
  });
});
