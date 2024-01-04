document.getElementById("refreshButton").addEventListener("click", function() {
  location.reload(true);
});




  var alertaMostrada = false;

  function mostrarAlertaPrimeraVez() {
    if (!alertaMostrada) {
      alert("¡Para asegurarnos de que obtenga los mejores boletos, por favor haga clic en 'Actualizar lista de boletos'. Luego, podrá seleccionar sus boletos. ¡Gracias! 😄🎉");
      alertaMostrada = true; // Marcar que la alerta ya se ha mostrado
    }
  }

  // Obtén todos los elementos con la clase "refresh-trigger"
  var refreshElements = document.querySelectorAll('.refresh-trigger');

  // Agrega un controlador de eventos a cada elemento
  refreshElements.forEach(function(element) {
    element.addEventListener("input", mostrarAlertaPrimeraVez);
  });

