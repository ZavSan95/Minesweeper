'use strict';

/* ===========================
   Variables globales
=========================== */
var filas = 8;
var columnas = 8;
var minasTotales = 10;
var minasRestantes = minasTotales;
var tablero = [];
var juegoActivo = false;
var temporizador = null;
var tiempo = 0;
var sonidoMina = new Audio('sounds/explosion.mp3');    // Cuando explota la mina
var sonidoVictoria = new Audio('sounds/victory.mp3');  // Cuando gana
var sonidoDerrota = new Audio('sounds/defeat.mp3');    // Cuando pierde
var sonidoBandera = new Audio('sounds/flag.mp3');// Cuando coloca o quita bandera


/* ===========================
   Inicializar el juego
=========================== */
function inicializarJuego() {
  tablero = [];
  juegoActivo = true;
  tiempo = 0;
  minasRestantes = minasTotales;

  // Reiniciar tablero visual
  var tableroHTML = document.getElementById('tablero');
  tableroHTML.innerHTML = '';

  // Crear la matriz del tablero
  var i, j;
  for (i = 0; i < filas; i++) {
    tablero[i] = [];
    for (j = 0; j < columnas; j++) {
      tablero[i][j] = {
        mina: false,
        revelada: false,
        bandera: false,
        minasVecinas: 0
      };
    }
  }

  // Colocar minas aleatoriamente
  colocarMinasAleatorias();

  // Contar minas vecinas para cada celda
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      tablero[i][j].minasVecinas = contarMinasVecinas(i, j);
    }
  }

  // Crear el HTML dinámico del tablero
  crearTableroHTML();

  // Actualizar contador minas
  actualizarContadorMinas();

  // Resetear temporizador visual
  document.getElementById('temporizador').innerHTML = 'Tiempo: 0';
}

/* ===========================
   Colocar minas aleatorias
=========================== */
function colocarMinasAleatorias() {
  var minasColocadas = 0;
  while (minasColocadas < minasTotales) {
    var fila = Math.floor(Math.random() * filas);
    var columna = Math.floor(Math.random() * columnas);

    if (!tablero[fila][columna].mina) {
      tablero[fila][columna].mina = true;
      minasColocadas++;
    }
  }
}

/* ===========================
   Contar minas vecinas
=========================== */
function contarMinasVecinas(fila, columna) {
  var total = 0;
  var i, j;
  for (i = fila - 1; i <= fila + 1; i++) {
    for (j = columna - 1; j <= columna + 1; j++) {
      if (i >= 0 && i < filas && j >= 0 && j < columnas) {
        if (tablero[i][j].mina) {
          total++;
        }
      }
    }
  }
  return total;
}

/* ===========================
   Crear tablero en HTML
=========================== */
function crearTableroHTML() {

  var tableroHTML = document.getElementById('tablero');

  var i, j, celda;
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      celda = document.createElement('div');
      celda.className = 'celda';
      celda.setAttribute('data-fila', i);
      celda.setAttribute('data-columna', j);

      tableroHTML.appendChild(celda);
    }
  }
}

/* ===========================
   Actualizar contador minas
=========================== */
function actualizarContadorMinas() {
  document.getElementById('contador-minas').innerHTML = 'Minas: ' + (minasTotales - contarBanderas());
}

/* ===========================
   Contar banderas
=========================== */
function contarBanderas() {
  var total = 0;
  var i, j;
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      if (tablero[i][j].bandera) {
        total++;
      }
    }
  }
  return total;
}

/* ===========================
   Revelar celda
=========================== */
function revelarCelda(fila, columna) {
  if (!juegoActivo || tablero[fila][columna].revelada || tablero[fila][columna].bandera) {
    return;
  }

  var celda = obtenerCeldaHTML(fila, columna);
  tablero[fila][columna].revelada = true;
  celda.classList.add('revelada');

  // Iniciar temporizador si es el primer clic
  if (tiempo === 0) {
    iniciarTemporizador();
  }

  // Revelar mina
    if (tablero[fila][columna].mina) {
    sonidoMina.play();
    celda.classList.add('mina');
    terminarJuego(false);
    return;
    }

  // Mostrar número de minas vecinas si > 0
  var minasVecinas = tablero[fila][columna].minasVecinas;
  if (minasVecinas > 0) {
    celda.innerHTML = minasVecinas;
  } else {
    // Expansión recursiva si la celda está vacía
    expansionRecursiva(fila, columna);
  }

  // Verificar si ganó la partida
  verificarVictoria();
}

/* ===========================
   Expansión recursiva
=========================== */
function expansionRecursiva(fila, columna) {
  var i, j;
  for (i = fila - 1; i <= fila + 1; i++) {
    for (j = columna - 1; j <= columna + 1; j++) {
      if (i >= 0 && i < filas && j >= 0 && j < columnas) {
        if (!tablero[i][j].revelada && !tablero[i][j].mina && !tablero[i][j].bandera) {
          var celdaVecina = obtenerCeldaHTML(i, j);
          tablero[i][j].revelada = true;
          celdaVecina.classList.add('revelada');

          var minasVecinas = tablero[i][j].minasVecinas;
          if (minasVecinas > 0) {
            celdaVecina.innerHTML = minasVecinas;
          } else {
            // Recursividad para seguir expandiendo
            expansionRecursiva(i, j);
          }
        }
      }
    }
  }
}

/* ===========================
   Obtener celda en HTML
=========================== */
function obtenerCeldaHTML(fila, columna) {
  return document.querySelector('.celda[data-fila="' + fila + '"][data-columna="' + columna + '"]');
}

/* ===========================
   Reiniciar juego
=========================== */
function reiniciarJuego() {
  var caraJuego = document.getElementById('cara-juego');
  caraJuego.src = 'img/cara-feliz.png';
  inicializarJuego();
}

/* ===========================
   Iniciar temporizador
=========================== */
function iniciarTemporizador() {
  if (temporizador) return; // No inicia uno nuevo si ya está activo
  temporizador = setInterval(function () {
    tiempo++;
    document.getElementById('temporizador').innerHTML = 'Tiempo: ' + tiempo;
  }, 1000);
}

/* ===========================
   Verificar victoria
=========================== */
function verificarVictoria() {
  var celdasReveladas = 0;
  var i, j;
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      if (tablero[i][j].revelada) {
        celdasReveladas++;
      }
    }
  }

  var totalCeldasSinMinas = filas * columnas - minasTotales;
  if (celdasReveladas === totalCeldasSinMinas) {
    terminarJuego(true);
  }
}

/* ===========================
   Terminar el juego
=========================== */
function terminarJuego(gano) {
  juegoActivo = false;

  clearInterval(temporizador);
  temporizador = null;  // ✅ Resetea la referencia del temporizador

  var nombreJugador = document.getElementById('nombre-jugador').value;

  // Guardar en ranking
  guardarResultado(nombreJugador, gano);

  var caraJuego = document.getElementById('cara-juego');
  if (gano) {
    sonidoVictoria.play();
    caraJuego.src = 'img/cara-gano.png';
    mostrarModal('¡Ganaste la partida!');
  } else {
    sonidoDerrota.play();  // 🔊 Sonido de derrota
    caraJuego.src = 'img/cara-perdio.png';
    mostrarModal('¡Perdiste la partida!');
    revelarTodasLasMinas();
  }
}



/* ===========================
   Revelar todas las minas al perder
=========================== */
function revelarTodasLasMinas() {
  var i, j;
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      if (tablero[i][j].mina) {
        var celda = obtenerCeldaHTML(i, j);
        celda.classList.add('mina');
      }
    }
  }
}

/* ===========================
   Guardar resultado en ranking
=========================== */
function guardarResultado(nombre, gano) {
  var fechaHora = new Date().toLocaleString();
  var puntaje = gano ? 100 : 0; // Por ejemplo, 100 si ganó, 0 si perdió (podés ajustar)
  var duracion = tiempo; // Usamos la variable tiempo global

  var resultado = {
    nombre: nombre,
    puntaje: puntaje,
    fecha: fechaHora,
    duracion: duracion
  };

  // Obtener ranking actual
  var ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  ranking.push(resultado);

  // Guardar ranking actualizado
  localStorage.setItem('ranking', JSON.stringify(ranking));
}

/* ===========================
   Mostrar ranking en el modal
=========================== */
function mostrarRanking() {
  var lista = document.getElementById('lista-ranking');
  lista.innerHTML = '';

  var ranking = JSON.parse(localStorage.getItem('ranking')) || [];

  // Ordenar por puntaje descendente
  ranking.sort(function (a, b) {
    return b.puntaje - a.puntaje;
  });

  // Generar HTML
  ranking.forEach(function (registro) {
    var item = document.createElement('div');
    item.textContent = 'Jugador: ' + registro.nombre +
                        ' | Puntaje: ' + registro.puntaje +
                        ' | Fecha: ' + registro.fecha +
                        ' | Duración: ' + registro.duracion + 's';
    lista.appendChild(item);
  });

  document.getElementById('modal-ranking').classList.remove('oculto');
}



