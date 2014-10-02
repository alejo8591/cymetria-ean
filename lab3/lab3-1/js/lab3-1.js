var element = document.querySelector("canvas");

var context = element.getContext('2d');

// Colocando el color a mi contexto
context.fillStyle = "#333";

// fillRect es fillRectangle(x, y, ancho, alto)
context.fillRect(10, 10, 200, 200);