// AA 18 - Juego de Tateti en JS/HTML/CSS

const celdas = document.querySelectorAll(".celda");
const estado = document.querySelector("#estado");
const btnReiniciar = document.querySelector("#btn-reiniciar");
const btnResetear = document.querySelector("#btn-resetear");
const puntosX = document.querySelector("#puntos-x");
const puntosO = document.querySelector("#puntos-o");
const puntosEmpate = document.querySelector("#puntos-empate");
const cajaX = document.querySelector(".jugador-x");
const cajaO = document.querySelector(".jugador-o");

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

let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
let juegoTerminado = false;
let marcador = { X: 0, O: 0, empates: 0 };

// Se ejecuta cada vez que se hace click en una celda
function jugar(evento) {
  const celda = evento.target;
  const indice = Number(celda.dataset.indice);

  if (tablero[indice] !== "" || juegoTerminado) {
    return;
  }

  tablero[indice] = turno;
  celda.textContent = turno;
  celda.classList.add(turno.toLowerCase());
  celda.disabled = true;

  const combinacion = buscarGanador();

  if (combinacion) {
    terminarPartida(combinacion);
  } else if (!tablero.includes("")) {
    terminarEmpate();
  } else {
    cambiarTurno();
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
  estado.textContent = "¡Ganó " + turno + "!";

  combinacion.forEach(function (indice) {
    celdas[indice].classList.add("ganadora");
  });

  marcador[turno]++;
  bloquearTablero();
  actualizarMarcador();
}

function terminarEmpate() {
  juegoTerminado = true;
  estado.textContent = "¡Empate!";
  marcador.empates++;
  actualizarMarcador();
}

function cambiarTurno() {
  turno = turno === "X" ? "O" : "X";
  estado.textContent = "Turno de " + turno;
  resaltarTurno();
}

function resaltarTurno() {
  cajaX.classList.toggle("activo", turno === "X" && !juegoTerminado);
  cajaO.classList.toggle("activo", turno === "O" && !juegoTerminado);
}

function bloquearTablero() {
  celdas.forEach(function (celda) {
    celda.disabled = true;
  });
}

function actualizarMarcador() {
  puntosX.textContent = marcador.X;
  puntosO.textContent = marcador.O;
  puntosEmpate.textContent = marcador.empates;
  resaltarTurno();
}

// Limpia el tablero para una nueva partida (el marcador se mantiene)
function reiniciarPartida() {
  tablero = ["", "", "", "", "", "", "", "", ""];
  turno = "X";
  juegoTerminado = false;
  estado.textContent = "Turno de X";

  celdas.forEach(function (celda) {
    celda.textContent = "";
    celda.disabled = false;
    celda.classList.remove("x", "o", "ganadora");
  });

  resaltarTurno();
}

function resetearMarcador() {
  marcador = { X: 0, O: 0, empates: 0 };
  actualizarMarcador();
  reiniciarPartida();
}

celdas.forEach(function (celda) {
  celda.addEventListener("click", jugar);
});

btnReiniciar.addEventListener("click", reiniciarPartida);
btnResetear.addEventListener("click", resetearMarcador);

resaltarTurno();
