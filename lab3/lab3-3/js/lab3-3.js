(function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	window.requestAnimationFrame = requestAnimationFrame;
})();

var element = document.querySelector("#animation");

var context = element.getContext('2d');

var startX = 10;

var startY = 10;

var endX = element.width - 50;
var endY = element.height - 50;

var x = startX;

var y = startY;

var duration = 0.005;

var width = height = 50;

function logic(){
	duration +=0.002;

	x = linear_interpolation(startX, endX, duration);

	if (x < element.width - width){
		requestAnimationFrame(draw);
	}

	y = linear_interpolation(startY, endY, duration);

	if(y < element.height - height){
		requestAnimationFrame(draw);
	}
}

function draw(){
	context.clearRect(0, 0, element.width, element.height);

	context.fillStyle = "#333";

	context.fillRect(x, y, 45, 45);
}

function linear_interpolation(start, end, speed){
	return start + (end - start) * speed;
}

requestAnimationFrame(draw);

setInterval(logic, 1000/60);


