'use strict';

/* ===========================
   Mostrar un modal con mensaje
=========================== */
function mostrarModal(mensaje) {
  var modal = document.getElementById('modal-resultado');
  var mensajeResultado = document.getElementById('mensaje-resultado');
  mensajeResultado.innerHTML = mensaje;
  modal.classList.remove('oculto');
}

/* ===========================
   Cerrar modal de resultado
=========================== */
window.addEventListener('load', function () {
  var botonCerrar = document.getElementById('boton-cerrar-modal');
  botonCerrar.addEventListener('click', function () {
    var modal = document.getElementById('modal-resultado');
    modal.classList.add('oculto');
  });

  // Modal de ranking 
  var botonCerrarRanking = document.getElementById('boton-cerrar-ranking');
  if (botonCerrarRanking) {
    botonCerrarRanking.addEventListener('click', function () {
      var modalRanking = document.getElementById('modal-ranking');
      modalRanking.classList.add('oculto');
    });
  }
});
