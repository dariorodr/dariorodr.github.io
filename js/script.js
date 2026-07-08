/* =========================================================
   NAV — estado al hacer scroll
   ========================================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
});

/* =========================================================
   CONSTELACIÓN — inspirada en la red de nodos de la acuarela
   ========================================================= */
const canvas = document.getElementById('constellation');
const ctx = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const palette = ['#19AFC4', '#E0407E', '#F2916F'];
let nodes = [];
let width, height;

function resize() {
  const hero = document.querySelector('.hero');
  width = canvas.width = hero.offsetWidth;
  height = canvas.height = hero.offsetHeight;
  buildNodes();
}

function buildNodes() {
  const count = Math.max(18, Math.floor((width * height) / 38000));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: Math.random() * 1.6 + 1,
    color: palette[Math.floor(Math.random() * palette.length)],
  }));
}

function step() {
  ctx.clearRect(0, 0, width, height);

  // bias the field toward the right side, like the source image
  for (const n of nodes) {
    if (!reduceMotion) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }
  }

  // links
  const maxDist = Math.min(160, width * 0.16);
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.strokeStyle = `rgba(20, 21, 43, ${0.08 * (1 - dist / maxDist)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // nodes
  for (const n of nodes) {
    ctx.beginPath();
    ctx.fillStyle = n.color;
    ctx.globalAlpha = 0.55;
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  requestAnimationFrame(step);
}

resize();
window.addEventListener('resize', resize);
requestAnimationFrame(step);

/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  status.textContent = "Enviando mensaje...";

  try {
    const response = await fetch("https://formspree.io/f/mjgqqvgv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      status.textContent = "✅ ¡Mensaje enviado correctamente!";
      form.reset();
    } else {
      status.textContent =
        "❌ Ocurrió un error al enviar el mensaje.";
    }
  } catch (error) {
    status.textContent =
      "❌ No se pudo conectar con el servidor.";
  }
});