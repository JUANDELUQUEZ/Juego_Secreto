/*Manerae en que se puede asignar un texto a un elemento HTML usando JavaScript. 
let titulo = document.querySelector("h1"); // Esta línea selecciona el elemento h1 en el documento HTML
titulo.innerHTML = "Juego del Numero Secreto"; // Esta línea establece el contenido HTML del elemento h1 como "Juego del Numero Secreto" */

//Variables
let numeroSecretoGenerado = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
//Funciones
function asignarTextoElemento(elemento, texto) {
  let titulo = document.querySelector(elemento);
  titulo.innerHTML = texto;
  let parrafo = document.querySelector(elemento);
  parrafo.innerHTML = texto;
}
function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

  if (numeroDeUsuario === numeroSecretoGenerado) {
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentos} ${
        intentos === 1 ? "intento." : "intentos."
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroDeUsuario < numeroSecretoGenerado) {
      asignarTextoElemento("p", "El numero secreto es mayor");
    } else {
      asignarTextoElemento("p", "El numero secreto es menor");
    }
    intentos++;
    limpiarCaja();
  }

  return; // Verifica si el número ingresado por el usuario es igual al número secreto
}

function limpiarCaja() {
  let valorCaja = document.querySelector("#valorUsuario");
  valorCaja.value = "";
}

function condicionesIniciales() {
  numeroSecretoGenerado = numeroSecreto();
  asignarTextoElemento("h1", "Juego del Numero Secreto");
  asignarTextoElemento(
    "p",
    `Adivina el número secreto entre 1 y ${numeroMaximo}`
  );
  intentos = 1;
}

function reiniciarJuego() {
  // 1. Limpíar la caja.
  limpiarCaja();
  // 2.Iniciar el mensaje de los intervalos de los números.
  // 3. Generar el número aleatorio.
  // 5. Inicializar nuevamente el contador de los intentos.
  condicionesIniciales();
  // 4. Deshabilitar el boton de reinicio hasta que el usuario acerte el numero.
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

function numeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; // Genera un número aleatorio entre 1 y 10

  // Verificamos si ya sorteamos todos los números posibles

  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento(
      "p",
      "Ya no hay más números secretos posibles. Reinicia el juego."
    );
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return numeroSecreto(); // Si el número ya fue sorteado, llamamos a la función recursivamente para generar otro número
    } else {
      listaNumerosSorteados.push(numeroGenerado); // Agrega el número a la lista de números sorteados
      // SOLO AQUÍ imprimimos
      console.log("Número generado:", numeroGenerado);
      console.log("Lista actualizada:", listaNumerosSorteados);
      return numeroGenerado; // Retorna el número secreto generado
    }
  }
}
condicionesIniciales();
