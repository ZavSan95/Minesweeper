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
    ranking.forEach(function (registro, index) {
    const item = document.createElement('div');
    item.classList.add('item-ranking');

    // Agregar clase para top 3
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