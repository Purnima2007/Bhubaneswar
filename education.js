// ---------------- Fade-in on Scroll ----------------
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
faders.forEach(fader => appearOnScroll.observe(fader));

// ---------------- Floating Particle Background ----------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1.;
    this.speedY = (Math.random() - 0.5) * 1.;
    // this.color = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Wrap around edges
    // if (this.x > canvas.width) this.x = 0;
    // if (this.x < 0) this.x = canvas.width;
    // if (this.y > canvas.height) this.y = 0;
    // if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle ="rgba(255,255,255,0.7)" ;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

// Resize canvas
initParticles();
animateParticles();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

// ---------------- Slideshow Carousel ----------------
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

function showSlide(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  slides.forEach(slide => slide.style.display = "none");
  slides[slideIndex].style.display = "block";
}

// Initial display
showSlide(slideIndex);

// Next/Prev controls
next.addEventListener('click', () => {
  slideIndex++;
  showSlide(slideIndex);
});
prev.addEventListener('click', () => {
  slideIndex--;
  showSlide(slideIndex);
});

// Auto-slide every 5 seconds
setInterval(() => {
  slideIndex++;
  showSlide(slideIndex);
}, 5000);
