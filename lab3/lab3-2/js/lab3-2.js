// función anonima que se ejecuta apenas carga el script
(function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	window.requestAnimationFrame = requestAnimationFrame;
})();

var element = document.querySelector("#animation");

var context = element.getContext('2d');

var x = y = 10;

var width = height = 200;

function logic(){
	++x;
	if(x < element.width - width){
		requestAnimationFrame(draw);
	}
}

function draw(){
	context.clearRect(0, 0, element.width, element.height);

	// de nuevo asignamos un color de relleno
	context.fillStyle = "#333";

	context.fillRect(x, y, 200, 200);
}

// mejorando el rendimiento del dibujado con el intervalo de tiempo definido

requestAnimationFrame(draw);

setInterval(logic, 1000/60);
