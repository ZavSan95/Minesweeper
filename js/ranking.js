'use strict';

/* ===========================
   Guardar resultado en ranking
=========================== */
function guardarResultado(nombre, gano) {
  var fechaHora = new Date().toLocaleString();
  var puntaje = gano ? 100 : 0; 
  var duracion = tiempo; 

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

  // Obtener criterios de ordenamiento
  var criterio = document.getElementById('orden-ranking').value;
  var direccion = document.getElementById('direccion-ranking').value;

  // Ordenar ranking según criterio y dirección
  ranking.sort(function (a, b) {
    let resultado = 0;

    if (criterio === 'puntaje') {
      resultado = a.puntaje - b.puntaje;
    } else if (criterio === 'nombre') {
      resultado = a.nombre.localeCompare(b.nombre);
    } else if (criterio === 'fecha') {
      resultado = new Date(a.fecha) - new Date(b.fecha);
    }

    return direccion === 'asc' ? resultado : -resultado;
  });

  // Mostrar ranking
  ranking.forEach(function (registro, index) {
    const item = document.createElement('div');
    item.classList.add('item-ranking');

    if (index === 0) item.classList.add('puesto-1');
    else if (index === 1) item.classList.add('puesto-2');
    else if (index === 2) item.classList.add('puesto-3');

    item.innerHTML = `
        <div><strong>#${index + 1}</strong> ${registro.nombre}</div>
        <div>Puntaje: ${registro.puntaje} | ${registro.duracion}s</div>
        <div class="fecha-ranking">${registro.fecha}</div>
    `;

    lista.appendChild(item);
  });

  document.getElementById('modal-ranking').classList.remove('oculto');
}



/* ===========================
   Ver Ranking
=========================== */
document.getElementById('boton-ver-ranking').addEventListener('click', mostrarRanking);

/* ===========================
   Orden Ranking
=========================== */
document.getElementById('orden-ranking').addEventListener('change', mostrarRanking);
document.getElementById('direccion-ranking').addEventListener('change', mostrarRanking);