document.addEventListener("DOMContentLoaded", function() {
    const botonSuerte = document.getElementById("botonSuerte");
    const menuCantidad = document.querySelector(".menu-cantidad");

    // Manejador de evento para mostrar/ocultar el menú al hacer clic en el botón "Boletos a la suerte"
    botonSuerte.addEventListener('click', () => {
        if (menuCantidad.style.display === "none" || menuCantidad.style.display === "") {
            menuCantidad.style.display = "block"; // Muestra el menú
        } else {
            menuCantidad.style.display = "none"; // Oculta el menú
        }
    });
});
