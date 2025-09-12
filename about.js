// Fade-in effect
const faders = document.querySelectorAll(".fade-in, .about-section img");
const options = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, options);

faders.forEach(fader => appearOnScroll.observe(fader));

// Particle Background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Circle Progress Charts
function animateCircle(id, percentage, color) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  let start = 0;
  const radius = 60;
  const lineWidth = 10;
  const x = canvas.width / 2;
  const y = canvas.height / 2;

  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#444";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius, -Math.PI/2, (-Math.PI/2) + (2 * Math.PI * (start/100)));
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    if (start < percentage) {
      start++;
      requestAnimationFrame(drawFrame);
    }
  }
  drawFrame();
}

animateCircle("hinduChart", 80, "#ffcc00");
animateCircle("muslimChart", 12, "#00bfff");
animateCircle("christianChart", 5, "#32cd32");
animateCircle("otherChart", 3, "#ff4500");
animateCircle("maleChart", 52, "#1e90ff");
animateCircle("femaleChart", 48, "#ff69b4");
