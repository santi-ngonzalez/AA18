// AA 18 - Juego de Tateti con movimiento de fichas

const celdas = document.querySelectorAll(".celda");
const estado = document.querySelector("#estado");
const btnReiniciar = document.querySelector("#btn-reiniciar");
const btnResetear = document.querySelector("#btn-resetear");
const puntosX = document.querySelector("#puntos-x");
const puntosO = document.querySelector("#puntos-o");
const restantesX = document.querySelector("#restantes-x");
const restantesO = document.querySelector("#restantes-o");
const cajaX = document.querySelector(".jugador-x");
const cajaO = document.querySelector(".jugador-o");

const FICHAS_POR_JUGADOR = 3;

// Todas las combinaciones posibles para ganar (filas, columnas y diagonales)
const combinacionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Casillas a las que se puede mover una ficha desde cada posición:
// Las esquinas se mueven a sus lados y al centro, los lados a sus esquinas y al centro, y desde el centro se puede ir a cualquier casilla.
const vecinos = {
  0: [1, 3, 4],
  1: [0, 2, 4],
  2: [1, 5, 4],
  3: [0, 6, 4],
  4: [0, 1, 2, 3, 5, 6, 7, 8],
  5: [2, 8, 4],
  6: [3, 7, 4],
  7: [6, 8, 4],
  8: [5, 7, 4]
};

let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
let juegoTerminado = false;
let fichasColocadas = { X: 0, O: 0 };
let seleccionada = null; // índice de la ficha elegida para mover
let marcador = { X: 0, O: 0 };

// Se está en la fase de movimiento cuando los dos jugadores colocaron sus 3 fichas
function faseMovimiento() {
  return fichasColocadas.X === FICHAS_POR_JUGADOR && fichasColocadas.O === FICHAS_POR_JUGADOR;
}

// Se ejecuta cada vez que se hace click en una celda
function jugar(evento) {
  const indice = Number(evento.target.dataset.indice);

  if (juegoTerminado) {
    return;
  }

  if (faseMovimiento()) {
    mover(indice);
  } else {
    colocar(indice);
  }
}

// Fase 1: cada jugador coloca sus fichas en casillas vacías
function colocar(indice) {
  if (tablero[indice] !== "") {
    return;
  }

  tablero[indice] = turno;
  fichasColocadas[turno]++;
  finalizarJugada();
}

// Fase 2: se elige una ficha propia y se la mueve a una casilla vecina vacía
function mover(indice) {
  // Click en una ficha propia: se selecciona (o se deselecciona si ya estaba elegida)
  if (tablero[indice] === turno) {
    seleccionada = seleccionada === indice ? null : indice;
    dibujarTablero();
    return;
  }

  if (seleccionada === null || !esMovimientoValido(seleccionada, indice)) {
    return;
  }

  tablero[indice] = turno;
  tablero[seleccionada] = "";
  seleccionada = null;
  finalizarJugada();
}

function esMovimientoValido(desde, hasta) {
  return tablero[hasta] === "" && vecinos[desde].includes(hasta);
}

// Después de colocar o mover se revisa si hay ganador; si no, pasa el turno
function finalizarJugada() {
  const combinacion = buscarGanador();

  if (combinacion) {
    terminarPartida(combinacion);
  } else {
    turno = turno === "X" ? "O" : "X";
    actualizarEstado();
    dibujarTablero();
  }
}

// Devuelve la combinación ganadora o null si nadie ganó todavía
function buscarGanador() {
  for (const combinacion of combinacionesGanadoras) {
    const [a, b, c] = combinacion;

    if (tablero[a] !== "" && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return combinacion;
    }
  }
  return null;
}

function terminarPartida(combinacion) {
  juegoTerminado = true;
  marcador[turno]++;
  estado.textContent = "¡Ganó " + turno + "!";
  dibujarTablero();

  combinacion.forEach(function (indice) {
    celdas[indice].classList.add("ganadora");
  });

  actualizarMarcador();
}

function actualizarEstado() {
  if (faseMovimiento()) {
    estado.textContent = "Turno de " + turno + ": elegí una ficha para mover";
  } else {
    estado.textContent = "Turno de " + turno + ": colocá una ficha";
  }
}

// Vuelve a pintar todas las celdas según el estado del tablero
function dibujarTablero() {
  celdas.forEach(function (celda, indice) {
    const valor = tablero[indice];

    celda.textContent = valor;
    celda.classList.remove("x", "o", "seleccionada", "destino", "ganadora");

    if (valor !== "") {
      celda.classList.add(valor.toLowerCase());
    }

    if (indice === seleccionada) {
      celda.classList.add("seleccionada");
    }

    // Marca las casillas a donde se puede mover la ficha seleccionada
    if (seleccionada !== null && esMovimientoValido(seleccionada, indice)) {
      celda.classList.add("destino");
    }

    celda.disabled = juegoTerminado;
  });

  restantesX.textContent = FICHAS_POR_JUGADOR - fichasColocadas.X;
  restantesO.textContent = FICHAS_POR_JUGADOR - fichasColocadas.O;
  resaltarTurno();
}

function resaltarTurno() {
  cajaX.classList.toggle("activo", turno === "X" && !juegoTerminado);
  cajaO.classList.toggle("activo", turno === "O" && !juegoTerminado);
}

function actualizarMarcador() {
  puntosX.textContent = marcador.X;
  puntosO.textContent = marcador.O;
}

// Limpia el tablero para una nueva partida (el marcador se mantiene)
function reiniciarPartida() {
  tablero = ["", "", "", "", "", "", "", "", ""];
  turno = "X";
  juegoTerminado = false;
  fichasColocadas = { X: 0, O: 0 };
  seleccionada = null;

  actualizarEstado();
  dibujarTablero();
}

function resetearMarcador() {
  marcador = { X: 0, O: 0 };
  actualizarMarcador();
  reiniciarPartida();
}

celdas.forEach(function (celda) {
  celda.addEventListener("click", jugar);
});

btnReiniciar.addEventListener("click", reiniciarPartida);
btnResetear.addEventListener("click", resetearMarcador);

reiniciarPartida();
