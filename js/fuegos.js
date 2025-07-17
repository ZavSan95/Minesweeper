'use strict';

const canvas = document.getElementById('canvas-fuegos');
const ctx = canvas.getContext('2d');
let fireworks = [];
let animation;

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

function crearFuego() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const colores = ['#ff0043', '#14fc56', '#1e90ff', '#ffff00', '#ff00ff'];
  const color = colores[Math.floor(Math.random() * colores.length)];
  for (let i = 0; i < 60; i++) {
    fireworks.push({
      x: x,
      y: y,
      dx: Math.random() * 4 - 2,
      dy: Math.random() * 4 - 2,
      life: 120,
      color: color
    });
  }
}

function animarFuegos() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((fuego, index) => {
    fuego.x += fuego.dx;
    fuego.y += fuego.dy;
    fuego.life--;
    ctx.fillStyle = fuego.color;
    ctx.beginPath();
    ctx.arc(fuego.x, fuego.y, 2, 0, Math.PI * 2);
    ctx.fill();
    if (fuego.life <= 0) fireworks.splice(index, 1);
  });

  if (fireworks.length > 0) {
    animation = requestAnimationFrame(animarFuegos);
  } else {
    canvas.classList.add('oculto');
    cancelAnimationFrame(animation);
  }
}

function lanzarFuegos() {
  canvas.classList.remove('oculto');
  fireworks = []; 

  // Crear fuegos con delay y animar al final
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      crearFuego();

      // Iniciar animación solo en el último
      if (i === 4) {
        animarFuegos();
      }
    }, i * 300);
  }
}
