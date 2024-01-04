// Bloque 1: Se ejecuta cuando el documento se ha cargado completamente.
document.addEventListener("DOMContentLoaded", function() {    
    // Bloque 2: Establece referencias a elementos HTML específicos.
        const listaDeBoletos = document.getElementById("lista-de-boletos");
        const listaDeBoletosSeleccionados = document.querySelector(".lista-de-boletos-seleccionados");
        const menuCantidad = document.querySelector(".menu-cantidad ul");
        const inputNumero = document.getElementById("numero");
        const listaDeBoletosBuscados = document.querySelector(".lista-de-boletos-buscados");
  
    // Bloque 5: Crea botones iniciales y los agrega a la sección listaDeBoletos.
    for (let i = 0; i < 10000; i++) {
      const boton = document.createElement("button");
      const numeroFormateado = i.toString().padStart(4, "0");
      boton.textContent = numeroFormateado;
      boton.classList.add("boton-boleto");
      listaDeBoletos.appendChild(boton);
    }
  
    // Bloque 3: Define una función para generar boletos aleatorios.
    function generarBoletosAleatorios(cantidad) {
      // Bloque 4: Genera una lista de índices aleatorios y clona botones correspondientes.
      const indicesAleatorios = [];
      for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * 10000); // 10000 es el número de boletos generados
        indicesAleatorios.push(indiceAleatorio);
      }
  
      // Limpia la sección de boletos seleccionados.
      listaDeBoletosSeleccionados.innerHTML = "";
  
      // Clona los botones correspondientes a los índices aleatorios generados y los agrega a la sección de boletos seleccionados.
      indicesAleatorios.forEach(indice => {
        const boton = listaDeBoletos.children[indice].cloneNode(true);
        listaDeBoletosSeleccionados.appendChild(boton);
      });
    }
  
// Bloque 6: Agrega un manejador de eventos para la selección manual de botones.
listaDeBoletos.addEventListener("click", function(event) {
  const botonSeleccionado = event.target;
  if (botonSeleccionado.classList.contains("boton-boleto") && !botonSeleccionado.classList.contains("boton-boleto-seleccionado")) {
    botonSeleccionado.classList.add("boton-boleto-seleccionado"); // Agregar la clase para el estilo rojo
    const botonClonado = botonSeleccionado.cloneNode(true);
    listaDeBoletosSeleccionados.appendChild(botonClonado);
  }
});



    
  // Bloque 7: Agrega un manejador de eventos al menú de cantidad para generar boletos aleatorios.
  menuCantidad.addEventListener("click", function(event) {
    const cantidadSeleccionada = event.target.getAttribute("data-cantidad");
    if (cantidadSeleccionada) {
      generarBoletosAleatorios(parseInt(cantidadSeleccionada, 10));
      ordenarYEliminarDuplicados(listaDeBoletosSeleccionados);
    }
  });
  
    // Bloque 8: Agrega un manejador de eventos al input de número para buscar boletos.
    inputNumero.addEventListener("input", function(event) {
      const numeroBuscado = event.target.value;
      buscarBoleto(numeroBuscado);
    });
  
    // Bloque 9: Función para buscar boletos por número.
    function buscarBoleto(numeroBuscado) {
      listaDeBoletosBuscados.innerHTML = ""; // Limpia la sección de boletos buscados.
  
      const botones = listaDeBoletos.getElementsByClassName("boton-boleto");
      for (let i = 0; i < botones.length; i++) {
        const boton = botones[i];
        if (boton.textContent.includes(numeroBuscado)) {
          const botonClonado = boton.cloneNode(true);
          listaDeBoletosBuscados.appendChild(botonClonado);
        }
      }
    }
  
  // Bloque 10: Agrega un manejador de eventos a los botones en la lista de boletos buscados para clonarlos.
  listaDeBoletosBuscados.addEventListener("click", function(event) {
    const botonSeleccionado = event.target;
    if (botonSeleccionado.classList.contains("boton-boleto")) {
      if (!esBoletoRepetido(botonSeleccionado.textContent, listaDeBoletosSeleccionados)) {
        const botonClonado = botonSeleccionado.cloneNode(true);
        listaDeBoletosSeleccionados.appendChild(botonClonado);
        ordenarYEliminarDuplicados(listaDeBoletosSeleccionados);
      } else {
        alert("Boleto ya seleccionado");
      }
    }
  });

  function esBoletoRepetido(numeroBoleto, container) {
    const botones = container.getElementsByClassName("boton-boleto");
    for (let i = 0; i < botones.length; i++) {
      if (botones[i].textContent === numeroBoleto) {
        return true;
      }
    }
    return false;
  }

  function ordenarYEliminarDuplicados(container) {
    const botones = Array.from(container.getElementsByClassName("boton-boleto"));
    const numerosVistos = new Set();

    container.innerHTML = "";

    botones
      .sort((a, b) => a.textContent.localeCompare(b.textContent)) // Ordenar alfabéticamente
      .forEach(function(boton) {
        if (!numerosVistos.has(boton.textContent)) {
          numerosVistos.add(boton.textContent);
          container.appendChild(boton);
        }
      });
  }


   // Función para eliminar boletos seleccionados
   function eliminarBoletoSeleccionado(numeroBoleto) {
    const botonesSeleccionados = listaDeBoletosSeleccionados.getElementsByClassName("boton-boleto");
    for (let i = 0; i < botonesSeleccionados.length; i++) {
      if (botonesSeleccionados[i].textContent === numeroBoleto) {
        listaDeBoletosSeleccionados.removeChild(botonesSeleccionados[i]);
        return; // Sal del bucle una vez que se elimine el boleto
      }
    }
  }

  // Manejador de eventos para eliminar boletos seleccionados
  listaDeBoletosSeleccionados.addEventListener("click", function(event) {
    const botonSeleccionado = event.target;
    if (botonSeleccionado.classList.contains("boton-boleto")) {
      const numeroBoleto = botonSeleccionado.textContent;
      eliminarBoletoSeleccionado(numeroBoleto);
    }
  });
    


// Función para eliminar un botón por número
function eliminarBotonPorNumero(numero) {
  const listaDeBoletos = document.getElementById("lista-de-boletos");
  const botones = listaDeBoletos.querySelectorAll(".boton-boleto");
  
  botones.forEach(boton => {
    if (boton.textContent === numero) {
      listaDeBoletos.removeChild(boton);
    }
  });
}

// Llamada a la función para eliminar un botón con un número específico (puedes cambiar el número)
//PARAMETRO A MODIFICAR PARA AÑADIR NUMEROS NO EXISTENTES
//PARAMETRO A MODIFICAR PARA AÑADIR NUMEROS NO EXISTENTES
//PARAMETRO A MODIFICAR PARA AÑADIR NUMEROS NO EXISTENTES
//PARAMETRO A MODIFICAR PARA AÑADIR NUMEROS NO EXISTENTES
//PARAMETRO A MODIFICAR PARA AÑADIR NUMEROS NO EXISTENTES
function eliminarBotonesPorNumeros(numeros) {
  const listaDeBoletos = document.getElementById("lista-de-boletos");
  const botones = listaDeBoletos.querySelectorAll(".boton-boleto");

  numeros.forEach(numero => {
    botones.forEach(boton => {
      if (boton.textContent === numero) {
        listaDeBoletos.removeChild(boton);
      }
    });
  });
}

// Llamada a la función para eliminar múltiples botones
eliminarBotonesPorNumeros(["1017", "1127", "1542", "3948", "9874", "9999"]); //QUEDO EN: 9874







  });
  