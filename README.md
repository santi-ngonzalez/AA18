# AA 18 - Tateti

Juego de tateti para dos jugadores hecho con HTML, CSS y JavaScript, en la versión donde cada jugador tiene tres fichas que después se pueden mover.

## Reglas

- 2 jugadores, cada uno con tres fichas iguales: "X" y "O".
- Los jugadores se turnan para colocar su ficha en una casilla vacía del tablero.
- Cuando los dos jugadores colocaron sus tres fichas, en cada turno mueven una de sus fichas a la casilla vecina más cercana que esté vacía.
- **Objetivo:** conseguir tres fichas iguales en línea vertical, horizontal o diagonal.

## Movimientos permitidos

```
0 | 1 | 2
---------
3 | 4 | 5
---------
6 | 7 | 8
```

- Las esquinas (0, 2, 6, 8) se mueven a sus dos lados y al centro.
- Los lados (1, 3, 5, 7) se mueven a sus dos esquinas y al centro.
- Desde el centro (4) se puede ir a cualquier casilla.

## Cómo jugar

1. Abrir `index.html` en el navegador.
2. Empieza X. Cada jugador hace click en una casilla vacía para colocar sus fichas.
3. Después de colocar las seis fichas, se hace click en una ficha propia para seleccionarla y luego en una de las casillas marcadas para moverla.

## Funcionalidades

- Fase de colocación y fase de movimiento.
- Resaltado de la ficha seleccionada y de las casillas a donde se puede mover.
- Detección de ganador y resaltado de la línea ganadora.
- Marcador de victorias de X y O.
- Botón para jugar una nueva partida y botón para reiniciar el marcador.
