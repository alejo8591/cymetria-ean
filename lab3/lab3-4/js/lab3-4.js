(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var element = document.querySelector("#animation");

element.height = window.innerHeight;
element.width = window.innerWidth;

var context = element.getContext('2d');

var x = 10;
var y = 10;

var duration = 0;

var width = height = 50;

var heading_x = heading_y = Math.random() * 360;

var distance_x = distance_y = 0;

function logic(){
	if(heading_x > 360 || heading_x < -360) heading_x = 0;
	if(heading_y > 360 || heading_y < -360) heading_y = 0;

	if(x <= 0 || x >= element.width - width){
		heading_x = heading_x + 180;
	}

	if(y<= 0 || y >= element.height - height){
		heading_y = -heading_y;
	}

	distance_x = dir_x(2, heading_x);
	distance_y = dir_y(2, heading_y);

	if(duration < 10) duration += 0.002;

	x = linear_interpolation(x, x + distance_x, duration);
	y = linear_interpolation(y, y + distance_y, duration);

	requestAnimationFrame(draw);
}


function draw(){
	context.clearRect(0, 0, element.width, element.height);

	context.fillStyle = "#333";

	context.fillRect(x, y, 50, 50);
}

function linear_interpolation(start, end, speed){
	return start + (end - start) * speed;
}

// Función para conversion de grados a radianes para la ubicación de las coordenadas
function degrees_to_radians(degrees){
	return degrees * (Math.PI / 180);
}

function dir_x(length, angle){
	return length * Math.cos(degrees_to_radians(angle));
}

function dir_y(length, angle){
	return length * Math.sin(degrees_to_radians(angle));
}

requestAnimationFrame(draw);

setInterval(logic, 1000/60);
