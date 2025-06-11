'use strict';

/* ===========================
   Inicializar validación
=========================== */
window.addEventListener('load', function () {
  var formulario = document.getElementById('formulario-contacto');
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var nombre = document.getElementById('nombre').value.trim();
    var email = document.getElementById('email').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();

    if (!validarNombre(nombre)) {
      alert('Nombre inválido. Debe ser alfanumérico y mínimo 3 letras.');
      return;
    }

    if (!validarEmail(email)) {
      alert('Correo electrónico inválido.');
      return;
    }

    if (mensaje.length < 5) {
    alert('El mensaje debe tener al menos 5 caracteres.');
    return;
    }

    // Construir enlace mailto y abrir la herramienta predeterminada
    var asunto = 'Contacto desde Minesweeper';
    var cuerpo = 'Nombre: ' + nombre + '%0A' +
                  'Correo: ' + email + '%0A' +
                  'Mensaje: ' + mensaje;

    window.location.href = 'mailto:destinatario@ejemplo.com?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
  });
});

/* ===========================
   Validar nombre
=========================== */
function validarNombre(nombre) {
  var regex = /^[a-zA-Z0-9 ]{3,}$/;
  return regex.test(nombre);
}

/* ===========================
   Validar email
=========================== */
function validarEmail(email) {
  var regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
