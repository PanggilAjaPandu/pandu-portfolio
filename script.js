// REPLACE or MERGE into your script.js
// Defensive DOM references
const bgMusic = document.getElementById("bg-music");
const playBtn = document.getElementById("play-button");
const introText = document.getElementById("intro-text");
const startScreen = document.getElementById("start-screen");
const mainContent = document.getElementById("main-content");
const musicToggle = document.getElementById("music-toggle");
const reduceMotionToggle = document.getElementById("reduce-motion-toggle");
const themeToggle = document.getElementById("theme-toggle");
const particlesCanvas = document.getElementById("particles");
const progressBar = document.getElementById("scroll-progress-bar");

let introIndex = 0;
const introMessages = ["Welcome to my portfolio", "Enjoy the show", "Let’s build something epic"];
const durations = [1800, 1200, 2000];

// apply reduced motion preference initially
let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function applyReducedMotionPref(val){
  reducedMotion = !!val;
  if(reducedMotion){
    document.documentElement.style.setProperty('scroll-behavior','auto');
  } else {
    document.documentElement.style.removeProperty('scroll-behavior');
  }
}
applyReducedMotionPref(reducedMotion);

// Theme
function setTheme(dark){
  if(dark) document.documentElement.setAttribute('data-theme','dark');
  else document.documentElement.removeAttribute('data-theme');
}
setTheme(true); // default dark

if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (!bgMusic) return console.warn("No bgMusic element to toggle.");
    if (bgMusic.paused) {
      bgMusic.play().catch(()=>{/* ignore autoplay errors until user interaction */});
      musicToggle.textContent = "🔊";
      musicToggle.setAttribute("aria-pressed","true");
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🔇";
      musicToggle.setAttribute("aria-pressed","false");
    }
  });
}

if (reduceMotionToggle) {
  reduceMotionToggle.addEventListener("click", () => {
    applyReducedMotionPref(!reducedMotion);
    reduceMotionToggle.textContent = reducedMotion ? "💤" : "⚡";
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.hasAttribute('data-theme');
    setTheme(!isDark);
    themeToggle.textContent = isDark ? "🌗" : "🌞";
  });
}

if (playBtn) {
  playBtn.addEventListener("click", async () => {
    try {
      if (bgMusic && typeof bgMusic.play === "function") {
        const src = bgMusic.querySelector("source")?.src || bgMusic.src || "";
        if (!src) console.warn("No audio source found for bg-music.");
        await bgMusic.play().catch(()=>{/* autoplay blocked until user gesture */});
        musicToggle.textContent = "🔊";
      }
    } catch (err) {
      console.warn("Audio failed to play:", err);
    }

    playBtn.classList.add("hidden");

    if (introText) introText.style.display = "block";
    runIntroSequence();
  });
}

function runIntroSequence() {
  if (!introText || !startScreen || !mainContent) {
    startScreen?.classList?.add("hidden");
    mainContent?.classList?.add("visible");
    return;
  }

  if (introIndex < introMessages.length) {
    introText.textContent = introMessages[introIndex];
    introText.classList.remove("shake");
    void introText.offsetWidth;
    introText.classList.add("shake");
    const wait = durations[introIndex] ?? 1200;
    setTimeout(() => {
      introIndex++;
      runIntroSequence();
    }, wait);
  } else {
    setTimeout(() => {
      startScreen.classList.add("hidden");
      mainContent.classList.add("visible");
      mainContent.focus();
      // small validation log
      console.log("Start sequence finished, main content visible.");
    }, 500);
  }
}

// COUNTERS (kept from your file but slightly optimized)
const counters = document.querySelectorAll(".counter");
function animateCounters() {
  counters.forEach((counter) => {
    counter.innerText = "0";
    const targetAttr = counter.getAttribute("data-target");
    const target = targetAttr === null ? null : Number(targetAttr);
    if (target === null || Number.isNaN(target)) return;
    const increment = Math.max(1, Math.ceil(Math.abs(target) / 200));
    const step = () => {
      const current = Number(counter.innerText) || 0;
      if (current < target) {
        const next = Math.min(target, current + increment);
        counter.innerText = `${next}`;
        setTimeout(step, 12);
      } else {
        counter.innerText = `${target}`;
      }
    };
    step();
  });
}

// AOS fallback if unavailable
window.addEventListener("load", () => {
  animateCounters();
  setTimeout(() => {
    if (typeof AOS === "undefined") {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    }
  }, 1200);
});

// Smooth anchors fallback (kept)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    } else {
      console.warn(`Anchor target not found for selector: ${href}`);
    }
  });
});

// SCROLL PROGRESS
function updateProgress(){
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}
window.addEventListener('scroll', updateProgress);
window.addEventListener('resize', updateProgress);
updateProgress();

// PARTICLES CANVAS — lightweight, low CPU
(function initParticles(){
  if (!particlesCanvas) return;
  const ctx = particlesCanvas.getContext('2d');
  let W = particlesCanvas.width = innerWidth;
  let H = particlesCanvas.height = innerHeight;
  const particles = [];
  const count = Math.round(Math.max(30, Math.min(120, (innerWidth * innerHeight) / 90000)));

  function Particle(){
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2.2 + 0.6;
    this.alpha = 0.15 + Math.random() * 0.45;
  }
  for(let i=0;i<count;i++) particles.push(new Particle());

  function resize(){
    W = particlesCanvas.width = innerWidth;
    H = particlesCanvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);

  let rafId = null;
  function draw(){
    if (reducedMotion) {
      // Skip heavy animation when reduced motion enabled: draw static dim layer
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = 'rgba(0,0,0,0.0)';
      particles.forEach(p => {
        ctx.beginPath();
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = '#ffffff';
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
      });
      return;
    }

    ctx.clearRect(0,0,W,H);
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#cfe9ff';
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fill();

      // draw subtle links between nearby particles (sparse for perf)
      for (let j=idx+1;j<particles.length;j++){
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 85) {
          ctx.beginPath();
          ctx.globalAlpha = 0.02 + (0.04 * (1 - dist/85));
          ctx.strokeStyle = '#a6d2ff';
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
  }

  (function loop(){
    draw();
    rafId = requestAnimationFrame(loop);
  })();

  // expose for debugging
  window.__particles = { count: particles.length, stop: ()=> cancelAnimationFrame(rafId) };
})();

// Accessibility: reduce motion reacts to system change
window.matchMedia("(prefers-reduced-motion: reduce)").addListener((e)=> applyReducedMotionPref(e.matches));

// Minimal custom cursor (subtle)
(function customCursor(){
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.style.position = 'fixed';
  cursor.style.pointerEvents = 'none';
  cursor.style.width = '10px';
  cursor.style.height = '10px';
  cursor.style.borderRadius = '50%';
  cursor.style.background = 'rgba(255,255,255,0.9)';
  cursor.style.transform = 'translate(-50%,-50%)';
  cursor.style.zIndex = '3000';
  cursor.style.transition = 'transform .08s linear, width .12s ease, height .12s ease';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e)=>{
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mousedown', ()=> { cursor.style.transform = 'translate(-50%,-50%) scale(0.8)'; });
  document.addEventListener('mouseup', ()=> { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
})();

// initial console validations
console.log("Script loaded. Particles:", window.__particles?.count || 0);
