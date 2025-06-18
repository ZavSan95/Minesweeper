# 💣 Buscaminas Clásico (Minesweeper Retro Style)

Este es un proyecto web del clásico juego **Buscaminas**, con una estética fiel al estilo de **Windows 98/XP**, desarrollado con HTML, CSS y JavaScript. Incluye mejoras visuales, modo oscuro, ranking local y un formulario de contacto integrado.

---

## 🎮 Características

- Tablero dinámico (8x8 por defecto).
- Contador de minas y temporizador con fuente digital.
- Sistema de banderas e interacción clásica con clic derecho.
- Modal de victoria/derrota con sonidos personalizados.
- Guardado de partidas ganadas en **ranking local** (localStorage).
- Estilo retro 3D con bordes `inset/outset`.
- Soporte de **modo oscuro** con conmutador (`🌙 / ☀️`).
- Favicon pixel-art personalizado.
- Formulario de contacto estilizado al estilo del juego.

---

## 🖼️ Estilo visual

Inspirado en el clásico de Windows, incluyendo:

- Fuentes **monoespaciadas** (`monospace`) para toda la interfaz.
- Fuente **digital retro** para el marcador de tiempo/minas.
- Colores variables (`:root`) que permiten modo oscuro fácilmente.
- Ranking con diferenciación visual de los **3 mejores puestos** (oro, plata, bronce).

---

## 🚀 Cómo usar

1. Cloná el repositorio:

   git clone https://github.com/ZavSan95/Minesweeper.git
   cd Minesweeper

2. Abrí index.html en tu navegador

3. Jugá, probá el ranking, modo oscuro, y el formulario de contacto (contacto.html).


## 🌑 Modo oscuro
Podés alternar entre modo claro y oscuro usando el botón:

<button id="boton-modo-oscuro">🌙 Modo oscuro</button>

El estado se guarda en localStorage para mantenerlo entre sesiones.

## Estructura del proyecto

.
├── index.html
├── contacto.html
├── css/
│   ├── reset.css
│   └── estilo.css
├── js/
│   ├── main.js
│   ├── modal.js
│   ├── eventos.js
│   └── contacto.js
├── img/
│   ├── cara-feliz.png
│   ├── cara-gano.png
│   ├── cara-perdio.png
│   ├── bandera.png
│   ├── mina.jpg
│   └── favicon.png
└── README.md

## 🔈  Sonidos
Asegurate de tener estos archivos en la carpeta sounds/ (si usás sonidos):

victory.mp3

defeat.mp3

click.mp3

bandera.mp3

## 🧪 Tecnologías usadas

HTML5

CSS3 (con box-shadow para efecto 3D)

JavaScript Vanilla (sin frameworks)

localStorage para ranking y modo oscuro

## ✍️ Autor
Santiago Zavatti
Desarrollado como parte de un trabajo para la materia DESARROLLO Y ARQUITECTURAS WEB - UAI - 2025.

## 📝 Licencia
Este proyecto es de uso libre para fines educativos o personales. Si lo usás, agradezco una mención. 🚀