'use strict';

/* ===========================
   Inicialización de eventos
=========================== */
window.addEventListener('load', function () {
  // Botón de iniciar partida
  var botonIniciar = document.getElementById('boton-iniciar');
  botonIniciar.addEventListener('click', function () {
    var nombreJugador = document.getElementById('nombre-jugador').value;
    if (validarNombre(nombreJugador)) {
      inicializarJuego();
    } else {
      mostrarModal('Nombre inválido. Debe tener al menos 3 letras.');
    }
  });

  // Botón de reinicio
  var botonReiniciar = document.getElementById('boton-reiniciar');
  botonReiniciar.addEventListener('click', reiniciarJuego);

  // Delegación de eventos para las celdas
  var tableroHTML = document.getElementById('tablero');
  tableroHTML.addEventListener('click', manejarClickIzquierdo);
  tableroHTML.addEventListener('contextmenu', manejarClickDerecho);
});

/* ===========================
   Validar nombre del jugador
=========================== */
function validarNombre(nombre) {
  if (nombre && nombre.length >= 3) {
    return true;
  }
  return false;
}

/* ===========================
   Manejar clic izquierdo
=========================== */
function manejarClickIzquierdo(evento) {
  if (!juegoActivo) {
    mostrarModal('Debes iniciar la partida primero.');
    return;
  }

  const celda = evento.target;
  if (celda.classList.contains('celda')) {
    const fila = parseInt(celda.getAttribute('data-fila'), 10);
    const columna = parseInt(celda.getAttribute('data-columna'), 10);

    if (!tablero[fila][columna].revelada && !tablero[fila][columna].bandera) {
      revelarCelda(fila, columna);
    }
  }
}


/* ===========================
   Manejar clic derecho
=========================== */
function manejarClickDerecho(evento) {
  evento.preventDefault();

  if (!juegoActivo) {
    mostrarModal('Debes iniciar la partida primero.');
    return;
  }

  const celda = evento.target;
  if (celda.classList.contains('celda')) {
    const fila = parseInt(celda.getAttribute('data-fila'), 10);
    const columna = parseInt(celda.getAttribute('data-columna'), 10);

    if (!tablero[fila][columna].revelada) {
      if (tablero[fila][columna].bandera) {
        tablero[fila][columna].bandera = false;
        celda.classList.remove('bandera');
      } else {
        tablero[fila][columna].bandera = true;
        celda.classList.add('bandera');
        sonidoBandera.play();
      }
      actualizarContadorMinas();
    }
  }
}

/* ===========================
   Inicializar tablero vacío
=========================== */
function inicializarTableroVacio() {
  tablero = [];
  for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (let j = 0; j < columnas; j++) {
      tablero[i][j] = {
        mina: false,
        revelada: false,
        bandera: false,
        minasVecinas: 0
      };
    }
  }
}



/* ===========================
   Reiniciar Dificultad
=========================== */
document.getElementById('nivel-dificultad').addEventListener('change', function () {
  if (juegoActivo) {
    mostrarModal('No podés cambiar la dificultad durante una partida.');
    // Revertir al valor anterior
    this.value = dificultadActual;
    return;
  }

  aplicarDificultad();
  minasRestantes = minasTotales;
  inicializarTableroVacio();
  crearTableroHTML();
  actualizarContadorMinas();
  document.getElementById('temporizador').innerHTML = 'Tiempo: 0';
});




