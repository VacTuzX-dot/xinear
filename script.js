const canvas = document.getElementById("bokehCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.radius = Math.random() * 10 + 5;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.opacity = Math.random();
    this.speed = Math.random() * 0.5 + 0.2;
  }

  draw() {
    ctx.beginPath();
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = Math.max(0.5, 1 - dist / 300);

    ctx.arc(this.x, this.y, this.radius * scale, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity * scale})`;
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 20;
    ctx.fill();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -this.radius;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initParticles(num = 100) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => p.update());
  requestAnimationFrame(animate);
}

initParticles();
animate();
